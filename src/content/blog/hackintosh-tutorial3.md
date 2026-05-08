---
title: 0x3 黑果安装之前设置准备工作
description: 黑果安装前的BIOS设置、镜像写入U盘、EFI文件生成等准备工作
pubDate: 02 12 2026
image: /image/systems/hackintosh-tutorials/QQ20260121-164021.jpg
categories:
  - Hackintosh
tags:
  - Hackintosh
badge: Hackintosh

---

> 本文是[《黑果安装教程以及下载和常见问题》](/blog/hackintosh-tutorial0)的章节拆分文章，点击链接可查看完整教程目录。

## 0x3 黑果安装准备工作
### 3.0 BIOS设置

在安装黑果之前，正确设置BIOS是至关重要的一步。BIOS配置不当可能导致系统无法启动、性能异常或功能缺失。以下是根据主板类型分类的详细BIOS设置表格。

#### 3.0.1 通用BIOS设置（所有主板）

| 设置项 | 推荐值 | 说明 | 备注 |
|--------|--------|------|------|
| **Secure Boot** | Disabled（禁用） | 安全启动会阻止非苹果签名的引导程序加载 | 必须禁用，否则无法启动OpenCore |
| **OS Type / Boot Mode** | UEFI only | 使用UEFI引导模式，不支持Legacy | 现代黑果必需 |
| **CSM (Compatibility Support Module)** | Disabled | 禁用传统BIOS兼容模式 | 部分老旧主板需开启，但建议禁用 |
| **SATA Mode** | AHCI | SATA控制器工作模式 | AHCI是macOS必需的，IDE模式无法识别硬盘 |
| **Above 4G Decoding** | Enabled | 启用4GB以上内存地址解码 | 大内存或多显卡系统必须开启 |
| **VT-d (Intel VT-d / AMD IOMMU)** | Disabled | 禁用输入输出内存管理单元 | 或在config.plist中开启DisableIoMapper |
| **VT-x / SVM (AMD)** | Disabled/Enabled | 虚拟化技术 | 新手建议禁用，安装后可启用 |
| **Fast Boot** | Disabled | 禁用快速启动 | 避免启动时跳过设备检测 |
| **Boot Logo Display** | Disabled/Enabled | 启动徽标显示 | 不影响功能，可选 |
| **CFG Lock / MSR 0xE2** | Disabled | 关闭CPU寄存器写保护 | **关键**：如BIOS无此选项，需在config.plist中启用AppleCpuPmCfgLock和AppleXcpmCfgLock |

#### 3.0.2 Intel平台专用设置

| 设置项 | 推荐值 | 说明 | 备注 |
|--------|--------|------|------|
| **Intel Platform Trust Technology (PTT)** | Disabled | 英特尔平台信任技术 | 可选禁用，不影响安装 |
| **SGX (Software Guard Extensions)** | Disabled | 软件保护扩展 | 禁用可提高兼容性 |
| **Power Technology** | Custom | 电源管理策略 | 可设置为Custom以获得更多控制选项 |
| **Intel Speed Shift** | Disabled | 英特尔速度变频技术 | 某些情况下需禁用以避免卡顿 |
| **Hyper-Threading** | Enabled | 超线程技术 | 可选启用，不影响安装 |
| **Execute Disable Bit** | Enabled | 执行位保护 | 建议启用 |
| **Intel Virtualization Technology** | Disabled | 虚拟化技术 | 与VT-x相同，建议禁用 |

#### 3.0.3 AMD平台专用设置

| 设置项 | 推荐值 | 说明 | 备注 |
|--------|--------|------|------|
| **AMD IOMMU** | Disabled | AMD输入输出内存管理单元 | 与Intel的VT-d相同 |
| **SVM Mode** | Disabled | 安全虚拟机模式 | 与Intel的VT-x相同 |
| **CPPC** | Disabled | 协作处理器性能控制 | 某些情况下需禁用 |
| **Global C-State Control** | Auto/Enabled | 全局C状态控制 | 默认设置即可 |
| **Package C-State** | Auto/Enabled | 封装C状态 | 默认设置即可 |
| **C6 State** | Enabled | C6深度休眠状态 | 可选启用以省电 |

#### 3.0.4 不同品牌主板差异说明

##### 华硕（ASUS）主板

| 设置项 | 位置 | 推荐值 |
|--------|------|--------|
| Secure Boot | Boot → Secure Boot → OS Type | Other OS |
| CSM | Boot → CSM (Compatibility Support Module) | Disabled |
| SATA Mode | Advanced → SATA Configuration → SATA Mode Selection | AHCI |
| Above 4G Decoding | Advanced → System Agent Configuration | Enabled |
| VT-d | Advanced → System Agent Configuration → VT-d | Disabled |
| CFG Lock | AI Tweaker → Internal CPU Power Management | Disabled |

##### 微星（MSI）主板

| 设置项 | 位置 | 推荐值 |
|--------|------|--------|
| Secure Boot | Settings → Windows OS Configuration → Secure Boot | Disabled |
| Boot Mode Select | Boot → Boot Mode Select | UEFI |
| SATA Mode | Settings → Integrated Peripherals → SATA Mode | AHCI |
| Above 4G Decoding | Settings → Integrated Peripherals → Above 4G Decoding | Enabled |
| VT-d | OC → CPU Features → Intel Virtualization Tech | Disabled |
| CFG Lock | OC → CPU Features → CFG Lock | Disabled |

##### 技嘉（GIGABYTE）主板

| 设置项 | 位置 | 推荐值 |
|--------|------|--------|
| Secure Boot | BIOS Features → Secure Boot | Disabled |
| CSM Support | BIOS Features → CSM Support | Disabled |
| SATA Mode | Peripherals → SATA Mode Selection | AHCI |
| Above 4G Decoding | Peripherals → Above 4G Decoding | Enabled |
| VT-d | M.I.T → Advanced Frequency Settings → Advanced CPU Settings → Intel Virtualization Tech | Disabled |
| CFG Lock | M.I.T → Advanced Frequency Settings → Advanced CPU Settings → CFG Lock | Disabled |

##### 华擎（ASRock）主板

| 设置项 | 位置 | 推荐值 |
|--------|------|--------|
| Secure Boot | Boot → Secure Boot | Disabled |
| UEFI Boot | Boot → UEFI Boot | Enabled |
| SATA Mode | Advanced → Storage Configuration → SATA Mode | AHCI |
| Above 4G Decoding | Advanced → Chipset Configuration → Above 4G Decoding | Enabled |
| VT-d | Advanced → CPU Configuration → Intel Virtualization Technology | Disabled |
| CFG Lock | Advanced → CPU Configuration → CFG Lock | Disabled |

##### 联想（Lenovo）笔记本

| 设置项 | 位置 | 推荐值 |
|--------|------|--------|
| Secure Boot | Security → Secure Boot → Secure Boot | Disabled |
| Boot Mode | Startup → Boot Mode | UEFI |
| SATA Mode | Config → SATA | AHCI |
| VT-d | Config → CPU → Intel Virtualization Technology (VT-d) | Disabled |
| CFG Lock | Config → CPU → Config TDP Mode | Disabled（如可用） |

##### 戴尔（Dell）笔记本

| 设置项 | 位置 | 推荐值 |
|--------|------|--------|
| Secure Boot | Boot → Secure Boot | Disabled |
| Boot List Option | Boot → Boot List Option | UEFI |
| SATA Operation | System Configuration → SATA Operation | AHCI |
| VT-d | Processor Settings → Virtualization Technology | Disabled |

#### 3.0.5 特殊情况处理

##### 情况1：BIOS中找不到CFG Lock选项

如果BIOS中没有CFG Lock选项（常见于X79、X99、X299等老平台），需要在OpenCore的config.plist中进行设置：

```
Kernel → Quirks：
  ├── AppleCpuPmCfgLock: Yes
  └── AppleXcpmCfgLock: Yes
```

##### 情况2：无法关闭VT-d

如果BIOS强制启用VT-d且无法关闭，需要在config.plist中启用补丁：

```
Kernel → Quirks：
  └── DisableIoMapper: Yes
```

##### 情况3：必须启用CSM

某些老旧主板必须启用CSM才能启动，此时建议：

1. 设置 **OS Type** 为 "Other OS" 或 "Windows UEFI Mode"
2. 尝试在UEFI驱动中添加 **OpenCanopy.efi**
3. 如果遇到显示问题，启用 **ProvideConsoleGop**

##### 情况4：睡眠唤醒问题

如果在睡眠后无法唤醒或唤醒黑屏，检查以下BIOS设置：

- **S3 Sleep State**：确保选择S3而非S1或Modern Standby
- **Wake on LAN**：可尝试禁用
- **Wake on USB**：通常需要启用

#### 3.0.6 BIOS设置检查清单

完成BIOS设置后，请按以下清单逐项确认：

- [ ] Secure Boot已禁用
- [ ] 启动模式为UEFI
- [ ] SATA模式为AHCI
- [ ] Above 4G Decoding已启用
- [ ] VT-d/IOMMU已禁用（或config.plist中开启DisableIoMapper）
- [ ] CFG Lock已禁用（或config.plist中开启AppleCpuPmCfgLock和AppleXcpmCfgLock）
- [ ] 快速启动已禁用
- [ ] 保存BIOS设置并重启

#### 3.0.7 常见问题

**Q1: 设置后无法启动，一直黑屏？**

A: 检查以下几点：
1. 确认启用了Above 4G Decoding
2. 尝试禁用CSM（或启用，具体看主板）
3. 检查CFG Lock设置是否正确
4. 确认SATA模式为AHCI

**Q2: 启动时提示"This version of Mac OS X is not supported on this platform!"**

A: 这通常是因为：
1. CFG Lock未正确关闭或未设置补丁
2. 机型ID与系统版本不兼容
3. BIOS中安全启动未完全禁用

**Q3: 进入系统后检测不到硬盘？**

A: 检查：
1. BIOS中SATA模式是否为AHCI
2. 硬盘是否被设置为RAID模式
3. 使用HFSPlus.efi驱动而非VBoxHfs.efi

**Q4: 安装完成后睡眠唤醒黑屏？**

A: BIOS检查：
1. 确认睡眠模式为S3
2. 尝试禁用Wake on LAN
3. 检查电源管理相关设置

### 3.1 写入镜像
1. 下载软件：[BalenaEtcher.exe](https://shared.pika.net.cn/Sources/OSImages/MacOS/MacTool/Mac-OS-Install-Tools/U%E7%9B%98%E5%B7%A5%E5%85%B7balenaEtchers.exe)
 - 如果后缀是.rar，则需要先解压，只能烧录DMF/ISO/CDR/IMG
 - 如果名称有part*，比如.part1.rar，则需要下载所有的part

2. 打开软件：选择——从**文件烧录**——选择DMG/ISO/CDR/IMG
![QQ20260121-202336.jpg](/image/systems/hackintosh-tutorials/QQ20260121-202336.jpg)

3. 选择模板：**选择你的USB设备**——**现在烧录**————**自动校验————完成烧录**
![QQ20260121-202345.jpg](/image/systems/hackintosh-tutorials/QQ20260121-202345.jpg)

> 如提示校验失败，大概率是因为无法自动拔插读取，是正常情况，其实已经成功了

### 3.2 生成EFI
1. 加QQ群：773762093，下载RapidEFI-v4.0.0-Windows.zip，解压打开
2. 根据你的实际情况，选择平台和设备，生成EFI
![QQ20260121-203255.jpg](/image/systems/hackintosh-tutorials/QQ20260121-203255.jpg)
3. 把EFI文件夹覆盖粘贴到U盘ESP分区
