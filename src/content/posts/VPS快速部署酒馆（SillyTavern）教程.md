---
title: VPS快速部署酒馆（SillyTavern）教程
published: 2025-09-31
description: 使用宝塔面板和Docker在VPS上一键部署SillyTavern酒馆，支持国内外节点，附带基础认证配置。
image: 未设置
tags: ["部署教程", "Docker", "VPS"]
category: 部署教程
draft: false
---

VPS快速部署酒馆（SillyTavern）教程

面板推荐使用宝塔面板。

1. 新建目录 sillytavern

```bash
mkdir sillytavern
cd sillytavern
```

2. 在文件夹内新建 docker-compose.yml 文件

文件内容如下（请根据服务器位置选择对应的镜像）：

推荐海外节点：

```yaml
version: "3.9"

services:
  sillytavern:
    image: ghcr.io/sillytavern/sillytavern:latest
    container_name: sillytavern
    environment:
      - SILLYTAVERN_WHITELISTMODE=false    # ❗关闭IP白名单，避免换IP被封
      - SILLYTAVERN_BASICAUTHMODE=true     # 🔐 启用基础认证
      - SILLYTAVERN_BASICAUTHUSER_USERNAME=admin # 你的用户名
      - SILLYTAVERN_BASICAUTHUSER_PASSWORD=admin # 你的密码（请及时修改）
      - TZ=Asia/Shanghai
    ports:
      - "8000:8000"                         # 本地访问端口
    volumes:
      - ./config:/home/node/app/config
      - ./data:/home/node/app/data
      - ./plugins:/home/node/app/plugins
      - ./extensions:/home/node/app/public/scripts/extensions/third-party
    restart: unless-stopped
```

推荐国内节点：

```yaml
version: "3.9"

services:
  sillytavern:
    image: docker.1ms.run/goolashe/sillytavern:stable
    container_name: sillytavern
    environment:
      - SILLYTAVERN_WHITELISTMODE=false    # ❗关闭IP白名单，避免换IP被封
      - SILLYTAVERN_BASICAUTHMODE=true     # 🔐 启用基础认证
      - SILLYTAVERN_BASICAUTHUSER_USERNAME=admin # 你的用户名
      - SILLYTAVERN_BASICAUTHUSER_PASSWORD=admin # 你的密码（请及时修改）
      - TZ=Asia/Shanghai
    ports:
      - "8000:8000"                         # 本地访问端口
    volumes:
      - ./config:/home/node/app/config
      - ./data:/home/node/app/data
      - ./plugins:/home/node/app/plugins
      - ./extensions:/home/node/app/public/scripts/extensions/third-party
    restart: unless-stopped
```

默认账户 admin，密码 admin，请注意及时修改！

3. 启动容器

在 sillytavern 目录下运行：

```bash
docker compose up -d
```

4. 访问酒馆

打开浏览器，访问 http://<你的服务器IP>:8000，输入设定的用户名和密码，即可进入酒馆。

参考

官方开源地址：https://github.com/SillyTavern/SillyTavern

---

互联网创作，仅供个人使用，如有侵权，请联系删除