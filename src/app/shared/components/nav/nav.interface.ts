import { ESubMenuType } from './nav.enum';
 
export interface NavItem {
  label: string;
  color?: string;
  highlightedMobile?: boolean;
  icon: string;
  subItems?: NavItem[];
  typeOfSubMenu?: ESubMenuType;
  path?: string;
  active?: boolean;
  nameTour?: string;
  onAction?: () => void;
}