import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {Users} from '../../../../models/Users';
import {UsersService} from "../services/users.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public userProfile: Users = new Users();
  public backgroundUrl = 'http://prostagma.fr/assets/images/bg/belowsky.jpg';

  constructor(public authService: AuthService, private router: Router, private usersService: UsersService) { }

  ngOnInit() {
    let queriedUser = this.router.parseUrl(this.router.url).queryParams.id;
    if (queriedUser) {
      this.usersService.getUserById(queriedUser).subscribe(user => {
        this.userProfile = user;
      });
    }
    this.router.events.subscribe(events => {
      queriedUser = this.router.parseUrl(this.router.url).queryParams.id;
      if (queriedUser) {
        this.usersService.getUserById(queriedUser).subscribe(user => {
          this.userProfile = user;
        });
      }
    });
  }

}
