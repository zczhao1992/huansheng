# HuanSheng-幻声

### 介绍

HuanSheng-幻声，基于 Next.js、shadcn/ui、TailWind css、TRPC、Prisma ORM、Chatterbox_TTS 的一套 AI 生成语音项目。

### 一、在线预览地址

- vercel(需要翻墙)：https://huansheng.vercel.app

### 二、Git 仓库地址 (欢迎 Star⭐)

- GitHub：https://github.com/zczhao1992/huansheng.git

### 三、🔨🔨🔨 项目功能

- 🚀 采用最新技术找开发：Next15、TypeScript、shadcn/ui、TailWind css 等
- 🚀 使用 Clerk 作为身份认证，支持 Google、Github 账号登录
- 🚀 使用 Prisma ORM 及 PostgreSQL 作为数据库存储工具
- 🚀 整个项目集成了 TypeScript
- 🚀 集成 Chatterbox 等主流 TTS 接口
- 🚀 使用 Next-Intl 提供多语言（英语、中文）
- 🚀 基于 wavesurfer.js 的音频实时渲染与回放

### 四、安装使用步骤 📑

- **Clone：**

```text
# GitHub
git clone https://github.com/zczhao1992/huansheng.git
```

- **Install：**

```text
npm install
cnpm install

# npm install 安装失败，请升级 nodejs 到 22 以上，或尝试使用以下命令：
npm install --registry=https://registry.npm.taobao.org
```

- **Run：**

```text
npm run dev
```

- **Build：**

```text
# 开发环境
npm run build
```

### 五、项目截图

#### 1、首页：

![huansheng](./public/bashbord.png)

#### 2、文转音：

![huansheng](./public/pro1.png)
![huansheng](./public/pro2.png)

### 六、文件资源目录 📚

```text
huansheng
├─ prisma                 # prisma orm
├─ public                 # 静态资源文件（忽略打包）
├─ src
│  ├─ app                 # 项目页面
│  ├─ components          # 全局组件
│  ├─ features            # 业务功能
│  ├─ generated           # ORM类型
│  ├─ hooks               # 自定义hook
│  ├─ i18n                # 多语言
│  ├─ lib                 # 工具
│  ├─ trpc                # trpc模块
│  └─ types               # 类型文件
├─ .eslintrc.json         # eslint配置
├─ .gitignore             # git 提交忽略
├─ chatterbox_tts.py      # chatterbox文件
├─ components.json        # shadcn/ui 组件配置
├─ next-env.d.ts          # 环境变量配置
├─ package-lock.json      # 依赖包包版本锁
├─ package.json           # 依赖包管理
├─ postcss.config.js      # postcss 配置
├─ README.md              # README 介绍
├─ tailwind.config.ts     # tailwind 配置
└─ tsconfig.json          # typescript 全局配置
```
