import { Component, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {

  /**
   * Url of the image
   */
  @Input() url: string = '';
  // get urlImg(): string {
  //   return environment.ASSETS_URL;
  // }
  /**
   * If the image has an external url we skip the image property
   */
  @Input() hasExternalUrl: boolean = false;
  /**
   * name of the image
   */
  @Input() image = 'mail-man.svg';
  /**
   * Alternative image to display when no image has been found on the given route
   */
  @Input() onErrorImage = 'image-not-found.png';
  /**
   * Width of the image
   */
  @Input() width: string = '100vw';
  /**
   * Height of the image
   */
  @Input() height: string = '100vh';
  /**
   * If the image has any border radius, skipped if has the isRounded property
   */
  @Input() borderRadius: string = '';
  /**
   * Background color of the image
   */
  @Input() backgroundColor = 'transparent';
  /**
   * Whether the image is rounded
   */
  @Input() isRounded = false;
  /**
   * If this image is a background image
   */
  @Input() imageAsBackground = false;
  /**
   * Whether the image can be selected or not
   */
  @Input() enableSelection = false;
  /**
   * If the image has any alternate text specified
   */
  @Input() alt = '';
  /**
   * Text tooltip to display hovering the image
   */
  @Input() title = '';
  /**
   * Default display position of the image
   */
  @Input() display = 'inline-block';
  /**
   * Margin of the image
   */
  @Input() margin: string = '0';
 
  public get classes(): string[] {
    return [
      'image',
      this.isRounded ? 'is-rounded' : '',
      this.enableSelection ? 'enable-selection' : 'disable-selection',
    ];
  }
 
  constructor() {
 
  }
 
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  changeSource(event: any, name: string) {
    event.target.src = name;
  }

}
