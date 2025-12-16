import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 解析 frontmatter
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return null;
  }
  
  const frontmatterText = match[1];
  const markdownContent = match[2];
  
  const frontmatter = {};
  const lines = frontmatterText.split('\n');
  
  let currentKey = null;
  let inArray = false;
  let arrayValues = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    
    // 跳过空行
    if (!trimmedLine) continue;
    
    // 检查是否是新键值对
    const colonIndex = trimmedLine.indexOf(':');
    const isArrayItem = trimmedLine.startsWith('-');
    
    if (colonIndex > 0 && !isArrayItem) {
      // 保存之前的数组值
      if (currentKey && inArray) {
        frontmatter[currentKey] = arrayValues;
      }
      
      // 开始新的键值对
      currentKey = trimmedLine.substring(0, colonIndex).trim();
      let value = trimmedLine.substring(colonIndex + 1).trim();
      
      // 检查下一行是否是数组项
      const nextLine = i + 1 < lines.length ? lines[i + 1].trim() : '';
      if (nextLine.startsWith('-')) {
        inArray = true;
        arrayValues = [];
      } else {
        inArray = false;
        // 移除引号
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        frontmatter[currentKey] = value;
      }
    } else if (isArrayItem && inArray) {
      // 处理数组项
      const arrayValue = trimmedLine.substring(1).trim();
      // 移除引号
      if ((arrayValue.startsWith('"') && arrayValue.endsWith('"')) || 
          (arrayValue.startsWith("'") && arrayValue.endsWith("'"))) {
        arrayValues.push(arrayValue.slice(1, -1));
      } else {
        arrayValues.push(arrayValue);
      }
    }
  }
  
  // 保存最后一个数组
  if (currentKey && inArray) {
    frontmatter[currentKey] = arrayValues;
  }
  
  return {
    frontmatter,
    content: markdownContent
  };
}

// 解析日期为 ISO 格式
function parseDate(dateStr) {
  // 处理格式如 "12 15 2025"
  const parts = dateStr.trim().split(/\s+/);
  if (parts.length === 3) {
    const month = parts[0].padStart(2, '0');
    const day = parts[1].padStart(2, '0');
    const year = parts[2];
    return `${year}-${month}-${day}T08:44:05.000Z`;
  }
  
  // 如果已经是标准格式，直接返回
  try {
    const date = new Date(dateStr);
    return date.toISOString();
  } catch {
    return new Date().toISOString();
  }
}

// 获取JWT secret
function getJwtSecret() {
  // 优先使用环境变量
  const envSecret = process.env.JWT_SECRET;
  if (envSecret) {
    return envSecret;
  }
  
  // 使用命令行参数
  const jwtIndex = args.findIndex(arg => arg === '--jwt-secret' || arg === '-j');
  if (jwtIndex !== -1 && args[jwtIndex + 1]) {
    return args[jwtIndex + 1];
  }
  
  // 默认值
  return 'VrRCvo7cHRAUWjTh';
}

// 上传文章到服务器
async function uploadArticle(articleData, jwtSecret) {
  try {
    // 替换内容中的图片路径
    const processedContent = articleData.content.replace(/\/image\//g, 'https://record.pika.net.cn/image/');
    
    const response = await fetch(`https://server.524228.xyz/feed/${articleData.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'jwt_secret': jwtSecret
      },
      body: JSON.stringify({
        title: articleData.title,
        alias: articleData.alias,
        content: processedContent,
        tags: articleData.tags,
        listed: true,
        draft: false,
        createdAt: articleData.createdAt
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ 上传失败 ID ${articleData.id}: HTTP ${response.status} ${response.statusText}`);
      console.error(`📄 服务器返回内容: ${errorText}`);
      return false;
    }
    
    const result = await response.text();
    console.log(`✅ 成功上传文章 ID: ${articleData.id}, 标题: ${articleData.title}`);
    if (result.trim()) {
      console.log(`📄 服务器返回: ${result}`);
    }
    return true;
  } catch (error) {
    console.error(`❌ 上传文章 ID ${articleData.id} 时发生错误:`, error.message);
    return false;
  }
}

// 主函数
async function syncArticles(options = {}) {
  const { dryRun = false, verbose = false, singleId = null, jwtSecret = getJwtSecret() } = options;
  const blogDir = path.join(__dirname, '../src/content/blog');
  
  console.log('🚀 开始同步文章...');
  if (dryRun) {
    console.log('🔍 调试模式：只显示要上传的数据，不实际发送请求');
  }
  console.log(`🔑 使用 JWT Secret: ${jwtSecret.substring(0, 4)}****${jwtSecret.length > 8 ? jwtSecret.substring(jwtSecret.length - 4) : ''}`);
  
  try {
    // 检查目录是否存在
    if (!fs.existsSync(blogDir)) {
      console.error(`❌ 目录不存在: ${blogDir}`);
      return;
    }
    
    // 读取目录中的所有文件
    const files = fs.readdirSync(blogDir);
    const mdFiles = files.filter(file => file.endsWith('.md'));
    
    console.log(`📂 找到 ${mdFiles.length} 个 Markdown 文件`);
    
    let successCount = 0;
    let totalCount = 0;
    
    // 处理每个文件
    for (const file of mdFiles) {
      const filePath = path.join(blogDir, file);
      
      try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const parsed = parseFrontmatter(fileContent);
        
        if (!parsed) {
          console.log(`⚠️  跳过文件 ${file}: 无法解析 frontmatter`);
          continue;
        }
        
        const { frontmatter, content } = parsed;
        
        // 检查是否有 ID
        if (!frontmatter.ID) {
          console.log(`⚠️  跳过文件 ${file}: 没有找到 ID`);
          continue;
        }

        // 如果指定了特定ID，只处理该文件
        if (singleId && frontmatter.ID !== singleId) {
          continue;
        }
        
        totalCount++;
        
        // 准备上传数据
        const articleData = {
          id: frontmatter.ID,
          title: frontmatter.title || '',
          alias: frontmatter.description || '',
          content: content,
          tags: frontmatter.tags || [],
          createdAt: frontmatter.pubDate ? parseDate(frontmatter.pubDate) : new Date().toISOString()
        };
        
        console.log(`\n📝 准备上传文章: ${articleData.title} (ID: ${articleData.id})`);
        console.log(`   - 标签: ${JSON.stringify(articleData.tags)}`);
        console.log(`   - 创建时间: ${articleData.createdAt}`);
        console.log(`   - 描述: ${articleData.alias.substring(0, 50)}...`);
        console.log(`   - 内容长度: ${articleData.content.length} 字符`);
        
        // 显示图片路径替换信息
        const hasImagePaths = /\/image\//g.test(articleData.content);
        if (hasImagePaths) {
          console.log(`   🖼️  检测到图片路径，将替换 /image/ 为 https://record.pika.net.cn/image/`);
        }
        
        if (verbose) {
          // 在详细模式下显示处理后的内容预览
          const processedContent = articleData.content.replace(/\/image\//g, 'https://record.pika.net.cn/image/');
          console.log(`   - 内容预览: ${processedContent.substring(0, 200)}...`);
        }
        
        if (dryRun) {
          console.log(`   📋 将要发送的数据: ${JSON.stringify({
            title: articleData.title,
            alias: articleData.alias,
            tags: articleData.tags,
            listed: true,
            draft: false,
            createdAt: articleData.createdAt
          }, null, 2)}`);
          console.log(`   🔗 API URL: https://server.524228.xyz/feed/${articleData.id}`);
          successCount++;
          continue;
        }
        
        // 上传文章
        const success = await uploadArticle(articleData, jwtSecret);
        if (success) {
          successCount++;
        }
        
        // 添加延迟，避免请求过快
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.error(`❌ 处理文件 ${file} 时发生错误:`, error.message);
      }
    }
    
    console.log(`\n🎉 同步完成!`);
    console.log(`✅ 成功上传: ${successCount} 篇文章`);
    console.log(`📊 总共处理: ${totalCount} 篇文章`);
    
  } catch (error) {
    console.error('❌ 同步过程中发生错误:', error);
  }
}

// 命令行参数处理
const args = process.argv.slice(2);
const options = {};

if (args.includes('--dry-run') || args.includes('-d')) {
  options.dryRun = true;
}

if (args.includes('--verbose') || args.includes('-v')) {
  options.verbose = true;
}

const singleIdIndex = args.findIndex(arg => arg === '--id' || arg === '-i');
if (singleIdIndex !== -1 && args[singleIdIndex + 1]) {
  options.singleId = args[singleIdIndex + 1];
}

const jwtSecretIndex = args.findIndex(arg => arg === '--jwt-secret' || arg === '-j');
if (jwtSecretIndex !== -1 && args[jwtSecretIndex + 1]) {
  options.jwtSecret = args[jwtSecretIndex + 1];
}

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
📖 同步脚本使用说明

用法:
  node scripts/sync.js [选项]

选项:
  -d, --dry-run         调试模式，只显示要上传的数据，不实际发送请求
  -v, --verbose         详细模式，显示更多信息包括内容预览
  -i, --id <ID>         只同步指定ID的文章
  -j, --jwt-secret <KEY> 指定JWT secret
  -h, --help            显示帮助信息

环境变量:
  JWT_SECRET            设置JWT secret (优先级高于命令行参数)

示例:
  node scripts/sync.js                           # 同步所有文章
  node scripts/sync.js --dry-run                 # 调试模式，不实际上传
  node scripts/sync.js --verbose                 # 详细模式
  node scripts/sync.js --id 5                    # 只同步ID为5的文章
  node scripts/sync.js --jwt-secret your_key     # 指定JWT secret
  node scripts/sync.js -d -v                     # 调试+详细模式
  JWT_SECRET=your_key node scripts/sync.js       # 使用环境变量设置JWT secret

注意: 
  - 只有包含ID字段的文章才会被同步
  - API URL: https://server.524228.xyz/feed/<ID>
  - JWT secret 优先级: 环境变量 > 命令行参数 > 默认值
  - 默认JWT secret: VrRCvo7cHRAUWjTh
`);
  process.exit(0);
}

// 运行同步
syncArticles(options);

export { syncArticles, parseFrontmatter, parseDate, getJwtSecret };