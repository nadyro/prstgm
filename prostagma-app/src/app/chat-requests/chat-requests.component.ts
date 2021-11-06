import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChatRequests} from '../../../../models/ChatRequests';
import {ChatService} from '../services/chat.service';
import {AuthService} from '../services/auth.service';
import {ChatRequestsService} from '../services/chat-requests/chat-requests.service';
import {Message} from '../../../../models/Message';
import {Users} from '../../../../models/Users';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-chat-requests',
  templateUrl: './chat-requests.component.html',
  styleUrls: ['./chat-requests.component.scss']
})
export class ChatRequestsComponent implements OnInit {

  @Input() chatRequest: Users = new Users();
  @Output() public closedChatRequest: EventEmitter<Users> = new EventEmitter<Users>();
  private displayed = false;
  private initialClass = 'tab';
  public messageReceived: Message[] = new Array<Message>();
  public env = environment;
  loginStatusMessage = '';
  constructor(private chatService: ChatService, private authService: AuthService) {

  }

  sendSimpleMessage(message: any, event: any) {
    const newMessage = new Message();
    newMessage.receptionDate = new Date();
    newMessage.chatRequestId = this.chatRequest._id;
    newMessage.read = false;
    // newMessage.roomId = this.chatRequest.roomId;
    newMessage.sender = this.authService.userProfile;
    if (event) {
      console.log(message);
      newMessage.content = message.previousSibling.value;
      this.chatService.sendMessage(newMessage, this.chatRequest);
      message.previousSibling.value = '';
    } else {
      newMessage.content = message.value;
      this.chatService.sendMessage(newMessage, this.chatRequest);
      message.value = '';
    }
    // this.messages.push(newMessage);
  }

  displayChatRequest(chatRequest: Users, htmlElement: any) {
    if (this.displayed === false) {
      htmlElement.className += ' extendedTab';
      htmlElement.nextSibling.style.display = 'block';
      this.displayed = true;
    } else {
      htmlElement.className = this.initialClass;
      htmlElement.nextSibling.style.display = 'none';
      this.displayed = false;
    }
  }

  closeChatRequest(chatRequest: Users) {
    this.closedChatRequest.emit(chatRequest);
  }

  ngOnInit() {
    this.chatService.userReconnectionNotifier().subscribe(user => {
      this.loginStatusMessage = user.username + ' has reconnected.';
      this.chatRequest = user;
    });
    this.chatService.userDisconnectionNotifier().subscribe(user => {
      this.loginStatusMessage = user.username + ' has disconnected.';
    });
    this.chatService.getData('msgReceived').subscribe(message => {
      if (message.sender._id === this.chatRequest._id) {
        this.messageReceived.push(message);
        console.log('New message received.');
        console.log(message);
      }
    });
  }

}
