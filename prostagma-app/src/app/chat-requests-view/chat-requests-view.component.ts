import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChatRequests} from '../../../../models/ChatRequests';
import {ChatService} from '../services/chat.service';
import {NotificationsService} from '../services/notifications/notifications.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {AuthService} from '../services/auth.service';
import {ChatRequestsService} from "../services/chat-requests/chat-requests.service";
import {Users} from "../../../../models/Users";
import {map} from "rxjs/operators";
import {UsersService} from "../services/users.service";
import {Observable} from "rxjs";
import {Common} from "../lib/common";

const cardLinks = [
  [1, 3, 4],
  [0, 2, 3, 4, 5],
  [1, 4, 5],
  [0, 1, 4, 6, 7],
  [0, 1, 2, 3, 5, 6, 7, 8],
  [1, 2, 4, 7, 8],
  [3, 4, 7],
  [3, 4, 5, 6, 8],
  [4, 5, 7]
];

@Component({
  selector: 'app-chat-requests-view',
  templateUrl: './chat-requests-view.component.html',
  styleUrls: ['./chat-requests-view.component.scss']
})

export class ChatRequestsViewComponent implements OnInit {
  public chatRequests: ChatRequests[] = new Array<ChatRequests>();
  public chatRequested: ChatRequests[] = new Array<ChatRequests>();
  public teamChatRequests: ChatRequests[] = new Array<ChatRequests>();
  public archivedChatRequests: ChatRequests[] = new Array<ChatRequests>();
  public selectedChatRequest: ChatRequests[] = new Array<ChatRequests>();
  public users: Users[] = new Array<Users>();
  public usersTmp: Users[] = new Array<Users>();

  @Output() public selectedChat: EventEmitter<ChatRequests> = new EventEmitter<ChatRequests>();
  @Output() public resized: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private chatService: ChatService,
              private notificationService: NotificationsService,
              private authService: AuthService,
              private chatRequestService: ChatRequestsService,
              private usersService: UsersService,
              private common: Common) {
    this.usersService.getUsersExceptCurrent().subscribe(u => {
      this.users = u;
    });
  }

  count = 9;
  array: any[] = [];

  ngOnInit() {
    this.chatService.userDisconnectionNotifier().subscribe(user => {
      this.usersTmp = this.common.checkIfExists(this.users, user, true);
      this.users = [...this.usersTmp];
    });
    this.chatService.pushUserOnConnection().subscribe(newUser => {
      this.usersTmp = this.common.checkIfExists(this.users, newUser, false);
      this.users = [...this.usersTmp];
    });
    this.notificationService.getChatRequestNotifications().subscribe(cr => {
      cr.forEach(chat => {
        this.chatRequests.push(chat);
      });
    });
  }

  startChatRequest(user: Users) {
    const chatRequestUsers = [this.authService.userProfile, user];
    this.chatService.initChat(chatRequestUsers);
    this.chatRequestService.startChatRequest(user);
  }

  drop(event: CdkDragDrop<ChatRequests[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  // selectCard(selectedDiv) {
  //   const children = selectedDiv.parentElement.children;
  //   selectedDiv.clicked = true;
  //   const overlay = selectedDiv.parentElement.previousSibling;
  //   overlay.style.display = 'block';
  //   console.log(overlay);
  //   let i = 0;
  //   while (i < children.length) {
  //     if (children[i] !== selectedDiv) {
  //       children[i].style.position = 'absolute';
  //       children[i].style.transform = 'translateY(-50%) translateX(-50%)';
  //       children[i].style.top = '50%';
  //       children[i].style.left = '50%';
  //     }
  //     i++;
  //   }
  //   selectedDiv.style.position = 'absolute';
  //   selectedDiv.style.transform = 'translateY(-50%) translateX(-50%) !important';
  //   selectedDiv.style.top = '50%';
  //   selectedDiv.style.left = '50%';
  //   selectedDiv.style.zIndex = '10';
  // }

  // unhoverCard(selectedDiv) {
  //   const children = selectedDiv.parentElement.children;
  //   let i = 0;
  //   if (selectedDiv.clicked) {
  //     console.log('wsh?');
  //   } else {
  //     console.log('nani?');
  //     while (i < children.length) {
  //       children[i].style.transform = null;
  //       i++;
  //     }
  //   }
  // }
  //
  // hoverCard(selectedDiv: HTMLDivElement) {
  //   this.reactiveCards(selectedDiv, 50);
  // }
  //
  // reactiveCards(selectedDiv, percent: number) {
  //   const children = selectedDiv.parentElement.children;
  //   let i = 0;
  //   let y = 0;
  //   while (i < children.length) {
  //     if (children[i].id === selectedDiv.id) {
  //       break;
  //     }
  //     i++;
  //   }
  //   while (y < cardLinks[i].length) {
  //     if (i < cardLinks[i][y]) {
  //       if (i + 1 === cardLinks[i][y]) {
  //         children[cardLinks[i][y]].style.transform = 'translateX(' + percent + '%)';
  //       }
  //       if (i + 2 === cardLinks[i][y]) {
  //         children[cardLinks[i][y]].style.transform = 'translateX(-' + percent + '%) translateY(' + percent + '%)';
  //       }
  //       if (i + 3 === cardLinks[i][y]) {
  //         children[cardLinks[i][y]].style.transform = 'translateY(' + percent + '%)';
  //       }
  //       if (i + 4 === cardLinks[i][y]) {
  //         children[cardLinks[i][y]].style.transform = 'translateY(' + percent + '%) translateX(' + percent + '%)';
  //       }
  //     } else {
  //       if (i - 1 === cardLinks[i][y]) {
  //         children[cardLinks[i][y]].style.transform = 'translateX(-' + percent + '%)';
  //       }
  //       if (i - 2 === cardLinks[i][y]) {
  //         children[cardLinks[i][y]].style.transform = 'translateX(' + percent + '%) translateY(-' + percent + '%)';
  //       }
  //       if (i - 3 === cardLinks[i][y]) {
  //         children[cardLinks[i][y]].style.transform = 'translateY(-' + percent + '%)';
  //       }
  //       if (i - 4 === cardLinks[i][y]) {
  //         children[cardLinks[i][y]].style.transform = 'translateY(-' + percent + '%) translateX(-' + percent + '%)';
  //       }
  //     }
  //     y++;
  //   }
  // }
}
