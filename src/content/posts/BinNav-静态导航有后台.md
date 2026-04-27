---
title: BinNav-静态导航有后台，免费部署EdgeOne Pages和Cloudflare Pages
published: 2026-02-19
description: 一个现代化的网站导航页面，支持可视化管理后台、智能图标获取、拖拽排序和自动部署更新，可部署至EdgeOne Pages无需服务器
image: https://imgbed.20210701.xyz/file/博客/1771513899287_image.png
tags: ["导航页", "EdgeOne", "部署", "静态应用"]
category: qgxs
draft: false
---

# BinNav-静态导航有后台，免费部署EdgeOne Pages和Cloudflare Pages

一个现代化的网站导航页面，支持可视化管理后台、智能图标获取、拖拽排序、自动提交和邮件发送功能和自动部署更新。部署至EdgeOne Pages无需服务器。

## 项目预览

原项目地址：[https://github.com/sindricn/BinNav_Public](https://github.com/sindricn/BinNav_Public)

原项目样式：
![首页预览](https://raw.githubusercontent.com/sindricn/BinNav_Public/main/public/img/index.png)
![后台预览](https://raw.githubusercontent.com/sindricn/BinNav_Public/main/public/img/admin.png)

修改后的样式：
![修改后预览](https://imgbed.20210701.xyz/file/博客/1771513899287_image.png)

基于个人自用修改，仅供学习参考！

在原来项目的基础上使用AI修改：
1.1
- 添加自定义背景，半透明效果
- 添加居中布局，返回最顶层
- 添加自定义图标，自定义页脚
1.2
- 适配Cloudflare Pages
1.3
- 添加二次确认卡片
- 添加RSS sitemap索引
1.4
- AI优化了整体的构建和加载速度
- 添加背景api图片过渡


## EdgeOne Pages部署

### 手动部署

1. 下载压缩包`BinNav_Public.zip`
   https://wwbtv.lanzout.com/b0pnf424j
   密码:am09
2. 👉 创建一个项目到你自己账号下,解压出压缩包上传项目
3. 登录EdgeOne，创建项目选择你创建后的仓库
4. 添加环境变量并部署
   Cloudflare Pages 流程一样
`也可以直接在EdgeOne创建项目，上传压缩包即可`
### ⚙️ 环境变量配置

**基础配置**：项目可以零配置运行，但为了完整功能体验，建议配置以下环境变量：

| 变量名 | 描述 | 必需 | 默认值 | 功能影响 |
|--------|------|------|--------|----------|
| ADMIN_PASSWORD | 管理后台登录密码 | 否 | admin | 未设置时使用默认密码 |
| GITHUB_TOKEN | GitHub Personal Access Token | 否 | - | 未设置时无法自动保存配置到GitHub |
| GITHUB_REPO | GitHub仓库名（格式：用户名/仓库名） | 否 | - | 未设置时无法自动保存配置到GitHub |
| RESEND_API_KEY | Resend API Key，用于邮件服务 | 否 | - | 未设置时无法发送邮件通知 |
| ADMIN_EMAIL | 管理员邮箱，接收新站点提交通知 | 否 | - | 未设置时无法接收邮件通知 |
| RESEND_DOMAIN | Resend发送域名（仅域名部分） | 否 | - | 未设置时无法发送邮件通知 |

**功能说明**：
- 基础功能：无需任何配置即可正常使用导航和管理后台
- 自动保存：需要配置 GITHUB_TOKEN 和 GITHUB_REPO
- 邮件通知：需要配置 RESEND_API_KEY、ADMIN_EMAIL 和 RESEND_DOMAIN

**管理后台登录**：
- 用户名：无需用户名，仅需密码
- 默认密码：admin（建议生产环境修改）
- 访问地址：/admin

**GitHub Token 创建步骤**：
1. 访问 GitHub Settings > Tokens
2. 点击 "Generate new token (classic)"
3. 选择 repo 权限
4. 复制生成的 token

## ✉️ Resend 邮件功能配置指南

BinNav 集成了 Resend 的邮件发送能力，用户可在前端页面填写反馈，自动发送邮件至指定邮箱。你只需完成以下三步，即可启用该功能：

✅ **步骤一：注册 Resend 账号**
- 访问官网 [https://resend.com](https://resend.com)
- 使用邮箱或 GitHub 账户注册并登录

🔑 **步骤二：创建 API Key**
- 登录后，点击左侧菜单栏 API Keys
- 点击右上角 Create API Key
- 输入名称（如 BinNav Key），点击生成
- 复制生成的 key（如 re_xxxxxxxxxxxxxxxxx）并保存备用

🌐 **步骤三：添加并验证发件域名（可使用免费二级域名）**
- 左侧菜单进入 Domains → 点击 Add Domain
- 输入你的域名（如 yourdomain.com），或使用 Resend 提供的免费二级域名
- 按照提示添加 DNS 记录以完成验证

## 本地开发

```bash
# 1. 下载压缩包
https://wwbtv.lanzout.com/b0pnf424j
密码:am09

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
```

**访问地址**：
- 🏠 首页：[http://localhost:5173](http://localhost:5173)
- ⚙️ 管理后台：[http://localhost:5173/admin](http://localhost:5173/admin)（默认密码：admin）
- 