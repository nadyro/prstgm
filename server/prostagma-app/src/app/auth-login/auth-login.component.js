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
let AuthLoginComponent = class AuthLoginComponent {
    constructor(authService, chatService) {
        this.authService = authService;
        this.chatService = chatService;
        this.message = '';
        this.passwordWarning = false;
        this.usernameWarning = false;
        this.authLoginForm = new forms_1.FormGroup({
            email: new forms_1.FormControl('', forms_1.Validators.required),
            password: new forms_1.FormControl('', forms_1.Validators.required),
        });
        this.authSubscribeForm = new forms_1.FormGroup({
            email: new forms_1.FormControl('', [forms_1.Validators.email, forms_1.Validators.required]),
            password: new forms_1.FormControl('', [forms_1.Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$'), forms_1.Validators.required]),
            username: new forms_1.FormControl('', [forms_1.Validators.pattern('[a-zA-Z ]*'), forms_1.Validators.required])
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
    onSubmitSignUp() {
        this.authService.saveUser(this.authSubscribeForm.value).subscribe(res => {
            if (!res.success) {
                this.message = res.message;
            }
            this.chatService.pingConnection(res.object);
            this.authService._setSession(res);
        });
    }
    onSubmit(id) {
        console.log(id);
        this.authService.log(this.authLoginForm.value).subscribe(res => {
            if (!res.success) {
                this.message = res.message;
            }
            this.chatService.pingConnection(res.object);
            this.authService._setSession(res);
        });
    }
    switchPanel(element) {
        const panelToDisplay = element.offsetParent.previousSibling === null ? element.offsetParent.nextSibling.nextSibling :
            element.offsetParent.previousSibling.previousSibling;
        if (panelToDisplay.nextSibling) {
            panelToDisplay.nextSibling.nextSibling.style.display = 'none';
        }
        else {
            panelToDisplay.previousSibling.previousSibling.style.display = 'none';
        }
        panelToDisplay.style.display = 'block';
    }
    ngOnInit() {
        if (this.password) {
            this.password.statusChanges.subscribe(pstatus => {
                if (this.password && this.password.value !== '') {
                    this.passwordWarning = pstatus === 'INVALID';
                }
                else {
                    this.passwordWarning = false;
                }
            });
        }
        if (this.username) {
            this.username.statusChanges.subscribe(ustatus => {
                if (this.username && this.username.value !== '') {
                    this.usernameWarning = ustatus === 'INVALID';
                }
                else {
                    this.usernameWarning = false;
                }
            });
        }
    }
};
AuthLoginComponent = __decorate([
    core_1.Component({
        selector: 'app-auth-login',
        templateUrl: './auth-login.component.html',
        styleUrls: ['./auth-login.component.scss']
    })
], AuthLoginComponent);
exports.AuthLoginComponent = AuthLoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1sb2dpbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9zdGFnbWEtYXBwL3NyYy9hcHAvYXV0aC1sb2dpbi9hdXRoLWxvZ2luLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEyRDtBQUUzRCwwQ0FBb0U7QUFRcEUsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBa0I7SUFFN0IsWUFBbUIsV0FBd0IsRUFBVSxXQUF3QjtRQUExRCxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBSXRFLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFDcEIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsa0JBQWEsR0FBRyxJQUFJLGlCQUFTLENBQUM7WUFDNUIsS0FBSyxFQUFFLElBQUksbUJBQVcsQ0FBQyxFQUFFLEVBQUUsa0JBQVUsQ0FBQyxRQUFRLENBQUM7WUFDL0MsUUFBUSxFQUFFLElBQUksbUJBQVcsQ0FBQyxFQUFFLEVBQUUsa0JBQVUsQ0FBQyxRQUFRLENBQUM7U0FDbkQsQ0FBQyxDQUFDO1FBRUgsc0JBQWlCLEdBQUcsSUFBSSxpQkFBUyxDQUFDO1lBQ2hDLEtBQUssRUFBRSxJQUFJLG1CQUFXLENBQ3BCLEVBQUUsRUFBRSxDQUFDLGtCQUFVLENBQUMsS0FBSyxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDOUMsUUFBUSxFQUFFLElBQUksbUJBQVcsQ0FDdkIsRUFBRSxFQUNGLENBQUMsa0JBQVUsQ0FBQyxPQUFPLENBQUMsd0VBQXdFLENBQUMsRUFBRSxrQkFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3RILFFBQVEsRUFBRSxJQUFJLG1CQUFXLENBQ3ZCLEVBQUUsRUFDRixDQUFDLGtCQUFVLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFF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