import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { SharedModule } from './shared/shared.module';
import { RegisterService } from './services/register.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
      { path: 'login', redirectTo: 'auth/login', pathMatch: 'full' },
      {
        path: 'auth',
        loadChildren: () =>
          import('./views/auth/auth.module').then(
            (mod) => mod.AuthModule
          ),
      },
      {
        path: 'session',
        loadChildren: () =>
          import('./views/session/session.module').then(
            (mod) => mod.SessionModule
          ),
      },
      { path: '**', component: NotFoundComponent }
    ]),
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
