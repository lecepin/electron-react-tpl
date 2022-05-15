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

