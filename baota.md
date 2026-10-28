# 宝塔 PHP 网站一键部署说明

参见 “[【宝塔一键部署】项目包构建文档 - 第三方应用 - 宝塔面板论坛](https://www.bt.cn/bbs/thread-33063-1-1.html)”。


## 项目包构建

宝塔面板目前仅支持 “**zip**” 格式的包，包内必须包含 “`auto_install.json`” 配置文件。


### 目录结构

详细的目录结构如下 _(同目录下要包含网站的其它全部 PHP 文件)_:

```
/my-codes/
  | auto_install.json   | 【**必须**】宝塔面板一键部署安装配置文件
  | nginx.rewrite       | 【_可选_】Nginx 规则重写 (伪静态)
  | .htaccess           | 【_可选_】Apache 规则重写 (伪静态)
  | iis.rewrite         | 【_可选_】IIS 规则重写 (伪静态)
  | import.sql          | 【_可选_】自动安装时自动导入的 SQL 数据库文件
  | install.sh          | 【_可选_】安装部署时自动执行的脚本
```

> 目前不确定执行顺序，`install.sh` 关键在哪个环节执行，在数据库前还是后不知道，等待测试。


### `auto_install.json` 配置文件说明

**<font color="red">存入时注意不要有注释。</font>**

``` json
{
    // PHP 扩展，英文逗号分隔，需要在宝塔面板后台去看
    "php_ext": "redis,opcache,ioncube",

    // 支持的 PHP 版本
    "php_versions": "53,54,55,56,70,71,72,73",

    // PHP 函数禁用中要解除的敏感函数
    "enable_functions": [
        "exec",
        "system"
    ],

    // 安装完成后跳转的相对地址，通常是安装目录或管理后台
    "success_url": "/install/index.php",

    // 设置目录权限
    "chmod": [
        {
            "mode": 754,
            "path": "/wp-admin"
        },
        {
            "mode": 700,
            "path": "/wp-includes"
        }
    ],

    // 安装完成后要删除的文件或目录
    "remove_file": [
        "/install",
        "/temp",
        "/temp.php"
    ],

    // 网站运行目录，WordPress 是 /，Laravel / ThinkPHP 是 /public
    "run_path": "/public",

    // 数据库配置文件，宝塔会自动替换 (不需要可以留空)
    "db_config": "config/database.php",

    // 后台管理员默认用户名，不知道和意为 (不需要可以留空)
    "admin_username": "admin",

    // 后台管理员默认密码，不知道和意为 (不需要可以留空)
    "admin_password": "123456"
}
```

#### 将会被宝塔的数据库配置文件所替换的内容

| 占位符 | 被替换的内容说明 | 举个例子 |
| :---: | :--- | :--- |
| `BT_DB_NAME` | 数据库名 | `website` |
| `BT_DB_USERNAME` | 数据库用户名 | `root` |
| `BT_DB_PASSWORD` | 数据库密码 | `123456` |


### `install.sh` 脚本说明

```sh
# 使用 "$1" 获取主域名 (网站名称)
domain=$1

# 通过拼接组合就可以获取配置文件位置
config_file=/www/server/panel/vhost/nginx/${domain}.conf

# 获取 PHP 版本
php_version=$(cat $config_file|grep 'enable-php'|grep -Eo "[0-9]+"|head -n 1)

# 获取 PHP 执行路径
php_bin=/www/server/php/$php_version/bin/php

# 获取根目录
root_path=$(pwd)
root_path=$(cat $config_file|grep 'root '|awk '{print $2}'|sed "s/;//")

# 获取域名列表
domain_list=$(cat $config_file|grep server_name|head -n 1|sed "s/server_name//"|sed "s/;//"|xargs)
```


## 发布到宝塔面板开发者中心

https://www.bt.cn/developer

创建应用的时候选择 “一键部署”，随后上传版本审核上线即可 (文件体积不得超过 50MB)，不过，应傻逼的要求，上架审核通过的一个月内要在官方安装文档中增加使用宝塔面板一键部署的相关说明。

发布者需要为开发者本人 / 公司或授权发布，不得非官方，首次发布时宝塔面板会审核开发者身份资质。

> 发布需要完成使命认证。
