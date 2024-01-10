import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconColor } from './icon.enum';
import { NavItem } from './nav.interface';
import { ESubMenuType } from './nav.enum';
import { TypographyAlign, TypographyColor, TypographySize } from '../typography/typography.enum';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  /**
   * Defines the background color of the header
   */
  @Input() backgroundColor: string = 'var(--color-brand-white)';
  @Input() image: string = 'Logo2_atqe8p.png';
  /**
   * This property tells the component whether it's gonna add a root url to the `image` property, to be able to get the image
   */
  @Input() hasExternalUrl: boolean = false;
  /**
   * You can set the toggle icon color
   */
  @Input() toggleIconColor: IconColor | string = IconColor.tertiary;
  /**
   * This is the list of navigation items is gonna be displayed
   */
  @Input() navItems: Array<NavItem> = [
    {
      label: 'Home',
      color: '#000',
      highlightedMobile: false,
      icon: 'home',
      // subItems: [
      //   {
      //     label: 'Sub Home',
      //     color: '#000',
      //     highlightedMobile: false,
      //     icon: 'icon',
      //     typeOfSubMenu: ESubMenuType.select,
      //     path: '/subhome',
      //     active: false,
      //     nameTour: 'sub-home'
      //   }
      // ],
      typeOfSubMenu: ESubMenuType.splited,
      path: '/session/home',
      active: false,
      nameTour: 'home'
    },
    {
      label: 'Mi cuenta',
      color: '#000',
      highlightedMobile: false,
      icon: 'home',
      typeOfSubMenu: ESubMenuType.splited,
      path: '/session/my-account',
      active: false,
      nameTour: 'home'
    },
    {
      label: 'Cerrar sesión',
      color: '#000',
      highlightedMobile: false,
      icon: 'home',
      typeOfSubMenu: ESubMenuType.splited,
      path: '/auth/login',
      active: false,
      nameTour: 'cerrar'
    }
  ];
  /**
   * You can set the toggle icon color
   */
  @Input() showLateralMenu: boolean = false;
  @Input() openedSubItem: number = 0;
 
  @Output() logout = new EventEmitter();
  @Output() navigatedItem = new EventEmitter();
  @Output() navigatedSubItem = new EventEmitter();
  @Output() closeMenu = new EventEmitter();
 
  hoveredItem: number = 0;
  clickedItem: number = 0;

  url = 'https://res.cloudinary.com/dmaoa8dcd/image/upload/v1702098787/Appomsv/';
 
  public get SubMenuType() {
    return ESubMenuType;
  }
 
  public get TypographyAlign() {
    return TypographyAlign;
  }
 
  public get TypographyColor() {
    return TypographyColor;
  }
 
  public get TypographySize() {
    return TypographySize;
  }
 
  constructor(private sanitazer: DomSanitizer) {}
 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  myTrustedHTML(item: string) {
    return this.sanitazer.bypassSecurityTrustHtml(item);
  }
 
  // get isMobile$() {
  //   return this._breakpointService.isTabletLg.max$;
  // }
 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onLogout(event: any): void {
    event.stopPropagation();
    this.logout.emit();
  }
 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectItem(event: any, navItem: NavItem): void {
    event.stopPropagation();
    this.navigatedItem.emit(navItem);
  }
 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectSubItem(event: any, navItem: NavItem): void {
    event.stopPropagation();
    this.navigatedSubItem.emit(navItem);
  }
 
  showMenu(): void {
    this.showLateralMenu = !this.showLateralMenu;
    this.closeMenu.emit();
  }
 
  outHoverItem(): void {
    this.hoveredItem = 0;
  }
 
  handleHoverItem(index: number): void {
    this.hoveredItem = index + 1;
  }
 
  handleAngOutHover(val: number | undefined): void {
    if (val) {
      this.clickedItem = this.clickedItem === 0 ? 1 : 0;
    } else {
      this.clickedItem = 0;
    }
  }
 
  subMenuMargin(subItems: NavItem[] | undefined): string {
    const value = subItems === undefined ? 0 : subItems.length;
    return String(-(66 + (value - 1) * 44)) + 'px';
  }
 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedClassNav(item: NavItem): string[] {
    return ['nav-item-' + `${item.nameTour ?? ''}`];
  }
 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedClassNavMobile(item: NavItem): string[] {
    return ['nav-item-mobile-' + `${item.nameTour}`];
  }
  public subItemStyle(item: string): string[] {
    return [`active-type-${item}`];
  }

}
