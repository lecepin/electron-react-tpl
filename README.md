# electron-react 模板

克隆下来，开箱即用。

![image](https://user-images.githubusercontent.com/11046969/168462721-ebc25be2-6d97-40a9-a115-f3403a167758.png)

## 1. 使用

- 克隆此仓库
- 安装依赖 `npm install`
- 开发环境启动 `npm start`

## 2. 目录结构
```bash
electron-react-tpl
├─ build/                  # React 构建结果目录
├─ build-electron/         # Electron 构建结果目录
├─ config-overrides.js     # webpack 复写配置文件
├─ electron/               # Electron 源码目录
├─ package.json
├─ packs                   # 最终打包出的安装包目录
├─ public/                 # 所有资源存放处，打包会放在 app.asar 同级目录，可直接访问
│    ├─ icon/
│    │    ├─ icon.png      # 通过 npm run gen-icon 的入口图标文件
│    │    └─ icons/        # 通过 npm run gen-icon 生成的各平台的图标
│    └─ index.html         # React html 文件
└─ src/                    # React 源码目录
```

## 3. 打包生成安装包

执行命令 `npm run pack` 即可。

打包的信息配置在 `package.json` 中的 `build` 属性中声明：

```json
{
  "build": {
    "extends": null,
    "productName": "Lecepin Tpl",
    "appId": "com.lecepin.tpl",
    "directories": {
      "output": "packs"
    },
    "npmRebuild": false,
    "files": [
      "build/**/*",
      "build-electron/**/*",
      "public/**/*"
    ],
    "mac": {
      "icon": "public/icon/icons/mac/icon.icns"
    },
    "win": {
      "target": [
        {
          "target": "nsis",
          "arch": [
            "x64",
            "ia32"
          ]
        }
      ],
      "icon": "public/icon/icons/win/icon.ico"
    },
    "nsis": {
      "oneClick": false,
      "perMachine": false,
      "allowElevation": true,
      "allowToChangeInstallationDirectory": true
    },
    "extraResources": [
      "public"
    ]
  }
}
```

默认配置基本是可以满足的，需要更细致的配置可以参考 [这里](https://www.electron.build/)。

> 注意：`build` 属性中的 `extends` 属性不要动，否则 CRA 会影响 Electron 的入口配置。

![image](https://user-images.githubusercontent.com/11046969/168466600-734b8b4a-2899-48e0-accf-ab98d12870f2.png)


## 4. 生成各平台图标

在 `public/icon/` 中放入一线 `icon.png`，执行 `npm run gen-icon` 即可生成。

![image](https://user-images.githubusercontent.com/11046969/168465674-bd6d7ff8-bc95-4077-bef1-066ac20a861a.png)


## 5. 日志问题

直接使用 `import log from "electron-log";` 即可。日志可以在下面位置查找：

- Linux: `~/.config/{app name}/logs/{process type}.log`
- macOS: `~/Library/Logs/{app name}/{process type}.log`
- Windows: `%USERPROFILE%\AppData\Roaming\{app name}\logs\{process type}.log`

## 6. 更新问题

在 `electron/utils.js` 中有一个 `checkUpdate` 函数，直接放在 `package.json` 的访问地方和 Release 的下载页面即可：

```js
checkUpdate(
  "https://cdn.jsdelivr.net/gh/lecepin/electron-react-tpl/package.json",
  "https://github.com/lecepin/electron-react-tpl/releases"
);
```

![image](https://user-images.githubusercontent.com/11046969/168465596-3ba51b56-3d00-409e-b260-a3183ba79214.png)

## 7. 其他

#### 7.1 启动问题
开发模式下启动采用的 `concurrently` 和 `wait-on` 配合的，并行启动 React 和 Electron，Electron 等待 React 启动完成后开始启动。通过环境变量 `BROWSER=none` 来停止 CRA 自动打开浏览器：

```
concurrently "cross-env BROWSER=none npm run start-web"  "wait-on http://localhost:3000 && npm run start-electron" 
```

#### 7.2 可执行目录问题

使用 `child_process.exec` 等执行某个可执行文件时，无法从 app.asar 中使用，所以在打包的时候需要将这个文件不打包到 app.asar 内部，在 `build` 中的 `extraResources` 属性中声明即可。如此项目中所有的可执行文件都放在 `public` 中，所以配置如下：

```
    "extraResources": [
      "public"
    ]
```

使用时，可以这样取目录：

```js
const APP_PATH = app.getAppPath();
const EXECUTABLE_PATH = path.join(
  APP_PATH.indexOf("app.asar") > -1
    ? APP_PATH.substring(0, APP_PATH.indexOf("app.asar"))
    : APP_PATH,
  "public"
);
```

#### 7.3 国内镜像加速

```
npm config set ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/
npm config set ELECTRON_BUILDER_BINARIES_MIRROR=https://npm.taobao.org/mirrors/electron-builder-binaries/
```
