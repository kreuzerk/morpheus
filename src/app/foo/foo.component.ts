import {Component} from "@angular/core";

import {IconRegistry, DO_NOT_CLEANUP} from "my-framework";
import {MOCKICON_BAR, MOCKICON_FOO} from "my-icons-lib";

@Component({
  standalone: true,
  selector: 'foo',
  template: `<h1>Foo</h1>`
})
export class FooComponent {

  constructor(private fooIconRegistry: IconRegistry) {
    this.fooIconRegistry.registerIcons([
      MOCKICON_FOO,
      MOCKICON_BAR
    ]);

    console.log('Some stuff');
    const a = 5;
    const b = a + 6;
  }

}
