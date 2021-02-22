import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginGuard, AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    canActivate:[LoginGuard],
    component: LoginComponent
  },
  {
    path: 'sign-up',
    canActivate:[LoginGuard],
    component: SignUpComponent
  },
  {
    path: 'home',
    canActivate:[AuthGuard],
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
