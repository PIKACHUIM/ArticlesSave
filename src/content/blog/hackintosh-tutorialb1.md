---
title: 0xB-1 虚拟机黑果教程(VMware)
description: 使用 VMware Pro 17 在 Windows 上安装 macOS 15 黑果完整教程
pubDate: 02 05 2026
image: /image/systems/hackintosh-tutorials/QQ20260121-164021.jpg
categories:
  - Hackintosh
tags:
  - Hackintosh
badge: Hackintosh

---

> 本文是[《0xB 虚拟机安装黑果教程》](/blog/hackintosh-tutorialb)的子章节，点击链接可查看全部虚拟机教程。

## b.1 VMware 黑果

如果你没有买苹果的电脑，但是又因为某些原因需要用一下macOS系统的软件，并且你又不好意思借用别人的电脑，那你完全可以自己安装一个虚拟机版的macOS，这样也能勉强应付一下。不管什么原因，如果你就是想要用一下黑果，又不想破坏电脑已安装的Windows系统，那你可以跟着本教程，使用VMwarePro 17安装一个macOS 15。本文将从如何安装VMware开始，每一个步骤都有截图，详细得堪称保姆级，你跟着我的步骤操作基本上都是可以成功的

### 1.下载

VMware虚拟机安装包和macOS镜像文件以及其他要用到的工具已经一起打包上传到冰裤袋小程序了，你可以从gongzhonghao"冰冷的希望"菜单栏进入"冰裤袋"小程序，找到黑果的下载链接之后，把macOS15版本的相关文件都下载好。你应该下载得到"Install_macOS_Sequoia_15.0.iso"、"VMware_17.6.1-24319023_Setup.exe"、"unlocker427.zip"和"darwin12.0.5.iso"这4个文件（你的系统不一定显示文件扩展名）

![vmware-macos-1.jpg](/image/systems/hackintosh-tutorials/vmware-macos-1.jpg)

因为macOS 15系统镜像文件的大小达到16G，所以下载时间可能会比较久，其他文件都比较好下载

### 2.安装VMware

本教程使用的VMware版本是VMwarePro 17.6.1，其他版本我也没有试过，不知道是否兼容，建议VMware的版本跟我演示的相差不要太大。另外，VMwarePro从17.5.2版本开始变成免费的了，所以我这里提供的17.6.1版本也是官方版，我不会提供激活码

现在我们选中"VMware_17.6.1-24319023_Setup.exe"这个文件，右键，使用管理员身份运行

![vmware-macos-2.jpg](/image/systems/hackintosh-tutorials/vmware-macos-2.jpg)

现在已经启动安装向导界面了，我们直接点击"下一步"按钮

![vmware-macos-3.jpg](/image/systems/hackintosh-tutorials/vmware-macos-3.jpg)

勾选"我接受许可协议中的条款"，点击"下一步"按钮

![vmware-macos-4.jpg](/image/systems/hackintosh-tutorials/vmware-macos-4.jpg)

这里可以点击"更改"按钮修改VMware的安装路径，建议不要放在C盘，还有就是，整个路径中建议不要出现中文或者其他非法字符。之后点击"下一步"按钮

![vmware-macos-5.jpg](/image/systems/hackintosh-tutorials/vmware-macos-5.jpg)

用户体验设置这里，可以取消勾选这两个选项，然后点击"下一步"按钮

![vmware-macos-6.jpg](/image/systems/hackintosh-tutorials/vmware-macos-6.jpg)

创建快捷方式，这里可以保持默认就行，点击"下一步"按钮

![vmware-macos-7.jpg](/image/systems/hackintosh-tutorials/vmware-macos-7.jpg)

OK，那这里就直接点击"安装"按钮了

![vmware-macos-8.jpg](/image/systems/hackintosh-tutorials/vmware-macos-8.jpg)

如果安装过程中遇到了卫士类软件的拦截，记得允许执行，或者干脆直接退出全部杀软

![vmware-macos-9.jpg](/image/systems/hackintosh-tutorials/vmware-macos-9.jpg)

等安装进度条结束之后就算是安装完成了，因为这个VMware版本已经对个人用户免费了，所以不需要激活，直接点击"完成"按钮关闭安装向导界面

![vmware-macos-10.jpg](/image/systems/hackintosh-tutorials/vmware-macos-10.jpg)

如果你不确定的话，可以打开VMware的"关于"页面看一下激活信息（我这里可能是以前激活过商业版本，所以会显示为商业用途，你的应该会显示个人用途）

![vmware-macos-11.jpg](/image/systems/hackintosh-tutorials/vmware-macos-11.jpg)

### 3.安装Unlocker

我们知道VMware默认是不支持引导macOS的，所以我们需要借助第三方的工具让它支持。把之前下载得到的"unlocker427.zip"文件解压了，我这里是使用360压缩进行解压

![vmware-macos-12.jpg](/image/systems/hackintosh-tutorials/vmware-macos-12.jpg)

解压得到的文件中有个"windows"文件夹，该文件夹里面有个"unlock.exe"文件，选中它，右键，以管理员身份运行

![vmware-macos-13.jpg](/image/systems/hackintosh-tutorials/vmware-macos-13.jpg)

大概几秒钟时间它就处理完了，你可以对比一下我的截图，输出日志中有一句"Patching Complete!"，然后你就可以把它关闭了。如果没有执行成功，你可以检查一下，是不是VMware版本不太合适？是不是没有使用管理员身份运行？是不是被卫士类软件拦截了？

![vmware-macos-14.jpg](/image/systems/hackintosh-tutorials/vmware-macos-14.jpg)

我们还需要重启一下VMware相关的服务（好像不重启也行，但是我不确定）。我们按快捷键"Ctrl+Shift+ESc"打开任务管理器，在"服务"面板找到"VM"开头的这几个服务（名称太长了不想写，直接看我截图吧），右键，重新启动

![vmware-macos-15.jpg](/image/systems/hackintosh-tutorials/vmware-macos-15.jpg)

### 4.创建虚拟机

现在我们打开VMware，点击"创建新的虚拟机"按钮

![vmware-macos-16.jpg](/image/systems/hackintosh-tutorials/vmware-macos-16.jpg)

选择"典型（推荐）"选项，点击"下一步"按钮

![vmware-macos-17.jpg](/image/systems/hackintosh-tutorials/vmware-macos-17.jpg)

选择"稍后安装操作系统"，点击"下一步"按钮

![vmware-macos-18.jpg](/image/systems/hackintosh-tutorials/vmware-macos-18.jpg)

这里要选择"Apple macOS"，然后下拉选择"macOS 15"选项。如果你这里没有Apple macOS的引导项，说明你的Unlocker没有执行成功，再根据我上面提到的那几种情况排查一下吧

![vmware-macos-19.jpg](/image/systems/hackintosh-tutorials/vmware-macos-19.jpg)

虚拟机的名称可以设置一下，然后虚拟机的位置记得要选择一个剩余空间比较大的盘，比如我这里把它放到H盘（建议路径中不要出现中文字符）

![vmware-macos-20.jpg](/image/systems/hackintosh-tutorials/vmware-macos-20.jpg)

最大磁盘默认是80G，我这里把它改为了100G，建议设置大一点，放心，它不会马上占用这些空间的，占用多少取决于你以后如何使用macOS里的硬盘。但是如果你现在设置的最大空间不够大，那以后就不好扩容了。还有就是要勾选"将虚拟磁盘存储为单个文件"，这样磁盘性能会更好。都设置好之后就点击"下一步"按钮

![vmware-macos-21.jpg](/image/systems/hackintosh-tutorials/vmware-macos-21.jpg)

虽然基本设置都弄好了，但是我们还是要点击"自定义硬件"按钮。首先是设置内存（指的是运行内存，不是硬盘存储空间），它默认是设置4G，但是我的电脑运行内存比较大，所以我给它8G。这个内存设置得越大，你的macOS就越流畅，但是你的宿主机就会越卡，你可以根据自己的实际情况进行分配

![vmware-macos-22.jpg](/image/systems/hackintosh-tutorials/vmware-macos-22.jpg)

现在点击"新CD/DVD（SATA）"选项，然后点击"使用ISO镜像文件"，点击"浏览"按钮，选中之前下载好的苹果镜像文件（也就是Install_macOS_Sequoia_15.0.iso），之后关闭自定义面板，再点击"完成"即可。可能我描述得不是很立体，具体操作步骤你可以参考一下我的截图

![vmware-macos-23.jpg](/image/systems/hackintosh-tutorials/vmware-macos-23.jpg)

### 5.安装macOS 15

好了，硬件方面都已经设置好了，现在终于进入正题了，我们点击左边的"开启虚拟机"按钮启动虚拟机

![vmware-macos-24.jpg](/image/systems/hackintosh-tutorials/vmware-macos-24.jpg)

不出意外的话，你现在已经看到了macOS的logo了

![vmware-macos-25.jpg](/image/systems/hackintosh-tutorials/vmware-macos-25.jpg)

剩下的安装和物理机器安装的一样了

### 6.安装VMtools

虽然壁纸显示正常了，但是电脑依然是那么卡，我们看一下系统的信息，发现它才3M的图形缓存，不卡才怪

![vmware-macos-52.jpg](/image/systems/hackintosh-tutorials/vmware-macos-52.jpg)

所以我们需要安装一下VMtools让它能识别更大的显存，而且安装VMtools还有其他好处，比如说可以让它自动适应桌面分辨率，还可以在宿主机之间随便拖拽传输文件

现在，我们让它关机

![vmware-macos-53.jpg](/image/systems/hackintosh-tutorials/vmware-macos-53.jpg)

完全关机之后点击"编辑虚拟机设置"按钮，又回到自定义硬件的界面了，还是点击"CD/DVD （SATA）"选项，这次要把ISO镜像改为"darwin12.0.5.iso"这个文件了（可以参考我的截图），别忘了点击"确定"按钮

![vmware-macos-54.jpg](/image/systems/hackintosh-tutorials/vmware-macos-54.jpg)

现在再次启动虚拟机，进入macOS之后，发现桌面右上角已经加载了"VMware Tools"了，双击打开它，再双击"安装VMware Tools"按钮就可以启动安装向导了，第一个界面就点击"继续"按钮

![vmware-macos-55.jpg](/image/systems/hackintosh-tutorials/vmware-macos-55.jpg)

选择"为这台电脑上的所有用户安装"，再点击"继续"按钮

![vmware-macos-56.jpg](/image/systems/hackintosh-tutorials/vmware-macos-56.jpg)

在macOS安装软件一般不需要修改安装路径，直接点击"安装"按钮

![vmware-macos-57.jpg](/image/systems/hackintosh-tutorials/vmware-macos-57.jpg)

它会让你输入你的账户密码，也就是你创建账户的时候设置的那个密码，再点击"安装软件"按钮

![vmware-macos-58.jpg](/image/systems/hackintosh-tutorials/vmware-macos-58.jpg)

如果安装过程出现各种提示，肯定都是选择"允许"。还有就是，可能会提示"系统扩展已被阻止"，那就点击"打开系统设置"按钮

![vmware-macos-59.jpg](/image/systems/hackintosh-tutorials/vmware-macos-59.jpg)

在系统的隐私与安全性这边可以看到"来自开发者XXX已被阻止载入"（可以参考一下我的截图），那我们要点击"允许"按钮

![vmware-macos-60.jpg](/image/systems/hackintosh-tutorials/vmware-macos-60.jpg)

然后它会再次让你输入你的账户密码

![vmware-macos-61.jpg](/image/systems/hackintosh-tutorials/vmware-macos-61.jpg)

如果它提示你需要重新启动那就重新启动吧

![vmware-macos-62.jpg](/image/systems/hackintosh-tutorials/vmware-macos-62.jpg)

如果提示安装失败了，不要慌，重来一次就好，有了第一次授权之后第二次安装就可以轻松完成

![vmware-macos-63.jpg](/image/systems/hackintosh-tutorials/vmware-macos-63.jpg)

如果你不点"重新启动"按钮，你也可以自己手动关机，然后再打开虚拟机设置这里，把"CD/DVD（SATA）"这里的"启动时连接"这个选项取消勾选，不然它每次进入macOS都会加载指定的镜像

![vmware-macos-64.jpg](/image/systems/hackintosh-tutorials/vmware-macos-64.jpg)

现在启动macOS之后，再次查看图形显存，发现这次已经达到128M了，虽然还是小得可怜，但是起码没有那么卡了，当然你也可以进入设置，把一些动作特效什么的都关闭，这样可能会更流畅点

![vmware-macos-65.jpg](/image/systems/hackintosh-tutorials/vmware-macos-65.jpg)

可能有些同学会发现macOS显示的时间不对，那可能是之前的时区没有选对，你可以打开系统设置，在"通用"里面找到"最接近的城市"，把它改为中国的城市就行

![vmware-macos-66.jpg](/image/systems/hackintosh-tutorials/vmware-macos-66.jpg)

现在各种功能都是正常的，网络也是正常的，我们可以打开浏览器看看

![vmware-macos-67.jpg](/image/systems/hackintosh-tutorials/vmware-macos-67.jpg)

OK，整个安装过程已经结束了，你可以自己探索一下macOS 15哈哈

![vmware-macos-68.jpg](/image/systems/hackintosh-tutorials/vmware-macos-68.jpg)
