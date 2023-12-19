import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { sessionRoutes } from './session.routes';

@NgModule({
  imports: [RouterModule.forChild(sessionRoutes)],
  exports: [RouterModule],
})
export class SessionRoutingModule {}
