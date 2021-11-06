import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {AuthLoginComponent} from './auth-login/auth-login.component';
// import {ChatComponent} from './chat/chat.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './auth/auth.guard';
import {IsAdminGuard} from './auth/isadmin.guard';
import {AdminComponent} from './admin/admin.component';
import {ChatRequestsViewComponent} from './chat-requests-view/chat-requests-view.component';
import {ProfileComponent} from "./profile/profile.component";

const appRoutes: Routes = [
  {path: 'admin', component: AdminComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'chat-requests', component: ChatRequestsViewComponent, canActivate: [AuthGuard]},
  {path: 'auth_login', component: AuthLoginComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  // {path: 'chat', component: ChatComponent, canActivate: [AuthGuard]},
  {path: '', component: AuthLoginComponent},
  {path: '**', component: AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(
    appRoutes, {useHash: true}
    // { enableTracing: true }
  )],
  exports: [RouterModule],
  providers: [AuthGuard, IsAdminGuard]
})
export class AppRoutingModule {
}
