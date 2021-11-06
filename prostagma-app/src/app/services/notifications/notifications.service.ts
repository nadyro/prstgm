import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AuthService} from '../auth.service';
import {ChatRequests} from '../../../../../models/ChatRequests';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export class NotificationsService {

  private apiUrl = environment.apiUrl;
  private prostagmaApiUrl = `${this.apiUrl}/api/prostagmaApi`;

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  getChatRequestNotifications(): Observable<ChatRequests[]> {
    const obj = {
      recipientId: this.authService.userProfile._id
    };
    return this.httpClient.post<ChatRequests[]>(this.prostagmaApiUrl + '/db/getChatRequests', obj)
      .pipe(map(res => {
        console.log(res);
        return res;
      }));
  }
}
