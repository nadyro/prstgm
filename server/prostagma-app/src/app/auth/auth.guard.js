"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const environment_1 = require("../../environments/environment");
let AuthGuard = class AuthGuard {
    constructor(authService, router, http) {
        this.authService = authService;
        this.router = router;
        this.http = http;
        this.apiUrl = environment_1.environment.apiUrl;
        this.prostagmaApiUrl = `${this.apiUrl}/api/prostagmaApi`;
    }
    canActivate(next, state) {
        console.log(this.authService.isLoggedIn);
        if (!this.authService.isLoggedIn) {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
};
AuthGuard = __decorate([
    core_1.Injectable({
        providedIn: 'root'
    })
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5ndWFyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb3N0YWdtYS1hcHAvc3JjL2FwcC9hdXRoL2F1dGguZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBeUM7QUFRekMsZ0VBQTJEO0FBSzNELElBQWEsU0FBUyxHQUF0QixNQUFhLFNBQVM7SUFJcEIsWUFBb0IsV0FBd0IsRUFBVSxNQUFjLEVBQVUsSUFBZ0I7UUFBMUUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUh0RixXQUFNLEdBQUcseUJBQVcsQ0FBQyxNQUFNLENBQUM7UUFDNUIsb0JBQWUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLG1CQUFtQixDQUFDO0lBRzVELENBQUM7SUFFRCxXQUFXLENBQ1QsSUFBNEIsRUFDNUIsS0FBMEI7UUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRTtZQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDNUIsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUVGLENBQUE7QUFsQlksU0FBUztJQUhyQixpQkFBVSxDQUFDO1FBQ1YsVUFBVSxFQUFFLE1BQU07S0FDbkIsQ0FBQztHQUNXLFNBQVMsQ0FrQnJCO0FBbEJZLDhCQUFTIn0=