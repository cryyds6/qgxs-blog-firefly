---
title: 免费图床 CloudFlare ImgBed 部署教程
published: 2026-02-12
description: 本文详细介绍基于 Cloudflare Pages 的开源文件托管工具 CloudFlare ImgBed 的部署、数据库配置、存储渠道与完整使用流程。
image: https://imgbed.20210701.xyz/file/博客/1770908588826_image.png
tags: ["Cloudflare", "图床", "部署教程", "技术"]
category: qgxs
draft: false
---
# 免费图床 CloudFlare ImgBed 部署教程

CloudFlare ImgBed 是一个基于 Cloudflare Pages 的开源文件托管解决方案，为用户提供免费、稳定、高效的文件存储服务。

项目支持多种存储渠道，支持无服务器和有服务器部署方式，满足不同用户的需求。

项目地址：https://github.com/MarSeventh/CloudFlare-ImgBed

官方文档：https://cfbed.sanyue.de/

项目核心特性
- 多部署方式：支持 Cloudflare Pages 无服务器免费托管、Docker 部署，满足不同用户的部署需求

- 多存储渠道：兼容 Telegram Bot、Discord、Cloudflare R2、S3 API、Hugging Face 等多种存储方式

- 优质交互体验：炫酷界面设计，含流畅过渡动画、呼吸灯效果，支持深色模式，操作体验灵动

- 多重安全保障：支持身份认证、IP 白名单、图片审查、防滥用等安全功能，保障文件存取安全

- 多样上传方式：支持拖拽、点击、粘贴、URL 上传，兼容批量上传与目录管理功能

- 高度可定制：支持自定义背景、Logo、配色、链接前缀等，可打造专属个性化图床

- 丰富协议支持：兼容 WebDAV 协议与多种 RESTful API，拓展使用场景

- 全链路功能：具备鉴权、目录管理、图片审查、随机图等特色功能，满足多样化使用需求
  
## 效果展示
![图片效果展示1](https://imgbed.20210701.xyz/file/博客/1770906775793_image.png)
![图片效果展示2](https://imgbed.20210701.xyz/file/博客/1770908588826_image.png)

## Cloudflare Pages 部署
Cloudflare Pages 是推荐的部署方式，提供免费托管、全球 CDN 加速和无需服务器维护的优势。

### 📂 第一步：Fork 项目
1. 访问 CloudFlare ImgBed 项目
2. 点击右上角的 "Fork" 按钮
3. 选择您的 GitHub 账户
4. 确认 Fork 完成

### 🏗️ 第二步：创建 Pages 项目
#### 2.1 访问 Cloudflare Dashboard
1. 登录 Cloudflare Dashboard
2. 选择左侧菜单的「计算和AI」->「Workers & Pages」
3. 点击「创建应用程序」
4. 在最下方 Looking to deploy Pages? 选择「Get started」
5. 在「导入现有 Git 存储库」处点击「开始使用」

![Cloudflare Pages 创建界面](https://imgbed.20210701.xyz/file/博客/1770907179119_image.png)

#### 2.2 连接 GitHub 仓库
1. 如果首次使用，需要授权 Cloudflare 访问 GitHub
2. 选择您 Fork 的 CloudFlare-ImgBed 仓库
3. 点击「开始设置」

#### 2.3 配置项目设置
| 配置项 | 值 | 说明 |
| --- | --- | --- |
| 项目名称 | cloudflare-imgbed（或自定义） | 项目标识符 |
| 生产分支 | main | 生产环境分支 |
| 构建命令 | npm install | 重要：v2.0 新构建命令 |
| 构建输出目录 | / | 保持默认 |

**重要提醒**
v2.0 版本的构建命令已变更为 `npm install`，请确保使用正确的构建命令。

#### 2.4 部署项目
1. 点击「保存并部署」
2. 等待首次部署完成（约 2–3 分钟）

### 🗄️ 第三步：配置数据库
数据库用于存储文件元数据，是必需的组件，可选数据库为 KV 数据库和 D1 数据库。两者对比如下表所示，根据自己使用场景从其中选择一种配置即可。

| 特点 | KV 数据库 | D1 数据库 |
| --- | --- | --- |
| 读写性能 | 高 | 较低 |
| 免费额度 | 少 | 多 |
| 大文件上传 | 支持 | 不支持 |

**重要提示**
KV 数据库和 D1 数据库只需要配置其中一个即可，不需要同时配置两个！建议根据上表选择适合自己的数据库类型。

#### 3.1 KV 数据库配置
1. **创建 KV 命名空间**
   - 在 Cloudflare Dashboard 中选择「存储和数据库」
   - 点击「Workers KV」
   - 点击「创建实例」
   - 输入命名空间名称：`img_url`（建议使用此名称）
   - 点击「创建」

2. **绑定 KV 到项目**
   - 返回您的 Pages 项目
   - 选择「设置」→「绑定」
   - 点击「添加」→「KV 命名空间」
   - 填写绑定信息：
     - 变量名称：`img_url`（必须是这个名称）
     - KV 命名空间：选择刚创建的命名空间
   - 点击「保存」

**注意**
绑定 KV 时，变量名称必须为 `img_url`，这是项目预设的变量名，填错会出现无法进入管理界面等情况。

#### 3.2 D1 数据库配置
1. **创建 D1 数据库**
   - 在 Cloudflare Dashboard 中选择「存储和数据库」
   - 点击「D1 SQL 数据库」
   - 点击「创建数据库」
   - 输入数据库名称：`img_d1`（建议使用此名称）
   - 点击「创建」

2. **初始化 D1 数据库**
   - 创建完成后，点击进入数据库详情页
   - 选择「控制台」选项卡
   - 在 SQL 输入框中粘贴并执行注释区域以下的内容（见项目仓库）
   - 点击「执行」

3. **绑定 D1 到项目**
   - 返回您的 Pages 项目
   - 选择「设置」→「绑定」
   - 点击「添加」→「D1 数据库」
   - 填写绑定信息：
     - 变量名称：`img_d1`（必须是这个名称）
     - D1 数据库：选择刚创建的数据库
   - 点击「保存」

### 🔄 第四步：重新部署
绑定数据库后需要重新部署以生效：
1. 进入项目的「部署」页面
2. 找到最新的部署记录
3. 点击右侧的「...」菜单
4. 选择「重试部署」
5. 等待部署完成


# 配置说明
本章节详细介绍 CloudFlare ImgBed 的各种配置选项和自定义设置。

## 🗂️ 存储渠道配置
部署完成后访问您的域名，进入管理后台配置存储渠道。

### 访问管理后台
访问 `https://your-domain/dashboard`

> 提示
> 管理后台默认无需密码，登录后请及时设置管理员用户名和密码。

### 配置 Telegram 渠道
1. 左上角菜单栏进入「系统设置」→「上传设置」
2. 找到「Telegram 渠道配置」
3. 点击「添加渠道」
4. 填入准备好的 Token 和 Chat ID：
   - 渠道名称：自定义名称（如：主渠道）
   - Bot Token：从 @BotFather 获得的 Token
   - Chat ID：频道 ID（有 `-` 号时需要保留）
   - 代理 URL：（可选）自定义代理地址，用于代理 Telegram API 请求
   - 启用状态：开启
5. 点击「保存设置」

**关于代理配置**
如果您的服务器无法直接访问 Telegram API，可以配置代理 URL。您可以使用 Cloudflare Worker 搭建简单的代理服务：

```javascript
// worker.js
export default {
    async fetch(request) {
        const url = new URL(request.url);
        const target = `https://api.telegram.org${url.pathname}${url.search}`;
        const resp = await fetch(target, {
            method: request.method,
            headers: request.headers,
            body: request.body,
            redirect: 'follow'
        });
        return new Response(resp.body, {
            status: resp.status,
            headers: resp.headers
        });
    }
};
```

部署此 Worker 后，将 Worker 地址填入代理 URL 字段即可。

### 配置 R2 渠道
服务器部署时默认添加了 Cloudflare R2 存储方式，以下步骤仅针对 Cloudflare 部署方式：

1. 在项目设置中绑定 R2 存储桶：
   - 选择「设置」→「绑定」
   - 添加「R2 存储桶」
   - 变量名称：`img_r2`
   - R2 存储桶：选择已创建的存储桶

2. 在管理后台配置：
   - 进入「系统设置」→「上传设置」
   - 配置 R2 渠道参数
   - 如需图像审查，填入 R2 公开访问链接

> 注意
> 请注意 Cloudflare R2 的免费额度限制，超过后可能会产生费用。

### 配置 S3 渠道
在管理后台的 S3 渠道配置中填入：
- Access Key ID：访问密钥 ID
- Secret Access Key：机密访问密钥
- Bucket Name：存储桶名称
- Endpoint：服务端点（完整 URL，如 `https://s3.us-east-005.backblazeb2.com`）
- PathStyle：路径样式（如需兼容旧 S3 版本，开启此选项）
- Region：存储区域（可选）
- CDN 域名：（可选）自定义 CDN 加速域名，设置后优先通过 CDN 读取文件

### 配置 Discord 渠道
在管理后台的 Discord 渠道配置中填入：
- 渠道名称：自定义名称
- Bot Token：Discord Bot Token
- Channel ID：Discord 频道 ID
- Is Nitro：是否为 Nitro 用户（Nitro 用户单文件限制为 25MB，普通用户为 10MB）
- 代理 URL：（可选）自定义代理地址

### 配置 HuggingFace 渠道
在管理后台的 HuggingFace 渠道配置中填入：
- 渠道名称：自定义名称
- Token：HuggingFace Access Token（从 <https://huggingface.co/settings/tokens> 获取）
- Repo：仓库名称（格式：`username/repo-name`，用户名须填写正确，会自动创建 dataset 类型仓库）
- Is Private：是否为私有仓库

> 提示
> HuggingFace 渠道支持大文件直传，适合上传超过 20MB 的文件。对于大文件，系统会自动使用 LFS 协议进行分片上传。

## 🔒 安全设置
安全相关设置，在管理后台的「系统设置」→「安全设置」中配置。

### 认证管理
- 用户端认证：用于 Web 端用户登录和 API 认证
- 管理端认证：管理员用户名和密码，用于访问管理后台

### 上传管理
#### 图像审查
审查渠道支持 nsfwjs 和 moderatecontent.com，可根据如下步骤自行配置。

**1. moderatecontent.com**
1. 访问 ModerateContent
2. 注册并获取免费 API Key（目前已不再支持免费注册）
3. 在管理后台「系统设置」→「安全设置」中填入 API Key

**2. nsfwjs**
使用 Docker 部署 nsfwjs 审查服务：

```bash
# 参考命令
docker run -d -p 127.0.0.1:5000:5000/tcp \
  --env PORT=5000 \
  --restart=always \
  eugencepoi/nsfw_api:latest
```

在管理后台「系统设置」→「安全设置」中填入审查服务地址，如 `https://nsfwjs.your.domain`

### 访问管理
#### 域名过滤
- 放行域名：允许访问的域名列表（留空放行所有域名，否则需要手动添加图床自身域名）
- 白名单模式：启用后仅允许加入白名单的文件被访问

## 🌐 网页设置
前端网页相关设置，在管理后台的「系统设置」→「网页设置」中配置。

| 字段名 | 用途 | 类型 | 内容规范 |
| --- | --- | --- | --- |
| siteTitle | 网站标题 | 字符串 | 只支持字符串类型，设置为你自定义的网站标题 |
| siteIcon | 网站图标 | 字符串 | 只支持字符串类型，设置为你自定义的网站图标链接 |
| ownerName | 图床名称 | 字符串 | 只支持字符串类型，设置为你自定义的图床名称（默认为Sanyue） |
| logoUrl | 图床Logo | 字符串 | 只支持字符串类型，设置为你自定义的图床Logo链接 |
| logoLink | Logo跳转链接 | 字符串 | 只支持字符串类型，设置为点击Logo时跳转的链接，留空则使用默认GitHub链接。仅对上传页面生效 |
| bkInterval | 背景切换间隔 | 正整数 | 设置为背景图的轮播时间，默认3000，单位ms。例如你希望10s切换一次，设置为10000即可。 |
| bkOpacity | 背景图透明度 | (0,1]的浮点数 | 展示的背景图透明度，默认为1。如果你觉得显示效果不佳，可以自定义，如0.8 |
| urlPrefix | 默认 URL 前缀 | 字符串 | 只支持字符串类型，设置为自定义的全局默认链接前缀，该前缀会覆盖原始默认前缀，但不会覆盖用户自定义的链接前缀 |
| announcement | 公告 | 字符串 | 只支持字符串类型，可以为 HTML 格式，设置为你自定义的公告内容（如有） |
| defaultUploadChannel | 默认上传渠道 | 字符串 | 只支持字符串类型，设置为你自定义的默认上传渠道，支持telegram（Telegram 渠道）、cfr2（Cloudflare R2）、s3（S3 渠道）、discord（Discord 渠道）和huggingface（HuggingFace 渠道） |
| defaultChannelName | 默认渠道名称 | 字符串 | 只支持字符串类型，指定默认使用的渠道名称，需先选择上传渠道。当同一渠道类型配置了多个渠道时，可通过此项指定默认使用哪个渠道 |
| defaultUploadNameType | 默认命名方式 | 字符串 | 只支持字符串类型，设置为你自定义的默认上传文件命名方式，支持default（默认）、index（仅前缀）、original（仅原名）和short（短链接） |
| loginBkImg | 登录页背景图 | 列表/字符串 | 1、当字段类型为列表时，列表中元素为需要添加到轮播列表中的图片链接（列表中只有一张图时即为固定背景），形如["1.jpg","2.jpg"]<br>2、当字段类型为字符串时，目前仅支持字符串值为bing，设置为该值时启用bing随机图片轮播模式。 |
| uploadBkImg | 上传页背景图 | 列表/字符串 | 同loginBkImg |
| footerLink | 页脚传送门链接 | 字符串 | 只支持字符串类型，设置为你自定义的传送地址（如个人博客链接） |
| disableFooter | 隐藏页脚 | boolean | 支持boolean类型，设为true时禁用页脚，默认false |
| defaultConvertToWebp | 默认转换 WebP | boolean | 支持boolean类型，设为true时默认开启 WebP 转换，默认false |
| defaultCustomerCompress | 默认开启压缩 | boolean | 支持boolean类型，设为true时默认开启客户端压缩，默认true |
| defaultCompressBar | 默认压缩阈值 | 数字 | 图片大小超过此值将自动压缩，单位 MB，范围 1-20，默认5 |
| defaultCompressQuality | 默认期望大小 | 数字 | 压缩后图片大小期望值，单位 MB，范围 0.5-压缩阈值，默认4 |
| adminLoginBkImg | 管理页登录背景图 | 列表/字符串 | 同loginBkImg |
| adminBkImg | 管理页背景图 | 列表/字符串 | 同loginBkImg |

## 🛠️ 其他设置
其他设置项，在管理后台的「系统设置」→「其他设置」中配置。

### 远端遥测
便于开发者进行bug的捕捉和定位，但是过程中可能收集到访问链接、域名等信息，如您不愿意泄露类似信息给项目开发者，请在管理后台禁用此功能。

### 随机图像 API
目录：开放随机图权限的目录，默认为根目录，多个目录用逗号分隔；目录均采用绝对路径，例如`/img/cover`，表示该目录及其所有子目录的文件可被随机图API访问。

### 访客图库
允许未登录用户访问指定目录的文件，可用于创建公开图库或相册展示。
- 启用公开浏览：开启或关闭公开浏览功能
- 允许访问的目录：开放公开访问权限的目录，多个目录用逗号分隔；目录均采用绝对路径（可不写开头的`/`），例如`/img/gallery,/img/wallpapers`

> 提示
> 启用后，用户可通过 `/browse/目录名` 路径访问公开图库，例如 `/browse/img/gallery`

### CloudFlare API Token
正常情况下，因为CloudFlare CDN缓存的存在，在管理端进行删除、拉黑、加白名单等操作不会立即生效，需要等到缓存过期才能生效。为了让操作立即生效，建议设置此项：
- CF_ZONE_ID：绑定域名的 Cloudflare Zone ID 获取方法
- CF_EMAIL：Cloudflare 账户邮箱
- CF_API_KEY：Cloudflare Global API Key 获取方法

### WebDAV
WebDAV 服务相关设置，详细介绍和使用方式请查看 API 文档。
- 启用 WebDAV 服务：开启或关闭 WebDAV 服务
- 用户名：WebDAV 登录用户名
- 密码：WebDAV 登录密码
- 上传渠道：通过 WebDAV 上传文件时使用的存储渠道，支持 Telegram、Cloudflare R2、S3、Discord、HuggingFace
- 指定渠道名：当选择的上传渠道有多个配置时，可指定具体使用哪个渠道名称进行上传

## 🔧 环境变量清单
> 注意
> 环境变量设置方式在 v2.0 版本后已废弃，以下配置请在管理后台进行。

### 基础认证配置
| 变量名 | 类型 | 必需 | 说明 | 示例值 |
| --- | --- | --- | --- | --- |
| BASIC_USER | string | 否 | 管理员用户名 | admin |
| BASIC_PASS | string | 否 | 管理员密码 | your_secure_password |
| AUTH_CODE | string | 否 | 上传认证码 | your_auth_code |

### 存储渠道配置
#### Telegram 渠道
| 变量名 | 类型 | 必需 | 说明 | 示例值 |
| --- | --- | --- | --- | --- |
| TG_BOT_TOKEN | string | 是 | Telegram Bot Token | 123456789:ABCdefGHI... |
| TG_CHAT_ID | string | 是 | Telegram 频道 ID | -1001234567890 |

### 功能开关配置
| 变量名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| AllowRandom | boolean | false | 启用随机图 API |
| WhiteList_Mode | boolean | false | 启用白名单模式 |
| disable_telemetry | boolean | false | 禁用遥测数据 |

### 安全配置
| 变量名 | 类型 | 说明 | 示例值 |
| --- | --- | --- | --- |
| ALLOWED_DOMAINS | string | 允许访问的域名列表 | domain1.com,domain2.com |
| ModerateContentApiKey | string | 图像内容审查 API Key | your_api_key |

### CDN 缓存配置
| 变量名 | 类型 | 说明 | 用途 |
| --- | --- | --- | --- |
| CF_ZONE_ID | string | Cloudflare Zone ID | 自动清除 CDN 缓存 |
| CF_EMAIL | string | Cloudflare 账户邮箱 | 自动清除 CDN 缓存 |
| CF_API_KEY | string | Cloudflare Global API Key | 自动清除 CDN 缓存 |