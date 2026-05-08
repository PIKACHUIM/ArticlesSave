---
title: 虚拟机安装黑苹果教程
description: VMware/PVE/ESXi虚拟机安装macOS黑苹果完整教程
pubDate: 01 31 2026
image: /public/image/systems/hackintosh-tutorials/QQ20260121-164021.jpg
categories:
  - Hackintosh
tags:
  - Hackintosh
badge: Hackintosh

---

> 本文是[《黑苹果安装教程以及下载和常见问题》](/blog/hackintosh-tutorials)的章节拆分文章，点击链接可查看完整教程目录。

## 0xB 虚拟机黑苹果
### b.1 Vmware 黑苹果

如果你没有买苹果的电脑，但是又因为某些原因需要用一下macOS系统的软件，并且你又不好意思借用别人的电脑，那你完全可以自己安装一个虚拟机版的macOS，这样也能勉强应付一下。不管什么原因，如果你就是想要用一下黑苹果，又不想破坏电脑已安装的Windows系统，那你可以跟着本教程，使用VMwarePro 17安装一个macOS 15。本文将从如何安装VMware开始，每一个步骤都有截图，详细得堪称保姆级，你跟着我的步骤操作基本上都是可以成功的

#### 1.下载

VMware虚拟机安装包和macOS镜像文件以及其他要用到的工具已经一起打包上传到冰裤袋小程序了，你可以从gongzhonghao“冰冷的希望”菜单栏进入“冰裤袋”小程序，找到黑苹果的下载链接之后，把macOS15版本的相关文件都下载好。你应该下载得到“Install_macOS_Sequoia_15.0.iso”、“VMware_17.6.1-24319023_Setup.exe”、“unlocker427.zip”和“darwin12.0.5.iso”这4个文件（你的系统不一定显示文件扩展名）

![vmware-macos-1.jpg](/image/systems/hackintosh-tutorials/vmware-macos-1.jpg)

因为macOS 15系统镜像文件的大小达到16G，所以下载时间可能会比较久，其他文件都比较好下载

#### 2.安装VMware

本教程使用的VMware版本是VMwarePro 17.6.1，其他版本我也没有试过，不知道是否兼容，建议VMware的版本跟我演示的相差不要太大。另外，VMwarePro从17.5.2版本开始变成免费的了，所以我这里提供的17.6.1版本也是官方版，我不会提供激活码

现在我们选中“VMware_17.6.1-24319023_Setup.exe”这个文件，右键，使用管理员身份运行

![vmware-macos-2.jpg](/image/systems/hackintosh-tutorials/vmware-macos-2.jpg)

现在已经启动安装向导界面了，我们直接点击“下一步”按钮

![vmware-macos-3.jpg](/image/systems/hackintosh-tutorials/vmware-macos-3.jpg)

勾选“我接受许可协议中的条款”，点击“下一步”按钮

![vmware-macos-4.jpg](/image/systems/hackintosh-tutorials/vmware-macos-4.jpg)

这里可以点击“更改”按钮修改VMware的安装路径，建议不要放在C盘，还有就是，整个路径中建议不要出现中文或者其他非法字符。之后点击“下一步”按钮

![vmware-macos-5.jpg](/image/systems/hackintosh-tutorials/vmware-macos-5.jpg)

用户体验设置这里，可以取消勾选这两个选项，然后点击“下一步”按钮

![vmware-macos-6.jpg](/image/systems/hackintosh-tutorials/vmware-macos-6.jpg)

创建快捷方式，这里可以保持默认就行，点击“下一步”按钮

![vmware-macos-7.jpg](/image/systems/hackintosh-tutorials/vmware-macos-7.jpg)

OK，那这里就直接点击“安装”按钮了

![vmware-macos-8.jpg](/image/systems/hackintosh-tutorials/vmware-macos-8.jpg)

如果安装过程中遇到了卫士类软件的拦截，记得允许执行，或者干脆直接退出全部杀软

![vmware-macos-9.jpg](/image/systems/hackintosh-tutorials/vmware-macos-9.jpg)

等安装进度条结束之后就算是安装完成了，因为这个VMware版本已经对个人用户免费了，所以不需要激活，直接点击“完成”按钮关闭安装向导界面

![vmware-macos-10.jpg](/image/systems/hackintosh-tutorials/vmware-macos-10.jpg)

如果你不确定的话，可以打开VMware的“关于”页面看一下激活信息（我这里可能是以前激活过商业版本，所以会显示为商业用途，你的应该会显示个人用途）

![vmware-macos-11.jpg](/image/systems/hackintosh-tutorials/vmware-macos-11.jpg)

#### 3.安装Unlocker

我们知道VMware默认是不支持引导macOS的，所以我们需要借助第三方的工具让它支持。把之前下载得到的“unlocker427.zip”文件解压了，我这里是使用360压缩进行解压

![vmware-macos-12.jpg](/image/systems/hackintosh-tutorials/vmware-macos-12.jpg)

解压得到的文件中有个“windows”文件夹，该文件夹里面有个“unlock.exe”文件，选中它，右键，以管理员身份运行

![vmware-macos-13.jpg](/image/systems/hackintosh-tutorials/vmware-macos-13.jpg)

大概几秒钟时间它就处理完了，你可以对比一下我的截图，输出日志中有一句“Patching Complete!”，然后你就可以把它关闭了。如果没有执行成功，你可以检查一下，是不是VMware版本不太合适？是不是没有使用管理员身份运行？是不是被卫士类软件拦截了？

![vmware-macos-14.jpg](/image/systems/hackintosh-tutorials/vmware-macos-14.jpg)

我们还需要重启一下VMware相关的服务（好像不重启也行，但是我不确定）。我们按快捷键“Ctrl+Shift+ESc”打开任务管理器，在“服务”面板找到“VM”开头的这几个服务（名称太长了不想写，直接看我截图吧），右键，重新启动

![vmware-macos-15.jpg](/image/systems/hackintosh-tutorials/vmware-macos-15.jpg)

#### 4.创建虚拟机

现在我们打开VMware，点击“创建新的虚拟机”按钮

![vmware-macos-16.jpg](/image/systems/hackintosh-tutorials/vmware-macos-16.jpg)

选择“典型（推荐）”选项，点击“下一步”按钮

![vmware-macos-17.jpg](/image/systems/hackintosh-tutorials/vmware-macos-17.jpg)

选择“稍后安装操作系统”，点击“下一步”按钮

![vmware-macos-18.jpg](/image/systems/hackintosh-tutorials/vmware-macos-18.jpg)

这里要选择“Apple macOS”，然后下拉选择“macOS 15”选项。如果你这里没有Apple macOS的引导项，说明你的Unlocker没有执行成功，再根据我上面提到的那几种情况排查一下吧

![vmware-macos-19.jpg](/image/systems/hackintosh-tutorials/vmware-macos-19.jpg)

虚拟机的名称可以设置一下，然后虚拟机的位置记得要选择一个剩余空间比较大的盘，比如我这里把它放到H盘（建议路径中不要出现中文字符）

![vmware-macos-20.jpg](/image/systems/hackintosh-tutorials/vmware-macos-20.jpg)

最大磁盘默认是80G，我这里把它改为了100G，建议设置大一点，放心，它不会马上占用这些空间的，占用多少取决于你以后如何使用macOS里的硬盘。但是如果你现在设置的最大空间不够大，那以后就不好扩容了。还有就是要勾选“将虚拟磁盘存储为单个文件”，这样磁盘性能会更好。都设置好之后就点击“下一步”按钮

![vmware-macos-21.jpg](/image/systems/hackintosh-tutorials/vmware-macos-21.jpg)

虽然基本设置都弄好了，但是我们还是要点击“自定义硬件”按钮。首先是设置内存（指的是运行内存，不是硬盘存储空间），它默认是设置4G，但是我的电脑运行内存比较大，所以我给它8G。这个内存设置得越大，你的macOS就越流畅，但是你的宿主机就会越卡，你可以根据自己的实际情况进行分配

![vmware-macos-22.jpg](/image/systems/hackintosh-tutorials/vmware-macos-22.jpg)

现在点击“新CD/DVD（SATA）”选项，然后点击“使用ISO镜像文件”，点击“浏览”按钮，选中之前下载好的苹果镜像文件（也就是Install_macOS_Sequoia_15.0.iso），之后关闭自定义面板，再点击“完成”即可。可能我描述得不是很立体，具体操作步骤你可以参考一下我的截图

![vmware-macos-23.jpg](/image/systems/hackintosh-tutorials/vmware-macos-23.jpg)

#### 5.安装macOS 15

好了，硬件方面都已经设置好了，现在终于进入正题了，我们点击左边的“开启虚拟机”按钮启动虚拟机

![vmware-macos-24.jpg](/image/systems/hackintosh-tutorials/vmware-macos-24.jpg)

不出意外的话，你现在已经看到了macOS的logo了

![vmware-macos-25.jpg](/image/systems/hackintosh-tutorials/vmware-macos-25.jpg)

剩下的安装和物理机器安装的一样了

#### 6.安装VMtools

虽然壁纸显示正常了，但是电脑依然是那么卡，我们看一下系统的信息，发现它才3M的图形缓存，不卡才怪

![vmware-macos-52.jpg](/image/systems/hackintosh-tutorials/vmware-macos-52.jpg)

所以我们需要安装一下VMtools让它能识别更大的显存，而且安装VMtools还有其他好处，比如说可以让它自动适应桌面分辨率，还可以在宿主机之间随便拖拽传输文件

现在，我们让它关机

![vmware-macos-53.jpg](/image/systems/hackintosh-tutorials/vmware-macos-53.jpg)

完全关机之后点击“编辑虚拟机设置”按钮，又回到自定义硬件的界面了，还是点击“CD/DVD （SATA）”选项，这次要把ISO镜像改为“darwin12.0.5.iso”这个文件了（可以参考我的截图），别忘了点击“确定”按钮

![vmware-macos-54.jpg](/image/systems/hackintosh-tutorials/vmware-macos-54.jpg)

现在再次启动虚拟机，进入macOS之后，发现桌面右上角已经加载了“VMware Tools”了，双击打开它，再双击“安装VMware Tools”按钮就可以启动安装向导了，第一个界面就点击“继续”按钮

![vmware-macos-55.jpg](/image/systems/hackintosh-tutorials/vmware-macos-55.jpg)

选择“为这台电脑上的所有用户安装”，再点击“继续”按钮

![vmware-macos-56.jpg](/image/systems/hackintosh-tutorials/vmware-macos-56.jpg)

在macOS安装软件一般不需要修改安装路径，直接点击“安装”按钮

![vmware-macos-57.jpg](/image/systems/hackintosh-tutorials/vmware-macos-57.jpg)

它会让你输入你的账户密码，也就是你创建账户的时候设置的那个密码，再点击“安装软件”按钮

![vmware-macos-58.jpg](/image/systems/hackintosh-tutorials/vmware-macos-58.jpg)

如果安装过程出现各种提示，肯定都是选择“允许”。还有就是，可能会提示“系统扩展已被阻止”，那就点击“打开系统设置”按钮

![vmware-macos-59.jpg](/image/systems/hackintosh-tutorials/vmware-macos-59.jpg)

在系统的隐私与安全性这边可以看到“来自开发者XXX已被阻止载入”（可以参考一下我的截图），那我们要点击“允许”按钮

![vmware-macos-60.jpg](/image/systems/hackintosh-tutorials/vmware-macos-60.jpg)

然后它会再次让你输入你的账户密码

![vmware-macos-61.jpg](/image/systems/hackintosh-tutorials/vmware-macos-61.jpg)

如果它提示你需要重新启动那就重新启动吧

![vmware-macos-62.jpg](/image/systems/hackintosh-tutorials/vmware-macos-62.jpg)

如果提示安装失败了，不要慌，重来一次就好，有了第一次授权之后第二次安装就可以轻松完成

![vmware-macos-63.jpg](/image/systems/hackintosh-tutorials/vmware-macos-63.jpg)

如果你不点“重新启动”按钮，你也可以自己手动关机，然后再打开虚拟机设置这里，把“CD/DVD（SATA）”这里的“启动时连接”这个选项取消勾选，不然它每次进入macOS都会加载指定的镜像

![vmware-macos-64.jpg](/image/systems/hackintosh-tutorials/vmware-macos-64.jpg)

现在启动macOS之后，再次查看图形显存，发现这次已经达到128M了，虽然还是小得可怜，但是起码没有那么卡了，当然你也可以进入设置，把一些动作特效什么的都关闭，这样可能会更流畅点

![vmware-macos-65.jpg](/image/systems/hackintosh-tutorials/vmware-macos-65.jpg)

可能有些同学会发现macOS显示的时间不对，那可能是之前的时区没有选对，你可以打开系统设置，在“通用”里面找到“最接近的城市”，把它改为中国的城市就行

![vmware-macos-66.jpg](/image/systems/hackintosh-tutorials/vmware-macos-66.jpg)

现在各种功能都是正常的，网络也是正常的，我们可以打开浏览器看看

![vmware-macos-67.jpg](/image/systems/hackintosh-tutorials/vmware-macos-67.jpg)

OK，整个安装过程已经结束了，你可以自己探索一下macOS 15哈哈

![vmware-macos-68.jpg](/image/systems/hackintosh-tutorials/vmware-macos-68.jpg)

### b.2 PVE黑苹果

> 原文链接：https://blog.lv5.moe/p/pve-virtualized-hackintosh-gpu-passthrough-and-remote-access-tutorial

[![Featured image of post PVE 虚拟化黑苹果显卡直通及远程访问教程](/image/systems/hackintosh-tutorials/pve_hackintosh-logo.png)](/p/pve-virtualized-hackintosh-gpu-passthrough-and-remote-access-tutorial)[杂七杂八的分享](/categories/share)

#### PVE 虚拟化黑苹果显卡直通及远程访问教程

##### PVE 虚拟化黑苹果显卡直通教程（核显&独显通用），低延迟远程访问方案：VNC、ARD、ToDesk、ParSec、Jump Desktop 等远程桌面协议/软件测试横评

Apr 13, 2022 7 minute read visitors 
PVE 虚拟化黑苹果显卡直通教程（核显&独显通用），低延迟远程访问方案：VNC、ARD、ToDesk、ParSec、Jump Desktop 等远程桌面协议/软件测试横评

#### 适用场景

博主曾经用笔记本装黑苹果做过一段时间的主力机，但是因为有使用 Windows 的强需求，双系统切换不方便所以最终换回的 Windows。当时就在想如果有一台服务器跑着 MacOS，随时可以从主力机 Windows 远程访问岂不是两全其美。但是近年矿潮显卡价格虚高，实在是没有入手的欲望，最近趁矿难显卡价格下跌入手一块 AMD RX460 实践一下这个想法

阅读本文需要的前置步骤：

1. 一台运行 PVE 的主机
2. 在 PVE 上成功安装黑苹果（使用 ）
3. 至少进入黑苹果一次开启 `设置->共享->屏幕共享`（显卡直通可能会导致 PVE 自带的 VNC 卡在白苹果界面）

黑苹果能否成功运行和硬件以及驱动有很大的关系，而使用 PVE 使用的 KVM 虚拟化技术可以最大程度上屏蔽硬件的差异提高成功率，借助 [KVM-Opencore](https://github.com/thenickdude/KVM-Opencore)项目提供的驱动可以做到开箱即用，不用折腾

PVE 和黑苹果安装教程这里推荐两篇博客，写的非常详细

- [Installing macOS 12 “Monterey” on Proxmox 7](https://www.nicksherlock.com/2021/10/installing-macos-12-monterey-on-proxmox-7)
- [国光的 PVE 生产环境配置优化记录](https://www.sqlsec.com/2022/04/pve.html)

对于国光这篇文章有一处勘误，文章中说到 PVE 7.1 不能显卡直通，实际上我测试是可以的，读者可以在下文中找到我使用的软件版本 

#### 主要配置

##### 硬件配置

CPU: i5 10400 GPU: UHD630、AMD RX460

其他硬件均虚拟化

##### 软件版本

虚拟化平台：PVE

主要软件包版本：

```
~ pveversion -v
proxmox-ve: 7.1-1 (running kernel: 5.13.19-6-pve)
pve-manager: 7.1-12 (running version: 7.1-12/b3c09de3)
pve-kernel-helper: 7.1-14
pve-kernel-5.13: 7.1-9
...
```

MacOS 版本：macOS Monterey 12.3.1(21E258)（使用 [OSX-KVM](https://github.com/thenickdude/OSX-KVM)项目制作镜像） OpenCore&EFI 版本： [KVM-Opencore v16](https://github.com/thenickdude/KVM-Opencore/releases/tag/v16)

#### 显卡直通

因为我是通过远程访问使用黑苹果，所以并没有把要直通的 GPU 设置为主 GPU，这是本文和其他直通教程的主要区别。这样做的好处是可以用 PVE 的后台直接查看黑苹果启动情况、进入 Recovery 模式等

参考 [Arch Linux wiki](https://wiki.archlinux.org/title/PCI_passthrough_via_OVMF_%28%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87%29)

##### 启用 IOMMU

这里引用 Arch Linux wiki 中对 IOMMU 的介绍：

> IOMMU 是 Intel VT-d 和 AMD-Vi 的通用名称。 VT-d 指的是直接输入/输出虚拟化(Intel Virtualization Technology for Directed I/O)，不应与 VT-x(x86 平台下的 Intel 虚拟化技术，Intel Virtualization Technology)混淆。VT-x 可以让一个硬件平台作为多个“虚拟”平台，而 VT-d 提高了虚拟化的安全性、可靠性和 I/O 性能。

首先在 BIOS 中开启 VT-d

然后修改内核参数开启 IOMMU：

```
- GRUB_CMDLINE_LINUX_DEFAULT="quiet"
+ GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on iommu=pt pcie_acs_override=downstream video=efifb:off"
```

这里解释下这几个参数的作用：

- intel_iommu=on：开启 IOMMU，对于 AMD CPU 需要使用 amd_iommu=on
- iommu=pt：pt 是 passthrough 的缩写，可以提高性能
- pcie_acs_override=downstream: 可以将同一 Group 中的设备分开直通
- video=efifb:off：禁用 efifb 驱动，防止出现报错 BAR 3: cannot reserve [mem]

更新内核参数

```
update-grub
```

重启后可以用以下脚本测试

```
bash -c "$(curl -fsSL https://gist.githubusercontent.com/ShadowySpirits/018ea8675100baf768afff0d835e7862/raw/8e1c12f5766f0d308628ad1373b2f8603c523480/check_iommu.sh)"
```

如果你遇到网络问题可以直接复制并执行以下脚本内容：

```
#!/bin/bash
shopt -s nullglob
for g in $(find /sys/kernel/iommu_groups/* -maxdepth 0 -type d | sort -V); do
    echo "IOMMU Group ${g##*/}:"
    for d in $g/devices/*; do
        echo -e "\t$(lspci -nns ${d##*/})"
    done;
done;
```

看到类似以下信息说明 IOMMU 开启成功

```
IOMMU Group 0:
        00:00.0 Host bridge [0600]: Intel Corporation Comet Lake-S 6c Host Bridge/DRAM Controller [8086:9b53] (rev 05)
IOMMU Group 1:
        00:01.0 PCI bridge [0604]: Intel Corporation 6th-10th Gen Core Processor PCIe Controller (x16) [8086:1901] (rev 05)

...

IOMMU Group 6:
        00:1c.0 PCI bridge [0604]: Intel Corporation Device [8086:a394] (rev f0)
        03:00.0 VGA compatible controller [0300]: Advanced Micro Devices, Inc. [AMD/ATI] Baffin [Radeon RX 460/560D / Pro 450/455/460/555/555X/560/560X] [1002:67ef] (rev cf)
        03:00.1 Audio device [0403]: Advanced Micro Devices, Inc. [AMD/ATI] Baffin HDMI/DP Audio [Radeon RX 550 640SP / RX 560/560X] [1002:aae0]
```

如果上面没有开启 `pcie_acs_override=downstream`就只能将整个 Group 下的设备都直通给某个虚拟机 

##### 隔离 GPU

我们需要使用占位驱动程序（vfio）接管显卡，这样才能后续将显卡分配给虚拟机

在 PVE 宿主机的 /etc/modules 中添加 vfio 模块

```
vfio
vfio_iommu_type1
vfio_pci
vfio_virqfd
```

修改 /etc/modprobe.d/vfio.conf 将显卡的供应商-设备 ID 传递给 vfio 驱动，供应商-设备 ID 可以在上面脚本的输出的 `[]`中找到，多个设备用 `,`分隔

```
options vfio-pci ids=device_id1,device_id2 disable_vga=1
```

以我的 RX460 为例，它的供应商-设备 ID 是 1002:67ef 和 1002:aae0

```
IOMMU Group 6:
        00:1c.0 PCI bridge [0604]: Intel Corporation Device [8086:a394] (rev f0)
        03:00.0 VGA compatible controller [0300]: Advanced Micro Devices, Inc. [AMD/ATI] Baffin [Radeon RX 460/560D / Pro 450/455/460/555/555X/560/560X] [1002:67ef] (rev cf)
        03:00.1 Audio device [0403]: Advanced Micro Devices, Inc. [AMD/ATI] Baffin HDMI/DP Audio [Radeon RX 550 640SP / RX 560/560X] [1002:aae0]
```

所以需要添加的内容是：

```
options vfio-pci ids=1002:67ef,1002:aae0 disable_vga=1
```

然后在 PVE 宿主机的 /etc/modprobe.d/blacklist.conf 中禁用其他显卡驱动，防止这些驱动在 vfio 前加载

```
# NVIDIA
blacklist nvidiafb
blacklist nouveau
blacklist nvidia
blacklist snd_hda_intel

# Intel
blacklist snd_hda_codec_hdmi
blacklist i915

# AMD
blacklist radeon
```

最后应用更改并重启

```
update-initramfs -u
```

##### 分配显卡

重启后就可以将显卡分配给虚拟机了：

在设备中选择添加 PCI 设备，然后选择你要添加的显卡即可（独显核显都可以）

[![pve 直通选项](/image/systems/hackintosh-tutorials/pve_pve-passthrough.jpeg)](/p/pve-virtualized-hackintosh-gpu-passthrough-and-remote-access-tutorial/pve-passthrough.jpeg)pve 直通选项

不同的显卡这里选择的选项不太一样，根据我的试验： 直通 UHD630 只需要勾选 `全功能（All Functions）`直通 AMD RX460 除了 `主 GPU（Primary GPU）`外的选项都需要勾选 

直通之后 PVE 自带的 VNC 可能会卡在白苹果界面，其实系统已经正常启动，可以使用 MacOS 自带的 VNC 进行连接

[![白苹果](/image/systems/hackintosh-tutorials/pve_stuck-apple.png)](/p/pve-virtualized-hackintosh-gpu-passthrough-and-remote-access-tutorial/stuck-apple.png)白苹果

#### 远程访问

##### 分辨率调整

当你通过 PVE 自带的 VNC 连接黑苹果的时候会发现有一个分辨率为 1080p 的内置显示器，并且没有其他分辨率的选项，所以需要一些奇技淫巧来强制修改分辨率：

这里用到两个软件：BetterDummy 和 SwitchResX

首先使用 BetterDummy 创建一个和你物理显示器比例一致的虚拟显示器并设为主显示器

[![创建虚拟显示器](/image/systems/hackintosh-tutorials/pve_create-new-dummy.jpeg)](/p/pve-virtualized-hackintosh-gpu-passthrough-and-remote-access-tutorial/create-new-dummy.jpeg)创建虚拟显示器

然后使用 SwitchResX 修改虚拟显示器分辨率为你物理显示器的原生分辨率

[![修改分辨率](/image/systems/hackintosh-tutorials/pve_switch-res.jpeg)](/p/pve-virtualized-hackintosh-gpu-passthrough-and-remote-access-tutorial/switch-res.jpeg)修改分辨率

不推荐使用带有 HiDPI 的分辨率，因为 HiDPI 是一种超采样技术（HiDPI 原理可以参考 [这篇文章](https://blog.skk.moe/post/hidpi-what-why-how/)）靠渲染更多的像素来使图像“看起来”更清晰。但是大部分远程桌面软件都会将原生分辨率压缩为当前物理屏幕分辨率进行传输，所以开启 HiDPI 除了会浪费计算资源、增加延迟外没有任何意义 

（可选）使用 SwitchResX 关闭默认显示器 这个步骤不是必须的，如果你的远程桌面软件无法选择用于串流的显示器（比如 VNC Viewer）可以关闭默认显示器来强制软件使用虚拟显示器

[![关闭默认显示器](/image/systems/hackintosh-tutorials/pve_disable-default-display.jpeg)](/p/pve-virtualized-hackintosh-gpu-passthrough-and-remote-access-tutorial/disable-default-display.jpeg)关闭默认显示器

##### 原生方案

MacOS 原生提供 VNC 和 ARD 两种协议进行远程访问，可以在 `设置->分享`中开启

###### VNC

自带的 VNC 是阉割版的，体验上做的很差：不支持调整画质、分辨率，不支持选择显示器（多显示器会横向拼接显示内容）从 Windows 访问键位映射有问题并且无法修改，卡顿严重，拖动窗口的时候尤其明显。唯一的优点是画质非常好，是本文介绍的所有方案中唯一一个使用原生分辨率传输（开启 HiDPI 画质明显提升）

###### ARD

ARD 属于是 VNC 套壳，可以使用 Apple 官方的 [Apple Remote Desktop](https://apps.apple.com/us/app/apple-remote-desktop/id409907375?mt=12)软件（售价高达 518，不会真有冤大头会买吧。。。）连接黑苹果主机。相比于 VNC，ARD 支持选择显示器，提供 4 挡可调的图像质量，在保证画质的前提下提供不错的延迟表现。并且除了远程桌面以外还提供命令执行、系统报告、文件传输等系统管理功能，缺点是只支持 MacOS（Windows 下可以使用支持 VNC 协议的软件连接，但是会退化成和原生 VNC 一样的垃圾体验）

###### 自建 VNC Server

既然自带的 VNC 如此不堪使用，ARD 又不提供 Windows 客户端，我们只能求助于第三方软件来提供满血版 VNC 协议支持。这里推荐 [Real VNC](https://www.realvnc.com/en/connect/download/vnc/macos/)，可以兼具 VNC 高画质和 ARD 的低延迟，除了不支持 HiDPI 外基本上能提供和连接显示器一致的体验

##### 第三方软件/私有协议

###### ToDesk

ToDesk 在我的体验中卡顿非常严重。除了提供免费的内网穿透以外，相比其他方案基本上毫无优势可言，如果你有公网 IP 的话不要选择它。所以名气大的（尤其是国产软件）不一定真的好用。。。

###### ParSec

ParSec 的原本用途是游戏串流，提供精细的配置项可供选择，细节上体验很舒适。相比于其他方案它的延迟和画面质量很稳定，不会在画面快速变化时卡顿或者糊掉，并且支持播放被控主机声音。可能是现在 Mac 版还处于 Beta 阶段的原因，ParSec 对性能要求很高，RX460 在 2560×1440 分辨率下延迟 20ms 左右，3440×1440（2k 带鱼屏）分辨率下延迟 40ms 左右

###### Jump Desktop

Jump Desktop 是老牌 mac 远程桌面应用，使用私有的 Fluid 协议。延迟低、带宽占用低，但是画面也是最糊的，特别是窗口拖动等画面快速变化的场景涂抹感非常严重。Jump Desktop 支持自定义任何按键或是组合键的映射，和 ParSec 一样也支持播放被控主机声音

#### 总结与性能测试

测试环境：

GPU： 直通 RX460 GeekBench 5 Metal 分 21000 左右，性能大致相当于 M1 核显 网络：内网（网络延迟 <1ms） 分辨率：3440x1440（非 HiDPI） 软件版本：各软件均使用当前最新免费/试用版，画质选择最高一档
软件/协议 延迟 画质 按键映射 多显示器 声音 文件传输 连接方式 原生 VNC 高 最好（支持 HiDPI） 不支持修改 拼接所有显示器 不支持 不支持 直连 RealVNC 低（2ms） 最好 自定义任何按键映射 服务端配置 不支持 支持 直连 ARD 中等 一般（滚动时画面会糊） 不支持修改 客户端选择 不支持 支持 直连 ToDesk 高 一般（有明显涂抹感） 自定义功能键映射 客户端选择 不支持 支持 免费内网穿透 ParSec 中等（40ms） 较好（有轻微涂抹感） 不支持修改 客户端选择 支持 不支持 直连（自动 UPNP） Jump Desktop 低（10ms） 差（画面最糊） 自定义任何按键映射 客户端选择 支持 不支持 直连（自动 UPNP） 

除 ToDesk 外的方案若想要通过公网访问均需要被控端具备公网 IP 并配置端口映射或自行搭建内网穿透 ParSec 和 Jump Desktop 会通过 UPNP 帮你自动映射端口，并且登陆它们的账号可以直接看到你的被控端主机，不用通过 IP 手动添加主机，尤其适用于你的公网 IP 是动态 IP 的情况 

[PVE](/tags/pve) [MacOS](/tags/macos) [Hackintosh](/tags/hackintosh) [黑苹果](/tags/%E9%BB%91%E8%8B%B9%E6%9E%9C)Licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0)转载或引用本文时请遵守许可协议，知会作者并注明出处不得用于商业用途！ Last updated on Feb 27, 2023 23:04 

### b.3 esxi黑苹果

> 原文链接：https://imacos.top/2025/02/18/vmware-esxi/

  

#### 新手零基础VMware ESXi 8.0虚拟机安装macOS黑苹果Hackintosh系统OPenCore引导直通独立显卡GPU优化保姆级安装过程

  ** [imacos.top](https://imacos.top/author/heipingguowu/) **2025-02-18  ** [ESXi](https://imacos.top/category/esxi/)· [黑苹果其他教程](https://imacos.top/category/wzjc/qtjx/) **4.33k  **0  ** [推广](javascript:;)    
![](/image/systems/hackintosh-tutorials/esxi_1740141109--1080.webp)
 

#### 视频教程

 
[![](/image/systems/hackintosh-tutorials/esxi_youtubw.png)](https://youtu.be/61c62Oj5Lpo)
 
[点击进入YouTube观看》](https://youtu.be/pIGJ7uk7AHw)
 
[![](/image/systems/hackintosh-tutorials/esxi_bE7AB99.png)](https://www.bilibili.com/video/BV1Pm4y1A7xV?share_source=copy_web&vd_source=7bd72a33626c5f2ddc675689fd213860)
 
[点击进入bilibili观看》](https://www.bilibili.com/video/BV1qkAfeFELB/?share_source=copy_web&vd_source=7bd72a33626c5f2ddc675689fd213860)
 

#### 开始前准备工作：

 
注：所有工具已经打包好了，在本文下载地址中就能下载
 
1.ESXi 8.0的安装镜像 目前 ESXi 原生 8.0 的镜像无法安装 macOS Unlocker 解锁补丁，如果不使用 macOS Unlocker 补丁的话，开启 macOS 虚拟机会无限重启，目前网上主流办法是从 ESXi 7.0 镜像提取苹果虚拟机部分，重新封装到新的 8.0 镜像中，教程中提供的ESXi 8.0镜像集成macOS Unlocker、slic26、usb nvme以及net驱动。如果自己想折腾，也可以下载 ESXi 7.0 镜像用其实也不错，也可以黑苹果，稳定性还高。
 
2.macOS 的安装镜像 macOS 安装镜像使用的是iso格式的镜像，本次提供的是macOS Sequoia 15 版本，如果你需要更多的版本，可以在黑苹果网站系统分类下，去下载虚拟机版ISO。
 
3.其他准备事项 u盘一个，用于写入ESXi 8.0的安装镜像 写盘工具，这里用 balenaEtcher（如果部分电脑不识别U盘，建议使用 [Ventoy](https://www.ventoy.net/cn/download.html)，下载地址https://www.ventoy.net/cn/download.html） 【可选】如果有直通显卡需求，推荐支持 macOS 免驱的 AMD 独显，具体型号可以看之前发布的免驱动显卡文章https://imacos.top/2024/03/08/gpu/ 【可选】如果有登录 Apple ID 的需求，建议添加 OPenCore EFI 引导改码
 
4.主板 BIOS 建议如下设置： 开启 VT-x Intel（VMX）Virtualization Technology（PCIe 硬件件直通必须） 开启 VT-d （PCIe 硬件直通必须） 开启 SR-IOV 虚拟化技术 （高效先进的虚拟技术） 开启 Above 4G Decoding（如果玩 vGPU 方案需要开启这个选项） 开启 Numa （多路 CPU 建议开启，提高多路 CPU 运行效率，合理分配负载） 开启 x2APIC（PCIe 硬件直通需要） 开启 AES 指令集 开启 IOMMU / ACS 关闭 bios安全引导 注：如果是英特尔12代以上的处理器，建议设置CPU核心数的E核，Active Efficient-cores 设置为0或关闭，避免无法安装的错误。
 

#### ESXi 安装 U盘制作

 
这里介绍两种方式给大家选择
 
方式一：balenaEtcher直接将ISO写入到U盘（windows与Mac版均可）
 
![](/image/systems/hackintosh-tutorials/esxi_1739933070-QQ20250219-092852.webp)
 
方式二：使用Ventoy 工具（windows上使用）
 
1.首先准备一个空闲的U盘，用Ventoy 一键制作USB启动盘。打开 [ventoy](https://www.ventoy.net/cn/download.html)下载安装， Ventoy 是开源软件，下载使用都是免费的，直接去官网或者 GitHub 页面下载即可。（ [Ventoy](https://www.ventoy.net/cn/download.html)下载地址https://www.ventoy.net/cn/download.html）
 
![](/image/systems/hackintosh-tutorials/esxi_1739933070-QQ20250219-093450.webp)
 
2.在PC上安装，并运行Ventoy 软件，程序会自动检测当前 USB 设备。如果插入了多个U盘注意识别，别搞错了，造成数据丢失。点击安装开始制作：
 
![](/image/systems/hackintosh-tutorials/esxi_1739933070-QQ20250219-093652.webp)
 
完成后可以看到 U 盘已经被重命名为 Ventoy。
 
![](/image/systems/hackintosh-tutorials/esxi_1739933068-63d7ecc76d40f998.png_e1080.webp)
 
打开磁盘管理，可以看到 U 盘被细分为 2 个大分区，Ventoy 分区为活动分区，exFAT 文件系统，用于存放 ISO 文件，exFAT 文件系统也能更好的跨平台使用。
 
![](/image/systems/hackintosh-tutorials/esxi_1739933069-63d7ecc770a1d3553.png_e1080.webp)
 
Ventoy 的系统分区里其实还有一个只有 1MB 的空间，存有 Legacy BIOS 模式下的启动文件，可见对于老旧设备来说，Ventoy 一样兼容。
 
![](/image/systems/hackintosh-tutorials/esxi_1739933068-63d7ecc7df8d79746.png_e1080.webp)
 
格式化未NTFS，用于存放 ISO 文件的分区 ，支持 exFAT、FAT32、NTFS、UDF、XFS、Ext2、Ext3、Ext4。
 
![](/image/systems/hackintosh-tutorials/esxi_1739933067-63d7ecc7dee324371.png_e1080.webp)
 
直接下载需要安装的系统镜像放到 U 盘里就可以了。如果U盘够大的话，一些常用的镜像和工具都可以放到里面，以后各个系统装机都可以使用。不管是各版本的 Windows 系统还是 PE 系统甚至是 ubuntu 系统，只要想加载就直接将镜像文件拖入到Ventoy文件夹内即可。这里我们把ESXi的ISO放进去。
 
![](/image/systems/hackintosh-tutorials/esxi_1739933069-63d7ecc8025772743.png_e1080.webp)
 

#### 安装ESXi8.0

 
如果使用的是balenaEtcher，直接从U盘的EFI引导进入，如果使用的是Ventoy，则从U盘的Ventoy，Ventoy进入界面如下，U 盘内保存的系统镜像都在列表中，选择要安装的镜像文件即可，选择启动WinPE64，按Enter键进入PE。
 
![](/image/systems/hackintosh-tutorials/esxi_1739933068-63d7ecc96ec1c8643.jpg_e1080.webp)
 
进到PE后，用分区工具把软路由硬盘分区全部删除(注意不要删错)，这里有个大坑，如果硬盘存在分区的话，很可能造成无法安装的bug，尤其是对于拆机的硬盘来说，一定要将上面的分区及隐藏分区全部删掉。
 
删除掉之后，再次进入U盘的引导，选择ESXi 8.0的ISO镜像进入
 
（可选项）修改ESXI的默认空间：在读秒阶段，快速按下Shift+O，调出命令行，来修改ESXI的默认空间大小：
 
![](/image/systems/hackintosh-tutorials/esxi_1739933068-63d7ecc98e2069432.jpg_e1080.webp)
 
在下面命令行输入：autoPartotionOSDataSize=20480。命令注意区分大小写，我这里将默认空间设置为20GB。硬盘空间不足的话推荐设置8192(8GB)即可，大家可以根据自己的情况进行设定：
 
![](/image/systems/hackintosh-tutorials/esxi_1739933069-63d7ecc99de743199.jpg_e1080.webp)
 
回车，开始跑码，等待跑码完成。
 
![](/image/systems/hackintosh-tutorials/esxi_1739933071-QQ20250219-095359.webp)
 
这一步 **Starting service vmtoolsd**/ **Starting service gpuManager**的加载时间会比较长，一定要耐心等待，不是死机了。
 
![](/image/systems/hackintosh-tutorials/esxi_1739933071-QQ20250219-095508.webp)
 
一直等待到出现如下界面，选择 Continue，按回车，继续下一步：
 
![](/image/systems/hackintosh-tutorials/esxi_1739933071-QQ20250219-095718.webp)
 
同意 VMWARE 的条款，按F11，继续下一步：
 
![](/image/systems/hackintosh-tutorials/esxi_1739933071-QQ20250219-095748.webp)
 
选择安装位置：接下来会扫描此计算机上的所有存储器(硬盘)，等待扫描结果：
 
选择安装位置，可以看到有两个盘，一个NVMe的固态硬盘和sata盘，用键盘上下键调整，选择第二个安装在NVMe固态硬盘。一定要看好，不要安装错位置。选择好了回车继续：
 
![](/image/systems/hackintosh-tutorials/esxi_1739933072-QQ20250219-095919.webp)
 
选择键盘布局，回车继续下一步：
 
![](/image/systems/hackintosh-tutorials/esxi_1739933072-QQ20250219-100010.webp)
 
设置登录密码：弹出密码输入页，这里输入密码，需要输入两遍，输入第一遍之后，按table键切换到第二行输入第二遍确认密码，输入一定要慢一点，因为不显示输入的密码，很容易输错，密码需要大小写带数字。输入完毕后，回车进行下一步：
 
![](/image/systems/hackintosh-tutorials/esxi_1739933072-QQ20250219-100127.webp)
 
弹出确认安装位置选项，看一下安装位置有没有问题，没选错，按F11继续安装：
 
![](/image/systems/hackintosh-tutorials/esxi_1739933073-QQ20250219-100153.webp)
 
等待加载完成：
 
![](/image/systems/hackintosh-tutorials/esxi_1739933073-QQ20250219-100221.webp)
 
到这里拔掉U盘，之后按回车，重启。回车继续
 
![](/image/systems/hackintosh-tutorials/esxi_1739933073-QQ20250219-100254.webp)
 
重启后开始跑码，等待跑码完成
 
![](/image/systems/hackintosh-tutorials/esxi_1739933073-QQ20250219-100353.webp)
 
有以下画面表示已经安装成功，按F2可进入管理后台，F12是关闭或者重启：
 
![](/image/systems/hackintosh-tutorials/esxi_1739933074-QQ20250219-100648.webp)
 

#### 英特尔十二代以上的CPU安装错误解决

 
错误如下图
 
![](/image/systems/hackintosh-tutorials/esxi_1739933074-QQ20250219-100541.webp)
 
解决方案就是bios设置CPU核心数的E核，Active Efficient-cores 设置为0或关闭
 
![](/image/systems/hackintosh-tutorials/esxi_1739933074-QQ20250219-100510.webp)
 

#### ESXI虚拟机设置

 
按F2，弹出登录页面，输入刚才设定的密码。回车，进入ESXI管理后台。
 
![](/image/systems/hackintosh-tutorials/esxi_1739933075-QQ20250219-100737.webp)
 
可以看到第一项是修改密码，第三项是设置网络。键盘上下键选择第三项，修改网络配置，回车进入：
 
![](/image/systems/hackintosh-tutorials/esxi_1739933075-QQ20250219-101117.webp)
 
选择第一项，设置网口：
 
![](/image/systems/hackintosh-tutorials/esxi_1739933075-QQ20250219-101149.webp)
 
上下键选择你要用来管理ESXI的网口，这里有些工程机的网口是错乱的，可以通过插拔网线来确定是不是正确。如果不正确的话，需要通过后面在web端设置进行接口对应。
 
![](/image/systems/hackintosh-tutorials/esxi_1739933070-ef33bd16085ef84aa67f76b860e0c226.webp)
 
经过插拔网线，6个接口的顺序和ESXi系统显示的网口是一一对应的。选择vmnic5接口作为管理口。通过键盘上下键，移动黑色条框，按空格确定选项。
 
回车保存，自动退回到【网络配置】页面：选择设置IPV4选项：
 
![](/image/systems/hackintosh-tutorials/esxi_1739933075-QQ20250219-101416.webp)
 
键盘上下键，移动黑色条框到第三项，可以看到第三项前面的括号里有个圆圈(○)，按空格确定选项。
 
![](/image/systems/hackintosh-tutorials/esxi_1739933076-QQ20250219-101436.webp)
 
设置下面三个选项【IPV4 Address(ESXI管理地址)】、【Subnet Mask(子网掩码)】、【Default Gateway(默认网关)】：（管理地址与默认网关必须在同网段）
 
- IPV4 Address【ESXI管理地址】：10.10.10.111 Subnet Mask【子网掩码】：255.255.255.0 Default Gateway【默认网关】：10.10.10.252

 
这个管理地址是后面我们在web端进行访问的地址，千万不要和ikuai以及openwrt冲突。Default Gateway【默认网关】就设置为主路由的网管即可。我以ikuai作为主路由。这里就直接将网关设置为主路由ikuai的地址了。按回车保存：
 
退出来之后，在页面右上角就看到我们设置的信息了，按ESC，退出：
 
![](/image/systems/hackintosh-tutorials/esxi_1739933076-QQ20250219-101616.webp)
 
在弹出的页面，按Y，并自动重启网络：
 
![](/image/systems/hackintosh-tutorials/esxi_1739933076-QQ20250219-101638.webp)
 
网络重启完后，可以看到，已经设置成功了，
 
![](/image/systems/hackintosh-tutorials/esxi_1739933077-QQ20250219-101751.webp)
 
按ESC，回到首页：返回首页之后，也可以看到已经设置完成：
 
![](/image/systems/hackintosh-tutorials/esxi_1739933077-QQ20250219-101809.webp)
 
注：如果你还没有连接到网络，需要手动设置一下IP段进入ESXi的管理后台，我们将网线一头插到软路由的eth0口，另外一端插到电脑上，因为ESXi没有DHCP(Dynamic Host Configuration Protocol, 动态主机配置协议) 功能，没办法给电脑自动分配IP地址，这里要手动修改一下。
 

#### ESXi安装macOS前的虚拟机配置

 
ESXi安装好后我们使用浏览器，打开ESXi的后台管理地址并登录https://10.10.10.111/ui/#/login
 
依次进入到【存储】-【数据存储】-【数据存储浏览器】-【上载】这里将macOS系统的iso与vmtools-darwin.iso上传到ESXi
 
![](/image/systems/hackintosh-tutorials/esxi_1739952983-QQ20250219-154416.webp)
创建虚拟机-因为目前 esxi unlocker 项目还不完全支持 ESXi 8，所以这里虚拟机的兼容性设置成 ESXi 7.0 U2：
 
![](/image/systems/hackintosh-tutorials/esxi_1739952984-QQ20250219-155639.webp)
 
macOS 版本选择 macOS 12，时间上我们使用 macOS 12 安装 macOS 15 也是完全 OK 的。
 
硬件这里设置 4 核 8GB，为了方便后面直接直通显卡，我们这里需要勾选一下「预留所有客户机内存」选项：
 
![](/image/systems/hackintosh-tutorials/esxi_1739952984-QQ20250219-155601.webp)
 
为了更好的网络性能，网卡设置成 VMXNET3 万兆类型，然后手动选择我们之前上传好的 iso 镜像文件：
 
![](/image/systems/hackintosh-tutorials/esxi_1739952985-QQ20250219-155944.webp)
 

#### ESXi安装macOS

 
以上配置好之后，正常启动虚拟机就到了如下的界面，选择中文简体继续
 
![](/image/systems/hackintosh-tutorials/esxi_1739952985-QQ20250219-160406.webp)
 
下一步您将看到此菜单。进入磁盘工具。
 
[![](/image/systems/hackintosh-tutorials/esxi_1732261344-E688AAE5B18F2024-11-22-15.16.00.jpeg)](https://imacos.top/wp-content/uploads/2024/11/1732261344-%E6%88%AA%E5%B1%8F2024-11-22-15.16.00.jpeg)
 
显示所有设备，方便我门看每个硬盘的分区
 
[![](/image/systems/hackintosh-tutorials/esxi_1732261344-E688AAE5B18F2024-11-22-15.16.37.png)](https://imacos.top/wp-content/uploads/2024/11/1732261344-%E6%88%AA%E5%B1%8F2024-11-22-15.16.37.png)
 
需要选择到根目录的层级格式化硬盘，这里以APPLE HD的这块硬盘为例，来演示一下单硬盘单系统的格式方式，
 
先选择硬盘的根目录，然后点抹掉，名称还是一样建议英文，格式APFS，方案这里选 GUID分区图
 
[![](/image/systems/hackintosh-tutorials/esxi_1732261345-E688AAE5B18F2024-11-22-15.19.47.png)](https://imacos.top/wp-content/uploads/2024/11/1732261345-%E6%88%AA%E5%B1%8F2024-11-22-15.19.47.png)
 
格式磁盘好了之后关闭磁盘分区工具，回到安装界面，选择系统安装项继续安装
 
[![](/image/systems/hackintosh-tutorials/esxi_1732261346-E688AAE5B18F2024-11-22-15.22.18.png)](https://imacos.top/wp-content/uploads/2024/11/1732261346-%E6%88%AA%E5%B1%8F2024-11-22-15.22.18.png)
 
到了选择磁盘这里，选择Mac的盘安装。 [![](/image/systems/hackintosh-tutorials/esxi_1732261347-E688AAE5B18F2024-11-22-15.23.05.png)](https://imacos.top/wp-content/uploads/2024/11/1732261347-%E6%88%AA%E5%B1%8F2024-11-22-15.23.05.png)
 
这一步安装完成后电脑会自动重启几次，正常情况系统会自动重启几次就到了如下界面
 
[![](/image/systems/hackintosh-tutorials/esxi_1732263443-E688AAE5B18F2024-11-22-16.02.28.png)](https://imacos.top/wp-content/uploads/2024/11/1732263443-%E6%88%AA%E5%B1%8F2024-11-22-16.02.28.png)
 
这里的设置都是可以进系统设置的，所以这里一律选择，不传输、不接入网络、不登录ID，能跳过就跳过，一直下一步，设置好用户名与密码就能进入到苹果系统了。
 
进入系统后打开 VMware Tools 安装
 
![](/image/systems/hackintosh-tutorials/esxi_1739955316-QQ20250219-163841.webp)
 
安装 VMware Tools 工具会提示进入隐私与安全性中允许
 
![](/image/systems/hackintosh-tutorials/esxi_1739955316-QQ20250219-163946.webp)
 
安装完成后重启电脑，在硬件信息-图形显卡/显示器中就会显示显存128M。macOS系统的安装部分到这里也就结束了。
 
![](/image/systems/hackintosh-tutorials/esxi_1739955317-QQ20250219-164036.webp)
 

#### 直通 USB

 
首先在「管理」-「硬件」-「PCI 设备」-「搜索 USB」将我们的 USB Controller 切换直通，使其处在活动状态：
 
![](/image/systems/hackintosh-tutorials/esxi_1739956222-1681736137555.webp)
 

##### 直通 USB 控制器

 
这样我们可以简单一点，以直通 PCI 的形式，直接将 USB 控制器添加到 VM 虚拟机中：
 
![](/image/systems/hackintosh-tutorials/esxi_1739956223-16817367795400.webp)
 
这种确实是简单高效的，仔细想一下，我们需要直通 USB 的 VM 没有这么多，最多也就是 Windows 打游戏和 macOS 黑苹果办公，恰好我这边正好有两个 USB Controller，每个 VM 占用一个也是个很不错的方案。
 

##### 直通部分 USB 设备

 
其实通过上述一番操作之后，虚拟机系统也可以来识别一些 USB 设备信息，我们选择添加 USB 设备即可直通：
 
![](/image/systems/hackintosh-tutorials/esxi_1739956223-16817369266984.webp)
 
但是这些设备并不是很齐全，比如这里就确实了键盘和鼠标的 USB 信息。
 

##### 直通任意 USB 设备

 
首先 ESXi 开启服务模式，SSH 进入 ESXi 的 shell 环境，使用
   
```
lsusb
```
  
查看列出目前 ESXi 宿主机的 USB 设备信息：
 
![](/image/systems/hackintosh-tutorials/esxi_1739956224-16817379189075.webp)
 
将上述需要直通的 USB 信息整理出下面的表格：
     厂商 ID  设备 ID  设备说明      0d8c  0014  **USB 音频设备**   08bb  2902  **USB 音频设备**   0f39  0611  **IKBC Poker 键盘**   046d  c08b  **罗技 G502 鼠标**     
以 `usb.quirks.device<编号> = "0x<厂商ID>:0x<设备ID> allow"`的格式，添加到 /etc/vmware/config 文件后面
   
```
vi /etc/vmware/config
```
  
根据我的情况文件末尾添加如下内容：
   
```
usb.quirks.device0 = "0x0d8c:0x0014 allow"

usb.quirks.device1 = "0x08bb:0x2902 allow"

usb.quirks.device2 = "0x0f39:0x0611 allow"

usb.quirks.device3 = "0x046d:0xc08b allow"
```
  
![](/image/systems/hackintosh-tutorials/esxi_1739956224-16817405863400.webp)
 
继续编辑 /bootbank/boot.cfg 启动引导文件，禁用掉 VMkernel 对上述设备获取控制权。：
   
```
vi /bootbank/boot.cfg
```
  
在 `kernelopt`参数后面添加如下格式：
   
```
CONFIG./USB/quirks=0x<厂商ID>:0x<设备ID>::0xffff:UQ_KBD_IGNORE:0x<厂商ID>:0x<设备ID>::0xffff:UQ_KBD_IGNORE
```
  
最终编辑的内容如下：
   
```
CONFIG./USB/quirks=0x0d8c:0x0014::0xffff:UQ_KBD_IGNORE:0x08bb:0x2902::0xffff:UQ_KBD_IGNORE:0x0f39:0x0611::0xffff:UQ_KBD_IGNORE:0x046d:0xc08b::0xffff:UQ_KBD_IGNORE
```
  
![](/image/systems/hackintosh-tutorials/esxi_1739956224-16817409407883.webp)
 
操作完成后，重启 ESXi 宿主机，然后我们就可以通过编辑虚拟机设置来灵活地添加 USB 键鼠设备了：
 
![](/image/systems/hackintosh-tutorials/esxi_1739956223-1681741583588.webp)
 
直通后我们就可以使用键盘和鼠标操作我们的黑苹果虚拟机了，进系统也发现可以正常识别了我们的 USB 设备：
 
![](/image/systems/hackintosh-tutorials/esxi_1739956225-16817419137038.webp)
 

#### 直通独显

  
**N 卡直通会比较简单，没那么曲折**，但是众所周知 N 卡在 macOS 系统上基本上是半残废的状态，要想很棒的黑苹果体验，还是得准备一个 AMD 免驱独显才可以。
  
下面说到重头戏了，就是直通 AMD 免驱独显，本次使用的 RX 570 公版涡轮显卡来进行演示，实际上好友 darkless 他使用的是 RX 6600 也是成功直通使用的，而且不像黑苹果物理主机一下需要添加防黑苹果参数，这一点还是有点小意外的，话不多说，开始正式教程。
 

##### 切换直通状态

 

##### 直通 PCI 显卡

 
直通一下显卡相关的设备，一般就是显卡本身以及 HDMI 音频，部分带 Type-C 的显卡可能还需直通一下 Type-C 部分：
 
![](/image/systems/hackintosh-tutorials/esxi_1739958278-16817447282745.webp)
 

##### 实际问题情况

 
显示器黑屏没有反应，但是系统报告信息里面已经识别到了 A 卡了，可惜就是无法驱动：
 
![](/image/systems/hackintosh-tutorials/esxi_1739958279-16817450282505.webp)
 

##### 正确直通姿势

 
可以看到上一步我们的操作 AMD 的独显肯定是直通成功了的，否则也不会在系统报告里面看到我们的独显了，但是理论上我们的 A 卡肯定都是免驱的，那么这是为什么呢？
 
不铺垫了，直接在虚拟机的高级选项里面添加如下两个变量即可：
     参数  参数值      pciPassthru0.opromEnabled  TRUE    pciPassthru0.filename  显卡 ROM 的路径      
其中 `0`指的是直通独显的 PCie 位置索引，懂编程的都明白，计算机的索引都是从 `0`开始，所以这里写 `0`
 
![](/image/systems/hackintosh-tutorials/esxi_1739958279-16839793188909.webp)
 
以上一番操作过后，顺利的话大概率是成功的，下面是直通的一些 Tips 具体还得大家自己去实践总结：
 
- ESXi 下黑苹果的 AMD 5000 和 6000 系列显卡可能无需 Whatevergreen.kexts 的放黑屏参数也可正常显示
- 开机没有苹果 logo，但是出现进度条的话，大概率是成功的，耐心等待即可
- 如果直通显示失败，不妨 ESXi 开机前拔掉 A 卡的显示器连接线，ESXi 开机成功后再插上显示器线
- ROM 可以从 VBIOS 网上下载，当然最好是 Windows 下手动使用 GPU-Z 提取最稳
- 显卡直通 HiDPi 或者显示颜色不正常的话，不妨拔插一下显示器连接线
- 确定直通成功后，将 `svga.present`参数改为 FALSE，即可关闭内置的虚拟显示器

 
直通部分因为本人设备只支持pve，esxi下不支持直通，以上直通部分引用了国光的直通成功案例。
 

#### 添加OPenCore引导

 
小提示：虚拟机无法正常关机，否则会导致第二次开机卡OC代码。 解决方法：虚拟机内部直接重启，ESXi下直接关闭电源再打开电源。
 
使用本文分享的 OpenCore EFI 引导，使用 OCC 编辑器添加到 macOS 系统的 EFI 引导分区下
 
![](/image/systems/hackintosh-tutorials/esxi_1739963388-321606dd-1a2e-451e-9df7-256f3ab9f811.webp)
 
完成后关闭虚拟机，编辑虚拟机设置，勾选「强制执行 BIOS 设置」：
 
![](/image/systems/hackintosh-tutorials/esxi_1739963389-QQ20250219-185327.webp)
 
开启虚拟机，进入虚拟机的 BIOS 设置，先添加 OC 引导，在将OC引导顺序调至第一启动
 
1. 添加 OC 引导：「BIOS 首页」 - 「Enter Setup」- 「Configre boot opitons」-「Add boot option」-「找到 EFI 分区选择 BOOT/BOOTx64.efi」- 「Input the description （自己输入OpenCore） 」 - 「Commit changes and exit 」  
![](/image/systems/hackintosh-tutorials/esxi_1739963389-QQ20250219-185746.webp)
2. 将OC引导顺序调至第一启动：「BIOS 首页」 - 「Enter Setup」- 「Configre boot opitons」-「Chnge boot order」-「Change the order下按+号将 OpenCore调整到第一位 」- 「 Commit changes and exit」  
![](/image/systems/hackintosh-tutorials/esxi_1739963389-QQ20250219-190119.webp)
3. 设置好后返回BIOS主页面，选择 OpenCorej进入  
![](/image/systems/hackintosh-tutorials/esxi_1739963390-QQ20250219-190212.webp)

 
然后顺利开机，OC 引导成功，机型和三码都被我们成功修正了，CPU 型号也正常识别了：
 
![](/image/systems/hackintosh-tutorials/esxi_1739963390-QQ20250219-190242.webp)
百度网盘 [立即下载](https://pan.baidu.com/s/1BH4Emu4me0zNPQeQY5mrrQ)提取码: tbch [复制](javascript:;)天翼云盘 [立即下载](https://cloud.189.cn/t/RjUzAjYniu2i)提取码: yhz2 [复制](javascript:;)夸克网盘 [立即下载](https://pan.quark.cn/s/552eb3a25736)提取码: EpBv [复制](javascript:;)客服QQ271638927，网站统一解压密码imacos.top  **原文链接： [https://imacos.top/2025/02/18/vmware-esxi/](https://imacos.top/2025/02/18/vmware-esxi/)，转载请注明出处。    [** 0](javascript:;) [** 1](javascript:;)  [**](javascript:;)[**](#)[**](#)[**](#)[**](#)
