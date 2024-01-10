import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MenuComponent } from './components/menu/menu.component';
import { SelectComponent } from './components/select/select.component';
import { TypographyComponent } from './components/typography/typography.component';
import { ImageComponent } from './components/image/image.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NotFoundComponent,
    MenuComponent,
    SelectComponent,
    TypographyComponent,
    ImageComponent,
    HeaderComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    FormsModule
  ],
  exports: [
    MenuComponent,
    SelectComponent,
    TypographyComponent,
    ImageComponent,
    HeaderComponent,
    NavComponent,
    MatIconModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule {}
