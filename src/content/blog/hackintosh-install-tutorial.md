---
title: 黑苹果安装详细教程
description: 黑苹果完整安装步骤图文教程，从U盘启动到系统安装完成
pubDate: 01 31 2026
image: /public/image/systems/hackintosh-tutorials/QQ20260121-164021.jpg
categories:
  - Hackintosh
tags:
  - Hackintosh
badge: Hackintosh

---

> 本文是[《黑苹果安装教程以及下载和常见问题》](/blog/hackintosh-tutorials)的章节拆分文章，点击链接可查看完整教程目录。

## 0x4 黑苹果安装详细教程
开机！选择U盘中的OpenCore启动

![vmware-macos-25.jpg](/image/systems/hackintosh-tutorials/vmware-macos-25.jpg)

等了一会儿，进度条结束之后，就开始安装向导了。首先是语言，我这里选择“简体中文”，你可以根据自己的实际情况选择，选好后点击右下角的箭头按钮

![vmware-macos-26.jpg](/image/systems/hackintosh-tutorials/vmware-macos-26.jpg)

因为我们的磁盘还没有格式化，所以现在点击“磁盘工具”，再点击“继续”按钮因为我们的磁盘还没有格式化，所以我们需要先处理一下，那现在点击“磁盘工具”，再点击“继续”按钮

![vmware-macos-27.jpg](/image/systems/hackintosh-tutorials/vmware-macos-27.jpg)

左边可能会列出多个挂载磁盘，一般最上面的那个写着“VMware Virtual”字样的就是虚拟机分配的磁盘了，你也可以根据它显示的磁盘大小进行判断。选中虚拟机的磁盘之后，直接点击“抹除”按钮

![vmware-macos-28.jpg](/image/systems/hackintosh-tutorials/vmware-macos-28.jpg)

它会让你输入一个磁盘名称，随便输入一个英文名就行，格式和方案不要修改，直接点击“抹掉”按钮

![vmware-macos-29.jpg](/image/systems/hackintosh-tutorials/vmware-macos-29.jpg)

几秒之后它就操作成功了，先点击“完成”按钮

![vmware-macos-30.jpg](/image/systems/hackintosh-tutorials/vmware-macos-30.jpg)

再点击左上角的红色按钮把这个界面关闭掉

![vmware-macos-31.jpg](/image/systems/hackintosh-tutorials/vmware-macos-31.jpg)

现在可以选择“安装macOS Sequoia”选项，再点击“继续”按钮

![vmware-macos-32.jpg](/image/systems/hackintosh-tutorials/vmware-macos-32.jpg)

再次点击“继续”按钮

![vmware-macos-33.jpg](/image/systems/hackintosh-tutorials/vmware-macos-33.jpg)

这里只能同意许可协议

![vmware-macos-34.jpg](/image/systems/hackintosh-tutorials/vmware-macos-34.jpg)

这里要先选中中间的那个磁盘，才能点击“继续”按钮

![vmware-macos-35.jpg](/image/systems/hackintosh-tutorials/vmware-macos-35.jpg)

到了这个界面就有得等了，虽然它显示需要二十多分钟，但我感觉好像不止，反正等了很久。因为这个过程会很消耗内存，所以建议整个过程不要动电脑，避免安装失败或者直接卡死

![vmware-macos-36.jpg](/image/systems/hackintosh-tutorials/vmware-macos-36.jpg)

等它进度条结束之后会让你选择国家或地区，我这里选择“中国大陆”，再点击“继续”按钮

![vmware-macos-37.jpg](/image/systems/hackintosh-tutorials/vmware-macos-37.jpg)

语言和输入法这里不用动，直接点击“继续”按钮

![vmware-macos-38.jpg](/image/systems/hackintosh-tutorials/vmware-macos-38.jpg)

辅助功能可以先不开启（开启就更卡了），直接点击“以后”按钮

![vmware-macos-39.jpg](/image/systems/hackintosh-tutorials/vmware-macos-39.jpg)

数据与隐私这里，直接点击“继续”按钮

![vmware-macos-40.jpg](/image/systems/hackintosh-tutorials/vmware-macos-40.jpg)

迁移助理，点击左下角的“以后”按钮

![vmware-macos-41.jpg](/image/systems/hackintosh-tutorials/vmware-macos-41.jpg)

账户登录，直接点击左下角的“稍后设置”按钮，再点击“跳过”按钮

![vmware-macos-42.jpg](/image/systems/hackintosh-tutorials/vmware-macos-42.jpg)

条款与条件，只能同意啦

![vmware-macos-43.jpg](/image/systems/hackintosh-tutorials/vmware-macos-43.jpg)

因为我们前面没有登录Apple账户，所以这里需要创建一个本地账户，建议用户名使用纯英文字符

![vmware-macos-44.jpg](/image/systems/hackintosh-tutorials/vmware-macos-44.jpg)

服务定位，建议先不开启，避免占用资源，所以点击“继续”和“不使用”按钮

![vmware-macos-45.jpg](/image/systems/hackintosh-tutorials/vmware-macos-45.jpg)

选择时区，你可以用鼠标点击那个地图，比如我这里点击了上海，时区会影响时间的显示，所以得选对了（当然后面我也会讲如何修改时区）

![vmware-macos-46.jpg](/image/systems/hackintosh-tutorials/vmware-macos-46.jpg)

分析功能，建议取消勾选“与Apple共享Mac分析”选项，然后点击“继续”按钮

![vmware-macos-47.jpg](/image/systems/hackintosh-tutorials/vmware-macos-47.jpg)

屏幕使用时间，为了节省性能资源，建议先不要开启，直接点击“稍后设置”按钮

![vmware-macos-48.jpg](/image/systems/hackintosh-tutorials/vmware-macos-48.jpg)

外观，看你心情随便选择一个吧

![vmware-macos-49.jpg](/image/systems/hackintosh-tutorials/vmware-macos-49.jpg)

现在终于进入到macOS 15的桌面了，但是你需要等一下，因为现在可能有点卡

![vmware-macos-50.jpg](/image/systems/hackintosh-tutorials/vmware-macos-50.jpg)

等了一段时间之后，你可以试着动动鼠标，发现已经可以正常使用了，但是壁纸一直加载不出来，你也不用继续等了，因为显存过小，所以它默认的动态壁纸是永远也加载不出来的。为了不至于显示这么丑的白屏，我们可以打开设置选项，找一张图片壁纸给它换上

![vmware-macos-51.jpg](/image/systems/hackintosh-tutorials/vmware-macos-51.jpg)
