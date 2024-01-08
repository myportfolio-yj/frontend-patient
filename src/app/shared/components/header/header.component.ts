import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  /**
   * Defines the background color of the header
   */
  @Input() backgroundColor: string = 'var(--color-brand-white)';
  /**
   * You can use this property in two different ways:
   * - You can pass it an entire link and set the property `hasExternalUrl` to `true`.
   * - You can pass it the name of the image, for example: `https://midominio.com.pe/resources/assets/images/banderines-og.svg`,
   * make sure the property `hasExternalUrl` is not set to `true` (It is `false by default`), and then send the root of the url to the `url` property like this:
   * `[url] = https://user-images.githubusercontent.com/32302890/`
   */
  @Input() image: string = 'brand-logo-2.svg';
  @Input() url: string = '';
  /**
   * This property tells the component whether it's gonna add a root url to the `image` property, to be able to get the image
   */
  @Input() hasExternalUrl: boolean = false;

}
