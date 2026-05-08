---
title: 0x2 黑果安装镜像下载地址汇总
description: 黑果镜像、工具、补丁下载地址汇总，包含离线版、在线版、虚拟机版等
pubDate: 02 13 2026
image: /image/systems/hackintosh-tutorials/QQ20260121-164021.jpg
categories:
  - Hackintosh
tags:
  - Hackintosh
badge: Hackintosh

---

> 本文是[《黑果安装教程以及下载和常见问题》](/blog/hackintosh-tutorial0)的章节拆分文章，点击链接可查看完整教程目录。

## 0x2 黑果镜像下载地址
### 2.0 黑果教程&引导下载

- [Dortania - OpenCore黑果安装教程](https://dortania.github.io/OpenCore-Install-Guide/prerequisites.html)
- [国光的黑果安装教程：手把手教你配置 OpenCore](https://apple.sqlsec.com/)
- [Daliansky - 黑果长期维护机型 EFI 及安装教程整理](https://github.com/daliansky/Hackintosh)
- [皮卡的资源站 - 黑果EFI引导文件搜集](https://shared.pika.net.cn/Sources/OSImages/MacOS/EFIData)

### 2.1 镜像下载

| 版本类型    | 说明                            | 下载地址                                                      |
|---------|-------------------------------|-----------------------------------------------------------|
| 离线安装版   | DMG无需网络                       | https://shared.pika.net.cn/Sources/OSImages/MacOS/Hackins |
| 在线安装版   | 需要联网安装                        | https://shared.pika.net.cn/Sources/OSImages/MacOS/Onlines |
| ISO离线版  | 主要给虚拟机安装                      | https://shared.pika.net.cn/Sources/OSImages/MacOS/ISOFile |
| VM懒人包   | 安装好的VM虚拟机镜像                   | https://shared.pika.net.cn/Sources/OSImages/MacOS/Vmwares |
| PVE懒人包  | 一键启动PVE的macOS模板               | https://shared.pika.net.cn/Sources/OSImages/MacOS/Proxmox |
| RDR恢复版本 | R-Drive Image恢复版本             | https://shared.pika.net.cn/Sources/OSImages/MacOS/Rec-rdr |
| PHD恢复版本 | Paragon Hard Disk Manager 恢复版 | https://shared.pika.net.cn/Sources/OSImages/MacOS/Rec-phd |

### 2.2 工具下载

| 工具名称                   | 介绍 | 下载地址 |
|------------------------|----|------|
| OCLP-Mod               |  持在支持和不支持的Mac上运行和解锁macOS功能  |  https://github.com/laobamac/OCLP-Mod/releases/tag/3.1.4    |
| OCAuxiliaryTools(OCAT) |  一款基于图形界面的配置器，用于编辑OpenCore  |    https://github.com/ic005k/OCAuxiliaryTools/releases/tag/20250001  |
| Hackintool                       |  原版Hackintoshing的瑞士军刀  |   https://github.com/benbaker76/Hackintool/releases/tag/4.1.5   |

### 2.3 补丁下载

| 工具名称              | 介绍           | 下载地址                                                                                                                             |
|-------------------|--------------|----------------------------------------------------------------------------------------------------------------------------------|
| Intel Wireless    | Intel 无线网卡补丁 | https://github.com/OpenIntelWireless/itlwm/releases <br/> https://shared.pika.net.cn/Sources/OSImages/MacOS/MacKext/AirportItlwm |
| Intel Bluetooth   | Intel 蓝牙补丁   | https://shared.pika.net.cn/Sources/OSImages/MacOS/MacKext/IntelBluetooth                                                         |
| Broadcom Wireless | 博通蓝牙&无线网卡补丁  | https://shared.pika.net.cn/Sources/OSImages/MacOS/MacKext/BrcmPatchRAM                                                           |
| Nvidia Web Driver | 英伟达显卡补丁      | https://shared.pika.net.cn/Sources/OSImages/MacOS/MacKext/WebDriver-NVidia <br/>注意：只能用于10.13.6及以下MacOS，且只支持N卡GT(X)7XX~10XX显卡     |
| NootRX NootedRed  | AMD独显和核显驱动   | https://shared.pika.net.cn/Sources/OSImages/MacOS/MacKext/NootRX-NootedRed                                                       |
| VoodooHDA-Sounds  | 万能声卡驱动       | https://shared.pika.net.cn/Sources/OSImages/MacOS/MacKext/VoodooHDA-Sounds                                                       |
