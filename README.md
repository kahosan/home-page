<h1 align="center">Home-Page</h1>

![example](./public/example.png)

<p align="center">一个简洁的 NAS 主页 & 导航页</p>

## 使用方法

clone 本项目到你要部署的机器上（其实内网甚至公网的机器都可以，只要你能访问），然后按照根目录 `services.json` 中的示例格式填写配置文件，运行 `pnpm run build` 或者 `npm run build` 生成静态文件，然后使用 nginx 或者其他 web 服务器进行部署。

其中，每个 card 的 `icon`，需要在 [这里](https://icones.js.org/collection/carbon) 找到你喜欢的图标，点击它会有一个类似 carbon:xxx 的字符串，将 xxx 这行字符串填入 `icon` 字段即可。目前只支持 `carbon`。

`path` 字段是指向你的服务的路径，比如你的服务访问路径是 `https://xxx.com/xxx` 那么就填 `https://xxx.com/xxx`，如果你的服务域名就是部署的域名，那么就填 `/xxx` 就行。

> 每次修改完 `services.json` 需要重新运行 build 命令。在线编辑功能还在开发中。

如果你想使用 github pages 也可以 fork 本项目，然后会自动运行构建，然后在仓库的 settings 中将 pages 设置为 `gh-pages` 分支即可。（域名为 `https://<你的用户名>.github.io/home-page`，想用 vercel、netlify 之类的服务也都是随你喜欢啦）

配置参照上文，同样修改 `services.json` 后需要触发一次构建。

## 如果你想为本项目做贡献

可以先提一个 issue 讨论一下，然后再开一个 PR。（或者你直接开 pr 也是可以的）

## License

MIT
