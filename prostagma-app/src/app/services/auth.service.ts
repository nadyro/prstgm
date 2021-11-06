import {Injectable} from '@angular/core';
// import * as auth0 from 'auth0-js';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Users} from '../../../../models/Users';
import {AuthResults} from '../../../../models/AuthResults';
import {FormGroup} from '@angular/forms';

(window as any).global = window;

@Injectable()
export class AuthService {
  // auth0 = new auth0.WebAuth({
  //   clientID: 'uF6bx7ipLoeTyS4jg1GFiMEZjAA4nVcA',
  //   domain: environment.auth.domain,
  //   responseType: 'token',
  //   redirectUri: environment.auth.auth0RedirectUri,
  //   audience: 'http://prostagma.fr',
  //   scope: 'openid profile email'
  // });

  expiresAt = 0;
  isAdminBool = 0;
  userProfile: Users = new Users();
  accessToken = '';
  authenticated = false;

  constructor(private http: HttpClient, private router: Router) {
    // if (localStorage.getItem('username') !== null && !this.isLoggedIn) {
    //   this.getUserByEmail(localStorage.getItem('userEmail')).subscribe(authResults => {
    //     this._setSession(authResults);
    //   });
    // }
    // this.getAccessToken();
  }

  private apiUrl = environment.apiUrl;
  private prostagmaApiUrl = `${this.apiUrl}/api/prostagmaApi`;

  public _setSession(authResult: AuthResults) {
    this.expiresAt = authResult.credentials.expiresIn * 1000 + Date.now();
    this.accessToken = authResult.credentials.accessToken;
    this.userProfile = authResult.object;
    this.isAdminBool = authResult.object.isAdminBool;
    this.authenticated = true;
  }

  getUserByEmail(userEmail: string): Observable<AuthResults> {
    const obj = {email: userEmail};
    return this.http.post<AuthResults>(this.prostagmaApiUrl + '/db/connectWithLS', obj).pipe(map(res => {
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
    const obj = {userID: this.userProfile._id};
    console.log(obj);
    return this.http.post(this.prostagmaApiUrl + '/db/signOutUser', obj).pipe(map(res => {
      console.log(res);
      location.reload();
      return (0);
    }));
  }

  get isLoggedIn(): boolean {
    return Date.now() < this.expiresAt && this.authenticated;
  }

  get isAdmin(): boolean {
    return !!this.isAdminBool;
  }

  team() {
    return (this.http.get(this.prostagmaApiUrl + '/teams', {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`)
      }).pipe(map(res => {
        console.log(res);
      }))
    );
  }

  saveUser(formGroup: FormGroup): Observable<AuthResults> {
    return (this.http.post<AuthResults>(this.prostagmaApiUrl + '/db/saveUser', formGroup).pipe(map(res => {
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

  log(formGroup: FormGroup): Observable<AuthResults> {
    return (this.http.post<AuthResults>(this.prostagmaApiUrl + '/db/connect', formGroup).pipe(map(res => {
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
}
