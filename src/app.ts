import { useView } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';
import { remote } from 'electron';

@useView(PLATFORM.moduleName('./app.html'))
export class App {
  constructor() {
    console.log(remote);
  }
}