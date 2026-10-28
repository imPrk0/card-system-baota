/**
 * 宝塔面板自动安装类型
 */

export interface BaotaAutoInstallJsonFile {
    /**
     * 需要安装的 PHP 扩展
     * @type {string} 英文逗号分隔，需要在宝塔面板后台去看
     * @example "redis,opcache,ioncube"
     */
    php_ext: string;

    /**
     * 支持的 PHP 版本
     * @type {string} 英文逗号分隔，版本号是 PHP 主与支版本号省略点的写法
     * @example "53,54,55,56,70,71,72,73"
     */
    php_versions: string;

    /**
     * PHP 函数禁用中要解除的敏感函数
     * @type {string[]} 需要解除的敏感函数列表
     * @example ["exec", "system"]
     */
    enable_functions: string[];

    /**
     * 安装完成后跳转的相对地址，通常是安装目录或管理后台
     * @type {string} 相对地址
     * @example "/install/index.php"
     */
    success_url: string;

    /**
     * 要设置的目录的权限
     * @type {BaotaAutoInstallJsonFileChmodDir[]}
     */
    chmod: BaotaAutoInstallJsonFileChmodDir[];

    /**
     * 安装完成后要删除的文件或目录
     * @type {string[]}
     * @example ["/install", "/readme.html"]
     */
    remove_file: string[];

    /**
     * 网站运行目录
     * @type {string} WordPress 是 /，Laravel / ThinkPHP 是 /public
     * @example "/public"
     */
    run_path: string;

    /**
     * 数据库配置文件，宝塔会自动替换
     * @type {'' | string} 不需要可以留空
     * @example "config/database.php"
     */
    db_config: '' | string;

    /**
     * 后台管理员默认用户名，不知道和意为
     * @type {'' | string} 不需要可以留空
     * @example "admin"
     */
    admin_username: '' | string;

    /**
     * 后台管理员默认密码，不知道和意为
     * @type {'' | string} 不需要可以留空
     * @example "123456"
     */
    admin_password: '' | string;
};

export interface BaotaAutoInstallJsonFileChmodDir {
    /**
     * 权限
     * @type {number}
     * @example 754
     */
    mode: number;

    /**
     * 路径
     * @type {string}
     * @example "/wp-includes"
     */
    path: string;
};

// 十分不理解宝塔一会儿是 string 用英文逗号分隔，一会儿又变成 []string 是何意为。
