import {useView} from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';

@useView(PLATFORM.moduleName('./app.html'))
export class App
{  
  constructor(){
    console.log("hello john d");
  }
}