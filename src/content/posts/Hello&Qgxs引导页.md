---
title: Hello&Qgxs引导页
published: 2025-01-31
description: Hello&Qgxs引导页,托管Cloudflar
tags: ["分享"]
category: qgxs
draft: false
---
Hello&Qgxs引导页
html单页
AI写的
自适应页面
可以托管Cloudflare 

当做小页面放在博客里面，挺不错的
我的演示页面[dh.20210701.xyz](https:/dh.20210701.xyz/)

```
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="index, follow">
    <meta name="description" content="Hello Qgxs - 欢迎来到我的个人网站">
    <meta name="theme-color" content="#0ea5e9">
    <!-- Cloudflare优化 -->
    <meta http-equiv="Cache-Control" content="public, max-age=31536000, immutable">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Qgxs&Hello</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://events.vercount.one" crossorigin>
    <link rel="preconnect" href="https://www.20210701.xyz" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap&text=Hello%20Qgxs" rel="stylesheet" media="print" onload="this.media='all'">
    <noscript>
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet">
    </noscript>
    <style>*{margin:0;padding:0;box-sizing:border-box}:root{--primary:#0ea5e9;--dark:#0f172a}body{background-color:var(--dark);color:white;font-family:system-ui,-apple-system,sans-serif;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden}.text-gradient{background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent}.glow{filter:drop-shadow(0 0 6px rgba(14,165,233,0.5));-webkit-filter:drop-shadow(0 0 6px rgba(14,165,233,0.5))}.bg-grid{background-size:20px 20px;background-image:linear-gradient(to right,rgba(14,165,233,0.03) 1px,transparent 1px),linear-gradient(to bottom,rgba(14,165,233,0.03) 1px,transparent 1px)}@keyframes sweep{0%{background-position:-200% 0}100%{background-position:200% 0}}.text-sweep{background:linear-gradient(90deg,rgba(255,255,255,0.1),rgba(255,255,255,0.9),rgba(255,255,255,0.1));background-size:200% 100%;animation:sweep 4s ease-in-out infinite;background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent}.compact-stat{background:rgba(14,165,233,0.08);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);border:1px solid rgba(14,165,233,0.15)}.fixed-bg{position:fixed;inset:0;z-index:0}.bg-blob{position:fixed;border-radius:50%;filter:blur(80px);opacity:0.15;pointer-events:none}.bg-blob-1{width:60vh;height:60vh;background-color:var(--primary);transform:translate(-50%,-50%);z-index:0}.bg-blob-2{width:40vh;height:40vh;background-color:var(--primary);opacity:0.1;transform:translate(33%,33%);z-index:0}main{position:relative;z-index:10;display:flex;flex-direction:column;align-items:center;text-align:center;padding:1.5rem;width:100%;max-width:32rem;opacity:0;transform:translateY(20px);animation:fadeIn 0.6s ease forwards;animation-delay:0.1s}@keyframes fadeIn{to{opacity:1;transform:translateY(0)}}.avatar-container{margin-bottom:1rem}.avatar{width:6rem;height:6rem;border-radius:50%;overflow:hidden;border:2px solid rgba(14,165,233,0.3)}@media (min-width:768px){.avatar{width:7rem;height:7rem}}.avatar img{width:100%;height:100%;object-fit:cover}h1{font-size:clamp(2rem,5vw,3rem);font-family:'Pacifico',cursive;margin-bottom:0.5rem}.welcome-text{color:#9ca3af;font-size:0.875rem;margin-bottom:1.5rem;max-width:24rem;line-height:1.5;padding:0 1rem}@media (min-width:768px){.welcome-text{font-size:1rem}}.button-group{display:flex;gap:0.75rem;margin-bottom:1.5rem}.btn{padding:0.5rem 1rem;border-radius:9999px;background-color:rgba(255,255,255,0.05);color:white;text-decoration:none;display:flex;align-items:center;gap:0.375rem;font-size:0.875rem;transition:all 0.3s ease}.btn:hover{background-color:rgba(255,255,255,0.1);transform:scale(1.05)}.btn-primary{padding:0.625rem 1.5rem;background:linear-gradient(to right,var(--primary),#38bdf8);color:white;font-weight:500}.btn-primary:hover{background:linear-gradient(to right,#38bdf8,var(--primary));background-color:transparent}.stats{position:relative;z-index:10;margin:0.5rem 0}.compact-stat{padding:0.375rem 0.75rem;border-radius:9999px;display:flex;align-items:center;gap:0.75rem;font-size:0.75rem}.stat-item{display:flex;align-items:center;gap:0.25rem}.stat-divider{color:rgba(14,165,233,0.4)}footer{position:relative;z-index:10;margin-top:0.25rem;padding:1rem;color:#9ca3af;font-size:0.75rem;width:100%;text-align:center}.animate-pulse{animation:pulse 0.5s ease-in-out}@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}</style>
</head>
<body>
    <div class="fixed-bg bg-grid"></div>
    <div class="bg-blob bg-blob-1"></div>
    <div class="bg-blob bg-blob-2"></div>

    <main>
        <div class="avatar-container">
            <div class="avatar glow">
                <img src="https://www.20210701.xyz/icon.jpeg" alt="Avatar" loading="lazy" decoding="async">
            </div>
        </div>

        <h1 data-text="Hello Qgxs">
            <span class="text-sweep">Hello Qgxs</span>
        </h1>

        <!-- 紧凑版欢迎文本 -->
        <div class="welcome-text">
            <p>
                <span style="color: rgba(14, 165, 233, 0.9);">欢迎到来。</span>
                愿本站伴我走过春秋岁月，
            </p>
            <p>
                也祝各位访客<span style="color: rgba(14, 165, 233, 0.9); margin-left: 0.25rem;">生活顺心。</span>
            </p>
        </div>

        <div class="button-group">
            <a href="https://www.20210701.xyz/" class="btn glow" aria-label="访问我的博客">
                <span role="img" aria-label="博客">📚</span>
                <span>博客</span>
            </a>
            <a href="https://20210701.xyz/" class="btn glow" aria-label="访问100周年网站">
                <span role="img" aria-label="100周年">🇨🇳</span>
                <span>100周年</span>
            </a>
        </div>

        <a href="https://www.20210701.xyz/about.html" class="btn btn-primary glow" aria-label="了解关于我">
            关于我
        </a>
    </main>

    <!-- 紧凑统计信息 - 使用 Vercount -->
    <div class="stats">
        <div class="compact-stat glow">
            <div class="stat-item">
                <span style="color: #0ea5e9;">⏱️</span>
                <span id="run-days">计算中...</span>
            </div>
            
            <div class="stat-divider">•</div>
            
            <div class="stat-item">
                <span style="color: #0ea5e9;">👁️</span>
                <span>
                    浏览 <span id="vercount_value_site_pv">Loading</span>次
                </span>
            </div>
        </div>
    </div>

    <footer>
        © 2025 Hello Qgxs. All rights reserved.
        <br>
        <span style="font-size: 0.625rem; opacity: 0.7;">托管在 <a href="https://www.cloudflare.com" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: none; border-bottom: 1px dotted rgba(255, 255, 255, 0.3);">Cloudflare</a> | 由 <a href="https://www.cloudflare.com" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: none; border-bottom: 1px dotted rgba(255, 255, 255, 0.3);">Cloudflare</a> CDN 提供加速与安全防护</span>
    </footer>

    <!-- Vercount 官方脚本 -->
    <script defer src="https://events.vercount.one/js"></script>

    <script>document.addEventListener('DOMContentLoaded',()=>{function u(){const e=new Date('2025-12-24'),t=new Date(),n=Math.floor((t-e)/(1e3*60*60*24));const o=document.getElementById('run-days');o&&(o.textContent=`${n}天`)}u();const e=document.getElementById('vercount_value_site_pv');if(e){function t(){if(e.textContent&&'Loading'!==e.textContent){const n=parseInt(e.textContent);return isNaN(n)||(e.textContent=n.toLocaleString()),!0}return!1}if(!t()){let n=0;const o=()=>{n++;if(!t()&&n<10)setTimeout(o,500*n);else if(n>=10&&'Loading'===e.textContent)e.textContent='0'};o()}}setInterval(u,30*60*1e3)});</script>
</body>
</html>
```