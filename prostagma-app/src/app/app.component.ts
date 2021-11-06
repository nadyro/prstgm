import {Component, OnInit} from '@angular/core';
import {ChatService} from './services/chat.service';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'prostagma';
  public currentUrl = '';
  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe((routerEvent: any) => {
      if (routerEvent.routerEvent) {
        const segmentPath = this.router.parseUrl(routerEvent.routerEvent.url).root.children;
        if (segmentPath.primary) {
          this.currentUrl = segmentPath.primary.segments[0].path;
          console.log(this.currentUrl);
        }
      }
    });
  }
}
