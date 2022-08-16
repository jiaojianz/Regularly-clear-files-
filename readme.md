定时清除文件
===

node + express 实现开机服务自启动，定时清除指定目录下的文件或文件夹下所属文件
---

# 配置文件（config.js）

+ filePath：要定时删除文件或文件夹的地址

+ saveTimeFilePath：存储时间的文件地址（不存在此文件会自动创建）

+ serverName：服务名称

+ serverDescribtion：服务描述

+ thresholdTime：时间阈值（每隔thresholdTime时间清除filePath下的文件或文件夹下的所属文件）

# 注册服务

## 以下操作必须以管理员身份运行

+ 启动注册服务
  
  进入项目目录下，运行命令：node startUp.js

+ 删除服务
  
  进入项目目录下，运行命令：node logout.js