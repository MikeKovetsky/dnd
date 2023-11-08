import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";

export const notFoundPath = '/not-found';

const routes: Routes = [
  {path: '', component: HomeComponent},
  // {path: '**', redirectTo: notFoundPath, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
