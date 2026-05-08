---
title: 0x8 黑果声卡驱动排查问题教程
description: 黑果AppleALC/VoodooHDA声卡驱动方法，解决无声、爆音等问题
pubDate: 02 07 2026
image: /image/systems/hackintosh-tutorials/QQ20260121-164021.jpg
categories:
  - Hackintosh
tags:
  - Hackintosh
badge: Hackintosh

---

> 本文是[《黑果安装教程以及下载和常见问题》](/blog/hackintosh-tutorial0)的章节拆分文章，点击链接可查看完整教程目录。

## 0x8 驱动声卡教程

### 8.1 AppleALC 声卡驱动 (推荐)

[AppleALC](https://github.com/acidanthera/AppleALC) 是目前最完美的黑果声卡驱动方案，它是开源的内核扩展，支持修补原生 AppleHDA，实现原生音频支持。

#### 8.1.1 准备工作
1.  确保 EFI 中已加载 `Lilu.kext`。
2.  下载最新版 `AppleALC.kext` 并放入 `EFI/OC/Kexts`。

#### 8.1.2 确定声卡型号与 layout-id
1.  **查看型号**: 使用 AIDA64 (Windows) 或 Hackintool 查看声卡型号（如 Realtek ALC892, ALC1220 等）。
2.  **查询 ID**: 访问 [AppleALC 支持列表](https://github.com/acidanthera/AppleALC/wiki/Supported-codecs)，找到你的声卡型号，记录支持的 `layout-id` (如 1, 2, 3, 5, 7 等)。

#### 8.1.3 配置 config.plist
在 `NVRAM` -> `Add` -> `7C436110-AB2A-4BBB-A880-FE41995C9F82` -> `boot-args` 中添加启动参数：
```text
alcid=1
```
其中 `1` 是你查询到的 layout-id。如果声音不正常（无声、爆音、接口不对），尝试更换其他 ID（如 `alcid=2`, `alcid=3`...）并重启，直到找到完美的 ID。

**进阶**: 也可以在 `DeviceProperties` 中注入 `layout-id` 属性（需转换为 16 进制），效果与 `boot-args` 相同。

#### 8.1.4 常见问题
- **HPET 问题**: 如果尝试了所有 ID 都不行，可能是 IRQ 冲突。需要加载 `SSDT-HPET` 补丁（使用 SSDTTime 生成）。
- **重置**: 每次修改 ID 后建议重置 NVRAM。

### 8.2 VoodooHDA 万能声卡 (备选)

如果 AppleALC 实在无法驱动你的声卡（太老或太冷门），可以使用 VoodooHDA。

- **原理**: 类似于 Linux 的 ALSA 驱动移植，完全替代 AppleHDA。
- **缺点**: 音质通常不如 AppleALC，可能底噪较大，需要禁用系统原生 AppleHDA。
- **安装**:
  1.  下载 `VoodooHDA.kext`。
  2.  放入 `EFI/OC/Kexts` 并加载。
  3.  **重要**: VoodooHDA 通常自带 `AppleHDADisabler` 功能，如果没有，需要手动屏蔽原生 `AppleHDA.kext`。
  4.  安装 `VoodooHDA.prefPane` 到系统偏好设置中调节音量和增益。
