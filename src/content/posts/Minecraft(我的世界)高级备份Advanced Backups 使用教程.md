---
title: Minecraft高级备份Advanced Backups 使用教程
published: 2026-02-21
description: 详细讲解Minecraft高级备份模组Advanced Backups的配置翻译、命令说明与三种备份类型的回档教程
image: https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/key-art/PDP-Hero_OV-Standard_16x9.jpg
tags: ["Minecraft", "服务端", "备份教程", "模组"]
category: qgxs
draft: false
---
# Minecraft高级备份Advanced Backups 使用教程

`
转载至MC百科 ZZYDD 仅供学习交流！
https://www.mcmod.cn/post/4786.html
`

在MC百科中下载高级备份: [https://www.mcmod.cn/class/10769.html](https://www.mcmod.cn/class/10769.html)

## 前言

这是我根据个人实际使用经验制作的教程。

配置文件为3.7.1版本的mod生成，结合ChatGPT、DeepSeek辅助进行翻译。

配置文件理论上通用，若有新选项，注释部分可能会重置，配置则会保留。

## 备份类型说明

### zip（完全备份）
说明：无脑备份所有文件。
优点：简单、可靠，一个文件包含所有内容，管理和回档方便。
缺点：速度慢，占用空间大，对大型存档极其不友好。

### differential（差异备份）
说明：先进行一次完全备份，之后只备份和完全备份相比发生变化的文件。
优点：速度相对较快，占用空间相对较小（相比完全备份小很多、快很多）。
缺点：回档时需要最近一次的完全备份+差异备份，管理和回档相对麻烦。

### incremental（增量备份）
说明：先进行一次完全备份，之后只备份相比上次备份发生变化的文件。
优点：速度最快，占用空间最小。
缺点：回档时需要最近一次的完全备份+期间所有增量备份，管理和回档麻烦。

## 回档教程

mod内置命令行回档工具，方便但有一定使用门槛，具体可去作者github查看。

这里介绍通过压缩软件进行回档，稍显麻烦，但更符合普通用户日常使用习惯。

### zip（完全备份）
1. 打开文件夹 `root\backups\world\zips`
2. 选择一个备份，然后解压（解压到`backup_xxxx-xx-xx_xx-xx-xx\`）
3. 重命名解压出来的文件夹 `backup_xxxx-xx-xx_xx-xx-xx` 为你的存档文件夹名称（如world）
4. 删除或暂时重命名原来的存档，然后把刚刚重命名的文件夹移动到服务端根目录

### differential（差异备份）
1. 打开文件夹 `root\backups\world\differential`
2. 选择离你要回档的差异备份最近的完全备份（带full后缀），然后解压（解压到`backup_xxxx-xx-xx_xx-xx-xx-full.\`）
3. 选择你要回档的差异备份（带partial后缀），然后解压（解压到`backup_xxxx-xx-xx_xx-xx-xx-partial.\`）
4. 把差异文件夹 `backup_xxxx-xx-xx_xx-xx-xx-partial` 里面的内容复制并替换到完全备份文件夹 `backup_xxxx-xx-xx_xx-xx-xx-full` 里
5. 重命名替换好后的文件夹 `backup_xxxx-xx-xx_xx-xx-xx-full` 为你的存档文件夹名称（如world）
6. 删除或暂时重命名原来的存档，然后把刚刚重命名的文件夹移动到服务端根目录
7. 确认无误后删除文件夹 `backup_xxxx-xx-xx_xx-xx-xx-partial` 即可（保留也可）

### incremental（增量备份）
1. 打开文件夹 `root\backups\world\incremental`
2. 选择离你要回档的增量备份最近的完全备份（带full后缀），然后解压（解压到`backup_xxxx-xx-xx_xx-xx-xx-full.\`）
3. 依次选择完全备份之后到你要回档的增量备份之间的所有增量备份（带partial后缀），并解压（解压到`backup_xxxx-xx-xx_xx-xx-xx-partial.\`）
4. 按照时间先后（从早到晚），依次把所有增量备份文件夹 `backup_xxxx-xx-xx_xx-xx-xx-partial` 里的内容复制并替换到完全备份文件夹 `backup_xxxx-xx-xx_xx-xx-xx-full` 里
5. 重命名替换好后的文件夹 `backup_xxxx-xx-xx_xx-xx-xx-full` 为你的存档文件夹名称（如world）
6. 删除或暂时重命名原来的存档，然后把刚刚重命名的文件夹移动到服务端根目录
7. 确认无误后删除相关增量备份文件夹即可。

## 不备份地平线
例如在使用地平线模组的新版本时，服务器会存储计算好的区块数据，每个维度都有几十G。这时在`config.advancedbackups.blacklist`添加黑名单，备份时就不会备份地平线超大的数据库文件。

DIM1黑名单：
```
config.advancedbackups.blacklist=session.lock,*_old,data/DistantHorizons.*,DIM1/data/DistantHorizons.*,DIM-1/data/DistantHorizons.*,dimensions/*/*/data/DistantHorizons.*
```

## 命令说明
- `/backup cancel`：取消正在进行的备份
- `/backup reload-client-config`：重新加载客户端配置
- `/backup reload-config`：重新加载服务端配置
- `/backup reset-chain`：重置备份链长度（备份链含义在配置文件翻译中有说明）
- `/backup snapshot`：创建一个快照，快照是完全备份，不会被自动删除
- `/backup start`：开始备份（创建备份）

## 配置翻译
配置文件：`config/AdvancedBackups.properties`

```properties
# Enable or disable automatic backups.
# 启用或禁用自动备份。
# Options : true, false   # Default : true
# 选项：true, false   # 默认值：true
config.advancedbackups.enabled=true

# Whether to save before making a backup.
# 在创建备份前是否先进行存档（save）。
# Options : true, false    # Default : true
# 选项：true, false    # 默认值：true
config.advancedbackups.save=true

# Whether to disable autosave before making a backup, and whether to re-enable saving afterwards.
# 是否在创建备份前禁用自动存档，并在备份完成后重新启用存档。
# Don't edit this unless you know what you're doing. Saving mid-backup can cause issues!
# 除非你清楚自己在做什么，否则不要修改此项。备份过程中进行存档可能会导致问题！
# Options : true, false    # Default: true
# 选项：true, false    # 默认值：true
config.advancedbackups.togglesave=true

# Buffer size, in bytes, to use when reading / writing files. Higher will improve speeds, but increase memory usage.
# 读取/写入文件时使用的缓冲区大小（单位：字节）。较高的值可提高速度，但会增加内存使用。
# Too high can cause an OOM. I'd advise against editing this unless you experience issues.
# 过高的值可能导致内存不足（OOM）。除非遇到问题，否则建议不要修改此项。
# (个人建议如果系统内存比较大，并且存档也比较大的话可以适当提高这个值，默认是1GB，可以设置成2-4GB，前提是你物理内存够)
# Range : 1-2147483647     # Default : 1048576
# 范围：1-2147483647     # 默认值：1048576
config.advancedbackups.buffer=1048576

# Whether to flush when making the aforementioned save. Can cause a lag spike, and is usually not required.
# 在进行上述存档时是否进行数据刷新（flush）。可能会导致卡顿，通常不需要开启。
# Unused prior to minecraft 1.16.
# 在 Minecraft 1.16 之前未使用此功能。
# Options : true, false    # Default : false
# 选项：true, false    # 默认值：false
config.advancedbackups.flush=false

# Whether to require player activity between backups.
# 是否要求在备份间隔期间有玩家活动。
# Options : true, false    # Default : true
# 选项：true, false    # 默认值：true
config.advancedbackups.activity=true

# The type of backups to use.
# 选择使用的备份类型。
# Options : zip, differential, incremental    # Default : differential
# 选项：zip（压缩备份）, differential（差异备份）, incremental（增量备份）    # 默认值：differential（差异备份）
config.advancedbackups.type=differential

# A list of files, relative paths within the world directory, to skip backing up.
# 要跳过备份的文件列表，使用相对于世界目录的路径。
# Comma separated, * is a wildcard, and backslashes are replaced with forward slashes.
# 以逗号分隔，* 代表通配符，反斜杠（\）将被替换为正斜杠（/）。
# Default : session.lock,*.dat_old
# 默认值：session.lock,*.dat_old
config.advancedbackups.blacklist=session.lock,*_old

# The absolute or relative path to the backup location.
# 备份存储位置的绝对或相对路径。
# Options : any file path. Default : ./backups
# 选项：任何文件路径。默认值：./backups
config.advancedbackups.path=./backups

# Minimum time between backups, in hours. This can prevent a shutdown backup from triggering immediately after a scheduled backup or similar situations.
# 备份之间的最小时间间隔（单位：小时）。可防止服务器关闭时的备份与定时备份等情况发生冲突。
# Set to 0 to disable.
# 设为 0 以禁用此功能。
# 5 minutes = ~ 0.083 hours.
# 5 分钟约等于 0.083 小时。
# Range : 0 - 500    # Default : 0.5
# 范围：0 - 500    # 默认值：0.5
config.advancedbackups.frequency.min=0.25

# Triggers a backup if none has already happened within this time. Can be combined with an uptime-based schedule.
# 在此时间内如果没有进行备份，则触发备份。可与基于服务器运行时间的计划结合使用。
# Range : 0.5 - 500    # Default : 24
# 范围：0.5 - 500    # 默认值：24
config.advancedbackups.frequency.max=24.0

# Whether the schedule below uses uptime (true) or real-world time (false).
# 备份计划是基于服务器运行时间（true）还是现实世界时间（false）。
# Default : true
# 默认值：true
config.advancedbackups.frequency.uptime=true

# When using server uptime:
# 使用服务器运行时间时：
# A looping comma-separated backup schedule, based off of server uptime, hours:minutes. Examples:
# 以服务器运行时间（小时:分钟）为基础的循环逗号分隔的备份计划。示例：
# 4:00 - Makes a backup every four hours.
# 4:00 - 每 4 小时进行一次备份。
# 4:00,7:00 - Makes a backup after four hours, then three, then four, and so on.
# 4:00,7:00 - 先在 4 小时后备份，然后 3 小时后，再 4 小时后，以此类推。
# 1:00 - Makes a backup every hour.
# 1:00 - 每小时备份一次。

# When using real-world time:
# 使用现实世界时间时：
# A strict schedule, using hours:minutes to follow real-world time. Examples:
# 使用现实世界时间（小时:分钟）制定的严格备份计划。示例：
# 4:00 - Makes a backup at 4am each day.
# 4:00 - 每天凌晨 4:00 进行备份。
# 4:00,8:00,12:00,16:00,17:00,18:00,19:00,20:00,21:00,24:00 - Makes a backup at specific times of day.
# 4:00,8:00,12:00,16:00,17:00,18:00,19:00,20:00,21:00,24:00 - 在特定时间点进行备份。
# Note : use 24:00 instead of 0:00 to represent midnight.
# 注意：使用 24:00 表示午夜，而不是 0:00。

# Default : 1:00
# 默认值：1:00
config.advancedbackups.frequency.schedule=1:00

# Whether to force a backup on server shutdown. Respects min frequency.
# 是否在服务器关闭时强制进行备份。会遵守最小备份间隔时间。
# Options : true, false    # Default : false
# 选项：true, false    # 默认值：false
config.advancedbackups.frequency.shutdown=false

# Whether to force a backup on server startup. Respects min frequency.
# 是否在服务器启动时强制进行备份。会遵守最小备份间隔时间。
# Options : true, false    # Default : false
# 选项：true, false    # 默认值：false
config.advancedbackups.frequency.startup=false

# Delay to use after startup, in seconds. Is always at least 5 seconds.
# 服务器启动后执行备份前的延迟时间（单位：秒）。最少为 5 秒。
# Range : 5-1000    # Default : 30
# 范围：5-1000    # 默认值：30
config.advancedbackups.frequency.delay=30
# --------------------------------------------------------------------------------------------------------------------
## The following options control logging of backup progress, including which clients to contact.
## 下面的选项用于控制备份进度的日志记录，包括通知哪些客户端。
## Backup start and end are always logged to console. The rest is configurable.
## 备份的开始和结束总是会被记录到控制台，其他内容可以配置。
# --------------------------------------------------------------------------------------------------------------------

# Which clients to send progress updates to. Behaviour before this was added was `ops`
# 选择向哪些客户端发送进度更新。在此选项添加之前，默认行为是 `ops`（仅管理员）。
# Options : ops, all, none    # Default : ops
# 选项：ops（仅管理员）, all（所有玩家）, none（不发送）    # 默认值：ops
config.advancedbackups.logging.clients=ops

# How often to send progress info to clients, measured in milliseconds.
# 向客户端发送进度信息的频率，单位为毫秒。
# Old behaviour was `0`, not recommended for servers due to network load.
# 旧行为是 `0`，但不建议用于服务器，因为这可能会增加网络负担。
# Range : 0 - ~infinite # Default : 500
# 范围：0 - 近无限制 # 默认值：500
config.advancedbackups.logging.clientfrequency=500

# Whether to log backup progress to console. Start / finish are always logged.
# 是否在控制台记录备份进度。备份的开始和结束始终会被记录。
# Old behaviour was `false`.
# 旧行为是 `false`（默认不记录进度）。
# Options : true, false    # Default : true
# 选项：true（启用日志记录）, false（禁用日志记录）    # 默认值：true
config.advancedbackups.logging.console=true

# How often to send log progress info in the console, measured in milliseconds.
# 向控制台发送日志进度信息的频率，单位为毫秒。
# Range : 0 - ~infinite # Default : 5000
# 范围：0 - 近无限制 # 默认值：5000
config.advancedbackups.logging.consolefrequency=5000

# --------------------------------------------------------------------------------------------------------------------
## The following options control deletion of old backups, meeting a criteria.
## 下面的选项控制旧备份的删除，满足指定的条件后执行删除操作。
## A backup only needs to meet ONE of the below criteria to be purged.
## 备份只需要满足以下任意一个条件，就会被删除。
## The oldest backups are always purged first, or oldest differential partial if the oldest differential backup is being depended on.
## 总是优先删除最旧的备份，或者如果最旧的差异备份仍在使用，则删除最旧的部分差异备份。
# --------------------------------------------------------------------------------------------------------------------

# The maximum size to keep, in GB.
# 允许保留的最大备份总大小（单位：GB）。
# Keep relatively high for zips, tighter space requirements should instead use differential or incremental backups.
# 如果使用 ZIP 备份，建议设置较大的存储限制。如果存储空间有限，建议使用差异备份或增量备份。
# Set to 0 to disable.
# 设为 0 以禁用此限制。
# Range : 0 - 9999 # Default : 50
# 范围：0 - 9999 # 默认值：50
config.advancedbackups.purge.size=50.0

# The maximum days to keep backups for.
# 备份的最大保留天数。
# Higher amounts will keep a longer "history" but take up more space in return.
# 值越大，保留的备份历史越长，但占用的存储空间也越多。
# Set to 0 to disable.
# 设为 0 以禁用此限制。
# Range : 0 - 9999 # Default : 0
# 范围：0 - 9999 # 默认值：0
config.advancedbackups.purge.days=0

# The maximum amount of backups to keep.
# 允许保留的最大备份数量。
# Older backups will be purged if this is exceeded.
# 如果超过该数量，则会删除较旧的备份。
# Set to 0 to disable.
# 设为 0 以禁用此限制。
# Range : 0 - 9999 # Default : 0
# 范围：0 - 9999 # 默认值：0
config.advancedbackups.purge.count=0

# Whether to delete incremental backup chains if max size is exceeded.
# 如果超出最大存储大小，是否删除增量备份链。
# If not, incremental backups do not respect the above options and never delete.
# 如果不启用此项，增量备份将不会遵循上述删除规则，并且永远不会被删除。
# This is because you can't delete part of an incremental backup chain without breaking the links.
# 因为不能删除增量备份链的一部分，否则会破坏备份链的完整性。
# Options : true, false    # Default : true
# 选项：true（允许删除）, false（不删除）    # 默认值：true
config.advancedbackups.purge.incrementals=true

# The minimum number of incremental chains to keep before purging any that meet the criteria.
# 在删除符合清理条件的增量备份链之前，至少要保留的增量备份链数量。
# Only relevant if the above option is set to true.
# 仅当 `config.advancedbackups.purge.incrementals=true` 时此选项才生效。
# Range : 1 - 9999 # Default : 1
# 范围：1 - 9999 # 默认值：1
config.advancedbackups.purge.incrementalchains=1

# --------------------------------------------------------------------------------------------------------------------
## The following options only affect zip files, whether that's for zip backups, export commands or some other option.
## 下面的选项仅影响 ZIP 文件，包括 ZIP 备份、导出命令或其他 ZIP 相关选项。
# --------------------------------------------------------------------------------------------------------------------

# The compression level to use for zip files.
# ZIP 备份的压缩级别。
# Higher numbers reduce space usage, but decrease performance.
# 值越高，压缩率越大，占用空间越小，但压缩性能会降低。
# Range : 1-9    # Default : 4
# 范围：1-9    # 默认值：4
config.advancedbackups.zips.compression=4

# --------------------------------------------------------------------------------------------------------------------
## The following options only affect differential and incremental backups.
## 下面的选项仅影响差异备份和增量备份。
# --------------------------------------------------------------------------------------------------------------------

# The maximum 'chain' length to keep.
# 允许的最大备份链长度。
# 一条链就是一个完全备份+N个差异/增量备份，这个控制的就是每条链的差异/增量备份的最多数量
# Range : 5-500    # Default : 50
# 范围：5-500    # 默认值：50
config.advancedbackups.chains.length=50

# Whether to compress 'chains'.
# 是否对备份链进行压缩。
# This compresses the base backup and all sequential backups.
# 启用后，会压缩基础备份及其后续备份。
# Reduces space usage, but decreases performance.
# 这样可以减少存储占用，但会降低备份性能。
# Options : true, false    # Default : true
# 选项：true（启用压缩）, false（禁用压缩）    # 默认值：true
config.advancedbackups.chains.compress=true

# Whether to enable "smart" reset for chains.
# 是否启用“智能”备份链重置。
# If every file is being backed up, mark the backup as complete and reset chain length regardless of intended backup type.
# 如果每个文件都已被备份，则标记当前备份为完整备份，并重置备份链长度，而不管原始备份类型如何。
# Options : true, false    # Default : true
# 选项：true（启用智能重置）, false（禁用）    # 默认值：true
config.advancedbackups.chains.smart=true
```

最后，希望本篇教程可以帮到你！