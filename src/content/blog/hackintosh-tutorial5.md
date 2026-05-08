---
title: 0x5 黑果OCLP-MOD补丁安装教程
description: 使用OpenCore Legacy Patcher为旧硬件打补丁，驱动旧版网卡和显卡
pubDate: 02 10 2026
image: /image/systems/hackintosh-tutorials/QQ20260121-164021.jpg
categories:
  - Hackintosh
tags:
  - Hackintosh
badge: Hackintosh

---

> 本文是[《黑果安装教程以及下载和常见问题》](/blog/hackintosh-tutorial0)的章节拆分文章，点击链接可查看完整教程目录。

## 0x5 黑果OCLP-MOD补丁教程

### 5.1 OCLP-MOD 简介
OpenCore Legacy Patcher (OCLP) 是一个基于 Python 的开源项目，主要旨在让旧款 Mac 能够运行较新的 macOS 版本。
在黑果（Hackintosh）领域，OCLP 主要用于：
1. **驱动旧硬件**：如在 macOS Sonoma 中驱动博通 Wi-Fi 网卡。
2. **图形加速**：为旧款 NVIDIA (Kepler/Maxwell/Pascal) 和 Intel 核显提供补丁支持。
3. **功能解锁**：解锁 Sidecar、AirPlay 等功能。

### 5.2 准备工作
在运行 OCLP-MOD 之前，必须调整 `config.plist` 设置以允许补丁写入系统分区：

1. **关闭 SIP (System Integrity Protection)**
   - `NVRAM -> Add -> 7C436110-AB2A-4BBB-A880-FE41995C9F82 -> csr-active-config`: 设置为 `03080000` (或 `FF0F0000` 彻底禁用)。
2. **禁用安全启动 (Secure Boot)**
   - `Misc -> Security -> SecureBootModel`: 设置为 `Disabled`。
3. **添加引导参数**
   - `boot-args`: 添加 `amfi=0x80` (或 `amfi_get_out_of_my_way=1`) 以允许加载未签名驱动。
4. **注入 Kexts**
   - 确保 `IOSkywalkFamily.kext` 和 `IO80211FamilyLegacy.kext` (针对博通网卡) 已正确注入并被阻止 (Block) 系统原生驱动（如果适用）。

### 5.3 安装与打补丁步骤
1. **下载工具**
   - 从 [GitHub Releases](https://github.com/laobamac/OCLP-Mod/releases) 下载最新的 `OpenCore-Patcher-GUI.app`。
2. **运行补丁**
   - 打开应用程序，点击 **"Post-Install Root Patch"**。
   - OCLP 会自动检测可用的补丁（如 "Networking: Broadcom", "Graphics: Nvidia Kepler" 等）。
   - 点击 **"Start Root Patching"**。
   - 输入管理员密码，等待进度条完成。
3. **重启生效**
   - 提示完成后，点击重启。

### 5.4 常见问题与警告
- **macOS 14.4+ 兼容性**：部分非 Metal 显卡和旧版 Wi-Fi 在 macOS 14.4+ 上可能存在兼容性问题，升级前请务必检查 OCLP 官方更新日志。
- **权限问题**：如果提示无法写入，请检查是否已在“系统设置 -> 隐私与安全性 -> 完全磁盘访问权限”中添加了 OCLP 和终端。
- **撤销补丁**：如需撤销，再次运行 OCLP，选择 "Post-Install Root Patch" -> "Revert Root Patches"。

> 参考资料：
> - [OpenCore Legacy Patcher 官方文档](https://dortania.github.io/OpenCore-Legacy-Patcher/)
> - [imacos.top - OCLP 介绍](https://imacos.top/2024/03/13/opencore-legacy-patcher-v1-4-2/)
