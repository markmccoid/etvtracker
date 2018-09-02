const electron = require('electron');
const { app, BrowserWindow } = electron;
// const app = electron.app;
// const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1160, 
    height: 800,
    title: 'TV Tracker',
    icon: path.join(__dirname, '../assets/favicon.ico')
  });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);

  //--- Work
  // let reactDevTools = BrowserWindow.addDevToolsExtension(`C:/Users/mark.mccoid/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.3.1_0`);
  // let reduxDevTools = BrowserWindow.addDevToolsExtension(`C:/Users/mark.mccoid/AppData/Local/Google/Chrome/User Data/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.15.3_1`);
  //--- Home
  let reactDevTools = BrowserWindow.addDevToolsExtension(`C:/Users/Mark/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.3.2_0`);
  let reduxDevTools = BrowserWindow.addDevToolsExtension(`C:/Users/Mark/AppData/Local/Google/Chrome/User Data/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.15.3_0`);
 }

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});