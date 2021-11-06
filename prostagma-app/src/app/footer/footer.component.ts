import {Component, EventEmitter, OnInit} from '@angular/core';
import {ChatRequestsService} from '../services/chat-requests/chat-requests.service';
import {ChatRequests} from '../../../../models/ChatRequests';
import {Users} from '../../../../models/Users';
import {ChatService} from '../services/chat.service';
import {Common} from '../lib/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  chatRequests: Users[] = new Array<Users>();

  constructor(private chatRequestsService: ChatRequestsService, private chatService: ChatService, public common: Common) {
  }

  closedChatRequest(chatRequest: Users) {
    this.chatRequests = this.common.checkIfExists(this.chatRequests, chatRequest, true);
  }
  ngOnInit() {
    this.chatService.displayConvOnNewMessage().subscribe((nc: Users) => {
      this.chatRequests = this.common.checkIfExists(this.chatRequests, nc, false);
    });
    this.chatRequestsService.chatEmitter.subscribe((user: Users) => {
      this.chatRequests = this.common.checkIfExists(this.chatRequests, user, false);
    });
  }

}
