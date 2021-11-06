import {EventEmitter, Injectable} from '@angular/core';
import {AuthService} from '../auth.service';
import {HttpClient} from '@angular/common/http';
import {ChatRequests} from '../../../../../models/ChatRequests';
import {ChatService} from "../chat.service";
import {Users} from "../../../../../models/Users";

@Injectable({
  providedIn: 'root'
})
export class ChatRequestsService {

  public chatEmitter: EventEmitter<Users> = new EventEmitter<Users>();
  displayChat: EventEmitter<any> = new EventEmitter<any>();

  constructor(private chatService: ChatService, private httpClient: HttpClient) {
  }

  startChatRequest(user: Users) {
    this.chatEmitter.emit(user);
    // const usersID = chatRequest.recipient._id + ' & ' + chatRequest.requester._id;
    // this.chatService.initChat(usersID);
  }

  displayChatRequest(chatRequest: ChatRequests) {
    this.displayChat.emit(chatRequest._id);
  }
}
