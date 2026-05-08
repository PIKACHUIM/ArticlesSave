---
title: 黑苹果硬件兼容性与版本选择
description: 黑苹果CPU/GPU/网卡/硬盘兼容性详细说明，帮助你选择合适的硬件配置
pubDate: 01 31 2026
image: /public/image/systems/hackintosh-tutorials/QQ20260121-164021.jpg
categories:
  - Hackintosh
tags:
  - Hackintosh
badge: Hackintosh

---

> 本文是[《黑苹果安装教程以及下载和常见问题》](/blog/hackintosh-tutorials)的章节拆分文章，点击链接可查看完整教程目录。

## 0x1 硬件兼容与版本选择

### 1.0 整体兼容性

由于苹果官方只为自家硬件兼容了macOS，因此黑苹果的硬件兼容性不如Windows，大致原则：

- ① Intel & AMD CPU (需AVX2指令集)  ② Intel 2~10代核显/AMD免驱/开普勒-帕斯卡N卡

- ③ Intel Core/Xeon X79~X299/AMD Ryzen之后主板 ④ 不存在部分三星/海力士固态硬盘

### 1.1 主板兼容性

黑苹果可考虑微星、技嘉、华硕、华擎，其它方面主要就是避免选择 BIOS 太烂的品牌，且 BIOS 设置里拥有 CFG Lock 选项的最佳；
> 为什么要求有 CFG Lock 选项？
>
> 因为此项关联主板 MSR 0xE2 寄存器是否可读写（也就是 NVRAM 读写支持）。
> 对于逐渐成为主流的新一代引导工具 OpenCore 来说，BIOS中没有该选项会导致额外的折腾流程；

#### 1.1.1「特别注意」

以下型号主板没有或不支持NVRAM读写，属于知名的macOS安装“老大难”平台：

- X79、X99 、X299、C422、C612、C621

绝大部分上述型号即使用工具解锁 CFG-Lock 后，也大概率会卡在CFG这里

### 1.2 CPU 兼容性

#### 1.2.1 CPU兼容性原则

参考：https://imacos.top/2023/05/12/intel-amd/

##### 1.2.1.1 架构支持：

- 32 位架构的 CPU 只支持 macOS 10.4.1 到 macOS 10.6.8
- 64 位架构的 CPU 支持 macOS 10.4.1 至 macOS 26

##### 1.2.1.2 指令支持：

- macOS 10.11 和更老版本需要 需要 SSE3
- macOS 10.12 和更新版本需要 SSE4
- macOS 10.14 和更新版本需要 SSE4.2
- macOS 12 和更新版本需要 AVX2（可以通过补丁绕过）

##### 1.2.1.3 品牌支持：

- 支持AMD（需补丁）和Intel（酷睿11代起需要仿冒10代）

##### 1.2.1.4 线程支持：

- macOS10.10及更早版本最多支持 24 个线程，包括双 CPU。
- macOS10.11及更新版本最多支持 64 个线程，包括双 CPU。

#### 1.2.2 CPU兼容性表

| 架构/代号                                    | 品牌    | 典型型号/系列                                 | 10.12-10.14 | 10.15-13+ | 兼容性备注                      |
  |:-----------------------------------------|:------|:----------------------------------------|:-----------:|:---------:|:---------------------------|
| **Presler/Cedar Mill/Conroe/Kentsfield** | Intel | Pentium D, Core 2 Duo/Quad              |      ❌      |     ❌     | 太旧，无SSE4.2指令集              |
| **Haswell→Comet Lake**                   | Intel | 4代-10代 Core i3/i5/i7/i9                 |      ✅      |     ✅     | 消费级主力，全功能支持                |
| **Clarkdale/Arrandale**                  | Intel | 1代Core i3/i5/i7                         |      ✅      |     ✅     | **需CPU仿冒**+核显补丁            |
| **Sandy/Ivy Bridge**                     | Intel | 2-3代 Core i3/i5/i7                      |      ✅      |     ✅     | **需核显补丁**(Mojave/Monterey) |
| **Sandy-E → Cascade Lake**               | Intel | HEDT/服务器 E3/E5/E7/Xeon W                |      ✅      |     ✅     | 无核显，服务器端稳定                 |
| **Nehalem/Westmere**                     | Intel | 1代Core i7/Xeon                          |      ✅      |     ✅     | **需CPU仿冒**，无核显             |
| **Rocket Lake(11代)**                     | Intel | Core i5/i7/i9-11xxx                     |      ✅      |     ✅     | **需仿冒**，无核显驱动              |
| **Alder Lake(12代)**                      | Intel | Core i3/i5/i7/i9-12xxx                  |      ✅      |     ✅     | **需仿冒**，无核显驱动              |
| **Raptor Lake(13/14代)**                  | Intel | Core i5/i7/i9-13xxx/14xxx               |      ✅      |     ✅     | **需仿冒**，无核显驱动              |
| **Meteor Lake(Core Ultra 1代)**           | Intel | Ultra 5/7/100H系列                        |      ✅      |     ✅     | **需仿冒**，无核显驱动              |
| **Arrow Lake(Core Ultra 2代)**            | Intel | Ultra 200S系列                            |      ✅      |     ✅     | **需仿冒**，无核显驱动              |
| **Bristol Ridge**                        | AMD   | A6/A8/A10/A12-9000系列                    |      ✅      |     ✅     | 无核显驱动，需独显                  |
| **Zen/Zen+/Zen2/Zen3**                   | AMD   | Ryzen 1000-6000, Threadripper 1000-3000 |      ✅      |     ✅     | 原生支持，完美兼容                  |
| **Raphael(Zen4桌面)**                      | AMD   | Ryzen 7000系列                            |      ✅      |     ✅     | **需CPUID仿冒**，无核显           |
| **Dragon Range(Zen4移动)**                 | AMD   | Ryzen 7000HX系列                          |      ✅      |     ✅     | **需CPUID仿冒**，无核显           |
| **Phoenix/Hawk Point(Zen4 APU)**         | AMD   | Ryzen 7000/8000G系列                      |      ✅      |     ✅     | **需仿冒**，核显不可用              |
| **Strix Point/Granite Ridge(Zen5)**      | AMD   | Ryzen 9000系列                            |      ✅      |     ✅     | **需仿冒**，无核显支持              |

### 1.3 GPU 兼容性

#### 1.3.1 什么是免驱卡

macOS 的显卡驱动是系统内置的，这些驱动支持部分 AMD/NVIDIA/Intel 推出的显卡型号，型号符合的显卡在安装完 macOS
就可以自己驱动起来正常工作，即“免驱卡”；

##### 1.3.1.1 完全免驱显卡

- AMD 免驱显卡: RX4x0、RX5x0、RX Vega、RX5x00XT、RX6x00XT、RX6x50XT、MI25/50/镭7、WXx100系列，但是RX6700/6X50不能原生支持，需要仿冒或者使用NootRX
- NVIDIA免驱显卡: 只有两代 Kepler，对应 GTX6x0 和 GTX7x0 系列，但不包括 745、750 和 750Ti，并且最多只支持到 macOS 12.0 beta
  6，更高版本需要打第三方补丁；
- Intel 免驱显卡: 仅支持Intel核显，最新只到 UHD630（8-10 代酷睿）以及 Iris Plus Graphics（10 代移动端酷睿）及以前的型号，新型号Xe系列/Arc
  独显的暂不支持；

##### 1.3.1.2 可打驱动显卡

- NVIDIA可打驱动: Maxwell 和 Pascal 两个系列的显卡。需要额外安装 Webdriver 驱动并且默认只能支持 10.13.6，通过 OpenCore
  Legacy Patcher 则可以支持最新版本
- AMD 可打驱动: AMD核心显卡仅 Vega 架构这一代，这包括了 Ryzen 1xxx (Athlon Silver/Gold) 到 5xxx，还有 7x30
  系列，独显则支持RX6900~6600范围内的所有显卡

> 「注意」
> 1. 苹果于 2022 年 6 月公布了 Metal 3 支持的硬件，从 RX Vega 起步，不再支持 RX4x0 和 Rx5x0，不过不支持 Metal 3
     也仍然可以正常使用目前的 Metal 2；

#### 1.3.2 显卡兼容性表

##### 1.3.2.1 NVIDIA 显卡兼容性明细表

| **型号系列**                         | **核心架构**                         | **原生支持最高版本**            | **OCLP支持最高版本** | **备注**                       |
|:---------------------------------|:---------------------------------|:------------------------|:---------------|:-----------------------------|
| **GTX 670/680/760/770/780**      | Kepler (GK104/110)               | 12.x Monterey           | 15.x Sequoia   | 含Ti/690/TITAN Z，无HEVC硬解      |
| **GTX 660/650/640/740**          | Kepler (GK106/107)               | 12.x Monterey           | 15.x Sequoia   | 含Ti/Boost/OEM，部分花屏           |
| **GTX 750/950/960**              | Maxwell (GM107/206)              | **10.13.6 High Sierra** | 15.x Sequoia   | **原生需WebDriver，OCLP下无Metal** |
| **GTX 970/980/980Ti**            | Maxwell (GM204/200)              | **10.13.6 High Sierra** | 15.x Sequoia   | **原生需WebDriver，OCLP下无Metal** |
| **GTX 1050/1060/1070/1080**      | Pascal (GP107/106/104)           | **10.13.6 High Sierra** | 15.x Sequoia   | **原生需WebDriver，OCLP下无Metal** |
| **GT 1010/1030**                 | Pascal (GP108)                   | **10.13.6 High Sierra** | 15.x Sequoia   | GK107版属Kepler，需甄别核心          |
| **Quadro K系列**                   | Kepler (GK104/106/107)           | 12.x Monterey           | 15.x Sequoia   | K2000-K6000，部分无确切资料          |
| **Quadro M/P系列**                 | Maxwell/Pascal                   | **10.13.6 High Sierra** | 15.x Sequoia   | **原生需WebDriver，OCLP下无Metal** |
| **RTX 2060/2070/2080全系列**        | Turing (TU106/104/102)           | ❌ **无法驱动**              | ❌ **无法驱动**     | **苹果永久终止合作**                 |
| **GTX 1650/1660全系列**             | Turing (TU117/116)               | ❌ **无法驱动**              | ❌ **无法驱动**     | **架构被系统级屏蔽**                 |
| **RTX 3050/3060/3070/3080/3090** | Ampere (GA106/104/102)           | ❌ **无法驱动**              | ❌ **无法驱动**     | **无任何社区解决方案**                |
| **RTX 4060/4070/4080/4090**      | Ada Lovelace (AD106/104/103/102) | ❌ **无法驱动**              | ❌ **无法驱动**     | **完全不支持**                    |

##### 1.3.2.2 AMD 显卡兼容性明细表

| **架构代际**                     | **型号系列**                         | **原生支持最高版本** | **OCLP支持最高版本** | **备注**                |
|:-----------------------------|:---------------------------------|:-------------|:---------------|:----------------------|
| **GCN 4.0 (Polaris)**        | RX 460/470/480/570/580/590       | 26.x Tahoe   | 26.x Tahoe     | 含XT/D/2048SP/580G，最稳定 |
| **GCN 5.0/5.1 (Vega)**       | Vega 56/64/FE/Radeon VII         | 26.x Tahoe   | 26.x Tahoe     | 含Liquid/Pro版本，Mac专属   |
| **RDNA 1.0 (Navi 10)**       | RX 5300/5500/5600/5700系列         | 26.x Tahoe   | 26.x Tahoe     | 含50周年纪念版，完美免驱         |
| **RDNA 2.0 (Navi 23)**       | RX 6600/6600XT                   | 26.x Tahoe   | 26.x Tahoe     | **需macOS 12.1 Beta+** |
| **RDNA 2.0 (Navi 21)**       | RX 6800/6900全系列                  | 26.x Tahoe   | 26.x Tahoe     | 含XT/XTX/6950XT，完美免驱   |
| **RDNA 2.0 Mac专属**           | Pro W6800/W6900X/Vega II         | 26.x Tahoe   | 26.x Tahoe     | Mac Pro/iMac Pro独占    |
| **GCN 1.0-3.0**              | HD 7000/R9 200系列                 | 11.x Big Sur | 15.x Sequoia   | 需刷BIOS或仿冒ID，双芯卡单核     |
| **RDNA 2.0 (Navi 22)**       | RX 6700/6750XT/6650XT            | 15.x Sequoia | 15.x Sequoia   | **需第三方补丁或仿冒ID**       |
| **RDNA 2.0 (Navi 24)**       | **RX 6400/6500XT**               | ❌ **无法驱动**   | ❌ **无法驱动**     | **系统级核心屏蔽**           |
| **RDNA 3.0 (Navi 31/32/33)** | **RX 7600/7700XT/7800XT/7900系列** | ❌ **无法驱动**   | ❌ **无法驱动**     | **苹果未开发RDNA3驱动**      |
| **GCN 1.0双芯卡**               | HD7990/R9 295X2等                 | 11.x Big Sur | 11.x Big Sur   | **第二核心永久失效**          |

##### 1.3.2.3 Intel显卡兼容性列表

| 世代                 | 架构     | 型号系列                              | 最高支持 macOS | 原生支持起始版本 | 关键备注                       |
|:-------------------|:-------|:----------------------------------|:-----------|:---------|:---------------------------|
| Westmere (1代)      | 一代酷睿   | HD Graphics 1000                  | 10.13.6    | -        | 10.14+ 需修改，无 Metal，胶水封装    |
| Sandy Bridge (2代)  | 二代酷睿   | HD Graphics 2000/3000             | 10.13.6    | 10.7     | 10.14+ 需修改，无 Metal         |
| Ivy Bridge (3代)    | 三代酷睿   | HD Graphics 2500/4000             | 10.15.7    | 10.8     | 10.16+ 需第三方补丁              |
| Haswell (4代)       | 四代酷睿   | HD/Iris/Iris Pro Graphics         | 11.7.x     | 10.9     | HD4400 需仿冒 HD4600          |
| Broadwell (5代)     | 五代酷睿   | Iris Pro Graphics 6200 等          | 12.0       | 10.10.2  | 性能接近 GT740                 |
| Skylake (6代)       | 六代酷睿   | HD 510/520/530/540/550/580        | 12.0       | 10.11.4  | 型号改为3位数                    |
| Kabylake (7代)      | 七代酷睿   | HD 615/620/630/640/650, Iris Plus | 13.0       | 10.12.6  | **HD610 不支持**              |
| Coffeelake (8/9代)  | 八/九代酷睿 | UHD Graphics 630                  | 13.0       | 10.13.6  | F 后缀无核显，部分 i3 需仿冒          |
| Comet Lake (10代桌面) | 十代酷睿   | UHD Graphics 630                  | 最新版        | -        | 需 Lilu 1.4.5+ / WEG 1.4.0+ |
| Ice Lake (10代移动)   | 十代酷睿   | Iris Plus Graphics                | 最新版        | 10.15.4  | 移动端最强，需特殊启动参数              |

##### 1.3.2.4 AMD核显兼容性列表

| **架构代号**         | **APU 系列**                                   | **原生支持最高版本**  | **OCLP 支持最高版本** | **驱动状态**           | **特殊要求与备注**                            |
|:-----------------|:---------------------------------------------|:--------------|:----------------|:-------------------|:---------------------------------------|
| **Raven Ridge**  | Ryzen 3/5/7 2xxxG<br>Athlon Silver/Gold 2xxx | 12.x Monterey | 15.x Sequoia    | ⚠️ **需 NootedRed** | 需屏蔽独显，移除 WhateverGreen，分配 1GB+ VRAM    |
| **Picasso**      | Ryzen 3/5/7 3xxxG<br>Athlon Silver/Gold 3xxx | 12.x Monterey | 15.x Sequoia    | ⚠️ **需 NootedRed** | 使用 iMac20,1 SMBIOS，笔记本需 SSDT-PNLF 背光补丁 |
| **Renoir**       | Ryzen 4xxxG/5xxxG (U/HS/H)                   | 13.x Ventura  | 15.x Sequoia    | ⚠️ **需 NootedRed** |                                        |
| **Barcelo-R**    | Ryzen 7330U/7530U/7730U                      | 15.x Sequoia  | 15.x Sequoia    | ⚠️ **需 NootedRed** | **唯一支持核显的 Ryzen 7000 系**               |
| **Dali**         | Athlon Gold 3150U/3150C                      | 12.x Monterey | 15.x Sequoia    | ⚠️ **需 NootedRed** | 低功耗版本，性能受限                             |
| **Pollock**      | Athlon Silver 3050GE/3150GE                  | 12.x Monterey | 15.x Sequoia    | ⚠️ **需 NootedRed** | 嵌入式版本，兼容性一般                            |
| **Rembrandt**    | Ryzen 5/7/9 6xxxH/HS/HX                      | ❌ **无法驱动**    | ❌ **无法驱动**      | ❌ **完全不支持**        | RDNA 2 核显架构，系统级屏蔽                      |
| **Phoenix**      | Ryzen 5/7/9 7xxxHS/7940HS等                   | ❌ **无法驱动**    | ❌ **无法驱动**      | ❌ **完全不支持**        | RDNA 3 核显架构，无驱动支持                      |
| **Raphael**      | Ryzen 7000 系列 (Radeon 700M)                  | ❌ **无法驱动**    | ❌ **无法驱动**      | ❌ **完全不支持**        | 桌面版 RDNA 2 核显，苹果未跟进                    |
| **Dragon Range** | Ryzen 9 7945HX等                              | ❌ **无法驱动**    | ❌ **无法驱动**      | ❌ **完全不支持**        | 无核显驱动支持                                |
| **Van Gogh**     | Steam Deck APU                               | ❌ **无法驱动**    | ❌ **无法驱动**      | ❌ **完全不支持**        | 定制架构，无对应驱动                             |
| **Mendocino**    | Ryzen 7020 系列                                | ❌ **无法驱动**    | ❌ **无法驱动**      | ❌ **完全不支持**        | RDNA 2 低端，系统黑名单                        |
| **GCN 3.0**      | Radeon R7/R9 移动版                             | ❌ **无法驱动**    | ❌ **无法驱动**      | ❌ **完全不支持**        | 核显部分无驱动支持                              |

### 1.4 网卡兼容性

#### 1.4.1 网卡选购建议

| 使用场景               | 推荐方案              | 理由              |
|--------------------|-------------------|-----------------|
| **白苹果原装**          | BCM94360CS/CS2/CD | 苹果专用，免驱完美兼容     |
| **黑苹果装机**          | BCM94360NG/Z3/Z4  | 免驱，即插即用         |
| **Windows最新**      | BE200/AX411       | WiFi 7/6E，速率最高  |
| **黑苹果+Windows双系统** | BCM94360NG        | 兼顾Mac免驱和Win兼容性  |
| **预算有限**           | AC9260/9560       | Intel最强AC，性价比最高 |
| **PCIe网卡**         | DW1560/DW1830     | 博通方案，黑苹果友好      |

#### 1.4.2 网卡兼容性表

##### 1.4.1.1 Intel 网卡完整兼容性表

| 系列           | 芯片型号               | 接口类型          | Wi-Fi标准  | 蓝牙版本 | 支持macOS版本 | 所需驱动               | 备注                  |
|--------------|--------------------|---------------|----------|------|-----------|--------------------|---------------------|
| **Wi-Fi 7**  | Intel BE200        | M.2 A/E Key   | Wi-Fi 7  | 5.3  | 10.15+    | Airportitlwm/itlwm | 最新型号                |
| **Wi-Fi 6E** | Intel AX210        | M.2 A/E Key   | Wi-Fi 6E | 5.2  | 10.15+    | Airportitlwm/itlwm | 支持6GHz              |
|              | Intel AX211        | M.2 A/E Key   | Wi-Fi 6E | 5.2  | 10.15+    | Airportitlwm/itlwm | CNVio2接口            |
|              | Intel AX411        | M.2 A/E Key   | Wi-Fi 6E | 5.2  | 10.15+    | Airportitlwm/itlwm | 高端型号                |
| **Wi-Fi 6**  | Intel AX200        | M.2 A/E Key   | Wi-Fi 6  | 5.0  | 10.15+    | Airportitlwm/itlwm | 硬件ID: 0x2723        |
|              | Intel AX201        | M.2 A/E Key   | Wi-Fi 6  | 5.0  | 10.15+    | Airportitlwm/itlwm | CNVio2接口            |
|              | Intel AX101        | M.2 A/E Key   | Wi-Fi 6  | 5.2  | 10.15+    | Airportitlwm/itlwm | 入门级                 |
| **Wi-Fi 5**  | Intel AC 9560      | M.2 A/E Key   | 802.11ac | 5.0  | 10.15+    | Airportitlwm/itlwm | 1.73Gbps            |
|              | Intel AC 9461/9462 | M.2 A/E Key   | 802.11ac | 5.0  | 10.15+    | Airportitlwm/itlwm | 集成MAC               |
|              | Intel AC 9260      | M.2 A/E Key   | 802.11ac | 5.0  | 10.15+    | Airportitlwm/itlwm | 1.73Gbps            |
|              | Intel AC 8265      | M.2 A/E Key   | 802.11ac | 4.2  | 10.15+    | Airportitlwm/itlwm | 硬件ID: 0x24f3/0x24f4 |
|              | Intel AC 8260      | M.2 A/E Key   | 802.11ac | 4.2  | 10.15+    | Airportitlwm/itlwm | 企业级                 |
|              | Intel AC 7265      | M.2 A/E Key   | 802.11ac | 4.0  | 10.15+    | Airportitlwm/itlwm | 硬件ID: 0x095a/0x095b |
|              | Intel AC 7260      | Mini PCIe/M.2 | 802.11ac | 4.0  | 10.15+    | Airportitlwm/itlwm | 硬件ID: 0x08b1/0x08b2 |
|              | Intel AC 4165      | M.2 A/E Key   | 802.11ac | 4.2  | 10.15+    | Airportitlwm/itlwm | 硬件ID: 0x24f5/0x24f6 |
|              | Intel AC 3168      | M.2 A/E Key   | 802.11ac | 4.2  | 10.15+    | Airportitlwm/itlwm | 硬件ID: 0x24fb        |
|              | Intel AC 3165      | M.2 A/E Key   | 802.11ac | 4.2  | 10.15+    | Airportitlwm/itlwm | 硬件ID: 0x3166        |
|              | Intel AC 3160      | Mini PCIe/M.2 | 802.11ac | 4.0  | 10.15+    | Airportitlwm/itlwm | 硬件ID: 0x08b4        |

##### 1.4.1.2 博通网卡完整兼容性表

| 子类别           | 芯片型号         | 接口类型             | Wi-Fi标准  | 蓝牙版本 | 天线数 | 支持macOS版本   | 驱动/状态                           | 备注                                      |
|---------------|--------------|------------------|----------|------|-----|-------------|---------------------------------|-----------------------------------------|
| **原生免驱**      | BCM943602CDP | PCIe (转接)        | 802.11ac | 4.1  | 3+1 | 10.11-10.14 | 免驱                              | iMac 2015拆机卡, 性能最强                      |
| **原生免驱**      | BCM943602CD  | PCIe (转接)        | 802.11ac | 4.0  | 3+1 | 10.11-10.14 | 免驱                              | iMac 2014拆机卡                            |
| **原生免驱**      | BCM94360CD   | PCIe (转接)        | 802.11ac | 4.0  | 3+1 | 10.11-10.14 | 免驱                              | iMac 2013-14拆机卡, 性价比高                   |
| **原生免驱**      | BCM943602CS  | M.2 A/E Key (转接) | 802.11ac | 4.1  | 3   | 10.11-10.14 | 免驱                              | MacBook Pro 2015                        |
| **原生免驱**      | BCM94360CS2  | M.2 A/E Key (转接) | 802.11ac | 4.0  | 2   | 10.11-10.14 | 免驱                              | MacBook Air 2013-17, 笔记本首选              |
| **原生免驱**      | BCM94360CSAX | M.2 A/E Key (转接) | 802.11ac | 4.0  | 3   | 10.11-10.14 | 免驱                              | MacBook Pro 2012-13                     |
| **原生免驱**      | BCM94360CS   | M.2 A/E Key (转接) | 802.11ac | 4.0  | 3   | 10.11-10.14 | 免驱                              | Mac mini 2014                           |
| **原生免驱**      | BCM94331CD   | PCIe (转接)        | 802.11n  | 4.0  | 2   | 10.11-10.13 | 需强制加载IO80211Family              | iMac 2012-13, 老系统适用                     |
| **需驱动**       | BCM94352Z    | M.2 A/E Key      | 802.11ac | 4.0  | 2   | 10.11-10.14 | AirportBrcmFixup + BrcmPatchRAM | DW1560/DW1830, 基本完美                     |
| **需驱动**       | BCM94350ZAE  | M.2 A/E Key      | 802.11ac | 4.0  | 2   | 10.11-10.14 | AirportBrcmFixup + BrcmPatchRAM | DW1820A, 需注入pci-aspm-default参数          |
| **需驱动**       | BCM943224    | Mini PCIe        | 802.11n  | 4.0  | 2   | 10.11-10.14 | AirportBrcmFixup + BrcmPatchRAM | 古董级, 性能低                                |
| **需驱动**       | BCM94352HMB  | Mini PCIe        | 802.11ac | 4.0  | 2   | 10.11-10.14 | AirportBrcmFixup + BrcmPatchRAM | 半高卡, 老笔记本适用                             |
| **博通古董**      | BCM94322     | Mini PCIe        | 802.11n  | -    | 2   | 10.11-10.13 | 需驱动, 稳定性差                       | 极老型号, 不建议使用                             |
| **博通古董**      | BCM943225    | Mini PCIe        | 802.11n  | -    | 2   | 10.11-10.13 | 需驱动                             | 古董型号                                    |
| **博通古董**      | BCM94321mc   | Mini PCIe        | 802.11n  | -    | 2   | 10.11-10.13 | 需驱动                             | 性能低下                                    |
| **Atheros古董** | AR9380       | PCIe             | 802.11n  | -    | 3   | 10.11-10.13 | 免驱/AirPortAtheros40             | 3×3 MIMO, 450Mbps, 需苹果原装卡               |
| **Atheros古董** | AR9280       | Mini PCIe        | 802.11n  | -    | 2   | 10.11-10.13 | 免驱                              | 2×2 MIMO, 300Mbps, 硬件ID: 168c:2a        |
| **Atheros古董** | AR9287       | Mini PCIe        | 802.11n  | -    | 2   | 10.11-10.13 | 需修改驱动                           | 2×2 MIMO, 300Mbps, 仅2.4G, 硬件ID: 168c:2e |
| **Atheros古董** | AR9285       | Mini PCIe        | 802.11n  | -    | 1   | 10.11-10.13 | 需修改驱动                           | 1×1 MIMO, 150Mbps, 硬件ID: 168c:2b        |
| **Atheros古董** | AR9283       | Mini PCIe        | 802.11n  | -    | 2   | 10.11-10.13 | 需修改驱动                           | 2×2 MIMO, 300Mbps, 仅2.4G                |
| **Atheros古董** | AR9462       | Mini PCIe        | 802.11n  | 4.0  | 2   | 10.11-10.13 | AirPortAtheros40                | 蓝牙4.0二合一, 硬件ID: 168c:0034               |
| **Atheros古董** | AR9485       | Mini PCIe        | 802.11n  | -    | 1   | 10.11-10.13 | AirPortAtheros40                | 单频, 仅2.4G, 硬件ID: 168c:0032              |
| **Atheros古董** | AR9565       | Mini PCIe        | 802.11n  | 4.00 | 1   | 10.11-10.13 | AirPortAtheros40                | 集成蓝牙, 仅2.4G                             |

### 1.5 硬盘兼容性

#### 1.5.1 硬盘选购建议

| 使用场景      | 推荐品牌/系列                    | 不推荐品牌/系列                   |
|-----------|----------------------------|----------------------------|
| **黑苹果装机** | 西数SN系列、三星SATA系列、海盗船MP系列    | 三星PM系列、海力士、镁光、Intel傲腾      |
| **追求稳定**  | 西数SN550/570/850、金典/浦科特SATA | 所有标注⚠️和❌的型号                |
| **性价比**   | 西数SN550、海盗船MP400           | 致钛、京造（性能陷阱）                |
| **笔记本原装** | 确认非海力士/镁光OEM型号             | 联想/戴尔部分OEM盘（PC601/611/711） |

#### 1.5.2 硬盘兼容性表

| 品牌        | 型号/系列                           | 兼容性状态                | 备注与解决方案                          |
|-----------|---------------------------------|----------------------|----------------------------------|
| **三星**    | PM981/PM981A/PM991/PM9A1/983ZET | ❌ **不可安装**           | MZVLQ/MZVLB前缀全系列，进系统慢、不稳定        |
|           | 970 EVO Plus（2019年5月前出厂）        | ⚠️ **需固件升级**         | 类似PM9x1问题，需在Windows升级官方固件        |
|           | 970 EVO/Pro/Plus（升级固件后）         | ✅ **可安装**            | 存在TRIM支持问题，需SetApfsTrimTimeout=0 |
|           | 980/980 Pro                     | ✅ **可安装**            | 同上，TRIM支持不佳                      |
|           | 950/960/970 Evo/Pro             | ⚠️ **不完全支持TRIM**     | 可安装运行，但TRIM执行慢，建议关闭              |
|           | 850/870 EVO（SATA）               | ✅ **支持TRIM**         | SATA接口相对稳定                       |
| **海力士**   | BC711/PC711/PC601/P31           | ❌ **多数不可安装**         | HFS/HFM前缀多数翻车，P31可装但易出问题         |
|           | SK Hynix HFS001TD9TNG-L5B0B     | ❌ **兼容性不佳**          | 可能无故卡住或运行不正常                     |
| **镁光**    | 2200/S2200/2200S/2200V          | ❌ **不可安装**           | MTFDHBA前缀全部翻车，需代码屏蔽              |
| **Intel** | 傲腾Optane Memory                 | ❌ **不支持**            | 必须物理拆除，否则无法安装                    |
| **金士顿**   | A2000（S5Z42105控制器）              | ⚠️ **需NVMeFix.kext** | 必须搭配NVMeFix 1.0.8+，也可能完全无法安装     |
| **技嘉**    | GIGABYTE M.2 PCIe SSD           | ⚠️ **可能有问题**         | 型号如GP-GSM2NE8512GNTD，可装但运行异常     |
| **威刚**    | Swordfish 2TB                   | ⚠️ **可能有问题**         | 兼容性问题，运行不稳定                      |
|           | S7 2TB                          | ❌ **不可安装**           | 无法通过正常安装流程                       |
| **雷克沙**   | NM620                           | ❌ **完全不能用**          | 需SSDT屏蔽否则卡代码无法进系统                |
| **阿斯加特**  | AN3+/AN2                        | ⚠️ **性能问题**          | 可安装但运行慢或卡顿                       |
| **朗科**    | NVME SSD 480                    | ❌ **不可安装**           | 有反应但无法正常安装                       |
| **致钛**    | 英韧科技主控系列                        | ⚠️ **严重性能问题**        | 能装但写入速度<200MB/s，完全不可用            |
| **京造**    | J.ZAO 5 SERIES                  | ⚠️ **致命缺陷**          | 能装但写入数据即死机，无法使用                  |
| **金泰克**   | TIGO SSD 512GB NVME             | ❌ **不可安装**           | 恢复版、安装版均失败                       |
| **大华**    | C900 PLUS 1TB                   | ⚠️ **严重性能问题**        | 英韧IG5216主控速度仅20MB/s，需确认主控        |
| **Intel** | 600P/660P/760P系列                | ⚠️ **兼容性不佳**         | 可能无故卡住或运行不正常                     |
| **西数**    | SN550/570/730/750/850           | ✅ **完美兼容**           | 可正常安装运行，TRIM支持良好                 |
| **海盗船**   | MP400/MP600系列                   | ✅ **可安装**            | 可正常安装运行                          |
| **金典**    | KingDian S280（SATA）             | ✅ **支持TRIM**         | SATA接口兼容性好                       |
| **浦科特**   | M5Pro（SATA）                     | ✅ **支持TRIM**         | SATA接口相对安全                       |
|           | M9P Plus等NVMe系列                 | ❌ **不建议**            | 多数型号存在问题                         |
| **英睿达**   | Crucial P1 1TB                  | ✅ **支持TRIM**         | SM2263EN主控，未完全测试                 |
| **爱国者**   | P2000 256GB                     | ❌ **不可安装**           | 无法通过10.15/11.x/12.x正常流程（个例除外）    |
