"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
let AuthComponent = class AuthComponent {
    constructor(authService, chatService) {
        this.authService = authService;
        this.chatService = chatService;
        this.message = '';
        this.authSubscribeForm = new forms_1.FormGroup({
            email: new forms_1.FormControl('', forms_1.Validators.email),
            password: new forms_1.FormControl('', forms_1.Validators.pattern(/^(?=.{8,24}$)(?=.*[A-Z]{+})(?=.*[a-z]{+})(?=.*\d+,})(?=.*[\x21-\x2f]{+}).*$/)),
            username: new forms_1.FormControl('', [forms_1.Validators.required,
                forms_1.Validators.pattern(/^([a-zA-Z\d \xC0-\xF6\-œ\xF8-\xFF]{+})$/)])
        });
    }
    get email() {
        return this.authSubscribeForm.get('email');
    }
    get password() {
        return this.authSubscribeForm.get('password');
    }
    get username() {
        return this.authSubscribeForm.get('username');
    }
    onSubmit() {
        this.authService.saveUser(this.authSubscribeForm.value).subscribe(res => {
            if (!res.success) {
                this.message = res.message;
            }
            this.chatService.pingConnection(res.object);
        });
    }
    ngOnInit() {
    }
};
AuthComponent = __decorate([
    core_1.Component({
        selector: 'app-auth',
        templateUrl: './auth.component.html',
        styleUrls: ['./auth.component.scss'],
    })
], AuthComponent);
exports.AuthComponent = AuthComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9zdGFnbWEtYXBwL3NyYy9hcHAvYXV0aC9hdXRoLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUFnRDtBQUVoRCwwQ0FBa0U7QUFRbEUsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtJQUV4QixZQUFtQixXQUF3QixFQUFVLFdBQXdCO1FBQTFELGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFHdEUsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNwQixzQkFBaUIsR0FBRyxJQUFJLGlCQUFTLENBQUM7WUFDaEMsS0FBSyxFQUFFLElBQUksbUJBQVcsQ0FDcEIsRUFBRSxFQUFFLGtCQUFVLENBQUMsS0FBSyxDQUFDO1lBQ3ZCLFFBQVEsRUFBRSxJQUFJLG1CQUFXLENBQ3ZCLEVBQUUsRUFDRixrQkFBVSxDQUFDLE9BQU8sQ0FBQyw2RUFBNkUsQ0FBQyxDQUFDO1lBQ3BHLFFBQVEsRUFBRSxJQUFJLG1CQUFXLENBQ3ZCLEVBQUUsRUFDRixDQUFDLGtCQUFVLENBQUMsUUFBUTtnQkFDbEIsa0JBQVUsQ0FBQyxPQUFPLENBQUMseUNBQXlDLENBQUMsQ0FBQyxDQUFDO1NBQ3BFLENBQUMsQ0FBQztJQWJILENBQUM7SUFlRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN0RSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRTtnQkFDaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO2FBQzVCO1lBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFFBQVE7SUFDUixDQUFDO0NBRUYsQ0FBQTtBQTFDWSxhQUFhO0lBTHpCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsVUFBVTtRQUNwQixXQUFXLEVBQUUsdUJBQXVCO1FBQ3BDLFNBQVMsRUFBRSxDQUFDLHVCQUF1QixDQUFDO0tBQ3JDLENBQUM7R0FDVyxhQUFhLENBMEN6QjtBQTFDWSxzQ0FBYSJ9