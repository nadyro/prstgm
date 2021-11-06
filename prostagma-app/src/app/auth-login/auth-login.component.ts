import {Component, OnChanges, OnInit} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ChatService} from "../services/chat.service";

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {

  constructor(public authService: AuthService, private chatService: ChatService) {
  }


  public message = '';
  passwordWarning = false;
  usernameWarning = false;
  authLoginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  authSubscribeForm = new FormGroup({
    email: new FormControl(
      '', [Validators.email, Validators.required]),
    password: new FormControl(
      '',
      [Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$'), Validators.required]),
    username: new FormControl(
      '',
      [Validators.pattern('[a-zA-Z ]*'), Validators.required])
  });

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

  onSubmit(id: any) {
    console.log(id);
    this.authService.log(this.authLoginForm.value).subscribe(res => {
      if (!res.success) {
        this.message = res.message;
      }
      this.chatService.pingConnection(res.object);
      this.authService._setSession(res);

    });
  }

  switchPanel(element: any) {
    const panelToDisplay = element.offsetParent.previousSibling === null ? element.offsetParent.nextSibling.nextSibling :
      element.offsetParent.previousSibling.previousSibling;
    if (panelToDisplay.nextSibling) {
      panelToDisplay.nextSibling.nextSibling.style.display = 'none';
    } else {
      panelToDisplay.previousSibling.previousSibling.style.display = 'none';
    }
    panelToDisplay.style.display = 'block';
  }
  ngOnInit() {
    if (this.password) {
      this.password.statusChanges.subscribe(pstatus => {
        if (this.password && this.password.value !== '') {
          this.passwordWarning = pstatus === 'INVALID';
        } else {
          this.passwordWarning = false;
        }
      });
    }
    if (this.username) {
      this.username.statusChanges.subscribe(ustatus => {
        if (this.username && this.username.value !== '') {
          this.usernameWarning = ustatus === 'INVALID';
        } else {
          this.usernameWarning = false;
        }
      });
    }
  }

}
