"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const platform_browser_1 = require("@angular/platform-browser");
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const ng_select_1 = require("@ng-select/ng-select");
const http_1 = require("@angular/common/http");
const forms_2 = require("@angular/forms");
const common_1 = require("@angular/common");
// Components
const app_routing_module_1 = require("./app-routing.module");
const app_component_1 = require("./app.component");
const auth_component_1 = require("./auth/auth.component");
const header_component_1 = require("./header/header.component");
// import {ChatComponent} from './chat/chat.component';
const home_component_1 = require("./home/home.component");
const auth_login_component_1 = require("./auth-login/auth-login.component");
const admin_component_1 = require("./admin/admin.component");
// Services
const auth_service_1 = require("./services/auth.service");
const games_service_1 = require("./services/games.service");
const admin_service_1 = require("./admin/services/admin.service");
const chat_requests_component_1 = require("./chat-requests/chat-requests.component");
const ngx_spinner_1 = require("ngx-spinner");
const animations_1 = require("@angular/platform-browser/animations");
const drag_drop_1 = require("@angular/cdk/drag-drop");
const notifications_service_1 = require("./services/notifications/notifications.service");
const chat_requests_view_component_1 = require("./chat-requests-view/chat-requests-view.component");
const expansion_1 = require("@angular/material/expansion");
const footer_component_1 = require("./footer/footer.component");
const common_2 = require("./lib/common");
const profile_component_1 = require("./profile/profile.component");
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            auth_component_1.AuthComponent,
            header_component_1.HeaderComponent,
            // ChatComponent,
            home_component_1.HomeComponent,
            auth_login_component_1.AuthLoginComponent,
            admin_component_1.AdminComponent,
            chat_requests_component_1.ChatRequestsComponent,
            chat_requests_view_component_1.ChatRequestsViewComponent,
            footer_component_1.FooterComponent,
            profile_component_1.ProfileComponent,
        ],
        imports: [
            platform_browser_1.BrowserModule,
            app_routing_module_1.AppRoutingModule,
            forms_1.FormsModule,
            http_1.HttpClientModule,
            forms_2.ReactiveFormsModule,
            ng_select_1.NgSelectModule,
            ngx_spinner_1.NgxSpinnerModule,
            animations_1.BrowserAnimationsModule,
            drag_drop_1.DragDropModule,
            expansion_1.MatExpansionModule,
        ],
        providers: [
            auth_service_1.AuthService,
            games_service_1.GamesService,
            ng_select_1.NgSelectConfig,
            admin_service_1.AdminService,
            notifications_service_1.NotificationsService,
            common_2.Common,
            { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }
            // {provide: SELECTION_MODEL_FACTORY, useValue: CustomSelectionFactory as SelectionModelFactory }
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb3N0YWdtYS1hcHAvc3JjL2FwcC9hcHAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsZ0VBQXdEO0FBQ3hELHdDQUF1QztBQUN2QywwQ0FBMkM7QUFDM0Msb0RBQW9FO0FBQ3BFLCtDQUFzRDtBQUN0RCwwQ0FBbUQ7QUFDbkQsNENBQXVFO0FBQ3ZFLGFBQWE7QUFDYiw2REFBc0Q7QUFDdEQsbURBQTZDO0FBQzdDLDBEQUFvRDtBQUNwRCxnRUFBMEQ7QUFDMUQsdURBQXVEO0FBQ3ZELDBEQUFvRDtBQUNwRCw0RUFBcUU7QUFDckUsNkRBQXVEO0FBRXZELFdBQVc7QUFDWCwwREFBb0Q7QUFDcEQsNERBQXNEO0FBQ3RELGtFQUE0RDtBQUM1RCxxRkFBOEU7QUFDOUUsNkNBQTZDO0FBQzdDLHFFQUE2RTtBQUM3RSxzREFBc0Q7QUFDdEQsMEZBQW9GO0FBQ3BGLG9HQUE0RjtBQUM1RiwyREFBK0Q7QUFDL0QsZ0VBQTBEO0FBQzFELHlDQUFvQztBQUNwQyxtRUFBK0Q7QUF3Qy9ELElBQWEsU0FBUyxHQUF0QixNQUFhLFNBQVM7Q0FDckIsQ0FBQTtBQURZLFNBQVM7SUF0Q3JCLGVBQVEsQ0FBQztRQUNSLFlBQVksRUFBRTtZQUNaLDRCQUFZO1lBQ1osOEJBQWE7WUFDYixrQ0FBZTtZQUNmLGlCQUFpQjtZQUNqQiw4QkFBYTtZQUNiLHlDQUFrQjtZQUNsQixnQ0FBYztZQUNkLCtDQUFxQjtZQUNyQix3REFBeUI7WUFDekIsa0NBQWU7WUFDZixvQ0FBZ0I7U0FDakI7UUFDRCxPQUFPLEVBQUU7WUFDUCxnQ0FBYTtZQUNiLHFDQUFnQjtZQUNoQixtQkFBVztZQUNYLHVCQUFnQjtZQUNoQiwyQkFBbUI7WUFDbkIsMEJBQWM7WUFDZCw4QkFBZ0I7WUFDaEIsb0NBQXVCO1lBQ3ZCLDBCQUFjO1lBQ2QsOEJBQWtCO1NBQ25CO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsMEJBQVc7WUFDWCw0QkFBWTtZQUNaLDBCQUFjO1lBQ2QsNEJBQVk7WUFDWiw0Q0FBb0I7WUFDcEIsZUFBTTtZQUNOLEVBQUMsT0FBTyxFQUFFLHlCQUFnQixFQUFFLFFBQVEsRUFBRSw2QkFBb0IsRUFBQztZQUMzRCxpR0FBaUc7U0FDbEc7UUFDRCxTQUFTLEVBQUUsQ0FBQyw0QkFBWSxDQUFDO0tBQzFCLENBQUM7R0FDVyxTQUFTLENBQ3JCO0FBRFksOEJBQVMifQ==