import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ChatService} from '../services/chat.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public counter = 0;
  public notification = '';
  public clickCounter = 0;
  public opened = 0;
  constructor(public authService: AuthService, private chatService: ChatService) {
  }

  displayMobileHeader(menu: any, menuDisplayer: any) {
    const elemHeight = 35 * 4;
    const menuName = menuDisplayer.childNodes[1];
    if (this.clickCounter === 0) {
      // setTimeout(() => {
      //   menu.style.display = 'block';
      // }, 400);
      menu.style.display = 'block';
      menuDisplayer.style.height = 'auto';
      menuDisplayer.style.width = 'auto';
      menuDisplayer.style.borderTopLeftRadius = 0;
      menuDisplayer.style.borderBottomLeftRadius = 0;
      menuName.style.top = 0;
      menuName.style.transform = 'translateY(0%)';
      menuName.childNodes[1].style.transform = 'rotate(180deg)';
      this.clickCounter++;
      this.opened++;
    } else {
      menu.style.display = 'none';
      menuDisplayer.style.height = '60px';
      menuDisplayer.style.width = '60px';
      menuDisplayer.style.borderTopLeftRadius = '35px';
      menuDisplayer.style.borderBottomLeftRadius = '35px';
      menuName.style.top = '50%';
      menuName.style.transform = 'translateY(-50%)';
      menuName.childNodes[1].style.transform = 'rotate(0deg)';
      this.clickCounter--;
      this.opened--;
    }
  }

  signOutUser() {
    this.authService.logout().subscribe(res => {
      console.log(1);
    });
  }

  ngOnInit() {
    this.notification = '';
  }

}
