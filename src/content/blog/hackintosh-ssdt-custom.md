---
title: 黑苹果定制SSDT教程
description: 黑苹果ACPI/SSDT定制完整教程，包含提取、反编译、编辑、安装等步骤
pubDate: 01 31 2026
image: /public/image/systems/hackintosh-tutorials/QQ20260121-164021.jpg
categories:
  - Hackintosh
tags:
  - Hackintosh
badge: Hackintosh

---

> 本文是[《黑苹果安装教程以及下载和常见问题》](/blog/hackintosh-tutorials)的章节拆分文章，点击链接可查看完整教程目录。

## 0x9 定制SSDT教程

### 9.0 ACPI与SSDT基础概念

#### 9.0.1 什么是ACPI

**ACPI**（Advanced Configuration and Power Interface，高级配置与电源接口）是操作系统与硬件通信的核心规范，由Intel、微软和东芝共同提出。它定义了操作系统如何发现和配置硬件、管理电源状态以及控制设备。

ACPI的主要功能包括：
- **系统电源管理**：控制计算机的全局状态（G-state）和睡眠状态（S-state）
- **设备电源管理**：定义设备的电源状态（D-state）
- **处理器电源管理**：在CPU空闲时通过ACPI进入不同的电源状态（C-state）
- **配置与即插即用**：通过层级结构组织设备信息，帮助操作系统识别设备状态

#### 9.0.2 什么是DSDT和SSDT

**DSDT**（Differentiated System Description Table，差异系统描述表）：
- 主板硬件的完整描述文件，包含所有设备信息
- 描述硬件配置（如CPU、显卡、声卡的位置和属性）
- 每个系统只有一个DSDT表

**SSDT**（Secondary System Description Table，次级系统描述表）：
- 补充DSDT的表格，用于扩展或修改特定硬件功能
- 一个系统可以有多个SSDT表
- 在黑苹果中，SSDT主要解决：
  - CPU电源管理
  - USB端口映射
  - 屏蔽独显
  - 背光控制
  - RTC/AWAC修复
  - 嵌入式控制器（EC）修复

#### 9.0.3 为什么需要定制SSDT

由于macOS只为苹果自家硬件优化，非苹果设备的ACPI表可能存在兼容性问题：
- 硬件设备无法被正确识别
- 电源管理功能异常
- USB端口工作不正常
- 睡眠唤醒出现问题

通过定制SSDT，我们可以让macOS正确识别和管理非苹果硬件，实现更好的兼容性和稳定性。

### 9.1 准备工作

#### 9.1.1 下载必备工具

| 工具名称 | 用途 | 下载地址 |
|---------|------|---------|
| **MaciASL** | 编辑和编译ACPI文件 | [GitHub](https://github.com/acidanthera/MaciASL/releases) |
| **SSDTTime** | 自动生成常用SSDT补丁 | [GitHub](https://github.com/corpnewt/SSDTTime) |
| **iasl** | ACPI编译器（命令行工具） | macOS自带或从Intel官网下载 |
| **OC-little** | SSDT补丁集合和教程 | [GitHub](https://github.com/daliansky/OC-little) |
| **ProperTree** | 编辑config.plist | [GitHub](https://github.com/corpnewt/ProperTree) |
| **Hackintool** | 综合调试工具 | [GitHub](https://github.com/benbaker76/Hackintool) |

#### 9.1.2 BIOS设置要求

在提取ACPI文件前，需要正确设置BIOS：

**必须开启的选项：**
- `XHCI Hand-off` - USB控制器交接
- `Above 4G Decoding` - 4G以上内存解码
- `AHCI Mode` - 硬盘AHCI模式
- `Internal Graphics` - 核显用户需开启

**必须关闭的选项：**
- `Secure Boot` - 安全启动
- `Fast Boot` - 快速启动
- `CSM/Legacy Boot` - 传统启动模式
- `CFG Lock` - 如果有此选项建议关闭

### 9.2 提取原始ACPI文件

提取原始ACPI文件是定制SSDT的第一步，有以下几种方法：

#### 9.2.1 方法一：使用Clover引导提取（推荐新手）

**步骤：**
1. 在Clover启动界面按 **F4** 键（部分笔记本需按 **Fn+F4**）
2. 系统会自动提取ACPI文件到：`EFI/Clover/ACPI/origin` 目录
3. 提取的文件包括：
   - `DSDT.aml` - 主系统描述表
   - `SSDT-0.aml`、`SSDT-1.aml` 等 - 次级系统描述表

**注意事项：**
- 提取前建议关闭Clover的所有 `Fix` 功能，避免注入修改后的代码
- 部分BIOS可能会生成重复的SSDT文件，需要手动筛选

#### 9.2.2 方法二：使用SSDTTime工具（Windows/macOS）

**Windows环境步骤：**
1. 安装Python 3.x并配置环境变量
2. 下载并解压SSDTTime
3. 运行 `SSDTTime.bat`
4. 选择 **P - Dump DSDT**
5. 文件会生成在 `Results` 文件夹中

**macOS环境步骤：**
1. 下载并解压SSDTTime
2. 打开终端，进入SSDTTime目录
3. 运行命令：`python SSDTTime.command`
4. 选择 **P - Dump DSDT**
5. 文件会生成在 `Results` 文件夹中

**优点：**
- 跨平台支持
- 可以直接生成常用的SSDT补丁
- 自动处理依赖关系

#### 9.2.3 方法三：Linux系统提取（最干净）

**步骤：**
1. 使用Ubuntu启动盘进入Live环境
2. 打开终端，执行以下命令：
```bash
# 创建目标目录
mkdir ~/acpi-tables

# 复制ACPI文件
sudo cp -R /sys/firmware/acpi/tables ~/acpi-tables

# 修改权限
sudo chmod -R 755 ~/acpi-tables
```
3. 将文件复制到U盘或其他存储设备
4. 文件需要添加 `.aml` 后缀（如 `DSDT` 改为 `DSDT.aml`）

**优点：**
- 提取的文件最完整、最干净
- 没有重复文件问题
- 不受引导工具影响

**推荐方案：**
- 新手：使用Clover F4提取
- 有一定基础：使用SSDTTime工具
- 追求完美：使用Linux系统提取

### 9.3 反编译ACPI文件

提取的 `.aml` 文件是二进制格式，需要反编译为 `.dsl` 文本格式才能编辑。

#### 9.3.1 使用MaciASL反编译（图形界面）

**步骤：**
1. 打开MaciASL应用
2. 点击 `File` → `Open`，选择 `.aml` 文件
3. MaciASL会自动反编译并显示代码
4. 点击 `File` → `Save As`，格式选择 `ACPI Source`，保存为 `.dsl` 文件

**注意：**
- 单独反编译可能会出现错误
- 建议使用命令行批量反编译所有文件

#### 9.3.2 使用iasl命令行反编译（推荐）

**步骤：**
1. 打开终端，进入ACPI文件所在目录
2. 执行批量反编译命令：
```bash
# 反编译所有.aml文件
iasl -da -dl *.aml

# 参数说明：
# -da: 反编译所有表
# -dl: 生成混合ASL/AML列表文件
```
3. 生成的 `.dsl` 文件即为可编辑的源代码

**优点：**
- 批量处理所有文件
- 自动解决文件间的依赖关系
- 减少反编译错误

### 9.4 使用SSDTTime自动生成补丁

SSDTTime可以自动生成常用的SSDT补丁，适合新手快速入门。

#### 9.4.1 生成常用SSDT补丁

**运行SSDTTime后的选项：**

```
1. FixHPET    - 修复HPET中断冲突
2. FakeEC     - 创建假的EC设备（台式机）
3. FakeEC Laptop - 创建假的EC设备（笔记本）
4. PLUG       - 启用CPU电源管理
5. AWAC       - 修复300系主板RTC问题
6. PMC        - 启用原生NVRAM（300系主板）
7. RTCAWAC    - RTC和AWAC二合一补丁
8. USB Reset  - 重置USB控制器
P. Dump DSDT  - 提取DSDT文件
Q. Quit       - 退出
```

**推荐生成的补丁：**

| 补丁名称 | 适用平台 | 作用 |
|---------|---------|------|
| **SSDT-PLUG** | Intel Haswell及更新 | 启用CPU原生电源管理 |
| **SSDT-EC** | 台式机 | 修复嵌入式控制器 |
| **SSDT-EC-USBX** | 笔记本 | 修复EC和USB电源 |
| **SSDT-AWAC** | 300系及更新主板 | 修复系统时钟问题 |
| **SSDT-PMC** | 300系主板 | 启用原生NVRAM |
| **SSDT-HPET** | X79/X99/笔记本 | 修复IRQ中断冲突 |

#### 9.4.2 操作步骤

1. 运行SSDTTime
2. 首先选择 **P** 提取DSDT（如果还没提取）
3. 根据需要选择对应的补丁编号
4. 工具会自动生成 `.aml` 文件到 `Results` 文件夹
5. 同时会生成对应的config.plist补丁（如果需要）

**示例：生成SSDT-PLUG**
```
选择: 4
工具会分析DSDT，找到CPU路径
自动生成: SSDT-PLUG.aml
位置: Results/SSDT-PLUG.aml
```

### 9.5 手动编辑和编译SSDT

对于特殊需求，可能需要手动编辑SSDT文件。

#### 9.5.1 使用MaciASL编辑

**步骤：**
1. 在MaciASL中打开 `.dsl` 源文件
2. 根据需要修改代码
3. 按 **F5** 或点击 **Compile** 按钮编译
4. 确保显示 **0 Errors**（Warning警告可以忽略）
5. 点击 `File` → `Save As`
6. 格式选择 **ACPI Machine Language Binary**
7. 保存为 `.aml` 文件

#### 9.5.2 常见编译错误处理

| 错误类型 | 原因 | 解决方法 |
|---------|------|---------|
| `Object does not exist` | 引用的对象不存在 | 检查设备路径是否正确 |
| `Method local variable is not initialized` | 变量未初始化 | 添加变量初始化代码 |
| `Invalid combination of Length and Index` | 数组索引错误 | 检查数组访问代码 |
| `Illegal forward reference` | 非法前向引用 | 调整代码顺序 |

**提示：**
- Warning（警告）通常可以忽略
- Error（错误）必须修复才能正常使用
- 建议参考OC-little项目中的示例代码

### 9.6 安装SSDT到OpenCore

#### 9.6.1 复制文件

将编译好的 `.aml` 文件复制到：
```
EFI/OC/ACPI/
```

**建议的文件命名规范：**
- `SSDT-PLUG.aml` - CPU电源管理
- `SSDT-EC-USBX.aml` - EC和USB修复
- `SSDT-AWAC.aml` - RTC修复
- `SSDT-PMC.aml` - NVRAM支持
- `SSDT-HPET.aml` - IRQ修复

#### 9.6.2 配置config.plist

**使用ProperTree或OCAuxiliaryTools编辑config.plist：**

1. 打开 `config.plist`
2. 找到 `ACPI` → `Add` 部分
3. 为每个SSDT文件添加条目：

```xml
<dict>
    <key>Comment</key>
    <string>CPU电源管理</string>
    <key>Enabled</key>
    <true/>
    <key>Path</key>
    <string>SSDT-PLUG.aml</string>
</dict>
```

**完整示例配置：**

| Path | Comment | Enabled |
|------|---------|---------|
| `SSDT-PLUG.aml` | CPU电源管理 | YES |
| `SSDT-EC-USBX.aml` | EC和USB修复 | YES |
| `SSDT-AWAC.aml` | RTC时钟修复 | YES |
| `SSDT-PMC.aml` | NVRAM支持 | YES |
| `SSDT-HPET.aml` | IRQ中断修复 | YES |

#### 9.6.3 加载顺序

SSDT的加载顺序很重要，建议按以下顺序排列：
1. SSDT-PLUG（CPU相关）
2. SSDT-EC/EC-USBX（EC相关）
3. SSDT-AWAC/RTC（时钟相关）
4. SSDT-PMC（NVRAM相关）
5. SSDT-HPET（中断相关）
6. 其他自定义SSDT

### 9.7 验证和测试

#### 9.7.1 检查SSDT是否加载

**方法一：使用Hackintool**
1. 打开Hackintool
2. 切换到 `System` 标签
3. 查看 `ACPI` 部分，确认SSDT已加载

**方法二：使用终端命令**
```bash
# 查看已加载的ACPI表
log show --predicate "processID == 0" --last boot | grep ACPI
```

#### 9.7.2 测试功能

**CPU电源管理测试：**
```bash
# 查看CPU变频
sudo powermetrics --samplers smc,cpu_power -i 1000 -n 1
```

**USB功能测试：**
- 测试所有USB接口是否正常工作
- 检查USB 3.0速度是否正常
- 测试USB设备热插拔

**睡眠唤醒测试：**
```bash
# 查看睡眠日志
pmset -g log | grep -e "Sleep.*due to" -e "Wake.*due to"
```

### 9.8 常见问题排查

#### 9.8.1 SSDT未生效

**可能原因：**
- config.plist中未正确添加
- 文件路径错误
- SSDT编译有错误
- 加载顺序不对

**解决方法：**
1. 检查config.plist配置
2. 确认文件在 `EFI/OC/ACPI/` 目录
3. 重新编译SSDT确保无错误
4. 调整加载顺序

#### 9.8.2 系统无法启动

**可能原因：**
- SSDT代码错误
- 设备路径不匹配
- 与其他补丁冲突

**解决方法：**
1. 进入OpenCore启动菜单
2. 按空格键显示隐藏选项
3. 选择 `Reset NVRAM`
4. 如果仍无法启动，移除最近添加的SSDT

#### 9.8.3 功能异常

**CPU变频不正常：**
- 检查SSDT-PLUG是否正确加载
- 确认CPU路径是否正确
- 查看是否需要CPUFriend配合

**USB不工作：**
- 检查SSDT-EC-USBX是否加载
- 确认USB端口映射是否正确
- 查看BIOS中USB设置

**睡眠唤醒问题：**
- 检查SSDT-GPRW/UPRW是否需要
- 查看电源管理设置
- 检查独显是否正确屏蔽

### 9.5 SSDT大全
| 序号 | SSDT 文件名 | 解释说明 |
| ----------- | -------- | -------- |
|1|[FixShutdown-USB-SSDT.aml](https://github.com/dortania/OpenCore-Post-Install/blob/master/extra-files/FixShutdown-USB-SSDT.dsl)|修复 USB 控制器，解决睡眠或者关机自动重启|
|2|[Spoof-SSDT.aml](https://github.com/dortania/OpenCore-Install-Guide/blob/master/extra-files/Spoof-SSDT.dsl)|禁用 GPU|
|3|[SSDT-ALS0.aml](https://cn.bing.com/search?q=SSDT-ALS0.aml)|添加虚拟的环境光传感器以在重启后保存之前亮度设置|
|4|[SSDT-ARTC.aml](https://cn.bing.com/search?q=SSDT-ARTC.aml)|修复在较新的硬件上找到的系统时钟。OCC 自带的|
|5|[SSDT-AWAC.aml](https://github.com/dortania/Getting-Started-With-ACPI/blob/master/extra-files/compiled/SSDT-AWAC.aml)|300 系列主板使用，|
|6|[SSDT-BAT.aml](https://cn.bing.com/search?q=SSDT-BAT.aml)|ThinkPad 等型号的电池补丁|
|7|[SSDT-BKey.aml](https://cn.bing.com/search?q=SSDT-BKey.aml)|早期的亮度调节使用|
|8|[SSDT-BRG0.aml](https://cn.bing.com/search?q=SSDT-BRG0.aml)|BIOS 没有 Serial(COM) Port 串口或者找不到禁用 Super IO 的话可能需要|
|9|[SSDT-CPUR.aml](https://github.com/dortania/Getting-Started-With-ACPI/blob/master/extra-files/compiled/SSDT-CPUR.aml)|能源管理，针对 AMD B550 和 A520 主板，X570 等较旧的主板不要使用|
|10|[SSDT-EC-DESKTOP.aml](https://github.com/dortania/Getting-Started-With-ACPI/blob/master/extra-files/compiled/SSDT-EC-DESKTOP.aml)|老的桌面平台使用，用于修复嵌入式控制器|
|11|[SSDT-EC-LAPTOP.aml](https://github.com/dortania/Getting-Started-With-ACPI/blob/master/extra-files/compiled/SSDT-EC-LAPTOP.aml)|老的笔记本平台使用，用于修复嵌入式控制器|
|12|[SSDT-EC-USBX-DESKTOP.aml](https://github.com/dortania/Getting-Started-With-ACPI/blob/master/extra-files/compiled/SSDT-EC-USBX-DESKTOP.aml)|新的桌面平台使用，用于修复嵌入式控制器|
|13|[SSDT-EC-USBX-LAPTOP.aml](https://github.com/dortania/Getting-Started-With-ACPI/blob/master/extra-files/compiled/SSDT-EC-USBX-LAPTOP.aml)|新的笔记本平台使用，用于修复嵌入式控制器|
|14|[SSDT-EHCx_OFF.aml](https://cn.bing.com/search?q=SSDT-EHCx-DISABLE.aml)|USB 兼容性表，禁用EHC1和EHC2。OCC 自带的|
|15|[SSDT-NoHybGfx.aml](https://sqlsec.lanzoub.com/iN45U04b351a)|屏蔽独显|
|16|[SSDT-GPI0.aml](https://github.com/dortania/vanilla-laptop-guide-legacy/blob/master/Misc-files/SSDT-GPIO.aml)|触控板连接修复。OCC 也自带的|
|17|[SSDT-GPRW.aml](https://github.com/dortania/OpenCore-Post-Install/blob/master/extra-files/SSDT-GPRW.aml)|修复睡眠自动唤醒补丁|
|18|[SSDT-HPET.aml](https://cn.bing.com/search?q=SSDT-HPET.aml)|主要用于 X79、X99 和笔记本电脑用户的 IRQ 补丁|
|19|[SSDT-HV-CPU.aml](https://github.com/acidanthera/MacHyperVSupport/releases)|对 macOS 的 Hyper-V 集成支持|
|20|[SSDT-HV-PLUG.aml](https://github.com/acidanthera/MacHyperVSupport/releases)|对 macOS 的 Hyper-V 集成支持|
|21|[SSDT-HV-VMBUS.aml](https://github.com/acidanthera/MacHyperVSupport/releases)|对 macOS 的 Hyper-V 集成支持|
|22|[SSDT-IMEI-S.aml](https://github.com/dortania/Getting-Started-With-ACPI/blob/master/extra-files/compiled/SSDT-IMEI-S.aml)|当 DSDT 中没有 IMEI 设备需要通过设备属性设置定义设备 ID 的时候才需要|
|23|[SSDT-IMEI.aml](https://github.com/dortania/Getting-Started-With-ACPI/blob/master/extra-files/compiled/SSDT-IMEI.aml)|当 DSDT 中没有 IMEI 设备需要通过设备属性设置定义设备 ID 的时候才需要|
|24|[SSDT-IRQ.aml](https://cn.bing.com/search?q=SSDT-IRQ.aml)|修复 IRQ 冲突|
|25|[SSDT-LANC.aml](https://github.com/dortania/OpenCore-Post-Install/blob/master/extra-files/SSDT-LANC.aml)|修复睡眠自动唤醒补丁|
|26|[SSDT-LIDpatch.aml](https://cn.bing.com/search?q=SSDT-LIDpatch.aml)|合盖睡眠|
|27|[SSDT-NDGP.aml](https://cn.bing.com/search?q=SSDT-NDGP.aml)|屏蔽独显|
|28|[SSDT-OLARILA.aml](https://cn.bing.com/search?q=SSDT-OLARILA.aml)|作用不详 来自于 Olaria.com 的特殊 SSDT|
|29|[SSDT-GPU-SPOOF.aml](https://sqlsec.lanzoub.com/iFUcV04b2yob)|AMD R9 系列仿冒使用，详细可参考 [OC 教程](https://dortania.github.io/Getting-Started-With-ACPI/Universal/spoof.html)|
|30|[SSDT-PLUG_FX.aml](https://github.com/naveenkrdy/Misc/blob/master/SSDTs/Compiled/SSDT-PLUG_FX.aml)|可能是 AMD FX 系列专用的 CPU 能源管理|
|31|[SSDT-PLUG_RYZEN.aml](https://github.com/naveenkrdy/Misc/blob/master/SSDTs/Compiled/SSDT-PLUG_RYZEN.aml)|可能是 AMD Ryzen 系列专用的 CPU 能源管理|
|32|[SSDT-PLUG-DRTNIA.aml](https://github.com/dortania/Getting-Started-With-ACPI/blob/master/extra-files/compiled/SSDT-PLUG-DRTNIA.aml)|用于 Hasewell 和更新 CPU 的能源管理|
|33|[SSDT-PMC.aml](https://github.com/dortania/OpenCore-Install-Guide/blob/master/extra-files/SSDT-PMC.aml)|300 系列主板原生的 NVRAM 补丁|
|34|[SSDT-PNLF-CFL.aml](https://github.com/dortania/Getting-Started-With-ACPI/blob/master/extra-files/compiled/SSDT-PNLF-CFL.aml)|Coffee Lake 和更新平台的笔记本背光修复补丁|
|35|[SSDT-PNLF.aml](https://github.com/dortania/Getting-Started-With-ACPI/blob/master/extra-files/compiled/SSDT-PNLF.aml)|大多数主板的背光修复补丁|
|36|[SSDT-PTSWAK.aml](https://cn.bing.com/search?q=SSDT-PTSWAK.aml)|修复关机、睡眠问题|
|37|[SSDT-RHUB.aml](https://github.com/dortania/Getting-Started-With-ACPI/blob/master/extra-files/compiled/SSDT-RHUB.aml)|修复某些 400 系列主板的问题，需要关闭 RHUB 设备并强制 macOS 手动重建端口|
|38|[SSDT-RTC0-RANGE-HEDT.aml](https://github.com/dortania/Getting-Started-With-ACPI/blob/master/extra-files/compiled/SSDT-RTC0-RANGE-HEDT.aml)|高端桌面平台专用，因为Big Sur 需要确保 RTC 设备的兼容|
|39|[SSDT-SBUS-MCHC.aml](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/AcpiSamples/Source/SSDT-SBUS-MCHC.dsl)|修复 SMBus 支持，解决 温度、风扇、电压等读数问题|
|40| [SSDT-GPU-R9-370.aml](https://sqlsec.lanzoub.com/ij85R04b2w5a) | AMD R9 370 的仿冒，实际替换成自己的实际路径使用              |
|41|[SSDT-ThinkPad_ClickPad](https://github.com/acidanthera/VoodooPS2/blob/master/Docs/ACPI/SSDT-Thinkpad_Clickpad.dsl)|ThinkPad 的 ClickPad 专用|
|42|[SSDT-UNC.aml](https://github.com/dortania/Getting-Started-With-ACPI/blob/master/extra-files/compiled/SSDT-UNC.aml)|禁用 ACPI 中未使用的设备，确保 IOPCIFamily 不会出现内核恐慌|
|43|[SSDT-UPRW.aml](https://github.com/dortania/OpenCore-Post-Install/blob/master/extra-files/SSDT-UPRW.aml)|修复睡眠自动唤醒补丁|
|44| [SSDT-USB3-1-XHC2.aml](https://sqlsec.lanzoub.com/i5bNV04b2ocj) | ASMedia ASM1142 USB 3.1 Type-A 和 Type-C 一体的 USB 专用     |
|45| [SSDT-SSCN.aml](https://sqlsec.lanzoub.com/iI61h04b2txa)     | 某些 I2C 触控板轮询失败的情况下可以考虑使用看看              |
|46|[SSDT-XHC2.aml](https://github.com/dortania/OpenCore-Post-Install/blob/master/extra-files/SSDT-XHC2.dsl)|自动注入 XHC 属性？|
|47|[SSDT-XOSI.aml](https://github.com/dortania/Getting-Started-With-ACPI/blob/master/extra-files/compiled/SSDT-XOSI.aml)|触控板连接修复，模拟 Windows 版本的 Darwin，需要配合补丁|
|48|[SSDT-RP.PXSX-disbale.aml](https://sqlsec.lanzoub.com/iTg3G04b2kdg)|屏蔽 NVME 硬盘补丁示例，记得替换自己电脑的实际硬盘路径|
|49|[SSDT-PLUG-ALT.aml](https://sqlsec.lanzoub.com/i7oos04b2m8d)|12 代 CPU 大小核调度|
