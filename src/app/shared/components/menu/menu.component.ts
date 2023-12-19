import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  showMenu: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  selectOption(option: string) {
    // Implement navigation logic here
    console.log(`Selected option: ${option}`);
    // You can use Angular Router to navigate to the selected route
  }

}
