"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const operators_1 = require("rxjs/operators");
const environment_1 = require("../../environments/environment");
const Users_1 = require("../../../../models/Users");
window.global = window;
let AuthService = class AuthService {
    constructor(http, router) {
        this.http = http;
        this.router = router;
        // auth0 = new auth0.WebAuth({
        //   clientID: 'uF6bx7ipLoeTyS4jg1GFiMEZjAA4nVcA',
        //   domain: environment.auth.domain,
        //   responseType: 'token',
        //   redirectUri: environment.auth.auth0RedirectUri,
        //   audience: 'http://prostagma.fr',
        //   scope: 'openid profile email'
        // });
        this.expiresAt = 0;
        this.isAdminBool = 0;
        this.userProfile = new Users_1.Users();
        this.accessToken = '';
        this.authenticated = false;
        this.apiUrl = environment_1.environment.apiUrl;
        this.prostagmaApiUrl = `${this.apiUrl}/api/prostagmaApi`;
        // if (localStorage.getItem('username') !== null && !this.isLoggedIn) {
        //   this.getUserByEmail(localStorage.getItem('userEmail')).subscribe(authResults => {
        //     this._setSession(authResults);
        //   });
        // }
        // this.getAccessToken();
    }
    _setSession(authResult) {
        this.expiresAt = authResult.credentials.expiresIn * 1000 + Date.now();
        this.accessToken = authResult.credentials.accessToken;
        this.userProfile = authResult.object;
        this.isAdminBool = authResult.object.isAdminBool;
        this.authenticated = true;
    }
    getUserByEmail(userEmail) {
        const obj = { email: userEmail };
        return this.http.post(this.prostagmaApiUrl + '/db/connectWithLS', obj).pipe(operators_1.map(res => {
            return res;
        }));
    }
    //
    // getUserInfos(authResult: AuthResults) {
    //   this.auth0.client.userInfo(authResult.credentials.accessToken, (err: any, profile: any) => {
    //     if (profile) {
    //       this._setSession(authResult);
    //     }
    //   });
    // }
    //
    // getAccessToken() {
    //   this.auth0.checkSession({}, (err: any, authResult: AuthResults) => {
    //     if (authResult && authResult.credentials.accessToken) {
    //       this.getUserInfos(authResult);
    //     }
    //   });
    // }
    //
    // handleLoginCallback() {
    //   console.log('test');
    //   this.auth0.parseHash((err: any, authResult: AuthResults) => {
    //     if (authResult && authResult.credentials.accessToken) {
    //       window.location.hash = '';
    //       this.getUserInfos(authResult);
    //     } else if (err) {
    //       console.error(`Error ${err.error}}`);
    //     }
    //     this.router.navigate(['/']).then((callback) => {
    //       console.log(callback);
    //     });
    //   });
    // }
    logout() {
        localStorage.clear();
        console.log('wsh?');
        const obj = { userID: this.userProfile._id };
        console.log(obj);
        return this.http.post(this.prostagmaApiUrl + '/db/signOutUser', obj).pipe(operators_1.map(res => {
            console.log(res);
            location.reload();
            return (0);
        }));
    }
    get isLoggedIn() {
        return Date.now() < this.expiresAt && this.authenticated;
    }
    get isAdmin() {
        return !!this.isAdminBool;
    }
    team() {
        return (this.http.get(this.prostagmaApiUrl + '/teams', {
            headers: new http_1.HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`)
        }).pipe(operators_1.map(res => {
            console.log(res);
        })));
    }
    saveUser(formGroup) {
        return (this.http.post(this.prostagmaApiUrl + '/db/saveUser', formGroup).pipe(operators_1.map(res => {
            if (!res.success) {
                return res;
            }
            this.userProfile = res.object;
            this.router.navigate(['/home']).then((callback) => {
                console.log('Navigated to : ' + callback);
            });
            return res;
        })));
    }
    log(formGroup) {
        return (this.http.post(this.prostagmaApiUrl + '/db/connect', formGroup).pipe(operators_1.map(res => {
            if (res.success === false) {
                return res;
            }
            localStorage.setItem('username', res.object.username);
            localStorage.setItem('userEmail', res.object.email);
            this.userProfile = res.object;
            this.router.navigate(['/home']).then((callback) => {
                console.log('Navigated to : ' + callback);
            });
            return (res);
        })));
    }
};
AuthService = __decorate([
    core_1.Injectable()
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvc3RhZ21hLWFwcC9zcmMvYXBwL3NlcnZpY2VzL2F1dGguc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUF5QztBQUd6QywrQ0FBNkQ7QUFFN0QsOENBQW1DO0FBQ25DLGdFQUEyRDtBQUMzRCxvREFBK0M7QUFJOUMsTUFBYyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFHaEMsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBVztJQWdCdEIsWUFBb0IsSUFBZ0IsRUFBVSxNQUFjO1FBQXhDLFNBQUksR0FBSixJQUFJLENBQVk7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBZjVELDhCQUE4QjtRQUM5QixrREFBa0Q7UUFDbEQscUNBQXFDO1FBQ3JDLDJCQUEyQjtRQUMzQixvREFBb0Q7UUFDcEQscUNBQXFDO1FBQ3JDLGtDQUFrQztRQUNsQyxNQUFNO1FBRU4sY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLGdCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLGdCQUFXLEdBQVUsSUFBSSxhQUFLLEVBQUUsQ0FBQztRQUNqQyxnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUNqQixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQVdkLFdBQU0sR0FBRyx5QkFBVyxDQUFDLE1BQU0sQ0FBQztRQUM1QixvQkFBZSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sbUJBQW1CLENBQUM7UUFUMUQsdUVBQXVFO1FBQ3ZFLHNGQUFzRjtRQUN0RixxQ0FBcUM7UUFDckMsUUFBUTtRQUNSLElBQUk7UUFDSix5QkFBeUI7SUFDM0IsQ0FBQztJQUtNLFdBQVcsQ0FBQyxVQUF1QjtRQUN4QyxJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsU0FBUyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDdEUsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQztRQUN0RCxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDckMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUNqRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztJQUM1QixDQUFDO0lBRUQsY0FBYyxDQUFDLFNBQWlCO1FBQzlCLE1BQU0sR0FBRyxHQUFHLEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBQyxDQUFDO1FBQy9CLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQWMsSUFBSSxDQUFDLGVBQWUsR0FBRyxtQkFBbUIsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2pHLE9BQU8sR0FBRyxDQUFDO1FBQ2IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNOLENBQUM7SUFFRCxFQUFFO0lBQ0YsMENBQTBDO0lBQzFDLGlHQUFpRztJQUNqRyxxQkFBcUI7SUFDckIsc0NBQXNDO0lBQ3RDLFFBQVE7SUFDUixRQUFRO0lBQ1IsSUFBSTtJQUNKLEVBQUU7SUFDRixxQkFBcUI7SUFDckIseUVBQXlFO0lBQ3pFLDhEQUE4RDtJQUM5RCx1Q0FBdUM7SUFDdkMsUUFBUTtJQUNSLFFBQVE7SUFDUixJQUFJO0lBQ0osRUFBRTtJQUNGLDBCQUEwQjtJQUMxQix5QkFBeUI7SUFDekIsa0VBQWtFO0lBQ2xFLDhEQUE4RDtJQUM5RCxtQ0FBbUM7SUFDbkMsdUNBQXVDO0lBQ3ZDLHdCQUF3QjtJQUN4Qiw4Q0FBOEM7SUFDOUMsUUFBUTtJQUNSLHVEQUF1RDtJQUN2RCwrQkFBK0I7SUFDL0IsVUFBVTtJQUNWLFFBQVE7SUFDUixJQUFJO0lBRUosTUFBTTtRQUNKLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLE1BQU0sR0FBRyxHQUFHLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFDLENBQUM7UUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsaUJBQWlCLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNsRixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNsQixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDYixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUVELElBQUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUMzRCxDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1QsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDO0lBRUQsSUFBSTtRQUNGLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLFFBQVEsRUFBRTtZQUNuRCxPQUFPLEVBQUUsSUFBSSxrQkFBVyxFQUFFLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxVQUFVLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUM5RSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDLENBQ0osQ0FBQztJQUNKLENBQUM7SUFFRCxRQUFRLENBQUMsU0FBb0I7UUFDM0IsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFjLElBQUksQ0FBQyxlQUFlLEdBQUcsY0FBYyxFQUFFLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDbkcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2hCLE9BQU8sR0FBRyxDQUFDO2FBQ1o7WUFDRCxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7WUFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUNoRCxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxDQUFDO1lBQzVDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsR0FBRyxDQUFDLFNBQW9CO1FBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBYyxJQUFJLENBQUMsZUFBZSxHQUFHLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2xHLElBQUksR0FBRyxDQUFDLE9BQU8sS0FBSyxLQUFLLEVBQUU7Z0JBQ3pCLE9BQU8sR0FBRyxDQUFDO2FBQ1o7WUFDRCxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3RELFlBQVksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO1lBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUMsQ0FBQztZQUM1QyxDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDRixDQUFBO0FBbklZLFdBQVc7SUFEdkIsaUJBQVUsRUFBRTtHQUNBLFdBQVcsQ0FtSXZCO0FBbklZLGtDQUFXIn0=