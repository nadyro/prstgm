"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const app_component_1 = require("./app.component");
const auth_component_1 = require("./auth/auth.component");
const auth_login_component_1 = require("./auth-login/auth-login.component");
// import {ChatComponent} from './chat/chat.component';
const home_component_1 = require("./home/home.component");
const auth_guard_1 = require("./auth/auth.guard");
const isadmin_guard_1 = require("./auth/isadmin.guard");
const admin_component_1 = require("./admin/admin.component");
const chat_requests_view_component_1 = require("./chat-requests-view/chat-requests-view.component");
const profile_component_1 = require("./profile/profile.component");
const appRoutes = [
    { path: 'admin', component: admin_component_1.AdminComponent },
    { path: 'auth', component: auth_component_1.AuthComponent },
    { path: 'home', component: home_component_1.HomeComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'chat-requests', component: chat_requests_view_component_1.ChatRequestsViewComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'auth_login', component: auth_login_component_1.AuthLoginComponent },
    { path: 'profile', component: profile_component_1.ProfileComponent, canActivate: [auth_guard_1.AuthGuard] },
    // {path: 'chat', component: ChatComponent, canActivate: [AuthGuard]},
    { path: '', component: auth_login_component_1.AuthLoginComponent },
    { path: '**', component: app_component_1.AppComponent }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(appRoutes, { useHash: true }
            // { enableTracing: true }
            )],
        exports: [router_1.RouterModule],
        providers: [auth_guard_1.AuthGuard, isadmin_guard_1.IsAdminGuard]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvc3RhZ21hLWFwcC9zcmMvYXBwL2FwcC1yb3V0aW5nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUF1QztBQUN2Qyw0Q0FBcUQ7QUFFckQsbURBQTZDO0FBQzdDLDBEQUFvRDtBQUNwRCw0RUFBcUU7QUFDckUsdURBQXVEO0FBQ3ZELDBEQUFvRDtBQUNwRCxrREFBNEM7QUFDNUMsd0RBQWtEO0FBQ2xELDZEQUF1RDtBQUN2RCxvR0FBNEY7QUFDNUYsbUVBQTZEO0FBRTdELE1BQU0sU0FBUyxHQUFXO0lBQ3hCLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsZ0NBQWMsRUFBQztJQUMxQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLDhCQUFhLEVBQUM7SUFDeEMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSw4QkFBYSxFQUFFLFdBQVcsRUFBRSxDQUFDLHNCQUFTLENBQUMsRUFBQztJQUNsRSxFQUFDLElBQUksRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLHdEQUF5QixFQUFFLFdBQVcsRUFBRSxDQUFDLHNCQUFTLENBQUMsRUFBQztJQUN2RixFQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLHlDQUFrQixFQUFDO0lBQ25ELEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsb0NBQWdCLEVBQUUsV0FBVyxFQUFFLENBQUMsc0JBQVMsQ0FBQyxFQUFDO0lBQ3hFLHNFQUFzRTtJQUN0RSxFQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLHlDQUFrQixFQUFDO0lBQ3pDLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsNEJBQVksRUFBQztDQUN0QyxDQUFDO0FBVUYsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBZ0I7Q0FDNUIsQ0FBQTtBQURZLGdCQUFnQjtJQVI1QixlQUFRLENBQUM7UUFDUixPQUFPLEVBQUUsQ0FBQyxxQkFBWSxDQUFDLE9BQU8sQ0FDNUIsU0FBUyxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBQztZQUMxQiwwQkFBMEI7YUFDM0IsQ0FBQztRQUNGLE9BQU8sRUFBRSxDQUFDLHFCQUFZLENBQUM7UUFDdkIsU0FBUyxFQUFFLENBQUMsc0JBQVMsRUFBRSw0QkFBWSxDQUFDO0tBQ3JDLENBQUM7R0FDVyxnQkFBZ0IsQ0FDNUI7QUFEWSw0Q0FBZ0IifQ==