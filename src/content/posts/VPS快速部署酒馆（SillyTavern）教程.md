---
title: VPS快速部署酒馆（SillyTavern）教程.md
published: 2025-09-31
description: 面板推荐使用宝塔面板
tags: ["分享"]
category: qgxs
draft: false
---

VPS快速部署酒馆（SillyTavern）教程
面板推荐使用宝塔面板

1.新建目录sillytavern

```
mkdir sillytavern
```

```
cd sillytavern
```

2.在文件夹内新建一个文件
```
docker-compose.yml
```
里面的内容为：
`默认账户admin密码admin`
`请注意自己修改！`
推荐海外节点
```
version: "3.9"


services:
  sillytavern:
    image: ghcr.io/sillytavern/sillytavern:latest
    container_name: sillytavern
    environment:
      - SILLYTAVERN_WHITELISTMODE=false    # ❗关闭IP白名单，避免换IP被封
      - SILLYTAVERN_BASICAUTHMODE=true     # 🔐 启用基础认证
      - SILLYTAVERN_BASICAUTHUSER_USERNAME=admin # 你的用户名
      - SILLYTAVERN_BASICAUTHUSER_PASSWORD=admin # 你的密码
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
推荐国内节点
```
version: "3.9"


services:
  sillytavern:
    image: docker.1ms.run/goolashe/sillytavern:stable
    container_name: sillytavern
    environment:
      - SILLYTAVERN_WHITELISTMODE=false    # ❗关闭IP白名单，避免换IP被封
      - SILLYTAVERN_BASICAUTHMODE=true     # 🔐 启用基础认证
      - SILLYTAVERN_BASICAUTHUSER_USERNAME=admin # 你的用户名
      - SILLYTAVERN_BASICAUTHUSER_PASSWORD=admin # 你的密码
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

然后在该目录下运行：
```
docker compose up -d
```

打开浏览器，访问 http://<你的服务器IP>:8000，输入你设定的用户名和密码，就可以进入酒馆的大门了

酒馆官方开源地址[https://github.com/SillyTavern/SillyTavern](https://github.com/SillyTavern/SillyTavern)



`互联网创作，仅供个人使用，如有侵权，请联系删除`