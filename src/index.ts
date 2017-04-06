/**
 * main-thread entry
 */

import { BrowserWindow, app } from 'electron';
import path = require("path");

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
    frame: true
  });

  mainWindow.loadURL('http://localhost:8080');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
});
