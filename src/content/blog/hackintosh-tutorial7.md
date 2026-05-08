---
title: 0x7 黑果驱动网卡WiFi蓝牙教程
description: 黑果博通/Intel网卡蓝牙驱动方法，支持AirDrop、Handoff等功能
pubDate: 02 08 2026
image: /image/systems/hackintosh-tutorials/QQ20260121-164021.jpg
categories:
  - Hackintosh
tags:
  - Hackintosh
badge: Hackintosh

---

> 本文是[《黑果安装教程以及下载和常见问题》](/blog/hackintosh-tutorial0)的章节拆分文章，点击链接可查看完整教程目录。

## 0x7 驱动网卡蓝牙

### 7.1 博通网卡驱动

博通 (Broadcom) 网卡曾经是黑果的首选，因为许多型号（如 BCM94360, BCM943602, Fenvi T919 等）在 macOS 中是免驱的，支持原生的 AirDrop、Handoff 和随航功能。

#### 7.1.1 macOS Ventura (13.x) 及以下
- **免驱卡**: 插上即可使用，无需额外驱动。
- **非免驱卡**: 需要使用 `AirportBrcmFixup.kext` 和 `BrcmPatchRAM` 系列驱动。

#### 7.1.2 macOS Sonoma (14.x) 及 Sequoia (15.x)
从 macOS Sonoma 开始，Apple 彻底移除了对旧版博通网卡驱动的支持（`IO80211FamilyLegacy` 被移除）。要在新系统中使用博通网卡，需要通过 **OpenCore Legacy Patcher (OCLP)** 进行破解。

**风险提示**: 此方法需要大幅降低系统安全性（禁用 SIP、AMFI、SecureBoot），请谨慎操作。

**操作步骤**:
1.  **准备 Kexts**:
    下载并添加到 `EFI/OC/Kexts` (注意加载顺序)：
    -   `IOSkywalkFamily.kext`
    -   `IO80211FamilyLegacy.kext`
    -   `AirPortBrcmNIC.kext` (位于 IO80211FamilyLegacy 内部插件中)
    -   `AMFIPass.kext` (用于解决 AMFI 问题，替代 `amfi=0x80` 参数)

2.  **配置 Kernel -> Block (屏蔽系统驱动)**:
    -   Identifier: `com.apple.iokit.IOSkywalkFamily`
    -   Comment: `Allow IOSkywalk Downgrade`
    -   MinKernel: `23.0.0`
    -   Strategy: `Exclude`
    -   Enabled: `True`

3.  **配置 NVRAM (启动参数 & SIP)**:
    -   **SIP**: `csr-active-config` 设置为 `03080000` (禁用 SIP)。
    -   **boot-args**: 添加 `ipc_control_port_options=0` (解决 Electron 应用崩溃)。如果不用 AMFIPass，需添加 `amfi=0x80`。

4.  **配置 Misc -> Security**:
    -   `SecureBootModel`: 设置为 `Disabled`。

5.  **应用补丁**:
    -   重启进入 macOS。
    -   下载并运行 [OpenCore Legacy Patcher (OCLP)](https://github.com/dortania/OpenCore-Legacy-Patcher/releases)。
    -   点击 "Post-Install Root Patch"。
    -   点击 "Start Root Patching"。
    -   完成后重启。

### 7.2 Intel 网卡驱动

得益于 [OpenIntelWireless](https://github.com/OpenIntelWireless) 项目，Intel 网卡现在也有了很好的支持。

#### 7.2.1 Wi-Fi 驱动
有两种驱动方式，**二选一**：

1.  **AirportItlwm.kext (推荐)**:
    -   **特点**: 模拟原生 AirPort 卡，支持系统原生 Wi-Fi 菜单，支持定位服务，部分支持 Handoff/Universal Clipboard。
    -   **注意**: 必须下载对应 macOS 版本的 kext（如 Sonoma 版、Ventura 版）。
    -   **限制**: 不支持 AirDrop。

2.  **itlwm.kext + HeliPort**:
    -   **特点**: 模拟以太网卡，不依赖系统 Wi-Fi 栈，兼容性更好。
    -   **使用**: 需要安装 [HeliPort](https://github.com/OpenIntelWireless/HeliPort) 客户端来连接 Wi-Fi。
    -   **适用**: 如果 `AirportItlwm` 无法工作或导致系统不稳定，请使用此方案。

#### 7.2.2 蓝牙驱动
需要配合以下 Kexts 使用：
1.  **IntelBluetoothFirmware.kext**: 上传固件，必须。
2.  **IntelBTPatcher.kext**: 修复蓝牙 bug (macOS 12+ 需要)。
3.  **BlueToolFixup.kext**: 修复蓝牙栈 (macOS 12+ 需要，来自 [BrcmPatchRAM](https://github.com/acidanthera/BrcmPatchRAM) 包)。

**加载顺序**: `IntelBluetoothFirmware` -> `IntelBTPatcher` -> `BlueToolFixup`。
