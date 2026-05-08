---
title: 黑苹果安装常见问题(FAQ)
description: 黑苹果安装过程中150+个常见问题解答，涵盖卡代码、黑屏、声卡等各类问题
pubDate: 01 31 2026
image: /public/image/systems/hackintosh-tutorials/QQ20260121-164021.jpg
categories:
  - Hackintosh
tags:
  - Hackintosh
badge: Hackintosh

---

> 本文是[《黑苹果安装教程以及下载和常见问题》](/blog/hackintosh-tutorials)的章节拆分文章，点击链接可查看完整教程目录。

## 0xF 安装常见问题

### QA-01 唤醒黑屏或者开机需要插拔显示器线才可以点亮屏幕进系统

尝试添加在启动项添加 `igfxonln=1` 参数，还可与尝试启动项添加 `gfxrst=1` 参数

### QA-02 我的显卡免驱，但是进系统黑屏，没有输出信号

尝试添加在启动项添加 `agdpmod=pikera` 参数，可用于 RX5500/5600/5700/6600/6800/6900 新的免驱系列显卡，防止启动过程中黑屏

### QA-03 笔记本睡眠唤醒黑屏

这种情况有很多种可能，有一种可能是没有屏蔽独显的原因，请尝试在启动项添加 `-wegnoegpu` 参数

### QA-04 安装系统提示 An Internet connection is required to install macOS（需要互联网连接才能安装macOS）

群里有小伙伴遇到这个问题了，解决方法就是：连接网线就行了，真的是顾名思义呀。

### QA-05 macOS 老是检测不到系统更新怎么办

打开 OCC，在「Misc-其他设置」-「Security」标签下面，将 SecureBootMode 改为 Default 即可。

### QA-06 核显打完缓冲帧后，HEVC 解码不能用，以及 REQ 最高只有 0.35Ghz

DeviceProperties 设备属性设置里面的核显设备，删除 AAPL,slot-name 即可。

### QA-07 启动的时候 若提示【oc grabbed zero systm-id for sb. this is not allowed halting on critlcal error 】

基本就是【Misc】-->【security】下的【SecureBootModel 】的问题，默认【Default 】可以改为【Disabled 】或其他。

### QA-08 启动的时候 若开在 【End SetConsoleMode】这个报错

基本就是【Misc】-->【security】下的【SecureBootModel 】的问题，默认【Default 】可以改为【Disabled 】或其他。

### QA-09 睡眠唤醒后出现莫名其妙的花屏现象

尝试核显属性里面注入更大的显存，比如 2048MB framebuffer-unifiedmem 00000080 data 类型

### QA-10 发现不了已经安装好 macOS 的磁盘分区

使用 OCC在 ACPI 选项中打一个 Fix RTC _STA bug 补丁即可，或者是你的 OCC 版本高于已安装系统的版本，在「UEFI设置」-「嵌入式 APFS」-「MinVersion」改为「-1」无限制即可。

### QA-11 安装系统的时候，提示：「安装无法继续，因为安装器已损坏」

两种可能：

1. 顾名思义，安装镜像真的损坏了，解决方法就是换个镜像重新刻录安装。（这种可能性不高）
2. 当前的时间不太对，打开终端输入 date 看看时间是否正确，不正确的话使用 date 命令改下时间就 OK 了

### QA-12 我进系统几分钟之后就死机黑屏重启，不插网线就正常，1225V 网卡无法正常工作

首先确保你的网卡路径正确，然后驱动的姿势正确，下面两个是关键的参数：

然后从 macOS12.3 开始，启动项参数也由之前的dk.e1000=0参数变为了添加e1000=0参数 ，所以如果不对就替换或者添加一下。

### QA-13 USB 不定制就正常，使用 USBToolBox 定制了就会直接卡 APFS 无法进操作系统

在部分 USB3.1 的设备比如 ASMedia ASM1142 上可能出现过，定制 USB 的时候不要插这个接口，然后到下面这一步的时候选择I忽略即可：

### QA-14 macOS 10.13.6 的应用商店无法使用，下载提示「使用已购页面再试一次」

其实就是 10.13.6 的应用商店太老了，更新一下浏览器和 iTunes ，这些玄学问题即可解决：

### QA-15 ASMedia ASM1142 USB 3.1 Type-A 和 Type-C 一体的接口无法工作

使用这个 SSDT-USB3-1-XHC2.aml SSDT 即可解决。

### QA-16 这个安装 macOS XXXX 应用程序副本已损坏，不能用来安装 macOS

原因就是当前的时间太新了，我们安装的系统已经不维护了 ，直接改时间为 2015 年就可以了，详细操作参考网上的一篇文章：这个安装macOS Mojave 应用程序副本已损坏，不能用来安装Mac OS

### QA-17 笔记本 Type-C 没有视频输出

如果确认你的 Type-C 走的是核显的话，那么多半和机型有关，如果是16寸笔记本型号 改成13寸的，确保核显 ID 正确的情况下，多半就可以 Type-C 输出信号了。

### QA-18 拷贝 EFI 提示 EFI 上的可用空间不足

更多的是 U 盘问题，macOS 下记得清除回收站，Windows 下可以手动删除 .Trashes 垃圾文件：

或者在 macOS 下，挂载 EFI 分区后使用命令行手动删除垃圾文件：

```
cd /Volumes/EFI && rm -rf .Trashes
```

### QA-19 安装代码跑完画面出现妙控板和妙控鼠标的画面

两种可能：

1. USB 没有定制，建议参考 USB 定制教程重新定制
2. 缺少键鼠驱动，打一下 VoodooPS2Controller.kext 即可

### QA-20 Lenovo ThinkPad X13 20T3 10代U 其实黑苹果挺完美的，睡眠也很棒棒

BIOS 里面调整休眠策略为 Linux，即可开启 S3 睡眠，自测一晚上耗电正常，特此记录给后人一些经验吧。

### QA-21 I2C 触控板默认轮询模式不工作

这里以 Dell Latitude 3400 i5-8265U 的 DELL08BC 触控板为例，默认的 IRQ 为 0x00000033（51）是大于 2F 的，但是使用默认的 XOSI 轮询模式却不工作，实际上这种 i2cAddress 地址为 0x2c 的都比较坑，缺少了 SSCN，我们打 1 个下面的 SSCN SSDT 即可解决问题：

```
DefinitionBlock ("", "SSDT", 2, "LENOVO", "ICL     ", 0x20170001)
{
External (_SB_.PCI0.I2C0, DeviceObj)
External (FMD1, IntObj)
External (FMH1, IntObj)
External (FML1, IntObj)
External (SSD1, IntObj)
External (SSH1, IntObj)
External (SSL1, IntObj)
External (TPDM, IntObj)

    Method (PKG3, 3, Serialized)
    {
        Name (PKG, Package (0x03)
        {
            Zero, 
            Zero, 
            Zero
        })
        PKG [Zero] = Arg0
        PKG [One] = Arg1
        PKG [0x02] = Arg2
       Return (PKG) /* \PKG3.PKG_ */
    }

    Scope (_SB.PCI0.I2C0)
    {
        Method (SSCN, 0, NotSerialized)
        {
            Return (PKG3 (SSH1, SSL1, SSD1))
        }

        Method (FMCN, 0, NotSerialized)
        {
            Return (PKG3 (FMH1, FML1, FMD1))
        }
   }

}
```

下面是打了 SSCN SSDT 的前后对比，可以看到一开始（左边的那个）的确是一个不完整的 I2C：

### QA-22 安装代码跑完，但是后面安装的时候提示「准备软件更新时出错」

在一些 Dell 的笔记本上看到过这种情况，BIOS 里面勾选「Enable Custom Mode」接口解决这个问题

### QA-23 USB 定制完成后但是 USB3.X 依然无法正常工作

这种问题常见于 400 系列主板，这种情况打一个 XHCI-unsupported.kext 即可

### QA-24 华硕主板开机提示「The system has POSTed in safe mode.」

这种问题常见于华硕主板，OC 配置文件里面 Kernel 里面勾选「DisableRtcChecksum」即可

### QA-25 启动时显示 OCABC: Incompatible OpenRuntime r10, require r11

```
OCABC: Incompatible OpenRuntime r10, require r11
Halting on critical error
```

此问题由升级替换文件不完全造成，/EFI/OC 目录下的 OpenCore.efi，/EFI/OC/Drivers 目录下的 OpenRuntime.efi，必须来自同一版本。

OpenCore 的关键文件：BOOTx64.efi、OpenCore.efi、OpenRuntime.efi、OpenCanopy.efi（用于支持官方主题服务）

### QA-26 启动时显示 This version of Mac OS X is not supported on this platform!

```
This version of Mac OS X is not supported on this platform!
```

问题原因：使用了较新的机型ID，但是这个机型不支持旧版本系统，例如：MacPro7,1 仅能安装 macOS 10.15 及以上，不支持 macOS 10.13-10.14；另一种可能的原因是反过来，即：使用了太旧的机型ID，但这个机型不支持最新版本的系统。

### QA-27 启动时显示 configuration requires vault but no vault provided!

```
configuration requires vault but no vault provided!
```

这是最常见的新手错误了，修改 Config.plist 中：

Misc→Security→Vault→Optional

将 Vault 值设置为 Optional，注意大小写敏感。

### QA-28 OpenCore 启动界面不显示安装 U 盘，macOS 系统盘，Recovery 等选项。

修改 config.plist：

Misc→Security→ScanPolicy→ 0

填写 0 会扫描所有内容并开启所有选项。其它可选值：3870467，默认：983299

### QA-29 启动时显示 oc：Image Kexts\XXXX.kext\Contents\MacOS\XXXX.kext is missing for kext XXXX.kext ()

```
oc：Image Kexts\XXXX.kext\Contents\MacOS\XXXX.kext is missing for kext XXXX.kext ()
Halting on critical error
```

上面的代码中，XXXX.kext 可能是任何值，例如 VirtualSMC.kext，CPUFriend.kext，AppleALC.kext 等等，但是问题的原因是一样的：在 /EFI/OC/Kexts/ 目录下没有对应的 kext 文件。解决方法也很简单，添加对应的 kext，或者在 config.plist 中禁用相关的 kext。下载 kext 可以看看 黑苹果星球整理的月度 kext 更新包。除此之外还有 XXX.efi is missing 之类的也是同类型错误，只是 XXX.efi 文件一般位于 /EFI/OC/Drivers/ 目录下。

### QA-30 启动时显示 ++++++++++++++++++++ End RandomSeed

```
++++++++++++++++++++ End RandomSeed
```

修改 config.plist 中：

**Booter：**

以下选项项取决于 Memory Attribute Table（MAT）支持情况，如何确定 MAT 支持？

使用 Debug 版 OpenCore，并在 config 中设置以下选项：

```
Misc→Debug→Target→67
```

在 EFI 日志中查找以下内容：

```
OCABC: MAT support is 1
```

以上 1 代表支持，0 代表不支持 MAT。

如果支持：

- EnableWriteUnprotector→False
- RebuildAppleMemoryMap→True
- SyncRuntimePermissions→True

如果不支持：

- EnableWriteUnprotector→True
- RebuildAppleMemoryMap→False
- SyncRuntimePermissions→False

其它：

- SetupVirtualMap→False/No
  - 大部分 GA 主板，以及更老的硬件如第 4 代酷睿需要开启；
  - Icelake 以及 Comet Lake 不能开启此项；
  - AMD B550 和 A520（以及最新 BIOS 的 X570）不能开启此项；
  - AMD 线程撕裂者 TRx40 不能开启此项；
  - 华硕 X299 v3006 及以上版本的 BIOS（包括其他品牌 X299 + 最新 BIOS）不能开启此项；

- DevirtualiseMmio
  - 部分硬件平台并不能很好的适应这个 Quirk，例如部分 Z390 和绝大部分的 X99 和 X299。它的工作方式是占用 MMIO 区域并删除运行时属性，使它们可用作存放内核的空间，注意这个 Quirk 在绝大部分的系统上并不要求一定要填写 MmioWhiteList，但在某些非常难安装的平台（例如：线程撕裂者 TRX40 19H 或 10300H），在启用此 Quirk 的同时还需设置 MmioWhiteList，使用 Debug 版 OpenCore 并开启 DevirtualiseMmio，你会在日志中找到类似以下内容：

```
21:495 00:009 OCABC: MMIO devirt start
21:499 00:003 OCABC: MMIO devirt 0x60000000 (0x10000 pages, 0x8000000000000001) skip 0
21:503 00:003 OCABC: MMIO devirt 0xFE000000 (0x11 pages, 0x8000000000000001) skip 0
21:506 00:003 OCABC: MMIO devirt 0xFEC00000 (0x1 pages, 0x8000000000000001) skip 0
21:510 00:003 OCABC: MMIO devirt 0xFED00000 (0x1 pages, 0x8000000000000001) skip 0
21:513 00:003 OCABC: MMIO devirt 0xFEE00000 (0x1 pages, 0x800000000000100D) skip 0
21:516 00:003 OCABC: MMIO devirt 0xFF000000 (0x1000 pages, 0x800000000000100D) skip 0
21:520 00:003 OCABC: MMIO devirt end, saved 278608 KB
```

将 devirt 后面的 0x 60000000 等 6 组十六进制数字转换为十进制：

- MMIO devirt 0x60000000 -> 1610612736
- MMIO devirt 0xFE000000 -> 4261412864
- MMIO devirt 0xFEC00000 -> 4273995776
- MMIO devirt 0xFED00000 -> 4275044352
- MMIO devirt 0xFEE00000 -> 4276092928
- MMIO devirt 0xFF000000 -> 4278190080

然后填写到 MmioWhiteList 即可

**Kernel：**

- AMD 系统需要内核补丁；
- Intel 系统：
  - BIOS 中解锁 CFG-Lock，没有该选项的情况开启以下选项：
    - AppleXcpmCfgLock→True/Yes
    - AppleCpuPmCfgLock→True/Yes

**UEFI：**

- Quirks
  - IgnoreInvalidFlexRatio→True/Yes
  - 此项仅适用于第4代酷睿或更老平台，不适用于 AMD 和第6代酷睿及更新平台。
- Output
  - ProvideConsoleGop→True/Yes
  - 部分平台可能需要此项以正常过渡到下一个屏幕，此功能原是 AptioMemoryFix 的一部分，现在在 OpenCore 中则是这个 Quirk。

### QA-31 启动时显示 [EB|`B:WFDW] Err(0xE)

```
[EB|`B:WFDW] Err(0xE), 0 @ LocHB 71B4903C-14EC-42C4-BDC6-CE1449930E49
[EB|#LOG:DT] 2020-03-09T09:40:46 [EB|#LOG:EXITBS:START] 2020-07-22T04:21:02
```

**方案一：** 针对移动端，修改 config.plist 中

- UEFI→Quirks→IgnoreInvalidFlexRatio→True/Yes
- UEFI→Quirks→ReleaseUsbOwnership→True/Yes
- Booter→Quirks→RebuildAppleMemoryMap→False/No
- Booter→Quirks→SetupVirtualMap→True/Yes

**方案二：** 针对无法解开 CFG 锁的机型，修改 config.plist 中

- Kernel→Quirks→AppleXcpmCfgLock→True/Yes
- Kernel→Quirks→AppleCpuPmCfgLock→True/Yes
- UEFI→Quirks→IgnoreInvalidFlexRatio→True/Yes
- 如果无法关闭 VT-d，修改：
  - Kernel→Quirks→DisableIoMapper→True/Yes

**方案三：** 参考 QA-30。

### QA-32 启动时显示 [EB|#LOG:EXITBS:START]

```
[EB|#LOG:EXITBS:START]
```

参考 QA-30，因为基本上是同样的原因。

### QA-33 启动时显示 IOConsoleUsers: time(0) 0->0

```
IOConsoleUsers: time(0) 0->0, lin 0, llk1,
IOConsoleUsers: gIOScreenLockState 3, hs 0, bs 0, now 0, sm 0x0
```

这个位置基本上卡在 GPU 正确初始化前，请确认以下设置：

- GPU 支持 UEFI（尤其是 GT600/GT700 以及更早期显卡）
- BIOS 中关闭了 CSM
  - 部分笔记本机型可能无法完全关闭
- BIOS 中设置强制 PCIe 到 3.0
- 如果使用核显，再次检查所注入的核显 ig-platform-id 和 device-id
  - 桌面端 UHD630 可以尝试 00009B3E
- 尝试 -gfxmlr 启动参数，这可能同时可以解决"Divide by Zero"错误
- 在 10.15.4 及以上版本 macOS 中，某些机型上的第八、九代酷睿可能需要添加启动参数 igfxonln=1
- 更多参阅 WhateverGreen 补丁

### QA-34 启动界面看不到 macOS 启动分区

首先确认 /EFI/OC/Drivers 目录下有 HFSPlus.efi；

修改 config.plist：

- Misc→Security→Scan Policy→设置为 0
- UEFI→Quirks→UnblockFsConnet→True/Yes（部分惠普机型需要）
- UEFI→APFS→EnableJumpStart→True/Yes
- UEFI→APFS→HideVerbose→True/Yes
- UEFI→APFS→MinDate→ -1
- UEFI→APFS→MinVersion→ -1

### QA-35 选择启动项后黑屏

修改 config.plist：

- UEFI→Output→ProvideConsoleGop→True/Yes
- Booter→Quirks→RebuildAppleMemoryMap→True/Yes

如果未能解决问题，请使用 Debug 版本 OpenCore，这样会提示更多信息。

### QA-36 如何将 OpenCore 设置成图形化启动界面？

以下方法适用于 OpenCore 0.7.0 及以上。修改 config.plist：

**Misc**

- Boot
  - Picker Mode → External
  - Picker Attribute GUI → 1
  - Show Picker → True/Yes
  - PickerVariant → Acidanthera\GoldenGate （或其它你下载的主题）

**UEFI**

- Drivers
  - 加载 OpenCanopy.efi

下载 OcBinaryData，点此直达官方地址，将解压后的 Resources 文件夹覆盖到 /EFI/OC/ 目录下的同名文件夹。

### QA-37 如何固定选择启动项？

修改 config.plist：

- Misc→Security→AllowSetDefault→True/Yes

在启动界面选择想要设置的项，按下 Ctrl + Enter，即可。

### QA-38 启动时显示 OCB: OcScanForBootEntries failure - Not Found

```
OCB: OcScanForBootEntries failure - Not Found
```

这是由于 OpenCore 无法根据当前的 ScanPolicy 设置找到任何驱动器，此项设置为 0 将允许显示所有引导选项

修改 config.plist：Misc→Security→ScanPolicy→ 0

### QA-39 启动时显示 OCB: failed to match a default boot option

```
OCB: failed to match a default boot option
```

原因及解决方法同 QA-38。

### QA-40 启动时显示 OCB: StartImage failed - Aborted

```
OCB: StartImage failed - Aborted
Halting on critical error
```

请升级 OpenCore 到 0.5.9 及更高版本，这主要是由错误的编译或文件版本不对应造成。

OpenCore 的关键文件必须来自同一版本：BOOTx64.efi、OpenCore.efi、OpenRuntime.efi、OpenCanopy.efi（用于支持官方主题服务）

### QA-41 启动时显示 Forcing CS_RUNTIME for entitlement

```
Forcing CS_RUNTIME for entitlement: com.apple.rootless.restricted-block-devices
```

这个一般出现在安装 macOS 11.0 Big Sur 的过程中，其实并没有卡住，注意观察硬盘灯，耐心等待，一般3-5分钟就会过。

### QA-42 启动时显示 SetMulticastList()

```
SetMulticastList() ===>
SetMylticastList() <===
```

同 QA-42。

### QA-43 启动时显示 OCB：OcScwfurBootEntries failure - not found

```
OCB：OcScwfurBootEntries failure - not found
Halting on critical error
```

配置文件有错误，建议重新新建 config.plist。注：此错误新手遇到比较多，请注意 OpenCore 和 Clover 的 config 文件并不通用！

### QA-44 启动时显示 ERROR allocating pages

```
ERROR allocating 0x3362 pages at 0x0000000001033000 alloc type 2
Error loading kernel cache (0x9)
Halting on critical error
```

原因一般是在 /EFI/OC/Drivers 目录下引入了很多 Clover 使用的 .efi 文件。并不是 Clover 适用的 .efi 文件 OpenCore 也适用，具体看：.efi 文件说明

解决办法是删除 Clover 使用的 .efi 文件，OpenCore 最基础只需保留 HfsPlus.efi，OpenRuntime.efi，OpenCanopy.efi（用于支持官方主题），其余都删除。

### QA-45 启动时显示 OCS：No schema for Disabled at 12 index

```
OCS：No schema for Disabled at 12 index
OC：Driver HfaPlus.efi at 0 cannot be found!
Halting on critical error
```

默认的 OpenCore 不含 HFSPlus.efi 文件，需要添加到 /EFI/OC/Drivers 目录下。

### QA-46 启动时显示 OCB：StartImage failed - Already started

```
OCB：StartImage failed - Already started
Halting on critical error
```

一般发生在引导项选择时选择了 EFI 分区。解决方法：不要选择 EFI 分区，请直接选择系统分区。

### QA-47 启动时显示 OCUI: Failed to load images

```
OCUI: Failed to load images
Halting on critical error
```

开启了 OpenCore 的 UI 界面，但是没有配置 OC 的 Resource 文件，请下载并复制到 /EFI/OC/Resource/ 文件。

下载 OcBinaryData，点此可直达官方地址。

### QA-48 卡在主板 LOGO 界面

常见于 GA 主板，修改 config.plist→UEFI→Drivers 取消 AudioDxe.efi，删除或在名称前添加 # 号，暂时禁用。另一种方案，断电并拔掉电池静置 5-10 分钟，再开机。

### QA-49 启动时显示 OC: Invalid Vault mode!

```
OC: Invalid Vault mode!
```

修改 config.plist 中：

- Misc→Security→Vault→Optional

大概率是拼写错误，将 Vault 值设置为 Optional，注意大小写敏感。

### QA-50 启动时显示 OC: OcAppleGenericInputTimerQuirkExit Status - Success

```
OC: OcAppleGenericInputTimerQuirkExit Status - Success
OC: OcAppleGenericInputKeycodeExit Status - Success
```

解决方法：

**Intel：**

- BIOS 中解锁 CFG-Lock，没有该选项的情况开启以下选项：
  - AppleXcpmCfgLock→True/Yes
  - AppleCpuPmCfgLock→True/Yes

**AMD 系统需要内核补丁；**

如果未能解决问题，请使用 Debug 版本 OpenCore，这样会提示更多信息。

### QA-51 启动时显示 OCABC: Memory pool allocation failure - Not Found

```
OCABC: Memory pool allocation failure - Not Found
```

这是由于错误的 BIOS 设置 和/或 错误的 Booter Quirks 值，请确认 Booter→Quirks 设置正确，并验证 BIOS 设置：

- 开启 Above 4G Decoding
- 关闭 CSM
- 升级 BIOS 到最新版本

### QA-52 启动时显示 OCS: No schema for DSDT, KernelAndKextPatch, RtVariable, SMBIOS, SystemParameters...

```
OCS: No schema for DSDT, KernelAndKextPatch, RtVariable, SMBIOS, SystemParameters...
```

这基本上是配置文件结构不正确造成的，请勿使用 Clover 的 config.plist 引导 OpenCore，以及版本不匹配的 OpenCore Configurator 配置 config.plist。

建议是，能学会树形目录编辑器就尽量学，例如 ProperTree。

### QA-53 启动时卡在 apfs_module_start

```
apfs_module_start
```

卡在这个位置大部分都是 Z390 主板，需要添加一个 ACPI 补丁，内容如下：

```
Comment: 	Fix RTC _STA bug
Find: 		A00A9353 54415301
Replace: 	A00A910A FF0BFFFF
```

### QA-54 启动时显示 OCB：LoadImage failed - Unsupported

```
OCB：LoadImage failed - Unsupported
Halting on critical error
```

一般发生在进入 Recovery 时。解决方法是在 /EFI/OC/Drivers/ 目录下添加 HFSPlus.efi 或 VBoxHfs.efi，一般使用前者。

### QA-55 启动时显示 XHCI@14000000: AppleUSBXHCI::interruptOccurred

```
000340.041303 XHCI@14000000: AppleUSBXHCI::interruptOccurred: clearing change bits on unused port 23 with portSC 0x802a0
000341.204285 XHCI@14000000: AppleUSBXHCI::interruptOccurred: clearing change bits on unused port 24 with portSC 0x802a0
000341.227434 XHCI@14000000: AppleUSBXHCI::interruptOccurred: clearing change bits on unused port 25 with portSC 0x221203
000341.250544 XHCI@14000000: AppleUSBXHCI::interruptOccurred: clearing change bits on unused port 26 with portSC 0x802a0
...
...
IOUSBHost Interface(0x10000063d): matching deferred by IOUSBHostHIDDevice
```

一般是因为缺少 ACPI 补丁，没有正确驱动 USB 的 XHCI 节点。可尝试以下 ACPI 补丁：

```
Comment: Rename XHCI to XHC(USB)
Find: 58484349
Replace: 5848435F

Comment: Rename XHC1 to XHC(USB)
Find: 58484331
Replace: 5848435F
```

其它解决办法：

- 检查镜像 md5；
- 将 U 盘换到 USB2.0 或 USB3.1 的接口；
- 添加解除 15 端口限制的补丁，或修改 config.plist→Kernel→Quirks→XhciPortLimit

### QA-56 启动时显示 VM Swap Subsystem is ON

```
VM Swap Subsystem is ON
```

修改 config.plist：

- Kernel→Quirks→ThirdPartyDrivers→ Off/False

### QA-57 启动时显示 Kernel Extensions in backtrace

```
Kernel Extensions in backtrace：
com.apple.iokit.IOPCIFamily(2.9)[ADD485B5-3EF8-37C4-B3C5-F86326E497A4]@0xffffff7f9432f000->0xfffffff7f94365fff
com.apple.driver.AppleACPIPlatform(6.1)[C111AA1C-DE22-39CC-BB44-4870383DDAA0]@0xffffff7f96306000->0xffffff7f963a0fff
dependency: com.apple.iokit.IOACPIFamily(1.4)...
dependency: com.apple.iokit.IOPCIFamily(2.9)...
dependency: com.apple.driver.AppleSMC(3.1.9)...
com.apple.driver.AppleIntelCFLGraphicsFramebuffer(14.0.4)[...]@...
```

这个错误基本是是由 Framebuffer 设置不当造成的，例如7代酷睿使用了9代酷睿的核显 Framebuffer。

解决方法：修改合适的核显 Framebuffer 信息，可先删除 DeviceProperties 下有关核显的数值。其它参考：驱动 Intel 核显。

### QA-58 启动时显示 OCSB: No suitable signature - Security Violation

```
OCSB: No suitable signature - Security Violation
OCB: Apple Secure Boot prohibits this boot entry, enforcing!
OCB: LoadImage failed - Security Violation
```

这是由于过时的 Apple Secure Boot manifests 导致的，如果你在 OpenCore 中设置了 SecureBootModel，就会导致加载失败，这些文件丢失的原因实际上是 macOS 中的 BUG。解决方法（任选其一）：

- Misc→Security→SecureBootModel→ Default 或 Disabled
- 重新安装 macOS 到最新版本
- 从 /usr/standalone/i386 拷贝 Secure Boot manifests 到 /Volumes/Preboot/<UUID>/System/Library/CoreServices

### QA-59 启动时显示 [EB|`LD:OFS] Err(0xE) @ OPEN

```
[EB|`LD:OFS] Err(0xE) @ OPEN (System\\Library\\PrelinkedKernels\\prelinkedkernel)
```

当 Preboot 未被正确更新时，可能会发生这种情况。解决此问题：

1. 修改 config.plist→UEFI→APFS→JumpstartHotplug→True（macOS 11.0 可能必须开启此项才能进入 Recovery）
2. 重启，引导进入 Recovery
3. 开启终端，进行如下操作：

```
# 通过列出所有分区找到 Preboot 分卷
diskutil list

# 在列出的列表中，我们发现 Preboot 分卷是 disk5s2
/dev/disk5 (synthesized):
#:                       TYPE NAME                    SIZE       IDENTIFIER
0:      APFS Container Scheme -                      +255.7 GB   disk5
Physical Store disk4s2
1:                APFS Volume ⁨Big Sur HD - Data⁩       122.5 GB   disk5s1
2:                APFS Volume ⁨Preboot⁩                 309.4 MB   disk5s2
3:                APFS Volume ⁨Recovery⁩                887.8 MB   disk5s3
4:                APFS Volume ⁨VM⁩                      1.1 MB     disk5s4
5:                APFS Volume ⁨Big Sur HD⁩              16.2 GB     disk5s5
6:              APFS Snapshot ⁨com.apple.os.update-...⁩ 16.2 GB   disk5s5s
```

现在挂载指定的 Preboot 分卷

```
diskutil mount disk5s2
```

最后执行下面的命令来更新 Preboot 分卷

```
diskutil apfs updatePreboot /volume/disk5s2
```

最后重启，注意你可能需要关闭 JumpstartHotplug。

### QA-85 启动时显示 OCS: No schema for EnableForAll at 0 index

```
OCS: No schema for EnableForAll at 0 index, context <Quirks>!
OCS: No schema for EnableForAll at 5 index, contextr <Quirks>!
OCS: No schema for DummyPowerManagement at 8 index, context <Quirks>!
OCS: No schema for SkipCustomEtryCheck at 8 index, context <Boot>!
```

和其它升级 OpenCore 的问题一样，这一般是从 0.6.1 升级到 0.6.2，替换了文件却没有用新版 Sample.plist 重建 config.plist 造成的。解决的办法有两个：

- 使用 0.6.2 版本的 Sample.plist 重建 config.plist；
- 使用 BeyondCompare 等代码对比工具查找两个版本 Sample.plist 的不同之处，然后使用 VScode 等代码编辑器工具修正 0.6.1 版的 config.plist

### QA-60 启动时显示 OC: Driver AudioDxe.efi at 0 cannot be found!

```
OC: Driver AudioDxe.efi at 0 cannot be found!
Halting on critical error
```

在 config.plist 中指定了加载某些文件，实际路径里却不存在。只是此问题指的是 .efi 驱动。此案例中，请检查 /EFI/OC/Driver/ 目录下是否存在 AudioDxe.efi，不存在的话请添加。如果不想要这个驱动的话，请在 config.plist → UEFI → Drivers 中取消该文件，其它情况以此类推。

### QA-61 启动时显示 OsxAptioFix3Drv: Starting overrides

```
OsxAptioFix3Drv: Starting overrides for \System\Library\CoreServices\boot.efi
Using reloc block: no, hibernate wake: no
ERROR allocating 0x1c19 pages at 0x0000000009433000 alloc type 2
Error loading kernel cache (0x9)
Boot failed; will sleep for 10 seconds before exiting...
Error: Aborted returrned from boot.efi

was error, press any key

* Hit any key to continue *
```

如果是 OpenCore，请不要使用 OsxAptioFix3Drv.efi 或其它类似的内存修复驱动，因为 OpenCore 已经自备了 OpenRuntime.efi 来解决内存问题。如果是 Clover，r5120 以下版本请使用 AptioMemoryFix.efi，r5120 及以上版本使用 OcQuirks.efi。

### QA-62 启动时显示 Failed to parse real field of type 1

```
Failed to parse real field of type 1
```

此错误一般是因为使用了 Xcode 造成，Xcode 把 HaltLevel 的 integer 值类型自动改成了 real，解决办法是不要使用 Xcode，把 HaltLevel 下的数字值类型修改回 integer：

```
# 以下是错误的
<key>HaltLevel</key>
<real>2147483648</real>

# 修正为
<key>HaltLevel</key>
<integer>2147483648</integer>
```

### QA-63 启动时显示 Generation from SMC report as 2

```
Generation from SMC report as 2
AppleLMUController::smcGetKey Info Error: received error 0x84 when getting key info for 'ALRV'
AppleLMUController::smcReadKey Error:received error 0×84 when reading key 'MSLD'
AppleLMUController::smcReadKey Error:received error 0×84 when reading key 'ALV0'
```

此错误一般 ssdt 相关，主要表现在笔记本机型上。在此案例中，当用户设备中具备 ACPI0008 (Light Sensor device) 时，macOS 会启动 AppleSMCLMU.kext 与该设备匹配并且需要 LightSensor 的 SMC 密钥。因此，删除 SSDT-ALS0.aml，或进一步补充 ssdt 内容完全屏蔽该设备，一般即可解决该问题。

### QA-64 启动时显示 IOConsoleUsers: gIOScreenLockState 3 之后黑屏

```
IOConsoleUsers: gIOScreenLockState 3, hs 0, bs 0, now 0, sm 0x0
之后黑屏
```

如果是 Navi 系显卡（RX5500/5600/5700/XT）

- 添加启动参数 agdpmod=pikera
- 可尝试切换到 MacPro7,1 ，启动参数修改为 agdpmod=ignore
- 如果是微星的 Navi 显卡，可能需要添加以下补丁，位于 Kernel → Patch：

```
Base:
Comment: Navi VBIOS Bug Patch
Count: 1
Enabled: YES
Find: 4154592C526F6D2300
Identifier: com.apple.kext.AMDRadeonX6000Framebuffer
Limit: 0
Mask:
MinKernel: 19.00.00
MaxKernel: 19.99.99
Replace: 414D442C526F6D2300
ReplaceMask:
Skip: 0
```

### QA-65 Kernel Panic: Cannot perform kext summary

```
Kernel Panic: Cannot perform kext summary
Kernel Panic: Invalid frame pointer
```

一般情况下此时已经内核崩溃了（Kernel Panic），通常是预链接内核相关的问题造成的，尤其是 macOS 很难理解引导工具注入的内容。通过以下步骤验证：

- Kext 加载顺序正确（没错，顺序也是重要的），Lilu.kext 必须、务必，一定排在其它所有 kext 之前；其它 kext，必须先是主插件（如 VirtualSMC），然后是它的卫星插件（如 SuperIO）
- 大部分的 Kext 拥有可执行文件（位于 kext 内部的 Executable），剩下的 Kext 只有 plist 但是没有包含可执行文件（例如 USBPort.kext、XHCI-unspported.kext 等）
- 不要在 config.plist 中添加多个相同的 Kext（例如，VoodooPS2Controller 中包含 VoodooInput，所以不要再单独添加）
- 此类错误也可能会造成 Invalid frame pointer 一类的内核崩溃

### QA-66 Kernel Panic: Invalid frame pointer

```
Kernel Panic: Invalid frame pointer
```

此部分大概率和 Booter → Quirks 相关，此部分主要和内存相关，主要涉及以下几个选项：

**DevirtualiseMmio**

- 部分硬件平台并不能很好的适应这个 Quirk，例如部分 Z390 和绝大部分的 X99 和 X299。它的工作方式是占用 MMIO 区域并删除运行时属性，使它们可用作存放内核的空间，注意这个 Quirk 在绝大部分的系统上并不要求一定要填写 MmioWhiteList，但在某些非常难安装的平台（例如：线程撕裂者 TRX40 19H 或 10300H），在启用此 Quirk 的同时还需设置 MmioWhiteList，使用 Debug 版 OpenCore 并开启 DevirtualiseMmio，你会在日志中找到类似以下内容：

```
21:495 00:009 OCABC: MMIO devirt start
21:499 00:003 OCABC: MMIO devirt 0x60000000 (0x10000 pages, 0x8000000000000001) skip 0
21:503 00:003 OCABC: MMIO devirt 0xFE000000 (0x11 pages, 0x8000000000000001) skip 0
21:506 00:003 OCABC: MMIO devirt 0xFEC00000 (0x1 pages, 0x8000000000000001) skip 0
21:510 00:003 OCABC: MMIO devirt 0xFED00000 (0x1 pages, 0x8000000000000001) skip 0
21:513 00:003 OCABC: MMIO devirt 0xFEE00000 (0x1 pages, 0x800000000000100D) skip 0
21:516 00:003 OCABC: MMIO devirt 0xFF000000 (0x1000 pages, 0x800000000000100D) skip 0
21:520 00:003 OCABC: MMIO devirt end, saved 278608 KB
```

将 devirt 后面的 0x 60000000 等 6 组十六进制数字转换为十进制：

- MMIO devirt 0x60000000 -> 1610612736
- MMIO devirt 0xFE000000 -> 4261412864
- MMIO devirt 0xFEC00000 -> 4273995776
- MMIO devirt 0xFED00000 -> 4275044352
- MMIO devirt 0xFEE00000 -> 4276092928
- MMIO devirt 0xFF000000 -> 4278190080

然后填写到 MmioWhiteList 即可

**SetupVirtualMap**

- 大多数主板都需要开启这个 Quirks，如果没有开启，内核崩溃会很常见；
- 但是，部分主板却无法使用它，并且可能导致内核崩溃：
  - Intel Ice Lake 系列（十代酷睿移动端，例如 1035G1）
  - Intel Comet Lake 系列（十代酷睿桌面端，例如 i5-10400）
  - AMD B550
  - AMD A520
  - AMD TRx40
- 另一个问题可能是 macOS 与 CR0 寄存器的写保护冲突，要解决此问题，需要先确认你的主板是否有 MAT 支持，此部分参考 QA-30；

确定有 MAT 支持时：

- EnableWriteUnprotector -> False
- RebuildAppleMemoryMap -> True
- SyncRuntimePermissions -> True

当没有 MAT 支持时：

- EnableWriteUnprotector -> True
- RebuildAppleMemoryMap -> False
- SyncRuntimePermissions -> False

### QA-67 Kernel Panic: AppleIntelMCEReporter

```
Kernel Panic: AppleIntelMCEReporter
```

在 macOS Catalina 处理器双插槽支持被损坏，但部分 AMD 主板的固件会报告已接入多插槽处理器，因此 macOS 内置的 AppleIntelMCEReporter.kext 会造成内核崩溃。此问题通常出现在 AMD 处理器的机型上，有两种解决办法，添加一个第三方 Kext：AppleMCEReporterDisabler.kext；或编辑 config.plist，使用 Kernel → Block 功能阻止 macOS 加载 AppleIntelMCEReporter.kext（识别符：com.apple.driver.AppleTyMCEDriver，OpenCore 默认配置文件 Sample.plist 中有提供）。

### QA-68 启动时显示 SMCLightSensor alsd: @ No iterator

```
SMCLightSensor alsd: @ No iterator
AppleIntelLpssI2CController::_serviceMatchingTimeSubr: fTimerServiceMatching timed out, fNotifications 0
AppleIntelLpssI2CController::_serviceMatchingTimeSubr: fTimerServiceMatching timed out, fNotifications 0
```

此错误分两个部分，第一部分，LightSensor 没有匹配到可用的光传感器，这可能是你的笔记本没有，或不被支持，可先暂时关闭 SMCLightSensor.kext；第二部分，I2C 服务匹配超时，这可能是 macOS 内置的 I2C 控制程序无法匹配你的设备，解决方法，在 config.plist → Kernel → Block 中添加以下内容，并使用 VoodooI2C.kext 替代：

```
Comment: Prevent Apple I2C kexts from attaching to I2C controllers
Enabled: YES
Identifier: com.apple.driver.AppleIntelLpssI2C

Comment: Prevent Apple I2C kexts from attaching to I2C controllers
Enabled: YES
Identifier: com.apple.driver.AppleIntelLpssI2CController
```

### QA-69 选择 macOS Recovery 后，提示 OCB: LoadImage failed - Not Found 并返回引导界面

```
OCB: LoadImage failed - Not Found
```

修改 config.plist 中 Misc → Security → DmgLoading → Any/Signed，建议修改为 Any。

### QA-70 启动时 Kernel Panic: Kernel Extension in backtrace

```
Kernel Extension in backtrace:
com.apple.iokit.IOPCIFamily(2.9)[ xxxx...
com.apple.driver.AppleACPIPlatform(6.1)[ xxxx...
dependency: com.apple.driver.AppleSMC(3.1.9)[ xxxx...
dependency: com.apple.iokit.IOACPIFamily(1.4)[ xxxx...
dependency: com.apple.iokit.IOPCIFamily(2.9)[ xxxx....
```

可能有多种情况会遇到这个内核崩溃，这里主要讲解 X79 和 X99 平台，起因是苹果在 macOS Big Sur 修改了大部分 IOPCIFamily.kext 中的内容，因此造成的部分机型遭遇内核崩溃。由于目前（2021/6/16） Big Sur 还没有源码放出，如果没有反汇编大佬进行调试，则无从知晓真正的原因。可以考虑解决的办法如下：

- X79/X99/X299 平台务必加上 npci=0x2000 或 npci=0x3000 这个启动参数；
- 尝试 SSDT-RTC0-RANGE.aml 或 SSDT-UNC.aml 这两个 ACPI 补丁，可以从 OC 团队的开发堆栈里找到源文件；

### QA-71 跑码过程中出现禁止符号，然后字符变成乱码

此错误源头和 USB 强相关。首先检查 BIOS 设置：

- 开启 USB XHCI Handoff 和 Legacy USB Support，如果安装到 SATA 接口硬盘，把 SATA 模式设置为 AHCI；

接下来有两种选择：

- 第一种是把 U 盘插到纯 2.0 接口（外观上一般为黑色 4 针）；
- 第二种是先在 Windows 对 USB 接口进行定制，具体原因和方法见「黑苹果 Windows 定制 USB」，完成后使用定制好的 USB 文件再尝试安装；

### QA-72 安装 macOS Big Sur 11.3 及以上版本时，跑完进度条后见到妙控板/妙控鼠标配对界面

此问题的源头来自 macOS 系统本身。苹果自 macOS Big Sur 11.3 开始修改了 USB 映射方式，导致 OpenCore 依赖的 Quirks 特性 XhciLimitPort 失效（Clover 自 r5123 开始完全是 OC 内核，因此同理）。截止 OpenCore 0.8.6 开发版，Acidanthera 团队仍未修复，估计也不太可能修复了。

简单来说，就是此时 macOS 没有找到任何键盘/鼠标/妙控板等操控设备，它以为自己运行在白苹果电脑上，于是提示用户打开秒控鼠标/妙控板的开关。至于没有检测到的原因就说来话长了，具体可参考「黑苹果 Windows 定制 USB」的前言部分。

### QA-73 启动时显示 ifnet_attach: All kernel threads created for interface en0

```
ifnet_attach: All kernel threads created for interface en0 have been scheduled at least once. Proceeding.
_dlil_attach_flowswitch_nexus: en0 9000 1500
IOKit Daemon (kernelmanagerd) stall[0], (240s): 'PXSX'
```

通常情况下，此情况会出现在安装 macOS Big Sur，问题的源头是因为 Big Sur 完全删除了类 AirPortBrcm4360，为了兼容这个情况，acidanthera 团队从 Airportbrcmfixup.kext 中单独剔出了AirPortBrcm4360 和 AirPortBrcmNIC 注入器，在安装 Big Sur 并使用 Airportbrcmfixup.kext 时，必须不能加载 AirPortBrcm4360_Injector.kext（或为其设置 MaxKernel 值 19.9.9）。

如果你的无线博通网卡是免驱动类型时（例如奋威 T919 或型号较新的苹果原装拆机卡），则完全不需要使用 Airportbrcmfixup.kext。

### QA-74 关于 macOS 12.0 Monterey 的无线和蓝牙驱动

macOS Monterey 12.0 大幅修改了蓝牙和无线网卡的驱动框架，一是因为抛弃了 2015 年以前推出的机型支持，二是为通用控制做准备。虽然黑苹果老卡可以通过第三方驱动得到支持，但是在设置上和以往有一些区别。简单来说就是以下几点：

- 除免驱卡外（例如奋威 T919 或其它型号较新的苹果原装拆机卡），必须使用新驱动 BlueToolFixup.kext；
- 蓝牙驱动 BrcmPatchRAM 中的注入器（BrcmBluetoothInjector.kext），不能在 12.0 中启用，会卡住。可以删除或不启用，如果你有切换多个版本系统的需求，OpenCore 还可设置 MaxKernel 值 20.99.99 ，Clover 则需要建立不同版本号的 Kext 目录下的文件夹；
- 英特尔网卡，需要将 IntelBluetoothFirmware 升级到最新，同样不能使用 IntelBluetoothInjector.kext；
- 其它可参考「修复蓝牙在 macOS 12.0 Monterey 的方法」；

### QA-75 如何关闭 OpenCore 输出到 ESP 分区下的日志文件？

修改 config.plist：

- Misc→Debug→Target→ 0

说明：

- 0：关闭日志记录
- 3：允许屏幕输出日志
- 19：允许屏幕输出 UEFI 变量日志
- 65：在 ESP 分区根目录生成日志文件 opencore-年-月-日-时分秒.txt，但屏幕上不显示日志

### QA-76 macOS 安装界面是俄语？

修改 config.plist：

- NVRAM → 7C436110-AB2A-4BBB-A880-FE41995C9F82 → prev-lang:kbd

改类型为 data 值，内容为 7A682D48 616E773A 323532

或类型为 string 值，内容为 zh-Hans:252

### QA-77 硬盘提示 BIError Domain 3

修改 config.plist：

- SMBIOS 改机型为 iMacPro1,1 或 MacBookPro16,1 等 2018年及以后的机型。

### QA-78 卡在"找不到安装器资源"？

这个问题的原因可能是多种多样的：

- 检查镜像的 md5 值是否相符
- 某些版本的镜像是特定机型使用的，例如 Catalina 19H4 就是特定机型版本，此类情况请更换镜像系统版本
- 对于 High Sierra 和 Mojave，需要使用终端修改时间，并断开网络
- 对于 Catalina，请用终端验证一下系统时间是否和真实时间相差 8 小时，如果是，使用终端改为真实时间
- 删除 drivers/UEFI 目录下的 EmuVariableUefi.efi（此项针对 Clover 用户）
- 修改机型为最近三年，比如 MacBookPro14,1、MacBookPro15,1、iMac17,1 等等
- 如果是双硬盘，拔掉那个不安装 macOS 的，待安装完后再插回去

### QA-79 进入安装界面后，找不到硬盘

此问题大多数情况下是因为使用了 VBoxHfs.efi，这个驱动在某些机型上（主要是笔记本和品牌台式机）无法读取本地硬盘，解决方法是换用 HFSPlus.efi。另一种可能，请检查硬盘是否处在 RAID 模式，RAID 状态无法正常安装 macOS。

### QA-80 进入 macOS 后，无法挂载 EFI 分区，无论使用命令行或配置工具都不行

笔者曾经遇到过这个问题，在试过无数方法后，发现是格式化硬盘的时候忘记格式化 ESP 分区😂，请用命令行或 Diskgenuis 等工具格式化 ESP 分区为 FAT32 即解决问题。

### QA-81 首次安装跑完代码界面后，进入一个灰色的屏幕，鼠标可以移动，但是其它什么都不显示

笔者在安装 Big Sur 时遇到过这个问题。首先确保排除所有 config 设置及 kext 可能的问题：主要是针对内存设置的几个 Quirks；核显的 ig-platform-id 及其它属性先删除或屏蔽；以及尝试搭配使用不同版本的 Whatevergreen.kext。以笔者遇到的例子，最终排查结果如下：这个没有任何菜单和选项的灰色界面，其实是 Recovery 模式下 macOS Base System 的第二屏幕显示的内容，这个时候尝试重新插拔一下你的显示器接口，如果你有其他显示设备，可以尝试再接一个上去完成安装。对于 macOS，首推使用 DisplayPort 接口，1.2 及以上；其次是 HDMI，4k 需要 2.0 及以上；不推荐 DVI 接口；完全不建议使用 VGA 接口以及各类转接头。

### QA-82 升级到 Big Sur beta 11.0.1 后，右上角图标栏有大约三个图标的空白

在此案例中，是搜狗输入法未能很好适配 Big Sur 造成的，升级搜狗输入法到最新版本可解决问题。

### QA-83 反复检查，设置都对，但 macOS 就是一直黑屏

此现象有多种原因。在 AMD 平台的案例中，请在 BIOS 中关闭 Serial Port。

### QA-84 进入登陆界面后，macOS 卡住，屏幕中间显示一个半透明状态 ⊘ 图标

此问题一般由不同步的处理器 TSC 造成，对于大部分处理器，添加 CpuTscSync 一类的 Kext 即可解决问题（VoodooTSCSync 或 CpuTscSync）。

### QA-86 OpenCore 更新到 0.6.8 之后，主题失效，还有系统选择界面光标"打滑"怎么办？

**第一部分主题失效：**

是因为开发团队大刀阔斧修改了主题服务文件，需要搭配新的主题文件才能开启图形界面，可以从官方下载也可以下载黑苹果星球打包好的文件：

- 下载 OpenCore Package，适用于 0.6.7 及以前版本，提取码：xr61
- 下载 OpenCore 0.6.8 官方主题文件包，适用于 0.6.8-0.6.9，提取码：azjc
- 下载 OpenCore 0.7.0 官方主题文件包，适用于 0.7.0 及以上，提取码：1hbh

将解压后的 Resources 文件夹覆盖到 /EFI/OC/ 目录下的同名文件夹。其它语音辅助文件因体积过大且并非中文，已删除。

将解压后的 Resources 文件夹覆盖到 /EFI/OC/ 目录下的同名文件夹。OpenCore 0.7.0 需要将 PickerVariant 输入为 Acidanthera\GoldenGate 或其它你下载的主题名称。

**第二部分主题界面光标"打滑"现象：**

修改以下选项即可解决。

### QA-87 进入安装程序后，在安装界面弹出"未能安装所需的固件更新"

主要出现在安装 macOS Monterey 12.x 的过程中，有两种解决方法：

- 第一，修改 config.plist 文件 → PlatformInfo → Generic → AdviseFeatures → 修改为 True/勾选；
- 如果第一种方法无效，第二种方法是升级 OpenCore 的版本，安装 12.0.1 建议 OpenCore 从 0.7.4 起步，升级可参考「升级引导工具的方法」；

### QA-88 OC:configuration requires vault but no vault provided

1. 建议用 ProperTree 或其他编辑 config，OpenCore 的文件结构变化很快，OpenCore Configurator.app 不能完全跟上
2. Misc - 其他设置 Security 下 — Vault 设置成 Optional
3. 新的 OC config 中，Vault 属性代替 RequireSignature 和 RequireVault，如果你的是老版本还有 RequireSignature 和 RequireVault，请把这两项设置为 False 禁用

### QA-89 OCS: No schema for xxxxx at xx index!

使用 ProperTree.app 或者 Xcode.app 打开 config.plist 配置文件，找到 for xxxxx at 中间的 xxxxx 名称。直接删除即可。

### QA-90 OCB：OcScanForBootEntries failure - Not Found Halting on critical error

修改 config.plist：

- Misc → Security → ScanPolicy → 0

### QA-91 This version of Mac OS X is not supported on this platform!

```
*********************************************************
This version of Mac OS X is not supported on this platform!
*********************************************************
Reason: Mac-F221BEC8
Sleeping for 30 seconds before exiting...
```

该问题一般属于设置的模拟机型不支持当前系统版本，出现该问题一般启动参数为："-v keepsyms=1"

1. 启动参数改为："debug=0x100 npci=0x2000 agdpmod=pikera"
2. 修改仿冒机型的设置，至于如何选择，建议选择与自己处理器相近的即可。如你的处理器是 i7，模拟的机型的处理器也选择 i7 的
3. 关于机型的选择，还要注意一个点，因为选择较老的仿冒机型会导致这个情况，所以在选择仿冒机型的时候，特别是目前新版的 mac 系统，建议选最新的仿冒机型，选择后设置正确的三码

### QA-92 [EB|`B:WFDW] Err(0xE)

```
[EB|`B:WFDW] Err(0xE), 0 @ LocHB 71B4903C-14EC-42C4-BDC6-CE1449930E49
[EB|#LOG:DT] 2020-03-09T09:40:46
[EB|#LOG:EXITBS:START] 2020-03-09T09:40:46
```

**注：**

- 如果是奔腾赛扬处理器卡这里，就需要仿冒 CPU，按照这个方式操作：https://imacos.top/2023/09/23/0303-2/
- 如果是 AMD 的 CPU，内核补丁不正确也会导致此问题，可参考此文处理 https://github.com/AMD-OSX/AMD_Vanilla

1. config.plist → UEFI → Quirks → IgnoreInvalidFlexRatio → True/YES
2. 如果 1 中已经启用，还是卡这里，则需要启用 config.plist → Kernel → Quirks → AppleCpuPmCfgLock/AppleXcpmCfgLock → True/YES
3. 如果 1 与 2 中都尝试了，依然还未解决，就一定要检查 Bios 设置 CFG Lock(MSR 0xE2 write protection)～CFG 锁（MSR 0xE2 写保护）（必须关闭，如果此项有，部分机型即使在 Kernel→ Quirks 下启用它，依然还是会卡上图的地方）
4. 再补充一个方法，config.plist → Booter→ Quirks → SetupVirtualMap（将此项禁用关闭）

### QA-93 ** In Memory Panic Stackshot Succeeded ** 或 MACH Reboot

```
** In Memory Panic Stackshot Succeeded **
Bytes Traced xxxxx
** Attenmpting system restart. . . MACH Reboot
```

（或者是到下图界面直接重启了）

1. 该情况属于用的是 OpenCore-0.5.7 版本的引导，0.5.7 版本中的部分 .efi 驱动已经更改了名称（FWRuntimeService.efi 更名为 OpenRuntime.efi、AppleUsbKbDxe.efi 更名为 OpenUsbKbDxe.efi、BootLiquor.efi 更名为 OpenCanopy.efi），一般更新一下 .efi 驱动就可以，更新驱动后，不要忘记配置你的 config.plist
2. 如果排除了以上 1 的情况，则设置 config.plist → Kernel → Quirks → AppleCpuPmCfgLock/AppleXcpmCfgLock → True/YES
3. 在 config.plist 添加阻止补丁 → DeviceProperties → Block → PciRoot(0x0)/Pci(0x1b,0x0)→ MaximumBootBeepVolume

**注意：如果你电脑是 12 代及以上 CPU，检查 CPU 的大小核设置**

**CPU：P 核和 E 核**

尝试使用以下任一配置，看看哪种配置最适合您的工作流程：

**选项 1：** 启用所有 P 核、所有 E 核和超线程。由于 P 核的 L3 和内存性能较低，Ring Clock 频率将为 3.6 GHz，对 CPU 性能的影响不超过 6% 。整体多线程性能会更好。

**选项 2：** 仅启用 P 核和超线程。环形时钟频率将为 4.7 GHz。整体多线程性能会降低。

这两个选项都可以通过 Alder Lake Overclocking 进行优化。环形时钟和 CPU 时钟是分开的。

因此在 BIOS > Advanced CPU Settings 中进行相应的配置：

**选项 1：** 所有内核，所有线程

- 超线程 → 启用
- 所有 P 核和 E 核 → 已启用

**选项 2：** 仅 P 核和超线程

- 超线程 → 启用
- CPU 内核启用模式 → 可选模式
- CPU 核心启用模式 →（启用所有 P 核心并禁用所有 E 核心）

**以下为更新的解决方案：**

如果上述的方式解决不了你的问题，该错误也有可能是你的 kext 驱动加载的问题，建议把 kext 的驱动除了必备的，其他的都删除。

### QA-94 OC: Driver xxxxxxxx.efi at 3 cannot be started Already started! Halting on critical error

```
0C: Driver xxxxxxxx.efi at 3 cannot be started Already started!
Halting on critical error
```

这个错误就简单了。图片中都提示是 AptioMemoryFix.efi，找到你对应的 xxxxxx.efi 删除即可

### QA-95 OC: Image KextsVoodooPS2Controller.kext is missing

```
0C: Inage KextsVoodooPS2Controller kextVContentsMacDSVoodooPS2Trackpad is missing for kext xxxxxxxx.kext
Halting on critical error
```

图中的显示已经非常明显，就是 VoodooPS2Controller.kext 的问题，最简单的方式就是删除 xxxxxxxx.kext 驱动，以及删除 config.plist 配置 xxxxxxxx.kext 驱动即可

### QA-96 AppleIntelCPUPowerManagement :Turbo Ratios 或 RTC..., PCI Configuration Begins

```
AppleIntelCPUPowerManagement :Turbo Ratios 0079
pci (buconsole relocated to 8xf8000000
[ pci configuration end , bridges 4 , devices 12 ]
SMCSuper IO ssio: @ starting up Super IO sensors
SMCSuper IO ssio: @ failed to detect supported Super IO chip
```

或者是 RTC..., PCI Configuration Begins, Previous Shutdown..., HPET, HID: Legacy... 也适用

一般是配置 PCI 设备的地方，要检查以下几个地方：

1. 缺少 SSDT-EC 补丁：对于桌面级电脑，请确保在 EFI / OC / ACPI 和 config.plist/ACPI 中都具有 SSDT-EC → 添加，再次检查是否已启用，如果你没有该 SSDT-EC，可以点击这里下载一个。笔记本电脑用户将需要重新命名他们的主要 EC 名称（例如：SSDT-EC-USBX 中的 EC 需要修改为 EC0 或 H_EC）
   另外，只要是卡在 PCI 附近，也检测一下其他的 SSDT 补丁，部分电脑加载了与自己电脑兼容不好的 SSDT 补丁也会出现这种情况。
2. IRQ 冲突：在较旧的笔记本电脑和定制笔记本电脑上最常见，运行 SSDTTime 的 FixHPET 选项，然后将生成的 SSDT-HPET.aml 和 ACPI 补丁添加到您的配置中（没有 ACPI 补丁，SSDT 将无法工作）
3. PCI 分配问题：更新您的 BIOS，确保它是最新的。大多数 OEM 在较旧的固件上的 PCI 分配都非常差，确保在 BIOS 中启用了 Above4GDecoding，如果没有可用的选项，则添加到引导 args。引导参数中未同时启用 Above4G 设置和 npci，它们将发生冲突 npci=0x2000。其他重要的 BIOS 设置：已禁用 CSM，已启用 Windows 8.1 / 10 UEFI 模式

### QA-97 [ PCI configuration begin ] 或 AppleNVMe Assert failed

```
[ PCI configuration begin ]
console relocated to 0x7f80000000
[ PCI configuration end , bridges 6, devices14]
AppleNVMe Assert failed:( 0 != data )Release file:/AppleInternal/BuildRoot/Library/Caches/
amily/ IONVMeFamily-470.100.17/ IONVMeController.cpp line: 5478
virtual IOReturn IONVMeController : :CreateSubmissionQueue(uint16_ t. uint8_ t): :2861 :SQ index=0 entrysi
virtual. IOReturn IONVMeControler : :CreateSubmissionQueue(uint16_ t. uint8_ t): :2861:SQ index=1 entrysi
apfs_module_start: 1689: load: com.apple.filesystems.apfs, v1412.101.1, apfs-1412. 101.1, 2020/03/06
```

解决方案同 QA-96

### QA-98 卡 no vault provided!

通过将 config.plist 设置为以下来关闭 config.plist 中的文件库：Misc → Security → Vault

如果您已经执行了，还是同样错误，你将需要更新使用 Opencore.efi 文件

### QA-99 卡 OC: Invalid Vault mode

这可能是一个拼写错误，在的 OpenCore 选项区分 sensitve 所以一定要仔细检查，Misc → Security

### QA-100 卡在 EndRandomSeed 上

几个问题：

1. ProvideConsoleGop 可能会丢失，因为这是过渡到下一个屏幕所需的内容，它最初是 AptioMemoryFix 的一部分，但由于此问题现在已在 OpenCore 中。可以在 UEFI → Output 下找到
2. 缺少内核补丁程序（仅适用于 AMD CPU，确保它们是 Opencore 补丁而不是 Clover。Clover 使用 MatchOS，而 OpenCore 使用 MinKernel 和 Maxkernel）
3. IgnoreInvalidFlexRatio 缺失，这对于 Broadwell 和更老的机型是必需的。不适用于 AMD 和 Skylake 或更高版本
4. AppleXcpmExtraMsrs 可能需要，这通常意味着奔腾，HEDT 和其他少数系统。不要在 AMD 上使用

另一个可能的问题是，某些用户忘记了或无法在 BIOS 中禁用 CFG-Lock（特别是与用于电源管理的 0xE2 MSR 锁定位有关，显然更安全的是关闭 CFG-Lock）。请注意，这仅适用于 Intel 用户，不适用于 AMD。发生这种情况时，有几个可能的解决方法：

1. 固定 CFG 锁 (之后更新方法)
2. 启用 AppleXcpmCfgLock 和 AppleCpuPmCfgLock，这将分别禁用 XNU 和 appleintelcpupowermangment 中的 PKG_CST_CNFIG_ 控件。不推荐长期解决方案，因为这会导致不稳定。

另一个可能的问题是 IRQ 冲突，Clover 有许多不同的修复程序，无需直接设置它们便可以应用。幸运的是，从四叶草转换为 OpenCore 的过程更加困难，尽管 CorpNewt 也修复了问题：SSDTTime 的 FixHPET 选项

### QA-101 看不到 macOS 分区

要检查的主要内容：

1. **ScanPolicy 设置** - 将 Misc → Security → ScanPolicy 设置为 0，以显示所有驱动器
2. **固件驱动程序** - 确保拥有适当的固件驱动程序，例如 ApfsDriverLoader 和 HfsPlus（或 VBoxHfs）
3. **网络恢复安装** - 如果正在运行网络恢复安装，则启用 AvoidHighAlloc

### QA-102 选择 OpenCore 引导后黑屏

**问题原因：** 缺少 ConsoleGOP

**解决方法：** 在您的配置下启用它：
- UEFI → Output → ProvideConsoleGOP → True/Yes

**如果这没有帮助：** 用调试版的 OpenCore.efi 和 BOOTx64.efi，并在你的 EFI 中取代它们。这将显示有关您实际卡住位置的更多信息。

### QA-103 OC: OcAppleGenericInput... - Success

**说明：** 这实际上不是错误，相反，OpenCore 不会向您显示所有调试信息。这是在内核加载之前/之时。

**需要检查以下内容：**

1. **Intel 处理器：**
   - CFG 锁在 BIOS 中禁用
   - 或在 Kernel → Quirks 中启用 AppleCpuPmCfgLock 和 AppleXcpmCfgLock

2. **AMD 处理器：**
   - 验证是否已将正确的内核补丁添加到配置中（记住，OpenCore 补丁使用 MinKernel 和 MaxKernel，而 Clover 使用 MatchOS）
     - Ryzen/Threadripper(17h)
     - Bulldozer/Jaguar(15h/16h)

**如果这没有帮助：** 获取 OpenCore.efi 和 BOOTx64.efi 的调试版本，并在 EFI 中替换它们。这将显示更多的信息，您实际上是在哪里卡住。

### QA-104 OCB: failed to match a default boot option

**解决方法：** 与 OCB: OcScanForBootEntries failure - Not Found 相同

OpenCore 找不到任何具有当前扫描策略的驱动器，设置为 0 将允许显示所有启动选项：
- Misc → Security → ScanPolicy → 0

### QA-105 OCABC: Memory pool allocation failure - Not Found

**问题原因：** 这是由于不正确的 BIOS 设置和/或不正确的引导程序 Quirks 值造成的

**解决方法：**

1. 确保 config.plist → Booter → Quirks 设置正确
2. 验证 BIOS 设置：
   - 启用 Above 4G Decoding
   - 禁用 CSM（在某些板上启用 Windows 8.1/10 WHQL 模式也可以这样做）

### QA-106 OCS: No schema for DSDT, KernelAndKextPatch, RtVariable, SMBIOS, SystemParameters...

**问题原因：** 这是因为要么使用一个带有 OpenCore 的 Clover 配置，要么使用一个配置器，比如 Mackie 的 Clover 和 OpenCore 配置器。

**解决方法：**
- 您需要重新开始并进行新的配置
- 或者找出需要从配置中移除的所有不需要的项目

### QA-107 OC: Driver XXX.efi at 0 cannot be found

**解决方法：** 确认您的 EFI/OC/Drivers 驱动程序与 config.plist → UEFI → Drivers 驱动程序匹配

### QA-108 Buffer Too Small

**解决方法：**

1. UEFI → Quirks → AvoidHighAlloc → Enable
2. 在 BIOS 中启用 Above4GDecoding

### QA-109 Plist only kext has CFBundleExecutable key

**问题原因：** 缺少或不正确的可执行路径（Executable path）

**还有一种情况：** 当一个值不应该是实数时，它被设置为实数。通常是 Xcode 意外地转换了 HaltLevel：

**错误的：**
```xml
<key>HaltLevel</key>
<real>2147483648</real>
```

**修正为：**
```xml
<key>HaltLevel</key>
<integer>2147483648</integer>
```

### QA-110 OpenCore 上选择 macOS 分区后卡住

**Intel 用户：** CFG Lock not off

有两种解决方案：

1. 修补 MSR E2（推荐的解决方案）
2. 启用 AppleXcpmCfgLock 和 AppleCpuPmCfgLock，这将在 XNU 和 AppleIntelCPUPowerManagement 中分别禁用 PKG_CST_CNFIG_控件。不推荐长期解决方案，因为这会导致不稳定。

**AMD 用户：** AMD 内核补丁程序无法工作

- 过期或丢失的内核补丁程序

### QA-111 无法在 OpenCore 引导界面选择器中选择任何内容

**问题原因：** 不兼容的键盘驱动程序

**解决方法：**

**方法一：**
1. 禁用 PollAppleHotKeys 并启用 KeySupport
2. 然后从 config.plist → UEFI → Drivers 中删除 OpenUsbKbDxe

**方法二：**（如果上面的方法不起作用）
1. 禁用 KeySupport
2. 然后将 OpenUsbKbDxe 添加到 config.plist → UEFI → Drivers

### QA-112 This version of Mac OS X is not supported: Reason Mac...

**问题原因：** 当 SMBIOS 不再受该版本 macOS 支持时，会发生此错误

**解决方法：** 请确保在 PlatformInfo → Generic 中设置值并启用自动

**支持的 SMBIOS：**
- iMac13,x+
- iMacPro1,1
- MacPro6,1+
- MacBook8,1+
- MacBookAir5,x+
- MacBookPro9,x+

### QA-113 Couldn't allocate runtime area errors?

**解决方法：** 固定 kaslide 值

### QA-114 SSDTs not being added

**问题原因：** 在 OpenCore 中，在 ACPI 文件周围添加了一些额外的安全检查，特别是表长度头必须等于文件大小。这实际上是 iASL 在编译文件时的错误。

**如何找到它？**

示例：
```
* Original Table Header: *
Signature "SSDT"
Length 0x0000015D (349)
Revision 0x02
Checksum 0xCF
OEM ID "ACDT"
OEM Table ID "SsdtEC"
OEM Revision 0x00001000 (4096)
Compiler ID "INTL"
Compiler Version 0x20190509 (538510601)
```

长度和校验和值是我们关心的，所以如果 SSDT 实际上是 347 字节，那么我们希望将长度更改为 0x0000015B（347）（015B 是十六进制的）。

**解决方法：**
- 获取一个新的 iASL 或 acidathera 的 maciASL 副本
- 重新创建 SSDT

### QA-115 OpenCore 引导后重新引导到 BIOS

**问题原因：** EFI 文件夹结构不正确

**解决方法：** 请确保所有 OC 文件都位于 ESP（EFI 系统分区）上的 EFI 文件夹中

### QA-116 RTC..., PCI Configuration Begins, Previous Shutdown..., HPET, HID: Legacy...

**问题说明：** 这个一般领域是很多 PCI 设备配置的地方，也是 AMD 黑客的大多数引导问题发生的地方。

**主要检查以下点：**

1. **缺少 EC 修补程序：**
   - 对于桌面级电脑，确保您的 EC SSDT 都在 EFI/OC/ACPI 和 ACPI → Add 中，仔细检查它是否已启用
   - 注：笔记本电脑用户需要重新命名为自己机型 EC 名称

2. **IRQ 冲突：**
   - 在较旧的笔记本电脑和预制笔记本电脑上最常见
   - 请运行 SSDTTime 的 FixHPET 选项
   - 然后将生成的 SSDT-HPET.aml 和 ACPI 补丁添加到您的配置中（如果没有 ACPI 补丁，SSDT 将无法工作）

3. **PCI 分配问题：**
   - 更新你的 BIOS，确保它是最新的。大多数原始设备制造商在较旧的固件上的 PCI 分配都非常糟糕
   - 确保在 BIOS 中启用了 Above 4G Decoding
   - 如果没有可用的选项，则将 npci=0x2000 添加到引导参数
   - 如果启动参数中没有同时启用 Above 4G 设置和 npci，它们将发生冲突

**其他重要的 BIOS 设置：**
- 禁用 CSM
- 启用 Windows 8.1/10 UEFI 模式

### QA-117 "Waiting for Root Device" or Prohibited Sign error

**问题原因：** 通常被视为 USB 错误

**解决方法：**

**方法一：** 如果达到 15 端口限制，可以暂时解决此问题，但长期使用，我们建议您定制自己的 USB

**方法二：** 某些固件无法将 USB 所有权转让给 macOS
- 要解决此问题，我们可以启用 ReleaseUsbOwnership（四叶草等效为 FixOwnership）

### QA-118 macOS installer in Russian（macOS 安装界面是俄语）

**解决方法：**

请检查：
- NVRAM → Add → 7C436110-AB2A-4BBB-A880-FE41995C9F82 → prev-lang:kbd

**可能还需要在启动选择器中重置 NVRAM**

**还是没用？** 我们将强制删除该确切属性，然后让 OpenCore 重建它：
- NVRAM → Block → 7C436110-AB2A-4BBB-A880-FE41995C9F82 → Item 0
- 然后设置 Type String 和 Value prev-lang:kbd

### QA-119 macOS Installer being damaged（macOS 安装程序损坏）

**解决方法：**

1. 下载 macOS 的最新版本安装
2. 如果你想安装当前版本，建议将终端中的日期更改为证书有效的日期
3. 这需要你断开所有网络设备的连接（以太网，禁用 Wifi）
4. 在终端中设置时间：`date 0901000019`

参考：[提示：安装 macOS xxxx 应用程序副本已损坏，不能用来安装 Mac OS，应用程序副本不能验证 它在下载过程中可能已遭破坏或篡改](https://imacos.top/2019/11/03/1255/)

### QA-120 卡在或附近 IOConsoleUsers: gIOScreenLock...

**解决方法：** 在正确初始化 GPU 之前，请确认以下各项：

1. GPU 支持 UEFI（GTX 7XX / 2013+）
2. CSM 在 BIOS 中关闭
3. 强制 PCIe 3.0 链接速度

### QA-121 IOConsoleUsers: gIOScreenLock... 之后黑屏

**解决方法：**

1. 添加到启动参数 agdpmod=pikera
2. 在不同的显示输出之间切换

### QA-122 300 系列 Intel 卡 apfs_module_start...

**问题原因：** 通常是由于系统运行的是 AWAC clocks，需要 SSDT

**解决方法：** 请参阅" ACPI 入门"部分

### QA-123 apfs_module_start..., Waiting for Root device, Waiting on...IOResources..., previous shutdown cause...

**说明：** Catalina 系统一版会卡在这里

**解决方法：** 确认您的 EC SSDT 已启用，并且适合您的系统

### QA-124 内核崩溃：Cannot perform kext summary

**问题原因：** 通常，这被视为围绕预链接内核的问题，特别是 macOS 很难解释我们注入的内核。

**解决方法：** 验证您的 kext 顺序正确（先是主插件，然后是插件，Lilu 始终是第一位）

### QA-125 内核崩溃：AppleIntelMCEReporter

**问题说明：** 使用 macOS Catalina 时，双插槽支持被打破了，有关 AMD 固件的有趣事实是某些主板实际上会报告多个插槽 CPU。

**解决方法：**

有两种解决办法：
1. 添加第三方 Kext：AppleMCEReporterDisabler.kext
2. 或编辑 config.plist，使用 Kernel → Block 功能阻止 macOS 加载 AppleIntelMCEReporter.kext（识别符：com.apple.driver.AppleTyMCEDriver，OpenCore 默认配置文件 Sample.plist 中有提供）

### QA-126 内核崩溃：AppleIntelCPUPowerManagement

**问题原因：** 这可能是由于 NullCPUPowerManagement 错误或完全丢失了，AMD OSX 的 Vanilla Guide 上托管的 NullCPUPowerManagement 已损坏。

**解决方法：**
1. 从 Kernel → Add 和 EFI/OC/Kexts 中删除 NullCPUPowerManagement
2. 然后在 Kernel → Quirks 下启用 DummyPowerManagement

### QA-127 000011.291605 HSP3@14300000:AppleUSBHostPort::disconnect:persistent enumeration failures

**错误信息示例：**
```
000011.291605 HSP3@14300000:AppleUSBHostPort::disconnect:persistent enumeration failures
000013.383217 HSP4@14400000:AppleUSBHostPort::disconnect:persistent enumeration failures
```

**问题说明：** 带有损坏文本的禁止图标、标志（仍在等待根设备）

**问题原因：** 在苹果操作系统 10.11 El-Capitan 上，苹果规定了 15 个 USB 端口的限制。

**解决方法：**

1. **短期解决：** 将 U 盘插到其他 USB 端口
2. **长期解决：** 创建一个 USB 定制，包括我们想要的端口，并剔除我们不关心的额外功能
   - 安装阶段：设置 Kernel → Quirks → XhciPortLimit → Enabled
   - 后期安装：制作一个映射（因为端口限制修补程序不能保证与未来版本的 macOS 一起使用）
3. 删除关于 USB 的驱动，例如 SSDT-EC-USBX.aml 或关于 USB 的 .kext 驱动。删除后不要忘记配置 config.plist 配置文件
4. 对于 15h 和 16h AMD CPU，您可能需要添加：XLNCUSBFix.kext
5. 如果 XLNCUSBFix 仍然不起作用，请尝试 AMD StopSign-fixv5

### QA-128 30 秒后冻结在 macOS 安装程序中

**问题原因：** 这很可能是由于 NullCPUPowerManagement 的错误或完全缺失，AMD OSX 的 Vanilla Guide 上托管的 NullCPUPowerManagement 已损坏。

**解决方法：**
1. 从 Kernel → Add 和 EFI/OC/Kexts 中删除 NullCPUPowerManagement
2. 然后在 Kernel → Quirks 下启用 DummyPowerManagement

### QA-129 macOS 登录界面输入密码后立即卡住冻结

**问题原因：** 这是一个常见的错误的 TSC 例子

**解决方法：**

**对于大多数系统：** 添加 VoodooTSCSync

**对于 Skylake-X：**
- 包括华硕（Asus）和 EVGA 在内的许多硬件不会向所有内核写入数据
- 所以我们需要在冷启动时重置 TSC，然后用 TSCAdjustReset 唤醒
- 编译版本可以在这里找到：TSCAdjustReset.kext
- 注意：您必须打开 kext（finder 中的 ShowPackageContents，Contents → Info.plist）
- 并将 Info.plist → IOKitPersonalities → IOPropertyMatch → IOCPUNumber 更改为从 0 开始的 CPU 线程数
  - 例如：i9 7980xe 18 core 将为 35，因为它总共有 36 个线程

### QA-130 AppleLMUController::smcReadKey Error:received error 0×84 when reading key 'MSLD'

**问题原因：** 该问题一般是你用了多余的 SSDT 导致

**解决方法：** 清理你不用的 SSDT，例如：
- 删除 SSDT-ALS0.aml
- 删除 SSDT-RTC0.aml
- 删除 SSDT-SBUS-MCHC.aml

### QA-131 IOConsoleUsers: time(0) 0 → 0, lin 0, llk 1, IOConsoleUsers: gIOScreenLockState 3, hs 0, bs 0, now 0, sm 0x0

**问题原因：** 显卡识别问题

**解决方法：**

1. 检查你的显卡 PCI 设备地址是否正确
2. 检查显卡仿冒的 ID 是否输入正确
   - 注意：如果遇到该错误，显卡仿冒的 ID 建议填写 8 位数，例如 78563412

3. 确认显卡仿冒的 ID 没问题后，检查以下这几项参数是否需要增加或者修改：
   - DeviceProperties → Add → PciRoot(0x0)/Pci(0x2,0x0)
   - NVRAM → Add → 7C436110-AB2A-4BBB-A880-FE41995C9F82
   - 注：如果是自己的引导只是版本升级的时候遇到这个问题，可直接使用原版本下的 DeviceProperties 与 NVRAM

### QA-132 [EB|`WL:PWLFRTC] ! @ RTC:R

**错误信息示例：**
```
[EB|`WL:PWLFRTC] ! @ RTC:R
[EB|`WL:DT] Err(0xE) @ WL:PWLFRTC
……
[EB|`LD:LKC] BPDK -> (System\Library\PrelinkedKernels\prelinkedkernel.development)
[EB|`LD:OFS] Err(0xE) @ OPEN (System\Library\PrelinkedKernels\prelinkedkernel.development)
[EB|`LD:LKC] BPDK -> (System\Library\PrelinkedKernels\prelinkedkernel)
……
[EB|#LOG:EXITBS:START] 2020-03-25T12:23:15
```

**解决方法：**
1. 升级 OC 版本
2. 升级后，将 Config → Misc → Debug → DisplayLevel 从默认的 2147483650 改为 0
3. 同时，检查与 CFG Lock 相关的 3 项勾选

### QA-133 [EB|`WL:PWLFRTC] ! @ RTC:R [EB|`WL:DT] Err(0xE) @ WL:PWLFRTC

**错误信息示例：**
```
[EB|`WL:PWLFRTC] ! @ RTC:R
[EB|`WL:DT] Err(0xE) @ WL:PWLFRTC
[EB|`LD:LKC] BPDK -> (System\Library\PrelinkedKernels\prelinkedkernel.development)
[EB|`LD:OFS] Err(0xE) @ OPEN (System\Library\PrelinkedKernels\prelinkedkernel.development)
[EB|`LD:LKC] BPDK，！R -> (System\Library\PrelinkedKernels\prelinkedkernel)
Halting on critical error
```

**问题原因：** 该问题一般是你的 EFI/OC/Kexts 驱动文件与你的 config.plist → Kernel → Add 中配置文件不匹配

**解决方法：** 检查你的 .kext 驱动与 config.plist → Kernel → Add 中配置匹配

### QA-134 [EB|`LD:LKC] BPDK -> (System\Library\PrelinkedKernels\prelinkedkernl.development)

**错误信息示例：**
```
[EB|`LD:LKC] BPDK -> (System\Library\PrelinkedKernels\prelinkedkernl.development)
[EB|`LD:OFS] Err(0xE) @ OPEN (System\Library\PrelinkedKernels\prelinkedkernl.development)
[EB|`LD:LKC] BPDK，！R -> (System\Library\PrelinkedKernels\prelinkedkernl)
[EB|`LD:LKFS] } 0K(0)
[EB|`LD:LKC] } 0K(0)
```

**解决方法：** 检查几项是否勾选：
- Config → Kernel → Quirks → AppleCpuPmCfgLock
- Config → Kernel → Quirks → AppleXcpmCfgLock
- Config → UEFI → Quirks → IgnoreInvalidFlexRatio

### QA-135 OCB: StartImage failed - Already started

**错误信息：**
```
OCB: StartImage failed - Already started
Halting on critical error
```

**问题原因：** 该问题是选择引导后，默认进到 EFI 分区，没有进入到安装 U 盘或 Mac 系统盘

**解决方法：**
- Config → Misc → Boot → HideSelf 和 Config → Misc → Boot → ShowPicker 启用
- 调试期间 Config → Misc → Boot → Timeout 此项建议值设置为 10～30 秒左右，有充足的时间选择所需要进入的盘

### QA-136 系统安装进入后，关于本机处无法显示序列号或者序列号不可用

**解决方法：**
- Config.plist → Kernel → Quirks → CustomSMBIOSGuid 停用

### QA-137 OCB: LoadImage failed - Unsupported

**错误信息：**
```
OCB: LoadImage failed - Unsupported
Halting on critical error
```

**问题原因：** 该错误一般发生在引导进 recovery（恢复盘）报错

**解决方法：**
1. 往 EFI/OC/Drivers 里面添加 HFSPlus.efi 或 VBoxHfs.efi
2. 并在 Config → UEFI → Drivers 里面添加 HFSPlus.efi 或 VBoxHfs.efi
3. 建议用 HFSPlus.efi
4. 注意：如果使用了 OpenHfsPlus.efi，务必要取消这个驱动的加载，否则添加的 HFSPlus.efi 或 VBoxHfs.efi 无用

**说明：** 其实在 macOS Monterey 的一些版本上，这个问题还会有另外的是一种特性，那就是在 OC 引导界面选择 recovery（恢复盘）后，屏幕会黑几秒，几秒过去后，又回到了 OC 的引导界面。如果你遇到这种情况，也可以通过这种方式解决。

### QA-138 Kernel Extensions in backtrace: com.apple.iokit.IOPCIFamily(2.9)...

**错误信息示例：**
```
Kernel Extensions in backtrace:
com.apple.iokit.IOPCIFamily(2.9).....
com.apple.driver.AppleACPIPlatform(6.1)......
......
com.apple.driver.AppleIntelCFLGraphicsFramebuffer(14.0.4)......
Please go to https://panic.apple.com to report this panic
```

**解决方法：**

1. **更新驱动：** 更新 Lilu.kext 与 WhateverGreen.kext 驱动
2. **检查核显设置：** 更新后检测集成显卡仿冒 ID 设置是否适配、缓冲帧添加 DVMT 是否适配、设置的模拟机型与你的集成显卡仿冒 ID 是否适配
   - 关于集成显卡的模拟机型与仿冒 ID 的适配，可参考《Intel 核显 platform ID 整理及 smbios 速查表》：https://imacos.top/2019/11/01/1133/
3. **确认以上设置都没问题后，还是卡：**
   - 检查 DeviceProperties → Add → PciRoot(0x0)/Pci(0x2,0x0)
   - 检查 NVRAM → Add → 7C436110-AB2A-4BBB-A880-FE41995C9F82
   - 注：如果是自己的引导只是版本升级的时候遇到这个问题，可直接使用原版本下的 DeviceProperties 与 NVRAM
4. **AppleALC.kext 问题：** 笔者在安装的时候，config.plist 配置文件与 kexts 文件夹中只删除了 AppleALC.kext 驱动，也出现了如上图错误，重新添加了 AppleALC.kext 驱动又恢复正常了。由此可见，如果排除了上述两种可能，那就是内核崩溃了，删除一些不必要的 kexts 驱动，并配置 config.plist 配置文件
5. **编辑工具问题：** 最近许多伙伴们在尝试安装 macOS Big Sur 11.0 版本时，发现以上的图示。看似内核崩溃的情形，但事实上，这是也有可能是因为编辑工具和 OC 文件不完整所导致。解决方式：改用 DEBUG 版本的 OC 文件试试。另外部分电脑添加了屏蔽独立显卡的 SSDT 也会出现这个情况。

**注意：如果你电脑是 12 代及以上 CPU，检查 CPU 的大小核设置**

**CPU：P 核和 E 核**

尝试使用以下任一配置，看看哪种配置最适合您的工作流程：

**选项 1：** 启用所有 P 核、所有 E 核和超线程。由于 P 核的 L3 和内存性能较低，Ring Clock 频率将为 3.6 GHz，对 CPU 性能的影响不超过 6%。整体多线程性能会更好。

**选项 2：** 仅启用 P 核和超线程。环形时钟频率将为 4.7 GHz。整体多线程性能会降低。

这两个选项都可以通过 Alder Lake Overclocking 进行优化。环形时钟和 CPU 时钟是分开的。

因此在 BIOS > Advanced CPU Settings 中进行相应的配置：

**选项 1：所有内核，所有线程**
- 超线程 → 启用
- 所有 P 核和 E 核 → 已启用

**选项 2：仅 P 核和超线程**
- 超线程 → 启用
- CPU 内核启用模式 → 可选模式
- CPU 核心启用模式 →（启用所有 P 核心并禁用所有 E 核心）

### QA-139 OCB: System has no boot entries OC: Failed to show boot menu

**错误信息：**
```
OCB: System has no boot entries
OC: Failed to show boot menu
Halting on critical error
```

**问题原因：** 磁盘启动项扫描策略的问题

**解决方法：**
- Misc → 其他设置 → Security → ScanPolicy → 0
- 0 表示允许扫描所有可用的硬盘

### QA-140 no boot device found. press any key to reboot the machine

**问题原因：** 磁盘启动项扫描策略的问题

**解决方法：**
- Misc → 其他设置 → Security → ScanPolicy → 0
- 0 表示允许扫描所有可用的硬盘

### QA-141 OCB: Start Image failed - Aborted

**错误信息：**
```
OCB: Start Image failed - Aborted
Halting on critical error
```

**解决方法：**
- ACPI → Delete（把下面的删除补丁全部取消）

### QA-142 [ PCI configuration end, bridges 4, devices 12 ] Couldn't alloc class "AppleIntelPchSeriesAHCI"

**问题原因：** 笔者也是在升级 macOS Big Sur 中遇到

**解决方法：**
- NVRAM → Add → 7C436110-AB2A-4BBB-A880-FE41995C9F82 → boot-args → smcgen=1
- 可能还需要其它引导参数：-lilubetaall vsmcbeta（最新版的 Lilu.kext 与 VirtualSMC.kext 已经不需要该参数）

### QA-143 Exiting efiboot... [EB|#WLI9] 0×03 6 0×0E

**错误信息示例：**
```
Exiting efiboot…
[EB|#WLI9] 0×03 6 0×0E
OCB: StartImage failed - Aborted
```

**问题原因：** 一般是 OC 加载了本身兼容不是很好的 .kext 后缀的驱动

**解决方法：**
- 如果你是在安装系统阶段，建议尽量删除多余的 .kext 后缀的驱动
- 如果可以，请保留必备的三个驱动即可（Lilu.kext、VirtualSMC.kext、WhateverGreen.kext）

### QA-144 ACPI Error：XXXXXXXXX……

**错误信息：** 如上图，一开始会在 ACPI Error：XXXXXXXXX……卡，之后就会出现禁止（禁行）图标

**问题原因：** 该问题一般直接使用别人的 OC 引导会遇到，从 ACPI 的错误代码来看，属于 SSDT 补丁导致

**解决方法：** 直接删除不必要的 SSDT 补丁，以及 config.plist 配置文件下的 ACPI 补丁即可（config.plist 配置文件路径 ACPI → 补丁，把不需要的补丁条目删除）

### QA-145 Forcing CS_RUNTIME for entitlement：com.apple.rootless.restricted-block-devices

**错误信息：**
```
Forcing CS_RUNTIME for entitlement: com.apple.rootless.restricted-block-devices
```

**说明：** 上图所示，不要以为卡住了就重新开始，这一步将需要一些时间才能完成，请耐心等待，建议等待时间半小时到一小时左右。

### QA-146 选择 OpenCore 引导后黑屏

**问题说明：** 如下图。第一阶段安装完成后，选择 macOS Installer 后，没任何反应，直接黑屏 5-30 秒后又回到了如下图的引导界面

**解决方法：**

**方法一：** 笔者自己的解决方案是用了两份引导，一份 0.6.3 版本放到了 U 盘上，另外一份 0.6.2 版本放到了本地硬盘上，两份引导切换用，也安装成功了

**方法二：** 昵称为："第一位上帝"提供了另外一个解决方案："把主板的串口关掉就好了 Serial Port"

### QA-147 octy：failed to locate apple event protocol - not found

**问题说明：** 这个问题我是升级 0.6.8 版本遇到的

**解决方法：**
- config.plist → UEFI → AppleInput → AppleEvent → Auto

### QA-148 开机选择 OC 引导直接是一个需要输入密码的界面，还有一个小锁

**问题原因：** 问题的原因就是 config.plist 文件设置了密码保护

**解决方法：** 取消以下两项即可

### QA-149 黑苹果引导界面卡：LoadImage failed – Security Violation

**错误信息示例：**
```
OCSB：No suitable signature - Security Violation
OCB: Apple Secure Boot prohibits this boot entry，enforcing！
OCB: LoadImage failed - Security Violation
```

**解决方法：**
- Misc → Security → SecureBootModel → Disable

### QA-150 黑苹果引导界面卡：VM Swap Subsystem is ON

**问题说明：** 卡在这个代码，一般会有 2 种情况，一种是卡在这里不动，一种是在这里卡 15～20 秒左右，可以进系统。

**问题原因：** Kernel → Quirks → ThirdPartyDrives 这里勾选了

**解决方法：** 去掉勾选即可

### QA-151 启动的时候 若开在 【End SetConsoleMode】这个报错

**问题说明：** 遇到这个错误，我自己的情况是等了快 5-10 分钟以后，就自动跑码了。如果你等了 10 分钟还是在这里，建议执行以下操作。

**解决方法：**
- 【Misc】→【security】下的【SecureBootModel】的问题
- 默认【Default】可以改为【Disabled】或其他尝试

### QA-152 Couldn't alloc class "AppleKeyStoreTest" 或者是 Couldn't alloc class "AppleIntelPchSeriesAHCI"错误

**解决方法：**
1. 升级 Lilu.kext 与 VirtualSMC.kext 驱动
2. 添加引导参数 smcgen=1

### QA-153 "apfs_module_start:2487: load: com.apple.filesystems.apfs，v1677.141.3，afps-1677.141.3.7.2，2023/07/06"错误

**问题说明：** 只要是卡在 apfs_module_start:附近，都可以按照此方式处理看看

**问题原因：** 这个错误一般是缺少必要的 SSDT 补丁

**解决方法：**
1. 在 ACPI 文件夹中添加必要的 SSDT 补丁，可以参照此文：https://imacos.top/2020/03/29/ssdt/
2. 如果还是不行，就建议下载 OC 引导的原始文件，把 SSDT 的补丁多添加几个尝试
3. 同时不要忘记在 config.plist 中启用添加的 SSDT 补丁

### QA-154 OCB：DMG has been altered 和 OCB：LoadImage failed - Unsupported

**错误信息示例：**
```
1. OCB：DMG has been altered
2. OCB：LoadImage failed - Unsupported
```

**解决方法：** 这两行错误要分两个处理

**1. OCB：DMG has been altered 的处理方式：**

这个问题是 config.plist 的配置问题，我是在使用 recovery 方式安装 macOS 的时候遇到
- config.plist → Misc → Security 下将 DmgLoading 更改为 Any
- 并将 SecureBootModel 更改为 Disabled

**2. OCB：LoadImage failed - Unsupported. Halting on critical error：**

该错误一般发生在引导进 recovery（恢复盘）报错。解决方式：
- 往 EFI/OC/Drivers 里面添加 HFSPlus.efi 或 VBoxHfs.efi
- 并在 Config → UEFI → Drivers 里面添加 HFSPlus.efi 或 VBoxHfs.efi
- 建议用 HFSPlus.efi
- 注意：如果使用了 OpenHfsPlus.efi，务必要取消这个驱动的加载，否则添加的 HFSPlus.efi 或 VBoxHfs.efi 无用

**说明：** 其实在 macOS Monterey 的一些版本上，这个问题还会有另外的是一种特性，那就是在 OC 引导界面选择 recovery（恢复盘）后，屏幕会黑几秒，几秒过去后，又回到了 OC 的引导界面。如果你遇到这种情况，也可以通过这种方式解决。
