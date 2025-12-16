---
title: 『持续更新』英伟达魔改显卡驱动
description: Office 官方源制作的ISO镜像，纯净无精简
pubDate: 12 15 2024
categories:
  - System
image:  /public/image/systems/nvidia-cmp-hx-driver/QQ20251216-180049.jpg
tags:
  - System
  - Driver
badge: Driver
ID: 1
---


# 『持续更新』英伟达魔改显卡驱动

NVIDIA魔改驱动，支持市面上各种 P106/P104/30HX/40HX/1080M/1060M/1660M/2060M/3060M等魔改/矿卡，特色：

> - 直接集成签名过小蓝熊，带NVIDIA APP支持，破解非专业卡转码4K视频流限制（无解码器）
>
> - 支持安全启动和虚拟机（仅限noApps版本），设备/任务管理器里直接显示对应消费级显卡

![QQ20251216-180108.jpg](/image/systems/nvidia-cmp-hx-driver/QQ20251216-180108.jpg)


| 版本           | 签名   | 驱动下载地址/文件名                                          | 使用说明                         |
| -------------- | ------ | ------------------------------------------------------------ | -------------------------------- |
| Lean完整版带GE | SHA160 | [566.14-LeanPatch-CMP-P10X-SHA1-Signed](https://shared.pika.net.cn/Sources/PCDriver/NVIDIA-GPU/NVIDIA-Graphics-Driver-566.14-LeanPatch-Patched-WDDM-CMP-P10X-SHA1-Signed-isApps.exe) | 首选推荐，支持Geforce Experience |
| Lean只有驱动版 | SHA160 | [566.14-LeanPatch-CMP-P10X-SHA1-noApps](https://shared.pika.net.cn/Sources/PCDriver/NVIDIA-GPU/NVIDIA-Graphics-Driver-566.14-LeanPatch-Patched-WDDM-CMP-P10X-SHA1-Signed-noApps.exe) | 备用使用，支持虚拟机和远程云电脑 |
| Rain完整版带GE | SHA160 | [566.14-RainCandy-CMP-P10X-SHA1-noApps](https://shared.pika.net.cn/Sources/PCDriver/NVIDIA-GPU/NVIDIA-Graphics-Driver-566.14-RainCandy-Patched-WDDM-CMP-P10X-SHA1-Signed-noApps.exe) | 兼容性好，支持更多魔改显卡和矿卡 |
| Rain开普勒显卡 | SHA160 | [475.14-RainCandy-Kepler-W10W11-Signed](https://shared.pika.net.cn/Sources/PCDriver/NVIDIA-GPU/NVIDIA-Graphics-Driver-475.14-RainCandy-KeplerW10W11-CMP-P10X-SHA1-Signed-noApps.exe) | 开普勒卡(K80/K40/650)上Win10和11 |
