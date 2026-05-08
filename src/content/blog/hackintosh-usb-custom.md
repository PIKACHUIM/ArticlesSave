---
title: 黑苹果定制USB教程
description: 使用USBToolBox进行USB端口定制，解决睡眠秒醒、蓝牙失效等问题
pubDate: 01 31 2026
image: /public/image/systems/hackintosh-tutorials/QQ20260121-164021.jpg
categories:
  - Hackintosh
tags:
  - Hackintosh
badge: Hackintosh

---

> 本文是[《黑苹果安装教程以及下载和常见问题》](/blog/hackintosh-tutorials)的章节拆分文章，点击链接可查看完整教程目录。

## 0xA 定制USB 教程

USB 定制是黑苹果安装后必做的一步，否则可能出现睡眠秒醒、蓝牙失效、USB 设备掉线等问题。目前推荐使用 **USBToolBox** 在 Windows 下进行定制。

### 10.1 准备工作
1.  下载 [USBToolBox 工具](https://github.com/USBToolBox/tool/releases) (Windows.exe)
2.  下载 [USBToolBox.kext](https://github.com/USBToolBox/kext/releases)
3.  准备一个 USB 3.0 设备（U盘）和一个 USB 2.0 设备（鼠标或旧U盘）。

### 10.2 定制步骤 (Windows)

1.  **运行工具**：在 Windows 下运行 `Windows.exe`。
2.  **探测端口**：输入 `D` 回车，进入探测模式。
3.  **插拔设备**：
    -   将 USB 2.0 设备依次插入所有物理接口（包括 Type-C），每个接口停留 5 秒。
    -   将 USB 3.0 设备依次插入所有 USB 3.0/Type-C 接口，每个接口停留 5 秒。
    -   Type-C 接口需要正反各插一次。
4.  **导出配置**：
    -   插拔完成后，输入 `B` 返回主菜单。
    -   输入 `S` 查看已识别的端口。
    -   输入 `K` 导出 `UTBMap.kext`。

### 10.3 安装驱动 (macOS)

1.  将生成的 `UTBMap.kext` 和下载的 `USBToolBox.kext` 放入 `EFI/OC/Kexts` 目录。
2.  使用 Config Editor (如 ProperTree) 打开 `config.plist`。
3.  在 `Kernel` -> `Add` 中添加这两个 kext。
4.  **重要**：禁用 `XhciPortLimit` (Set `XhciPortLimit` to `False` in `Kernel` -> `Quirks`)，因为我们已经定制好了端口，不需要解除限制补丁了。
5.  重启 macOS。

### 10.4 验证
使用 **Hackintool** -> USB 选项卡，检查是否所有端口都已正确识别（USB2 显示为 HSxx，USB3 显示为 SSxx），且多余的端口已被移除。
