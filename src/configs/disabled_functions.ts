/**
 * 被宝塔面板禁用的 PHP 函数但是需要解除禁用的列表
 */

export default <string[]>[
    'putenv', // 设置环境变量，尤其是生成安全的 Key
    'ini_set', // 设置 PHP 配置，尤其是设置 session.save_path
    'exec'
];
