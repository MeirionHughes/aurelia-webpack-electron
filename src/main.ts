/**
 * browser-thread entry
 */

import { Aurelia } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';

export async function configure(aurelia: Aurelia): Promise<void> {
  aurelia.use.standardConfiguration();

  aurelia.use.globalResources([
    PLATFORM.moduleName("elements/window")
  ]);

  await aurelia.start();
  aurelia.setRoot(PLATFORM.moduleName('app'));
}