import { app, BrowserWindow } from "electron";
import log from "electron-log";
import CONFIG from "./const";

app.commandLine.appendSwitch("--no-proxy-server");

function createWindow() {
  // electron.Menu.setApplicationMenu(null);

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // resizable: false,
    // maximizable: false,
    icon: CONFIG.APP_ICON_ICO,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadURL(CONFIG.APP_START_URL);
  CONFIG.IS_DEV && mainWindow.webContents.openDevTools();

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
