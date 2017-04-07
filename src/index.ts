/**
 * main-thread entry
 */

import { BrowserWindow, app } from 'electron';
import path = require("path");

function isDev() {
  if (process.env.ELECTRON_ENV === "production")
    return false;

  if (process.mainModule == undefined)
    return true;

  return process.mainModule.filename.indexOf('app.asar') === -1;
}

app.on('window-all-closed', function () {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function () {
  var main_width = 800;
  var main_height = 600;

  var mainWindow = new BrowserWindow({
    width: main_width,
    height: main_height,
    frame: isDev()
  });

  mainWindow.loadURL(isDev() ?
    'http://localhost:8080' :
    'file://' + __dirname + '/build/index.html'
  );

  mainWindow.on('closed', function () {
  });
});
