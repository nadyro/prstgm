import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message} from '../../../../models/Message';
import * as io from 'socket.io-client';
import {AuthService} from './auth.service';
import {ChatRequests} from '../../../../models/ChatRequests';
import {environment} from '../../environments/environment';
import {Users} from "../../../../models/Users";
import {Server} from "socket.io";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket: SocketIOClient.Socket;
  readonly apiUrl: string;
  readonly prostagmaApiUrl: string;
  private dataObservable: Observable<Message> = new Observable<Message>();
  public userDisconnection: Observable<Users> = new Observable<Users>();
  public userReconnection: Observable<Users> = new Observable<Users>();
  public joinNotifier: Observable<string> = new Observable<string>();
  public newConversation: Observable<Users> = new Observable<Users>();
  public pushConnectedUser: Observable<Users> = new Observable<Users>();
  messageNotifier: EventEmitter<any> = new EventEmitter<any>();

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.apiUrl = environment.socketApiUrl;
    this.prostagmaApiUrl = `${this.apiUrl}/api/prostagmaApi`;
    this.socket = io.connect(environment.socketApiUrl + '/chat');
    this.socket.on('connectedUser', (user: Users) => {
      if (this.authService.userProfile._id === user._id) {
        this.authService.userProfile = user;
      }
    });
  }

  public pushUserOnConnection(): Observable<Users> {
    return this.pushConnectedUser = new Observable<Users>(newUser => {
      this.socket.on('userToPush', (userToPush: Users) => {
        newUser.next(userToPush);
      });
    });
  }
  /**  Initializes a chat between the requester and the recipient */
  public initChat(users: Users[]): void {
    const socketIds = users[0].socketId + '&' + users[1].socketId;
    this.socket.emit('joinRoom', socketIds);
  }

  public userReconnectionNotifier(): Observable<Users> {
    return this.userReconnection = new Observable<Users>(userReconnection => {
      this.socket.on('userReconnected', (ur: Users) => {
        userReconnection.next(ur);
      });
    });
  }

  public userDisconnectionNotifier(): Observable<Users> {
    return this.userDisconnection = new Observable<Users>(msg => {
      this.socket.on('userDisconnection', (user: Users) => {
        console.log(user);
        msg.next(user);
      });
    });
  }

  public displayConvOnNewMessage(): Observable<Users> {
    return this.newConversation = new Observable<Users>(newConv => {
      this.socket.on('newConv', (nc: Users) => {
        newConv.next(nc);
      });
    });
  }

  public joinNotification(): Observable<string> {
    return this.joinNotifier = new Observable<string>(msg => {
      this.socket.on('createChat', (message: string) => {
        console.log(message);
        msg.next(message);
      });
    });
  }

  public pingConnection(user: Users) {
    this.socket.emit('pingConnection', user);
  }

  public getData(directive: string): Observable<Message> {
    return this.dataObservable = new Observable<Message>(message => {
      this.socket.on(directive, (simpleMessage: Message) => message.next(simpleMessage));
    });
  }

  public sendMessage(newMessage: Message, chatRequest: Users): void {
    this.messageNotifier.emit(newMessage);
    newMessage.chatRequest = chatRequest;
    console.log(newMessage);
    this.socket.emit('simpleMessage', newMessage);
  }
}
