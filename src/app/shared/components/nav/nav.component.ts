import { Component } from '@angular/core';
import { User } from '../../interface';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
})
export class NavComponent {
  User: User | null = null;
  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('openFabricUser') as string)
    this.User = user
  }

}
