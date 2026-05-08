---
title: 0xB-3 虚拟机黑果教程(ESXi7+)
description: VMware ESXi 8.0 虚拟机安装 macOS 黑果完整教程，含显卡直通与 OpenCore 引导
pubDate: 02 04 2026
image: /image/systems/hackintosh-tutorials/esxi_1740141109--1080.webp
categories:
  - Hackintosh
tags:
  - Hackintosh
badge: Hackintosh

---

> 本文是[《0xB 虚拟机安装黑果教程》](/blog/hackintosh-tutorialb)的子章节，点击链接可查看全部虚拟机教程。

## b.3 ESXi 黑果

> 原文链接：https://imacos.top/2025/02/18/vmware-esxi/

### 新手零基础VMware ESXi 8.0虚拟机安装macOS黑果Hackintosh系统OPenCore引导直通独立显卡GPU优化保姆级安装过程

![](/image/systems/hackintosh-tutorials/esxi_1740141109--1080.webp)

#### 视频教程

[![](/image/systems/hackintosh-tutorials/esxi_youtubw.png)](https://youtu.be/61c62Oj5Lpo)

[点击进入YouTube观看》](https://youtu.be/pIGJ7uk7AHw)

[![](/image/systems/hackintosh-tutorials/esxi_bE7AB99.png)](https://www.bilibili.com/video/BV1Pm4y1A7xV?share_source=copy_web&vd_source=7bd72a33626c5f2ddc675689fd213860)

[点击进入bilibili观看》](https://www.bilibili.com/video/BV1qkAfeFELB/?share_source=copy_web&vd_source=7bd72a33626c5f2ddc675689fd213860)

#### 开始前准备工作

注：所有工具已经打包好了，在本文下载地址中就能下载

1. ESXi 8.0的安装镜像 目前 ESXi 原生 8.0 的镜像无法安装 macOS Unlocker 解锁补丁，如果不使用 macOS Unlocker 补丁的话，开启 macOS 虚拟机会无限重启，目前网上主流办法是从 ESXi 7.0 镜像提取苹果虚拟机部分，重新封装到新的 8.0 镜像中，教程中提供的ESXi 8.0镜像集成macOS Unlocker、slic26、usb nvme以及net驱动。如果自己想折腾，也可以下载 ESXi 7.0 镜像用其实也不错，也可以黑果，稳定性还高。

2. macOS 的安装镜像 macOS 安装镜像使用的是iso格式的镜像，本次提供的是macOS Sequoia 15 版本，如果你需要更多的版本，可以在黑果网站系统分类下，去下载虚拟机版ISO。

3. 其他准备事项
   - u盘一个，用于写入ESXi 8.0的安装镜像
   - 写盘工具，这里用 balenaEtcher（如果部分电脑不识别U盘，建议使用 [Ventoy](https://www.ventoy.net/cn/download.html)）
   - 【可选】如果有直通显卡需求，推荐支持 macOS 免驱的 AMD 独显
   - 【可选】如果有登录 Apple ID 的需求，建议添加 OPenCore EFI 引导改码

4. 主板 BIOS 建议如下设置：
   - 开启 VT-x Intel（VMX）Virtualization Technology（PCIe 硬件直通必须）
   - 开启 VT-d （PCIe 硬件直通必须）
   - 开启 SR-IOV 虚拟化技术
   - 开启 Above 4G Decoding（如果玩 vGPU 方案需要开启这个选项）
   - 开启 Numa（多路 CPU 建议开启）
   - 开启 x2APIC（PCIe 硬件直通需要）
   - 开启 AES 指令集
   - 开启 IOMMU / ACS
   - 关闭 bios安全引导
   - 注：如果是英特尔12代以上的处理器，建议设置CPU核心数的E核，Active Efficient-cores 设置为0或关闭

#### ESXi 安装 U盘制作

这里介绍两种方式给大家选择

方式一：balenaEtcher直接将ISO写入到U盘（windows与Mac版均可）

![](/image/systems/hackintosh-tutorials/esxi_1739933070-QQ20250219-092852.webp)

方式二：使用Ventoy 工具（windows上使用）

1. 首先准备一个空闲的U盘，用Ventoy 一键制作USB启动盘。打开 [ventoy](https://www.ventoy.net/cn/download.html)下载安装，Ventoy 是开源软件，下载使用都是免费的，直接去官网或者 GitHub 页面下载即可。

![](/image/systems/hackintosh-tutorials/esxi_1739933070-QQ20250219-093450.webp)

2. 在PC上安装，并运行Ventoy 软件，程序会自动检测当前 USB 设备。如果插入了多个U盘注意识别，别搞错了，造成数据丢失。点击安装开始制作：

![](/image/systems/hackintosh-tutorials/esxi_1739933070-QQ20250219-093652.webp)

完成后可以看到 U 盘已经被重命名为 Ventoy。

![](/image/systems/hackintosh-tutorials/esxi_1739933068-63d7ecc76d40f998.png_e1080.webp)

打开磁盘管理，可以看到 U 盘被细分为 2 个大分区，Ventoy 分区为活动分区，exFAT 文件系统，用于存放 ISO 文件，exFAT 文件系统也能更好的跨平台使用。

![](/image/systems/hackintosh-tutorials/esxi_1739933069-63d7ecc770a1d3553.png_e1080.webp)

直接下载需要安装的系统镜像放到 U 盘里就可以了。这里我们把ESXi的ISO放进去。

![](/image/systems/hackintosh-tutorials/esxi_1739933069-63d7ecc8025772743.png_e1080.webp)

#### 安装ESXi 8.0

如果使用的是balenaEtcher，直接从U盘的EFI引导进入，如果使用的是Ventoy，则从U盘的Ventoy进入界面，选择要安装的镜像文件即可。

![](/image/systems/hackintosh-tutorials/esxi_1739933068-63d7ecc96ec1c8643.jpg_e1080.webp)

进到PE后，用分区工具把软路由硬盘分区全部删除(注意不要删错)，这里有个大坑，如果硬盘存在分区的话，很可能造成无法安装的bug，尤其是对于拆机的硬盘来说，一定要将上面的分区及隐藏分区全部删掉。

删除掉之后，再次进入U盘的引导，选择ESXi 8.0的ISO镜像进入

（可选项）修改ESXI的默认空间：在读秒阶段，快速按下Shift+O，调出命令行，来修改ESXI的默认空间大小：

![](/image/systems/hackintosh-tutorials/esxi_1739933068-63d7ecc98e2069432.jpg_e1080.webp)

在下面命令行输入：autoPartotionOSDataSize=20480。命令注意区分大小写，我这里将默认空间设置为20GB。硬盘空间不足的话推荐设置8192(8GB)即可：

![](/image/systems/hackintosh-tutorials/esxi_1739933069-63d7ecc99de743199.jpg_e1080.webp)

回车，开始跑码，等待跑码完成。

![](/image/systems/hackintosh-tutorials/esxi_1739933071-QQ20250219-095359.webp)

这一步 **Starting service vmtoolsd**/ **Starting service gpuManager**的加载时间会比较长，一定要耐心等待，不是死机了。

![](/image/systems/hackintosh-tutorials/esxi_1739933071-QQ20250219-095508.webp)

一直等待到出现如下界面，选择 Continue，按回车，继续下一步：

![](/image/systems/hackintosh-tutorials/esxi_1739933071-QQ20250219-095718.webp)

同意 VMWARE 的条款，按F11，继续下一步：

![](/image/systems/hackintosh-tutorials/esxi_1739933071-QQ20250219-095748.webp)

选择安装位置，可以看到有两个盘，用键盘上下键调整，选择安装位置。一定要看好，不要安装错位置。选择好了回车继续：

![](/image/systems/hackintosh-tutorials/esxi_1739933072-QQ20250219-095919.webp)

选择键盘布局，回车继续下一步：

![](/image/systems/hackintosh-tutorials/esxi_1739933072-QQ20250219-100010.webp)

设置登录密码：弹出密码输入页，这里输入密码，需要输入两遍，密码需要大小写带数字。输入完毕后，回车进行下一步：

![](/image/systems/hackintosh-tutorials/esxi_1739933072-QQ20250219-100127.webp)

弹出确认安装位置选项，看一下安装位置有没有问题，没选错，按F11继续安装：

![](/image/systems/hackintosh-tutorials/esxi_1739933073-QQ20250219-100153.webp)

等待加载完成：

![](/image/systems/hackintosh-tutorials/esxi_1739933073-QQ20250219-100221.webp)

到这里拔掉U盘，之后按回车，重启。

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

上下键选择你要用来管理ESXI的网口，这里有些工程机的网口是错乱的，可以通过插拔网线来确定是不是正确。

![](/image/systems/hackintosh-tutorials/esxi_1739933070-ef33bd16085ef84aa67f76b860e0c226.webp)

回车保存，自动退回到【网络配置】页面：选择设置IPV4选项：

![](/image/systems/hackintosh-tutorials/esxi_1739933075-QQ20250219-101416.webp)

设置下面三个选项【IPV4 Address(ESXI管理地址)】、【Subnet Mask(子网掩码)】、【Default Gateway(默认网关)】：

- IPV4 Address【ESXI管理地址】：10.10.10.111
- Subnet Mask【子网掩码】：255.255.255.0
- Default Gateway【默认网关】：10.10.10.252

![](/image/systems/hackintosh-tutorials/esxi_1739933076-QQ20250219-101436.webp)

这个管理地址是后面我们在web端进行访问的地址，千万不要和ikuai以及openwrt冲突。按回车保存：

退出来之后，在页面右上角就看到我们设置的信息了，按ESC，退出：

![](/image/systems/hackintosh-tutorials/esxi_1739933076-QQ20250219-101616.webp)

在弹出的页面，按Y，并自动重启网络：

![](/image/systems/hackintosh-tutorials/esxi_1739933076-QQ20250219-101638.webp)

网络重启完后，可以看到，已经设置成功了：

![](/image/systems/hackintosh-tutorials/esxi_1739933077-QQ20250219-101751.webp)

按ESC，回到首页：

![](/image/systems/hackintosh-tutorials/esxi_1739933077-QQ20250219-101809.webp)

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

显示所有设备，方便我们看每个硬盘的分区

[![](/image/systems/hackintosh-tutorials/esxi_1732261344-E688AAE5B18F2024-11-22-15.16.37.png)](https://imacos.top/wp-content/uploads/2024/11/1732261344-%E6%88%AA%E5%B1%8F2024-11-22-15.16.37.png)

需要选择到根目录的层级格式化硬盘，先选择硬盘的根目录，然后点抹掉，名称还是一样建议英文，格式APFS，方案这里选 GUID分区图

[![](/image/systems/hackintosh-tutorials/esxi_1732261345-E688AAE5B18F2024-11-22-15.19.47.png)](https://imacos.top/wp-content/uploads/2024/11/1732261345-%E6%88%AA%E5%B1%8F2024-11-22-15.19.47.png)

格式磁盘好了之后关闭磁盘分区工具，回到安装界面，选择系统安装项继续安装

[![](/image/systems/hackintosh-tutorials/esxi_1732261346-E688AAE5B18F2024-11-22-15.22.18.png)](https://imacos.top/wp-content/uploads/2024/11/1732261346-%E6%88%AA%E5%B1%8F2024-11-22-15.22.18.png)

到了选择磁盘这里，选择Mac的盘安装。

[![](/image/systems/hackintosh-tutorials/esxi_1732261347-E688AAE5B18F2024-11-22-15.23.05.png)](https://imacos.top/wp-content/uploads/2024/11/1732261347-%E6%88%AA%E5%B1%8F2024-11-22-15.23.05.png)

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

##### 直通部分 USB 设备

其实通过上述一番操作之后，虚拟机系统也可以来识别一些 USB 设备信息，我们选择添加 USB 设备即可直通：

![](/image/systems/hackintosh-tutorials/esxi_1739956223-16817369266984.webp)

但是这些设备并不是很齐全，比如这里就缺失了键盘和鼠标的 USB 信息。

##### 直通任意 USB 设备

首先 ESXi 开启服务模式，SSH 进入 ESXi 的 shell 环境，使用

```
lsusb
```

查看列出目前 ESXi 宿主机的 USB 设备信息：

![](/image/systems/hackintosh-tutorials/esxi_1739956224-16817379189075.webp)

将上述需要直通的 USB 信息整理出下面的表格：

| 厂商 ID | 设备 ID | 设备说明 |
|---------|---------|---------|
| 0d8c | 0014 | USB 音频设备 |
| 08bb | 2902 | USB 音频设备 |
| 0f39 | 0611 | IKBC Poker 键盘 |
| 046d | c08b | 罗技 G502 鼠标 |

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

继续编辑 /bootbank/boot.cfg 启动引导文件，禁用掉 VMkernel 对上述设备获取控制权：

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

直通后我们就可以使用键盘和鼠标操作我们的黑果虚拟机了，进系统也发现可以正常识别了我们的 USB 设备：

![](/image/systems/hackintosh-tutorials/esxi_1739956225-16817419137038.webp)

#### 直通独显

**N 卡直通会比较简单，没那么曲折**，但是众所周知 N 卡在 macOS 系统上基本上是半残废的状态，要想很棒的黑果体验，还是得准备一个 AMD 免驱独显才可以。

下面说到重头戏了，就是直通 AMD 免驱独显，本次使用的 RX 570 公版涡轮显卡来进行演示。

##### 直通 PCI 显卡

直通一下显卡相关的设备，一般就是显卡本身以及 HDMI 音频，部分带 Type-C 的显卡可能还需直通一下 Type-C 部分：

![](/image/systems/hackintosh-tutorials/esxi_1739958278-16817447282745.webp)

##### 实际问题情况

显示器黑屏没有反应，但是系统报告信息里面已经识别到了 A 卡了，可惜就是无法驱动：

![](/image/systems/hackintosh-tutorials/esxi_1739958279-16817450282505.webp)

##### 正确直通姿势

可以看到上一步我们的操作 AMD 的独显肯定是直通成功了的，否则也不会在系统报告里面看到我们的独显了，但是理论上我们的 A 卡肯定都是免驱的，那么这是为什么呢？

不铺垫了，直接在虚拟机的高级选项里面添加如下两个变量即可：

| 参数 | 参数值 |
|------|--------|
| pciPassthru0.opromEnabled | TRUE |
| pciPassthru0.filename | 显卡 ROM 的路径 |

其中 `0`指的是直通独显的 PCie 位置索引，懂编程的都明白，计算机的索引都是从 `0`开始，所以这里写 `0`

![](/image/systems/hackintosh-tutorials/esxi_1739958279-16839793188909.webp)

以上一番操作过后，顺利的话大概率是成功的，下面是直通的一些 Tips 具体还得大家自己去实践总结：

- ESXi 下黑果的 AMD 5000 和 6000 系列显卡可能无需 Whatevergreen.kexts 的放黑屏参数也可正常显示
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

3. 设置好后返回BIOS主页面，选择 OpenCore进入

![](/image/systems/hackintosh-tutorials/esxi_1739963390-QQ20250219-190212.webp)

然后顺利开机，OC 引导成功，机型和三码都被我们成功修正了，CPU 型号也正常识别了：

![](/image/systems/hackintosh-tutorials/esxi_1739963390-QQ20250219-190242.webp)

> 原文链接：https://imacos.top/2025/02/18/vmware-esxi/，转载请注明出处。
