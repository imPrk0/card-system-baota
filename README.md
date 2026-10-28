# 自动发卡系统的宝塔面板一键部署包的构建脚本

该脚本用于构建 [自动发卡系统](https://github.com/Tai7sy/card-system) 的 PHP 网站宝塔面板一键部署包。


## 构建环境

你需要先有 [pnpm](https://pnpm.io)。

```bash
pnpm install
```


## 构建部署包

```bash
pnpm build
```

构建完成后会在 `dist/` 目录下生成一个 zip 压缩包。
