import { Component, Input } from '@angular/core';
import { TypographyAlign, TypographySize, TypographyStyle, TypographyTextTransform } from './typography.enum';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.scss']
})
export class TypographyComponent {

  /**
   * If we want to add some font size in px to resize the text properties with em
   */
  @Input() baseFontSize: string = '';
  /**
   * Size of the text
   */
  @Input() size: TypographySize = TypographySize.md;
  /**
   * Whether the text can be selected or not
   */
  @Input() enableSelection: boolean = false;
  /**
   * Whether the text is striked
   */
  @Input() isStriked: boolean = false;
  /**
   * Whether the font is monospace
   */
  @Input() isMonospace: boolean = false;
  /**
   * Whether the text is inline
   */
  @Input() isInline: boolean = false;
  /**
   * Alignment of the text
   */
  @Input() align: TypographyAlign = TypographyAlign.center;
  /**
   * Font family of the text
   */
  @Input() fontFamily: string = 'Roboto';
  /**
   * Font weight of the text
   */
  @Input() fontWeight: string = '500';
  /**
   * Font style of the text
   */
  @Input() fontStyle: TypographyStyle = TypographyStyle.normal;
  /**
   * Font size  of the text
   */
  @Input() fontSize: string = '0.938em';
  /**
   * line height  of the text
   */
  @Input() lineHeight: string = '1.333';
  /**
   * If the text has any transformations
   */
  @Input() textTransform: TypographyTextTransform = TypographyTextTransform.none;
  /**
   * Color of the text
   */
  @Input() color: string = '';
  /**
   * Background color of the text
   */
  @Input() backgroundColor: string = '';
  /**
   * Width of the text
   */
  @Input() width?: string = '';
  /**
   * if the text has any margins
   */
  @Input() margin?: string;
  /**
   * if the text has any margins
   */
  @Input() padding?: string;
 
  /**
   * Actual text to display
   */
  text: string = 'Typography';
 
  public get classes(): string[] {
    return [
      'typography',
      `size-${this.size}`,
      `color-${this.color}`,
      this.isInline ? 'is-inline' : '',
      this.isMonospace ? 'is-monospace' : '',
      this.isStriked ? 'is-striked' : '',
      this.width ? 'is-truncated' : '',
      this.enableSelection ? 'enable-selection' : 'disable-selection',
    ];
  }

}
