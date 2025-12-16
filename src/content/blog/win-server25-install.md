---
title: Windows Server 2025 安装优化教程
description: 本教程将介绍如何安装Windows Server 2025，并且优化系统性能，适合日常使用
pubDate: 12 15 2025
image: /image/systems/win-server25-install/QQ20251216-124639.jpg
categories:
  - System
tags:
  - Windows
badge: Windows
---

# Windows Server 2025 安装优化教程

> 温馨提示：本教程只适合尝鲜或者<u>对Hyper-V DDA直通需求</u>或者<u>Windows Server系统日常使用</u>的高级玩家食用
>
> 实际上日常使用起来还是有一些问题和不便之处，**建议先阅读教程，务必谨慎安装系统并做好系统和文件备份**！

## 一、前言 & 安装原因

​	因为去年入手了Intel 13代平台主机，平时也有使用虚拟机的需求，但众所周知，如果虚拟机没有直通核显/独显等硬件，效率大打折扣，并且Windows桌面端只有Hyper-V支持硬件直通，但Hyper-V孱弱性能一直备受虚拟机圈差评。	然而，Server2025支持了Hyper-V自动调用大小核，并且由于Server上支持Hyper-V使用硬件直通(DDA)，并且Server系统对内存占用低，内存泄漏少，并且没有预置的烦人的安全中心相关组件，因此或许适合桌面使用。并且Server2025系统还更新了一些特性：

> ### 可扩展性增强
>
> 在 Windows Server 2025 中，Hyper-V 的支持能力如下：
>
> - 单台虚拟机的配置上限为：2048 个 vCPU、240 TB 内存容量、4 个 SCSI 控制器、256 个 SCSI 硬盘、68 个虚拟网络适配器、4 个虚拟光纤通道适配器，以及单个硬盘容量高达 64 TB。
> - 对于 Hyper-V 主机本身，支持的内存可达 4 PB。在集群配置方面，可以扩展到 64 个节点，并且能够托管最多 8000 台虚拟机。
>
> ### GPU 虚拟化（跨 VM 共享 GPU）
>
> 随着 GPU（图形处理器）在 AI 等领域中的核心地位不断上升，Hyper-V 对 GPU 的现有支持显然已经落后于当前需求。直到现在，也只能通过直通（[DDA](https://learn.microsoft.com/en-us/windows-server/virtualization/hyper-v/deploy/deploying-graphics-devices-using-dda)）的方式将 GPU 分配给单一 VM，使其成为该 VM 的专属资源。
>
> 然而，考虑到现代 GPU 的高性能和高成本，这种分配方式显得「非常降智」。因此，在 Windows Server 2025 中，引入了一项重要变革：允许对 GPU 进行划分，让它能够在多 VM 之间共享。
>
> ![QQ20241111-205413](/image/systems/win-server25-install/QQ20241111-205413.png)
>
> 除了提高资源利用率，这种 GPU 虚拟化还支持在 Cluster 内和独立 Host 之间进行实时迁移。以前，采用直接将物理硬件分配给 VM 的概念，会阻碍 VM 在不中断的情况下迁移到另一个主机。而在采用 GPU 划分（GPU-P）的情况下，VM 的高可用性同样得到了全面支持。
>
> 要使用 CPU-P，需要满足一定的前提条件：
>
> | 先决条件 | 要求                                                         |
> | -------- | ------------------------------------------------------------ |
> | 硬件     | 支持 SR-IOV 的服务器，搭载 AMD Milan 或 Intel Sapphire Rapids 处理器，并搭载 Nvidia 的 GPU A2、A10、A16 和 A40。 |
> | 软件     | Guest OS 支持 SR-IOV，包括 Windows 10/11、Windows Server 2019/2022 以及 Ubuntu 18.04/20.04/22.04 LTS。 |
>
> ### GPU 池化
>
> 除了 GPU-P，Windows Server 2025 还支持反向操作：将多个图形处理器合并成一个虚拟 GPU。这种汇聚专为故障切换设计，不支持实时迁移，因为它依赖于 DDA。
>
> ![QQ20241111-205524](/image/systems/win-server25-install/QQ20241111-205524.png)
>
> 管理员需要在每个集群节点上创建一个同名池，并将虚拟机分配到该池中。在节点故障的情况下，集群将会在另一台服务器上启动虚拟机，并自动将其连接到相应的池。
>
> ### 无 AD 集群中的实时迁移（基于 CA）
>
> 自 Server 2016 版本以来，Windows Server 允许在工作组中建立集群。这种配置主要适用于小规模部署，例如远程办公，或组织希望基础架构尽可能简单。
>
> 传统上，不属于 AD 域的集群不支持所有工作负载。而对于 Hyper-V 角色，它仅提供了快速迁移的选项。但在 Windows Server 2025 中，事情正在起变化，引入了基于证书的在无 AD 集群上进行实时迁移的功能。
>
> ### 集群中不同类型的（混合） CPU
>
> 另外，关于动态处理器兼容性的更新也值得一提。该功能允许将来自同一厂商，但不同代差 CPU 的服务器分组到同一 Cluster 中。在这种情况下，Windows 会仅利用它们共同拥有的最基本、最低层级的 CPU 功能，以确保整个 Cluster 的稳定性和一致性。
>
> 在 Windows Server 2025 版本中，甚至可以混合使用来自第三和第四代的 Intel Xeon 处理器。
>
> 
>
> ### 默认使用 Gen2 VM
>
> 目前，在使用 Hyper-V 管理器或 Windows ![QQ20241111-205530](/image/systems/win-server25-install/QQ20241111-205530.png)Admin Center 创建虚拟机时，默认仍然是 Gen1。
>
> 但在 Windows Server 2025 中，将会默认选择第二代虚拟机。Gen2 虚拟机不仅提供更高的可扩展性，而且支持一系列先进功能，如安全启动、TPM 和 UEFI 等。
>
> 相关阅读：[如何启用 TPM 和安全启动](https://www.sysgeek.cn/enable-tpm-and-secure-boot-for-windows-11/)
>
> ### 存储改进
>
> Windows Server 2025 在存储功能方面也引入了[一系列增强](https://www.sysgeek.cn/windows-server-2025-new-storage-features/)，特别有益于虚拟化工作负载：
>
> - **NVMe 性能提升**：借助新的本机驱动程序，[NVMe](https://www.sysgeek.cn/what-is-nvme/) 性能得到显著改进。相较于 Server 2022，将使 IOPS 提高高达 90%。此外，新操作系统还将包含一个用于连接到 SAN（存储区域网络）的 NVMe over Fabric 初始程序。
> - **新的 ReFS 去重功能**：ReFS 迎来了一项全新的去重功能，与当前实现不同的是，它不再局限于冷存储。这一改进涉及文件服务器上（不太变化）的数据。而且，新的 ReFS 去重也适用于热数据，如虚拟驱动器，为 VHD(X) 和 ISO 文件带来高达 90% 的存储空间节省。
>
> ------
>
> 在「假死」一段时间之后，Windows Server 2025 中的 Hyper-V 迎来了一些引人注目的更新。其中之一是 GPU 虚拟化，这是 VMware 早就拥有的功能，但对于 AI 应用尤为关键。GPU 虚拟化支持 GPU 的划分和池化两种方向，其中：后者仅用于故障切换，而 GPU-P 则允许分配了虚拟 GPU 的 VM 进行实时迁移。
>
> 在未加入 AD 的集群中支持实时迁移是另一项新增功能，而且动态处理器兼容性功能让第三代和第四代 Xeon 处理器能够在同一集群中共存。

### 当前体验过程中的优点

1. **内存占用低，用起来比Win11流畅**，64G内存开机占用约4~6G（包括预占用的内存）
2. **没有烦人的Windows Defender、Windows Update强制更新、驱动自动安装然后掉驱动**
3. **Hyper-V支持的特性多，虚拟机占用低**，并且可以直通PCI和其他的硬件设备(DDA)

### 当前体验过程中的缺点

1、**驱动需要自己手动安装，Metro应用包括商店应用都没有，需要自己手动安装**

2、新版本计算器、记事本、照相机、照片和视频查看器**都没有**，新终端反而有

3、**疑似部分驱动(Intel Xe核显等)兼容性不太好**，核显+独显启用偶尔有闪屏问题

4、QQ新版本截图可能有Bug，部分软件可能有兼容性问题（较少）

5、开机解锁需要Ctrl-Alt-Del登录（服务器常规操作）

## 二、下载 & 安装教程

### （1）系统下载地址

#### Windows Server 2025 (x64) - DVD (Chinese-Simplified)

##### **ED2K下载地址：**

```
ed2k://|file|zh-cn_windows_server_2025_x64_dvd_1d93dd12.iso|6222254080|ADB825759C4D4B8CAADCE106D9C50A73|/
```

##### **BT种子下载地址：**

```
magnet:?xt=urn:btih:e6d368b1c86722e6106506b5a08e5b1f66a388a1&dn=zh-cn_windows_server_2025_x64_dvd_1d93dd12.iso&xl=6222254080
```

##### 直链下载地址：

```
https://shared.pika.net.cn/d/Sources/OS/image/systems/win-server25-install/Windows/WS/cn_microsoft_windows_server_2025_updated_00331_26100.1742.00240906.iso?sign=Bz9O-zuZZc4ZsWe63mklEDn-YFgCdFn9Q9uFFaOKtMY=:0
```

### （2）系统安装教程

1、双击`Setup.exe`进行安装

![QQ20241111-142909](/image/systems/win-server25-install/QQ20241111-142909.png)

获取更新比较慢，耐心等待

![QQ20241111-142833](/image/systems/win-server25-install/QQ20241111-142833.png)

2、请选择带有`桌面体验`的选项，推荐选择`Datacenter`

![QQ20241111-204712](/image/systems/win-server25-install/QQ20241111-204712.png)

## 2、设置 & 优化教程

### （1）新增普通用户

默认用户是`Administrator`，如果是在服务器上用是合适的，但是**桌面日常使用，并不推荐，并且不能用商店**

1、打开[组策略](gpedit)，点击`计算机配置`——`Windows配置`——`安全设置`——`账户策略`——`密码策略`，按下图设置：

![QQ20241111-203650](/image/systems/win-server25-install/QQ20241111-203650.png)

2、打开 [计算机管理](compmgmt.msc) ，点击`计算机管理`——`本地用户和组`——`用户`——右键`新用户`，勾选`密码永不过期`如下：

![QQ20241111-161854](/image/systems/win-server25-install/QQ20241111-161854.png)

3、打开 [控制面板](panel.msc) ，点击`用户账户`——`更改账户类型`——`选择你的用户`——选择`管理员`：

![QQ20241111-204015](/image/systems/win-server25-install/QQ20241111-204015.png)

4、**注销，然后使用新用户登录**

![QQ20241111-204323](/image/systems/win-server25-install/QQ20241111-204323.png)

### （2）安装网卡驱动

1、右键Windows图标，打开`设备管理器`，或者打开[计算机管理](compmgmt.msc)，点击`计算机配置`——`设备管理器`

2、右键选择你的`以太网适配器`，点击`更新驱动程序`，

![QQ20241111-211013](/image/systems/win-server25-install/QQ20241111-211013.png)

3、`浏览我的电脑以查找驱动程序`：

![QQ20241111-211231](/image/systems/win-server25-install/QQ20241111-211231.png)

4、`让我从计算机上的可用驱动程序列表中选取(L)`

![QQ20241111-211247](/image/systems/win-server25-install/QQ20241111-211247.png)

5、`从磁盘安装`

![QQ20241111-211407](/image/systems/win-server25-install/QQ20241111-211407.png)

6、浏览，然后选择inf文件：
下载地址：https://www.intel.cn/content/www/cn/zh/download/727998/intel-network-adapter-driver-for-microsoft-windows-11.html
> - 如果是Intel千兆网卡，选择：[Network.Lan.Intel.29x.PRO1000.NDIS68]下的inf
> - 如果是Intel2.5G网卡，选择：[Network.Lan.Intel.28x.PRO2500.NDIS68]下的inf
> - 无线网卡和其他网卡驱动，需要你自己手动下载驱动，然后这个教程自行参照安装

![QQ20241111-211408](/image/systems/win-server25-install/QQ20241111-211408.png)

7、选择对应的驱动型号，我是`I219V`，但是驱动没有，就选`I219-LM`就行，前面括号里面的数字区别不大

![QQ20241111-211909](/image/systems/win-server25-install/QQ20241111-211909.png)

8、点下一步安装就行，安装完了会自动刷新加载网络：

![QQ20241111-212051](/image/systems/win-server25-install/QQ20241111-212051.png)

### （2）安装其他驱动

- 下载地址： https://www.sysceo.com/Software-softwarei-id-258.html

### （3）系统组件恢复

- 下载地址： https://shared.pika.net.cn/Sources/OSImages/Windows/11/%E6%81%A2%E5%A4%8D%E7%BB%84%E4%BB%B6


### （5）推荐优化内容

#### 安装必要的组件和功能

1、打开 [服务器管理器](manager) ，选择`角色管理`——`添加角色和功能`：

![QQ20241111-214932](/image/systems/win-server25-install/QQ20241111-214932.png)

2、一路向下，`选择服务器角色`——勾选：`Hyper-V`(虚拟机，可选)，`打印和文件服务`（按需）

![QQ20241111-215133](/image/systems/win-server25-install/QQ20241111-215133.png)

3、功能页面按需选择，建议选择：`媒体基础`、`优质 windows 音频视频体验`，点下一步安装即可。

![QQ20241111-215248](/image/systems/win-server25-install/QQ20241111-215248.png)

#### 关闭Smart Screen提醒

1、[组策略](Shorts/gpedit)，`计算机配置`——`管理模板`——`Windows组件`——`Windows Defender Smartscreen` 按下图设置：

![QQ20241111-213558](/image/systems/win-server25-install/QQ20241111-213558.png)

2、[组策略](Shorts/gpedit)，`计算机配置`——`管理模板`——`Windows组件`——`Windows Defender 防病毒` 按下图设置：

![QQ20241111-213715](/image/systems/win-server25-install/QQ20241111-213715.png)

3、[高级系统设置](system.msc)—— `远程`——`允许远程连接`(可选，有需要的启用。因为默认是不允许的，而桌面端允许)

![QQ20241111-213932](/image/systems/win-server25-install/QQ20241111-213932.png)

### （6）转化为正式版

1、右键`Windows徽标`，选择：`终端(管理员)`，输入下列内容回车：

#### 升级为Windows Server 2025 Standard正式版

```
DISM /online /Set-Edition:ServerDatacenter /ProductKey:DPNXD-67YY9-WWFJJ-RYH99-RM832 /AcceptEula
```

#### 升级为Windows Server 2025 Datacenter正式版

```shell
DISM /online /Set-Edition:ServerDatacenter /ProductKey:CNFDQ-2BW8H-9V4WM-TKCPD-MD2QF /AcceptEula
```

参考：Windows Server 2025 正式版密钥

| 操作系统版本                   | 正式版密钥                    |
| ------------------------------ | ----------------------------- |
| Windows Server 2025 Standard   | DPNXD-67YY9-WWFJJ-RYH99-RM832 |
| Windows Server 2025 Datacenter | CNFDQ-2BW8H-9V4WM-TKCPD-MD2QF |

会自动下载包进行升级，**请确保网络情况好**，升级完成后`重启即可生效`，升级之后还需要`重新激活`

![QQ20241111-214653](/image/systems/win-server25-install/QQ20241111-214653.png)

### （7）激活当前系统

1、右键`Windows徽标`，选择：`终端(管理员)`，输入下列内容回车：

```cmd
slmgr -skms skms.netnr.eu.org
slmgr -ipk D764K-2NDRG-47T6Q-P8T8W-YP6DF
slmgr -ato
```

参考：Windows Server 2025 KMS 客户端安装密钥

| 操作系统版本                                  | KMS 客户端安装密钥            |
| --------------------------------------------- | ----------------------------- |
| Windows Server 2025 Standard                  | TVRH6-WHNXV-R9WG3-9XRFY-MY832 |
| Windows Server 2025 Datacenter                | D764K-2NDRG-47T6Q-P8T8W-YP6DF |
| Windows Server 2025 Datacenter: Azure Edition | XGN3F-F394H-FD2MY-PP6FD-8MCRC |

## 三、使用Hyper-V

### 安装Hyper-V

首先确保已经安装，如果没有，打开 [服务器管理器](manager.msc) ，选择`角色管理`——`添加角色和功能`：

![QQ20241111-214932](/image/systems/win-server25-install/QQ20241111-214932.png)

2、一路向下，`选择服务器角色`——勾选：`Hyper-V`

![QQ20241111-215133](/image/systems/win-server25-install/QQ20241111-215133.png)

### 创建虚拟机

1、打开 [Hyper-V 管理器](Shorts\hyperv.lnk) ，点击`新建`——选择`第二代`：

![QQ20241111-215622](/image/systems/win-server25-install/QQ20241111-215622.png)

2、其他自行设置，设置完成后右键点击虚拟机，选择`设置`——`内存`——取消`启用动态内存`：

![QQ20241111-215841](/image/systems/win-server25-install/QQ20241111-215841.png)

3、关闭`安全启动`（非Win10的虚拟机），关闭`TPM`和`防护`（推荐）：

![QQ20241111-215946](/image/systems/win-server25-install/QQ20241111-215946.png)

4、推荐关闭`检查点`，其他设置按你的需求设置：

![QQ20241111-220026](/image/systems/win-server25-install/QQ20241111-220026.png)

### 设置硬件直通(DDA)

1、打开： [DiscreteDeviceAssign.exe](Setups\DiscreteDeviceAssign.exe) ，选中虚拟机，点击`添加设备`：

![QQ20241111-220325](/image/systems/win-server25-install/QQ20241111-220325.png)

2、搜索你的设备，选中`如此甚好`，即可完成直通：

![QQ20241111-220351](/image/systems/win-server25-install/QQ20241111-220351.png)
