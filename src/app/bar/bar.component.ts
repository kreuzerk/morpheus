import {Component, inject} from "@angular/core";

import {IconRegistry, MOCKICON_BAR, MOCKICON_FOO, DO_NOT_CLEANUP} from "../icon.registry";

@Component({
  standalone: true,
  selector: 'bar',
  template: `<h1>Bar</h1>`
})
export class BarComponent {

  private iconRegistry = inject(IconRegistry);

  constructor() {
    this.iconRegistry.registerIcons([
      MOCKICON_FOO,
      MOCKICON_BAR
    ]);
  }

}
