# 文章同步脚本

这个脚本用于将 `src/content/blog` 目录下的 Markdown 文章同步到远程服务器。

## 功能特性

- 📝 自动解析 Markdown 文件的 frontmatter
- 🏷️ 支持标签、标题、描述等元数据提取
- 📅 自动处理日期格式转换
- 🔄 批量同步或单篇文章同步
- 🧪 调试模式，预览要上传的数据
- 📊 详细的同步结果反馈

## 使用方法

### 基本用法

```bash
# 同步所有有ID的文章
pnpm run sync

# 或者直接运行
node scripts/sync.js
```

### 命令行选项

```bash
# 调试模式：只显示要上传的数据，不实际发送请求
node scripts/sync.js --dry-run

# 详细模式：显示更多信息包括内容预览
node scripts/sync.js --verbose

# 只同步指定ID的文章
node scripts/sync.js --id 5

# 组合使用
node scripts/sync.js --dry-run --verbose
node scripts/sync.js -d -v  # 简写形式

# 显示帮助信息
node scripts/sync.js --help
```

## 文件要求

脚本只会处理包含 `ID` 字段的 Markdown 文件。文件头格式如下：

```yaml
---
title: 文章标题
description: 文章描述
pubDate: 12 15 2025
image: /image/path/to/image.jpg
categories:
  - Network
tags:
  - Cloudflare
  - Networking
badge: Cloudflare
ID: 5
---
```

### 必需字段

- `ID`: 文章的唯一标识符，用于生成API URL
- `title`: 文章标题
- `description`: 文章描述（会作为alias上传）

### 可选字段

- `pubDate`: 发布日期，格式为 `MM DD YYYY`（如 `12 15 2025`）
- `tags`: 文章标签数组

## 数据映射

脚本会将 Markdown 文件的元数据映射为以下格式上传：

```json
{
  "title": "文章标题",
  "alias": "文章描述", 
  "content": "Markdown内容",
  "tags": ["标签1", "标签2"],
  "listed": true,
  "draft": false,
  "createdAt": "2025-12-15T08:44:05.000Z"
}
```

## API 端点

脚本会向以下URL发送POST请求：
```
https://server.524228.xyz/feed/<ID>
```

其中 `<ID>` 是从文件 frontmatter 中读取的ID值。

## 示例输出

```bash
🚀 开始同步文章...
📂 找到 3 个 Markdown 文件

📝 准备上传文章: Cloudflare 不同类型优选节点IP教程 (ID: 5)
   - 标签: ["Cloudflare","Networking"]
   - 创建时间: 2025-12-15T08:44:05.000Z
   - 描述: 本教程将介绍如何通过Cloudflare优选IP...
   - 内容长度: 3847 字符
✅ 成功上传文章 ID: 5, 标题: Cloudflare 不同类型优选节点IP教程

🎉 同步完成!
✅ 成功上传: 1 篇文章
📊 总共处理: 1 篇文章
```

## 故障排除

### 403 Forbidden 错误

如果遇到 `HTTP 403 Forbidden` 错误，可能的原因：
1. API需要身份验证
2. IP地址被限制
3. 服务器端配置问题

### 调试建议

使用 `--dry-run` 选项来预览将要发送的数据：

```bash
node scripts/sync.js --dry-run --verbose
```

这会显示完整的请求信息，帮助你调试问题。

## 注意事项

- 脚本会在每次请求之间添加1秒延迟，避免请求过快
- 只有包含有效ID的文章才会被同步
- 文章内容会完整上传，包括所有Markdown格式
- 日期格式会自动转换为ISO格式