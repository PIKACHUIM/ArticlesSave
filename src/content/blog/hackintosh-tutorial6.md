---
title: 0x6 黑果显卡驱动以及排错教程
description: 黑果Intel/AMD/Nvidia显卡驱动方法，包含核显注入、独显驱动等
pubDate: 02 09 2026
image: /image/systems/hackintosh-tutorials/QQ20260121-164021.jpg
categories:
  - Hackintosh
tags:
  - Hackintosh
badge: Hackintosh

---

> 本文是[《黑果安装教程以及下载和常见问题》](/blog/hackintosh-tutorial0)的章节拆分文章，点击链接可查看完整教程目录。

## 0x6 驱动显卡教程

### 6.1 Intel1-10代核显

#### 6.1.1 抄作业的办法（寻找现成 EFI）

"抄作业"（使用别人已经配置好的 EFI）是新手入门最快的方式，但**绝对不能直接拿来就用**，必须经过确认和修改。

##### 1. 如何寻找合适的 EFI

*   **GitHub 搜索技巧**：
    *   **精确型号**：直接搜索 `笔记本型号 + Hackintosh` 或 `主板型号 + Hackintosh`。例如：`ThinkPad T480 Hackintosh`、`Asus Z390-A OpenCore`。
    *   **关注 Topics**：点击 GitHub 上的 `hackintosh` 或 `hackintosh-efi` 标签，浏览热门仓库。
    *   **查看 Update**：优先选择最近更新（Last updated within 6 months）的仓库，太旧的 EFI 可能无法引导新版 macOS。
*   **专业论坛**：
    *   **国内**：黑果小兵、远景论坛（pcbeta）。
    *   **国外**：InsanelyMac、tonymacx86（注意 Tonymac 的工具通常闭源，建议仅参考其 EFI 结构）。

##### 2. 抄作业前的 "三对"（核对硬件）

在下载别人的 EFI 之前，必须仔细核对以下硬件信息。如果不一致，**不能直接通刷**。

*   **CPU 架构与代数**：必须完全一致。例如 i5-8250U (Kaby Lake R) 不能使用 i7-10510U (Comet Lake) 的 EFI。
*   **独立显卡**：如果是笔记本，确认对方是否屏蔽了独显（通常需要屏蔽）。如果是台式机，确认对方用的显卡是否和你一样（A 卡免驱 vs N 卡 WebDriver）。
*   **网卡与音频**：
    *   **无线网卡**：这是最容易不同的地方。如果对方是博通卡而你是 Intel 卡，你需要删除对方的博通驱动（AirportBrcmFixup 等），加上 `itlwm.kext` 或 `AirportItlwm.kext`。
    *   **声卡**：确认声卡芯片型号（如 ALC298）。如果型号不同，需要在 config.plist 中修改 `alcid`（layout-id）。

##### 3. 抄完作业必须做的修改（去重与清洗）

下载下来的 EFI **必须**进行以下修改才能使用，否则可能导致 Apple ID 被封锁或系统不稳定。

*   **生成新的序列号（三码/五码）**：
    *   **工具**：使用 [GenSMBIOS](https://github.com/corpnewt/GenSMBIOS) 或 OCAT (OCAuxiliaryTools) 的 Generate 功能。
    *   **修改项**：`PlatformInfo -> Generic` 下的 `SystemSerialNumber` (序列号), `SystemUUID` (通用唯一识别码), `MLB` (主板序列号)。
    *   **原因**：公开的 EFI 里的序列号可能已经被几千人使用，登录 iCloud 极易被封号。
*   **精简 Kexts**：
    *   删除你不用的驱动。例如对方有 `USBInjectAll.kext` 但你已经定制了 USB，或者对方有 `BrcmPatchRAM` 但你是 Intel 网卡。
*   **检查 BootArgs**：
    *   检查启动参数（`nvram -> 7C436110-AB2A-4BBB-A880-FE41995C9F82 -> boot-args`）。移除其中的 `-v` (跑码模式) 可以在稳定后加快开机，但初次安装建议保留。移除特定于对方显示器的参数（如某些分辨率修正）。
*   **USB 定制**：
    *   别人的 USBMap.kext 几乎肯定不适用于你的具体插拔情况（即使主板一样，机箱前面板接线也可能不同）。建议先禁用对方的 USB 定制驱动，使用 `USBInjectAll.kext` + `XhciPortLimit` (旧版) 或直接在 Windows 下用 USBToolBox 定制好再进 macOS。

##### 4. 推荐工具

*   **OCAuxiliaryTools (OCAT)**：全平台强大的 OpenCore 配置工具，支持自动升级 OC 版本和 Kexts。
*   **Hackintool**：万能工具箱，用于查看硬件 ID（PCIe 路径）、显卡显存大小、USB 定制等。
*   **ProperTree**：轻量级 plist 编辑器，官方推荐，即使 OCAT 无法打开的文件它也能救急。 

#### 6.1.2 手动注入核显

手动注入核显是黑果安装中的重要环节，通过在OpenCore的`config.plist`中配置`DeviceProperties`来驱动Intel核显。以下是详细的配置步骤：

##### 1. 准备工作

**1.1 确认核显型号**

首先需要确认你的CPU核显型号，可以通过以下方式：
- 查看CPU型号（如i5-8400对应UHD 630）
- 使用Windows下的GPU-Z工具查看
- 参考Intel官网的CPU规格说明

**1.2 获取设备路径**

核显的PCI设备路径通常为`PciRoot(0x0)/Pci(0x2,0x0)`，可以通过以下工具获取：
- 使用`gfxutil`工具：在终端运行`./gfxutil -f IGPU`
- 使用Hackintool工具查看
![16321210545547.png](/image/systems/hackintosh-tutorials/16321210545547.png)

**1.3 准备必要的Kext驱动**

确保已添加以下驱动到`EFI/OC/Kexts`目录：
- `Lilu.kext`（必须，且必须排在第一位）
- `WhateverGreen.kext`（核显驱动核心）

##### 2. 配置ig-platform-id

`ig-platform-id`是核显驱动的核心参数，不同代际的CPU需要使用不同的ID。

**2.1 常用ig-platform-id速查表**

| CPU代际 | 核显型号 | 台式机ID | 笔记本ID | 说明 |
|:-------|:--------|:---------|:---------|:-----|
| Haswell(4代) | HD 4600 | 0x0D220003 | 0x0A260006 | 需仿冒 |
| Broadwell(5代) | HD 5500/6000 | 0x16220007 | 0x16260006 | - |
| Skylake(6代) | HD 530 | 0x19120000 | 0x19160000 | - |
| Kaby Lake(7代) | HD 630 | 0x59120000 | 0x591B0000 | - |
| Coffee Lake(8/9代) | UHD 630 | 0x3E9B0007 | 0x3E9B0000 | 推荐 |
| Comet Lake(10代) | UHD 630 | 0x9BC80003 | 0x9BC50003 | 需WEG 1.4.0+ |
| Ice Lake(10代) | Iris Plus | - | 0x8A520000 | 仅移动端 |

**2.2 ID格式转换**

`ig-platform-id`需要以十六进制倒序格式填写：
- 原始ID：`0x3E9B0007`
- 转换步骤：去掉`0x`前缀 → `3E9B0007` → 两两倒序 → `0700 9B3E`
- 最终填写：`0700 9B3E`（在Hackintool中）或`DATA`类型的`BwCbPg==`（Base64编码）

![核显ID转换示例](/image/systems/hackintosh-tutorials/QQ20260121-192601.jpg)

##### 3. 在config.plist中配置

**3.1 打开配置文件**

使用ProperTree、OCAT或其他plist编辑器打开`config.plist`文件。

**3.2 添加DeviceProperties**

导航到`DeviceProperties` → `Add` → `PciRoot(0x0)/Pci(0x2,0x0)`，添加以下属性：

**基础配置（必需）：**

```xml
<key>PciRoot(0x0)/Pci(0x2,0x0)</key>
<dict>
    <!-- 平台ID（以UHD630为例） -->
    <key>AAPL,ig-platform-id</key>
    <data>BwCbPg==</data>
    
    <!-- 设备ID（可选，某些型号需要） -->
    <key>device-id</key>
    <data>mz4AAA==</data>
</dict>
```

**进阶配置（解决显存/接口问题）：**

```xml
<!-- 显存分配（2048MB） -->
<key>framebuffer-unifiedmem</key>
<data>AAAAgA==</data>

<!-- 偷取显存（48MB） -->
<key>framebuffer-stolenmem</key>
<data>AAAwAQ==</data>

<!-- 帧缓冲显存（9MB） -->
<key>framebuffer-fbmem</key>
<data>AACQAA==</data>

<!-- 启用framebuffer补丁 -->
<key>framebuffer-patch-enable</key>
<data>AQAAAA==</data>
```

![DeviceProperties配置示例](/image/systems/hackintosh-tutorials/QQ20260121-192602.jpg)

##### 4. 接口配置（多屏输出）

如果需要配置HDMI、DP等视频输出接口，需要添加接口补丁：

**4.1 启用接口**

```xml
<!-- 启用接口1（HDMI） -->
<key>framebuffer-con1-enable</key>
<data>AQAAAA==</data>

<!-- 接口1类型（HDMI） -->
<key>framebuffer-con1-type</key>
<data>AAgAAA==</data>

<!-- 接口1总线ID -->
<key>framebuffer-con1-busid</key>
<data>BAAAAA==</data>

<!-- 接口1管道 -->
<key>framebuffer-con1-pipe</key>
<data>EgAAAA==</data>

<!-- 接口1索引 -->
<key>framebuffer-con1-index</key>
<data>AQAAAA==</data>
```

**4.2 接口类型对照表**

| 接口类型 | 十六进制值 | Base64编码 |
|:--------|:----------|:----------|
| DP | 00040000 | BAAAAA== |
| HDMI | 00080000 | AAgAAA== |
| DVI | 00020000 | AgAAAA== |
| VGA | 00000002 | AgAAAA== |

![接口配置示例](/image/systems/hackintosh-tutorials/QQ20260121-192603.jpg)

##### 5. 使用Hackintool自动生成

对于新手，推荐使用Hackintool工具自动生成核显补丁：

**5.1 操作步骤**

1. 下载并打开Hackintool
2. 切换到"Patch"（补丁）标签页
3. 在"Intel Generation"中选择你的CPU代际
4. 选择合适的`ig-platform-id`
5. 配置接口（如果需要）
6. 点击"Generate Patch"生成补丁
7. 将生成的内容复制到`config.plist`的`DeviceProperties`中

##### 6. BIOS设置

**6.1 必需设置**

- **启用核显**：`Internal Graphics` 或 `iGPU` → `Enabled`
- **DVMT Pre-Allocated**：设置为`64MB`或更高（推荐128MB）
- **DVMT Total Gfx Mem**：设置为`MAX`或`256MB`以上

**6.2 可选设置**

- **Primary Display**：如果有独显，设置为`iGPU`（仅核显）或`Auto`（双显卡）
- **iGPU Multi-Monitor**：如果需要核显+独显同时输出，设置为`Enabled`

![BIOS核显设置](/image/systems/hackintosh-tutorials/QQ20260121-192605.jpg)

##### 7. 验证与调试

**7.1 检查驱动状态**

进入macOS后，通过以下方式验证核显是否正常驱动：

1. **关于本机**：点击左上角苹果图标 → 关于本机 → 显示器
   - 正常：显示正确的核显型号和显存（如1536MB）
   - 异常：显示7MB显存或无法识别

2. **Hackintool**：打开Hackintool → System标签页
   - 查看Graphics部分是否显示核显信息
   - 检查VRAM是否正常

3. **VideoProc**：测试硬件加速是否启用
   - 下载VideoProc并运行
   - 查看是否支持H.264/HEVC硬件编解码

**7.2 常见问题排查**

| 问题现象 | 可能原因 | 解决方法 |
|:--------|:--------|:--------|
| 显存只有7MB | ig-platform-id错误 | 更换正确的ID |
| 黑屏无输出 | 接口配置错误 | 检查framebuffer-conX配置 |
| 花屏闪烁 | 显存分配不足 | 增加framebuffer-unifiedmem |
| 无法唤醒 | 电源管理问题 | 添加启动参数igfxonln=1 |
| HDMI无声音 | 音频设备未启用 | 添加hda-gfx=onboard-1 |

##### 8. 进阶优化

**8.1 添加启动参数**

在`config.plist` → `NVRAM` → `Add` → `7C436110-AB2A-4BBB-A880-FE41995C9F82` → `boot-args`中添加：

- `igfxonln=1`：强制所有显示器在线（解决唤醒黑屏）
- `-igfxvesa`：禁用核显驱动（调试用）
- `-igfxnohdmi`：禁用HDMI音频
- `igfxfw=2`：强制加载Apple GuC固件

**8.2 修复特定问题**

```xml
<!-- 修复HDMI 2.0支持 -->
<key>enable-hdmi20</key>
<data>AQAAAA==</data>

<!-- 修复数字音频 -->
<key>hda-gfx</key>
<string>onboard-1</string>

<!-- 禁用eGPU（屏蔽独显） -->
<key>disable-external-gpu</key>
<data>AQAAAA==</data>
```

##### 9. 注意事项

1. **数据格式**：在plist中，所有核显参数必须使用`DATA`类型，不能使用`String`
2. **顺序要求**：`Lilu.kext`必须在所有其他kext之前加载
3. **版本兼容**：不同macOS版本可能需要不同的`ig-platform-id`
4. **备份配置**：修改前务必备份原始`config.plist`
5. **逐步调试**：先配置基础参数，确认能进系统后再添加进阶配置

##### 6.1.2.a. 参考资源

- [WhateverGreen官方文档](https://github.com/acidanthera/WhateverGreen)
- [Intel核显ID速查表](https://github.com/acidanthera/WhateverGreen/blob/master/Manual/FAQ.IntelHD.en.md)
- [Hackintool工具下载](https://github.com/headkaze/Hackintool)
- [国光的黑果教程](https://apple.sqlsec.com/)

通过以上步骤，你应该能够成功驱动Intel核显。如果遇到问题，建议先检查BIOS设置，然后逐步排查`ig-platform-id`和framebuffer配置。

### AMD 核显 & 独显

#### AMD 核显 (APU)
得益于 **NootedRed** 驱动，现在绝大多数 AMD APU 核显都可以驱动了。
- **支持范围**: Ryzen 1xxx (Athlon Silver/Gold) 到 5xxx 系列，以及 Ryzen 7x30 系列的 Vega 核显。
- **驱动方式**: 使用 `NootedRed.kext` 替代 `WhateverGreen.kext`。
- **注意事项**: 
  - 必须移除 `WhateverGreen.kext`，两者冲突。
  - 需要在 BIOS 中将显存 (VRAM) 设置为 512MB 以上，推荐 1GB+。
  - 不支持同时使用 AMD 独显（需屏蔽独显）。
  - 支持 macOS 10.15 (Catalina) 到最新版本。

#### AMD 独显
AMD 显卡在黑果中兼容性最好。对于原生不支持的型号，现在也有了解决方案。

1. **原生支持 / WhateverGreen (推荐)**
   适用于大多数免驱卡，使用官方 `WhateverGreen.kext`。
   - **Polaris (北极星)**: RX 460/470/480/560/570/580/590
   - **Vega (织女星)**: RX Vega 56/64, Radeon VII
   - **Navi 10 (RDNA)**: RX 5500/5600/5700 XT (需 `agdpmod=pikera`)
   - **Navi 21/23 (RDNA2)**: RX 6600/6800/6900 XT (macOS 11.4+, 需 `agdpmod=pikera`)

2. **NootRX 驱动支持**
   适用于 Apple 原生不支持的 RDNA2 架构显卡，使用 `NootRX.kext`。
   - **支持型号**: 
     - **Navi 22**: RX 6700 / 6700 XT / 6750 XT (macOS 12+)
     - **Navi 24**: RX 6400 / 6500 XT (macOS 12+)
   - **注意事项**:
     - 必须移除 `WhateverGreen.kext`，两者冲突。
     - 这是一个非官方驱动，可能存在小 bug（如 DRM 问题），但在这些卡上是唯一解。

**总结**: 
- 如果你的卡是 RX 580/5700XT/6600XT/6800XT 等原生卡，请继续使用 **WhateverGreen**。
- 如果你是 RX 6700XT / 6500XT 等“黑果绝缘卡”，请使用 **NootRX**。
- 如果你是 AMD APU 核显用户，请使用 **NootedRed**。

### Nvidia 驱动独显

macOS 对 NVIDIA 的支持在 Mojave (10.14) 之后大幅缩减。

- **Kepler (开普勒)**: GT 710/730/740, GTX 650/660/760/770/780 (原生支持至 Big Sur，Monterey 后需 OCLP 补丁)
- **Maxwell/Pascal/Turing/Ampere**: GTX 9xx/10xx/16xx/20xx/30xx/40xx 无法在 Mojave (10.14) 及之后版本驱动。仅能在 High Sierra (10.13.6) 使用 Web Driver 驱动。
