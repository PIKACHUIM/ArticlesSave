---
title: 轻舟云安装教程———快速搭建IDC系统
description: 本教程将介绍如何快速搭建IDC系统，包括轻舟云Web主控安装和优化选项。
pubDate: 12 25 2025
categories:
  - Virtual
tags:
  - Virtual
  - QZCloud
badge: Virtual
---

# 轻舟云安装教程———快速搭建IDC系统

## 轻舟云Web主控安装
### 安装教程

### 优化选项

- #### VNC自动识别协议+端口

  - 修改文件`app/common/service/ECS.php`大约2168行

    ```php
    $data['vncServer'] = $node['vnc_url'];
    $data['vncServerPort'] = "6080";
    ```

    修改为：

    ```php
    // ====================================================================
    $parsedUrl = parse_url($node['vnc_url']); // 解析 VNC URL 并提取端口
    $vncServer = ''; // 构建不包含端口的 URL（只包含协议和地址）
    if (isset($parsedUrl['scheme'])) $vncServer .= $parsedUrl['scheme'] . '://';
    if (isset($parsedUrl['host'])) $vncServer .= $parsedUrl['host'];
    $data['vncServer'] = $vncServer;
    // 如果 URL 中包含端口，则使用该端口，否则默认使用 6080
    if (isset($parsedUrl['port'])) $data['vncServerPort'] = (string)$parsedUrl['port'];
    else $data['vncServerPort'] = "6080";
    // ====================================================================
    ```

  - 修改文件`view/control/ecs/kvm.html`大约242行

    ```javascript
    const url = "ws://{$data['vncServer']}:{$data['vncServerPort']}/websockify?token={$data['vncToken']}";
    ```

    修改为：

    ```javascript
    // ====================================================================
    // 检查 vncServer 是否已包含协议
    let vncServer = "{$data['vncServer']}";
    let protocol = "ws://";
    // 如果 vncServer 已包含协议（ws:// 或 wss://），则不添加默认协议
    if (vncServer.startsWith("ws://") || vncServer.startsWith("wss://")) protocol = "";
    const url = `${protocol}${vncServer}:{$data['vncServerPort']}/websockify?token={$data['vncToken']}`;
    // ====================================================================
    ```

    - 然后在`VNC地址`里面可以填写协议和端口，例如：`wss://1.1.1.1:1880`

- #### 修复带端口情况下公网IP
  
- #### 使用宝塔NGINX代理WS端口
  
  2. 在宝塔Nignx或者自己Nignx服务器增加一个站点，添加反向代理：

     1. 代理地址：`http://127.0.0.1:6080`
  
     2. 在`location`内部添加如下的配置：
  
        ```ini
        # WSS代理 =================================================
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        # =========================================================
        ```
     3. 完整参考配置：
        
        ```ini
        server {
            listen <绑定SSL端口> ssl;
            http2 on;
            server_name <你的域名>;
            root /www/wwwroot/<你的域名>
            #SSL-START SSL相关配置
            ssl_certificate    /www/server/panel/vhost/cert/<证书路径>/fullchain.pem;
            ssl_certificate_key    /www/server/panel/vhost/cert/<证书路径>/privkey.pem;
            ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;
            ssl_ciphers EECDH+CHACHA20:EECDH+CHACHA20-draft:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;
            ssl_prefer_server_ciphers on;
            ssl_session_tickets on;
            ssl_session_cache shared:SSL:10m;
            ssl_session_timeout 10m;
            add_header Strict-Transport-Security "max-age=31536000";
            error_page 497  https://$host$request_uri;
            #SSL-END
            #WEBSOCKET-SUPPORT START
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection $connection_upgrade;
            #WEBSOCKET-SUPPORT END
            #PROXY-CONF-START
            location ^~ / {
              proxy_pass http://127.0.0.1:6080;
              proxy_set_header Host $http_host;
              proxy_set_header X-Real-IP $remote_addr;
              proxy_set_header X-Real-Port $remote_port;
              proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
              proxy_set_header X-Forwarded-Proto $scheme;
              proxy_set_header X-Forwarded-Host $host;
              proxy_set_header X-Forwarded-Port $server_port;
              proxy_set_header REMOTE-HOST $remote_addr;
              proxy_connect_timeout 60s;
              proxy_send_timeout 600s;
              proxy_read_timeout 600s;
              proxy_http_version 1.1;
              proxy_set_header Upgrade $http_upgrade;
              proxy_set_header Connection $connection_upgrade;
            }
        }
        ```

## Hyper-V被控端安装

### 0x00 启用HyperV功能

- #### Windows 7/8/8.1/10/11

  1. 打开**控制面板**————**程序与功能**————**启用或关闭Windows功能**
  2. 

- #### Server 12/16/19/22/25

  1. 

  

- ### 0x01 设置虚拟机网卡

  1. 

- ### 0x02 安装爱快软路由

  1. 

- ### 0x03 设置被控端软件

  1. 修改密码：`net user qzvnc 密码`
  2. 修改端口：
  
     1. 修改被控端口：`C:\qzsystem\QZCloudService\QZCloudService.exe.config`，将8000修改为需要的端口
  
     ```xml
           <setting name="port" serializeAs="String">
             <value>8000</value>
           </setting>
     ```
  
     
  
     1. 修改VNC端口：`C:\qzsystem\QZCloudVNC\etc\wsgate.ini`
  3. 

## Promox VE被控安装

### 安装PVE被控

### 配置PVE主机

### 配置VNC服务

- 配置noVNC服务

  1. 打开宝塔守护进程管理器或者PM2管理器

     1. 进程目录：`/home/qzcloud/vnc/websockify/`
     2. 运行命令：`sh -c './run --token-plugin TokenFile --token-source /home/qzcloud/vnc/token/token.conf 6080'`


### 安装教程

#### 安装被控

准备一台PVE系统的机器，PVE7 或者PVE 8 均可以 PVE7可能会遇到一些问题

PVE被控 安装命令：
```shell
wget -O install http://dcim.qzsystem.com/pve/install && chmod 777 install && ./install
```
安装后会提示：

```shell
Install successfull 
your apikey: 74dc07a01be2d411 
your node Admin url:  http://your_ip:8000 

```

#### 配置服务
用IP:8000打开 注意是服务器的公网IP 不是真的ip:8000 是服务器的公网IP
比如我的服务器ip是 192.168.1.1 那么就是 192.168.1.1:8000 进入


这个APIKEY就是 安装后提示的 apikey 也就是 74dc07a01be2d411

### 常用命令

```shell
# 安装目录
/home/qzcloud/

# 配置文件 
/home/qzcloud/conf/app.ini

# 系统日志
/home/qzcloud/logs

# 启动服务
systemctl start qzcloud
systemctl start qzvnc

# 重启服务
systemctl restart qzcloud
systemctl restart qzvnc

# 查看状态
systemctl status qzcloud
systemctl status qzvnc

# 停止服务
systemctl stop qzvnc
systemctl stop qzcloud

```
