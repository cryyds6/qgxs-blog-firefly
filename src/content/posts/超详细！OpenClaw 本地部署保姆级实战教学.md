---
title: 超详细！OpenClaw 本地部署保姆级实战教学
published: 2026-03-18
description: 本文详细讲解 OpenClaw AI 助手框架在 Windows、macOS、Linux 下的本地部署、配置、常用命令与故障排除方法。
image: https://imgbed.20210701.xyz/file/博客/1773801117558_2a15dd88234a2dfe31c08fc2fcabb83a.webp
tags: ["OpenClaw", "AI助手", "本地部署", "教程"]
category: qgxs
draft: false
---
# 超详细！OpenClaw 本地部署保姆级实战教学

![OpenClaw 部署教程封面](https://imgbed.20210701.xyz/file/博客/1773801117558_2a15dd88234a2dfe31c08fc2fcabb83a.webp)

## 1. 简介
### 什么是 OpenClaw？
OpenClaw/Moltbot/Clawdbot 是一个 AI 助手框架，支持：
- 🤖 多模型支持（MiniMax、Claude、GLM、GPT等）
- 💬 多平台集成（WhatsApp、Telegram、Discord等）
- 🛠️ 强大的工具生态（浏览器、文件系统、代码生成等）
- 🔧 可扩展的技能系统

### 版本说明
- OpenClaw: 官方名称，最新版本使用的命令
- Moltbot/Clawdbot: 旧版本命令，部分用户可能仍在使用

本教程以 `openclaw` 为准，clawdbot 用户可将命令替换使用。

## 2. 系统要求
### 基础要求
| 项目 | 要求 |
|------|------|
| 操作系统 | macOS 10.15+ / Windows 10+ / Linux (Ubuntu 20.04+) |
| Node.js | >= 22.x (必需) |
| 内存 | 最低 2GB，推荐 4GB+ |
| 磁盘空间 | 最低 1GB，推荐 5GB+ |
| 网络 | 需要访问互联网（API 调用），必须使用代理，否则无法启动 gateway |

### Windows 额外要求
推荐: WSL2 (Windows Subsystem for Linux 2)
原因: 原生 Windows 支持不完善，工具兼容性较差

### macOS 额外要求
Xcode Command Line Tools: 可选（仅构建应用时需要）

## 3. Windows 系统安装
### 方法一：安装 WSL2（推荐）
#### 3.1 安装 WSL2
以管理员身份打开 PowerShell：
```powershell
# 启用 WSL 功能
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
# 启用虚拟机平台
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

步骤 2：重启电脑

步骤 3：安装 WSL2 内核更新
下载并安装：[wslstorestorage.blob.core.wslblob/wsl_update_x64.msi](https://wslstorestorage.blob.core.wslblob/wsl_update_x64.msi)

步骤 4：设置 WSL2 为默认
```powershell
wsl --set-default-version 2
```

步骤 5：安装 Ubuntu
打开 Microsoft Store，搜索 "Ubuntu 22.04 LTS"，安装并启动，设置用户名和密码。

#### 3.2 在 WSL2 中安装 Node.js
```bash
# 更新包列表
sudo apt update && sudo apt upgrade -y
# 安装 curl
sudo apt install -y curl
# 安装 Node.js 22.x
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
# 验证安装
node --version
npm --version
```

#### 3.3 安装 OpenClaw
```bash
curl -fsSL https://openclaw.ai/install.sh | bash

# 验证安装
openclaw --version

# 如果命令找不到，添加到 PATH
echo 'export PATH="$PATH:/usr/local/bin"' >> ~/.bashrc
source ~/.bashrc
```

#### 3.4 安装 Docker（可选，用于沙箱）
```bash
# 在 WSL2 中安装 Docker
curl -fsSL https://get.docker.com | sudo sh

# 添加当前用户到 docker 组
sudo usermod -aG docker $USER

# 启动 Docker 服务
sudo service docker start

# 验证
docker --version
```

#### 3.5 遇到问题？
- 方案 A：使用 Docker Desktop
- 方案 B：使用虚拟机安装 Ubuntu 22.04

### 方法二：Windows PowerShell 一键部署
```powershell
iwr -useb https://openclaw.ai/install.ps1 | iex
```

## 4. Mac 系统安装
### 4.1 安装 Homebrew（如果未安装）
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew --version
```

### 4.2 安装 Node.js 22.x
#### 方案 A：使用 Homebrew
```bash
brew install node@22
echo 'export PATH="/usr/local/opt/node@22/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
node --version
```

#### 方案 B：使用 nvm（推荐）
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.zshrc
nvm install 22
nvm use 22
node --version
```

### 4.3 安装 OpenClaw
```bash
curl -fsSL https://openclaw.ai/install.sh | bash
openclaw --version

# 找不到命令时添加 PATH
echo 'export PATH="$PATH:/usr/local/bin"' >> ~/.zshrc
source ~/.zshrc
```

或使用 npm：
```bash
npm install -g openclaw@latest
openclaw --version
```

或使用 pnpm：
```bash
npm install -g pnpm
pnpm add -g openclaw@latest
openclaw --version
```

### 4.4 安装 Docker（可选）
下载地址：[https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)

### 4.5 Xcode Command Line Tools（可选）
```bash
xcode-select --install
xcode-select -p
```

## 5. 首次配置向导
### 5.1 启动向导
```bash
openclaw onboard
```

### 5.2 配置步骤
1. 选择 Gateway mode：Local
2. 认证选择：Anthropic (API key)
3. 默认模型：claude-sonnet-4-0
4. 工作区：~/clawd
5. 端口：18789，绑定：loopback
6. 认证：Token
7. Tailscale：No
8. 按需配置频道
9. 安装后台服务
10. 运行时：Node
11. 健康检查 & 安装推荐技能

### 5.3 完成配置
看到 `🎉 OpenClaw 已准备就绪！` 即完成。

### 5.4 快速测试
```bash
openclaw status
openclaw message send --target +15555550123 --message "Hello from Moltbot!"
openclaw logs --follow
```

## 6. 常用指令大全
### 6.1 基础命令
```bash
openclaw --version
openclaw --help
openclaw status
openclaw status --all
openclaw status --deep
```

### 6.2 Gateway 管理
```bash
openclaw gateway start
openclaw gateway stop
openclaw gateway restart
openclaw gateway status
openclaw gateway config
```

### 6.3 配置管理
```bash
openclaw configure
openclaw config get
openclaw config set gateway.port 18789
openclaw config unset gateway.port
```

### 6.4 模型管理
```bash
openclaw models list
openclaw models set anthropic/claude-sonnet-4-0
openclaw models probe <model-name>
```

### 6.5 频道管理
```bash
openclaw channels login
openclaw channels logout
openclaw channels status
```

### 6.6 配对管理
```bash
openclaw pairing list whatsapp
openclaw pairing approve whatsapp <code>
```

### 6.7 消息发送
```bash
openclaw message send --target +15555550123 --message "Hello!"
```

### 6.8 代理 & 会话 & 技能
```bash
openclaw agents list
openclaw sessions list
openclaw skills list
```

### 6.9 日志与诊断
```bash
openclaw logs --follow
openclaw health
openclaw doctor
openclaw doctor --fix
```

### 6.10 更新升级
```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

## 7. 日常维护
### 7.1 定期检查
```bash
openclaw status
openclaw health
openclaw doctor
```

### 7.2 日志管理
```bash
openclaw logs --follow
openclaw logs --limit 1000 | grep -i "error\|failed"
```

### 7.3 备份配置
```bash
cp ~/.openclaw/openclaw.json ~/.openclaw/openclaw.json.backup.$(date +%Y%m%d)
tar -czvf ~/backups/clawd-backup.$(date +%Y%m%d).tar.gz ~/clawd/
```

### 7.4 更新流程
```bash
openclaw gateway stop
curl -fsSL https://openclaw.ai/install.sh | bash
openclaw doctor
openclaw gateway start
openclaw status
```

### 7.5 监控告警（可选）
```bash
cat > ~/clawd/monitor.sh << 'EOF'
#!/bin/bash
echo "=== $(date) ==="
openclaw status
openclaw health
openclaw logs --limit 100 | grep -i error | tail -5
if ! openclaw gateway status | grep -q "running"; then
  echo "⚠️ Gateway 未运行，尝试重启..."
  openclaw gateway restart
fi
EOF
chmod +x ~/clawd/monitor.sh
```

定时任务：
```bash
0 * * * * ~/clawd/monitor.sh >> ~/clawd/monitor.log 2>&1
```

### 7.6 清理维护
```bash
find /tmp/moltbot -name "openclaw-*.log" -mtime +7 -delete
rm -rf ~/.openclaw/tmp/*
```

## 8. 故障排除
### 8.1 快速诊断
```bash
openclaw status --all
openclaw logs --follow
openclaw doctor
openclaw doctor --fix
```

### 8.2 常见问题
#### 命令找不到
```bash
npm list -g --depth=0 | grep openclaw
echo 'export PATH="$PATH:/usr/local/bin"' >> ~/.zshrc
source ~/.zshrc
```

#### Gateway 无法启动
```bash
openclaw gateway --verbose
lsof -i :18789
```

#### 无 API Key
```bash
openclaw configure
export ANTHROPIC_API_KEY="sk-ant-api03-..."
```

#### 频道无响应
```bash
openclaw channels status --probe
```

### 8.3 紧急恢复
```bash
openclaw gateway stop
cp ~/.clawdbot/clawdbot.json ~/.openclaw/openclaw.json.emergency
openclaw setup --reset config
openclaw onboard
```

## 9. 进阶配置
### 9.1 多代理配置
```json
{
  "agents": {
    "list": [
      {
        "id": "main",
        "name": "主助手",
        "workspace": "~/clawd",
        "default": true,
        "model": {
          "primary": "minimax/MiniMax-M2.1",
          "fallbacks": ["glm-4"]
        }
      }
    ]
  }
}
```

### 9.2 模型主备配置
```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "minimax/MiniMax-M2.1",
        "fallbacks": [
          "anthropic/claude-sonnet-4-0",
          "glm-4",
          "openai/gpt-4o"
        ]
      }
    }
  }
}
```

### 9.3 频道配置示例
```json
{
  "channels": {
    "whatsapp": {
      "dmPolicy": "pairing",
      "allowFrom": ["+15555550123"]
    }
  }
}
```

## 10. 常见问题
- **内存**：最低 2GB，推荐 4GB+
- **支持模型**：Anthropic、OpenAI、MiniMax、GLM、Moonshot
- **切换模型**：`openclaw models set minimax/MiniMax-M2.1`
- **支持平台**：WhatsApp、Telegram、Discord 等

## 云服务器推荐
- 腾讯云：[https://curl.qcloud.com/52zSMIJx](https://curl.qcloud.com/52zSMIJx)
- 阿里云：[https://www.aliyun.com/activity/ecs/clawdbot](https://www.aliyun.com/activity/ecs/clawdbot)
- 小免云（推荐）
[https://www.moebun.com/aff/CPMKQYVR](https://www.moebun.com/aff/CPMKQYVR)
超便宜服务器
-小免云介绍
[小免云介绍](https://www.20210701.xyz/21-%E5%AE%9E%E6%B5%8B%E6%8E%A8%E8%8D%90%E5%85%8D%E8%B4%B9%E8%99%9A%E6%8B%9F%E4%B8%BB%E6%9C%BA%E8%B6%85%E4%BE%BF%E5%AE%9C%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%AD%A6%E4%B9%A0%E5%BB%BA%E7%AB%99%E6%B5%8B%E8%AF%95%E5%BF%85%E5%A4%87/)


## 资源链接
- 官方文档：[docs.openclaw.ai](https://docs.openclaw.ai)
- GitHub：[https://github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)

## ✅ 快速参考卡
```bash
# 日常
openclaw status
openclaw health
openclaw logs --follow

# 配置
openclaw configure

# Gateway
openclaw gateway start
openclaw gateway restart

# 修复
openclaw doctor
openclaw doctor --fix
```