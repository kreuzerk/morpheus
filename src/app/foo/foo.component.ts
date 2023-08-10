import {Component} from "@angular/core";

import {IconRegistry, MOCKICON_BAR, MOCKICON_FOO, DO_NOT_CLEANUP} from "../icon.registry";

@Component({
  standalone: true,
  selector: 'foo',
  template: `<h1>Foo</h1>`
})
export class FooComponent {

  constructor(private iconRegistry: IconRegistry) {
    this.iconRegistry.registerIcons([
      MOCKICON_FOO,
      MOCKICON_BAR
    ]);
  }

}
