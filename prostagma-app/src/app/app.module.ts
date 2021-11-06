import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgSelectModule, NgSelectConfig} from '@ng-select/ng-select';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
// Components
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {HeaderComponent} from './header/header.component';
// import {ChatComponent} from './chat/chat.component';
import {HomeComponent} from './home/home.component';
import {AuthLoginComponent} from './auth-login/auth-login.component';
import {AdminComponent} from './admin/admin.component';

// Services
import {AuthService} from './services/auth.service';
import {GamesService} from './services/games.service';
import {AdminService} from './admin/services/admin.service';
import {ChatRequestsComponent} from './chat-requests/chat-requests.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {NotificationsService} from './services/notifications/notifications.service';
import {ChatRequestsViewComponent} from './chat-requests-view/chat-requests-view.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {FooterComponent} from './footer/footer.component';
import {Common} from './lib/common';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    // ChatComponent,
    HomeComponent,
    AuthLoginComponent,
    AdminComponent,
    ChatRequestsComponent,
    ChatRequestsViewComponent,
    FooterComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatExpansionModule,
  ],
  providers: [
    AuthService,
    GamesService,
    NgSelectConfig,
    AdminService,
    NotificationsService,
    Common,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
    // {provide: SELECTION_MODEL_FACTORY, useValue: CustomSelectionFactory as SelectionModelFactory }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
