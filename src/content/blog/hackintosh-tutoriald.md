---
title: 0xD 黑果主题美化与启动项管理
description: OpenCanopy图形主题安装、Windows启动图标自定义、隐藏多余启动项
pubDate: 02 02 2026
image: /image/systems/hackintosh-tutorials/QQ20260121-164021.jpg
categories:
  - Hackintosh
tags:
  - Hackintosh
badge: Hackintosh

---

> 本文是[《黑果安装教程以及下载和常见问题》](/blog/hackintosh-tutorial0)的章节拆分文章，点击链接可查看完整教程目录。

## 0xD 主题与启动项

### 13.1 启用图形化界面 (OpenCanopy)

![OpenCanopy Theme](/image/systems/hackintosh-tutorials/opencanopy-preview.png)

OpenCore 自带的文本界面太丑？可以开启 OpenCanopy 图形界面。

1.  **添加驱动**：确保 `EFI/OC/Drivers` 下有 `OpenCanopy.efi`，并在 Config 中加载。
2.  **下载资源**：下载 [OcBinaryData](https://github.com/acidanthera/OcBinaryData)，将 `Resources` 文件夹复制到 `EFI/OC/` 下，覆盖原文件夹。
3.  **修改配置**：
    -   `Misc` -> `Boot` -> `PickerMode`: 设置为 `External`。
    -   `Misc` -> `Boot` -> `PickerAttributes`: 设置为 `17` (推荐) 或 `144` (启用鼠标支持)。
    -   `Misc` -> `Boot` -> `PickerVariant`: 设置主题名称，如 `Acidanthera\GoldenGate`。

### 13.2 自定义 Windows 启动图标

OpenCore 默认可能给 Windows 显示 generic 硬盘图标。

1.  **准备图标**：制作或下载 `.icns` 格式图标，命名为 `Windows11.icns` (或你喜欢的名字)。
2.  **创建标识文件**：
    -   在 Windows 的 EFI 分区 `EFI/Microsoft/Boot/` 目录下，创建一个文本文件。
    -   内容写入：`Windows11:Windows` (格式为 `图标文件名:原有类型`)。
    -   将该文本文件重命名为 `.contentFlavour` (注意没有 .txt 后缀)。
    -   将 `Windows11.icns` 也放入同级目录 (`EFI/Microsoft/Boot/`)。
3.  **重启生效**：OpenCore 会自动读取 `.contentFlavour` 并加载对应的图标。

### 13.3 隐藏多余启动项

如果有不需要的启动项（如 EFI 分区、Recovery 分区）：
-   在 OpenCore 界面按 `Space` (空格) 可以显示/隐藏辅助条目（需开启 `HideAuxiliary`）。
-   如果要永久隐藏某个分区，可以在 Config 中 `Misc` -> `Security` -> `ScanPolicy` 进行调整，或者使用 `Ignore` 规则。
