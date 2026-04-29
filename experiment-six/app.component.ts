import { Component } from '@angular/core';
import { ItemsComponent } from './items/items.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ItemsComponent],
  template: `<app-items></app-items>`
})
export class AppComponent {}
