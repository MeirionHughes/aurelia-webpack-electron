import { remote } from 'electron';

export class Window {
  title: string = "App";

  constructor() {
  }

  tryCloseWindow() {
    this.closeWindow();
  }

  refresh() {
    var window: Electron.BrowserWindow = remote.getCurrentWindow();

    window.reload();
  }
  
  config(){
    var window: Electron.BrowserWindow = remote.getCurrentWindow();

    window.setMenuBarVisibility(!window.isMenuBarVisible());
  }

  minimizeWindow() {
    var window: Electron.BrowserWindow = remote.getCurrentWindow();
    window.minimize();
  }

  maximizeWindow() {
    var window: Electron.BrowserWindow = remote.getCurrentWindow();
    if (window.isMaximized()) { window.unmaximize(); }
    else { window.maximize(); }
  }

  closeWindow() {
    var window: Electron.BrowserWindow = remote.getCurrentWindow();
    window.close();
  }

  showHelp() {
    remote.getCurrentWindow().webContents.openDevTools();
  }
}
