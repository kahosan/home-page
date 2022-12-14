<h1 align="center">Home-Page</h1>

![normal](.github/image/normal.png)

![edit](.github/image/editmode.png)

<p align="center">一个简洁的 NAS 主页 & 导航页</p>

## 使用方法

clone 本项目到你要部署的机器上

```bash
git clone https://github.com/kahosan/home-page.git ./home-page
```

然后进入项目文件夹并安装依赖

```bash
cd home-page && pnpm i # npm i
```

修改根目录的 `services.json` 文件，按照如下格式

```json5
[
  {
    "name": "名称",
    "description": "描述",
    "icon": "图标",
    "path": "地址" // 如 https://services.com/xxx，如果服务的域名和主页的域名相同，可以直接写 /xxx
  }
]
```

其中，`icon`，需要在 [这里](https://icones.js.org/collection/carbon) 找到你喜欢的图标，点击它会有一个类似 carbon:xxx 的字符串，将 xxx 这行字符串填入 `icon` 字段即可。目前只支持 `carbon`

**footer 的 blog、twiiter 链接地址在 .env 文件中修改**

### build 项目并部署

在项目根目录下执行

```bash
pnpm run build # npm run build
```

可以把 build 出来的 dist 文件夹丢到 nginx 的部署目录，或者直接用 `pnpm run serve` 来启动一个本地服务器。后面加上 `--port 端口` 来指定端口。

> 每次修改完 `services.json` 需要重新运行 build 命令。在线编辑功能还在开发中。

### 使用 Github Pages

fork 本项目，然后会自动运行构建，在仓库的 settings 中将 pages 设置为 `gh-pages` 分支就可以了

域名为 `https://<你的用户名>.github.io/home-page`，想用 vercel、netlify 之类的服务也都是随你喜欢啦

> 配置参照上文，同样修改 `services.json` 后需要触发一次构建。

### 修改自定义背景

把你想自定义的背景图放到 `public` 目录，然后修改 `src/index.css` 中最下面的 `.custom-bg` 的配置。需要会一点点的 css 知识

### 自定义 Title

修改 .env 文件中的 `HOME_HEADER_TITLE` 和 `HOME_TITLE` 两个字段

### 在线编辑应用列表

目前仅支持 Github Pages，需要先创建一个 Token 并具有读写仓库的权限 [点这里](https://github.com/settings/tokens?type=beta)
然后打开 home-page 页面，点击右上角的 Github 图标（如果是第一次打开页面会有弹窗让你填写信息）填写信息，之后再点击编辑的图标就可以随意玩耍啦

如有疑问请报告 issue

## 如果你想为本项目做贡献

欢迎 PR

## TODO

- [x] 在线编辑
- [ ] 编辑模式支持拖拽
- [ ] 添加一些好玩的东西，暂时还没想法，如果有什么好的想法欢迎提 issue

## License

MIT
