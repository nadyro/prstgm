"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = require("../../../environments/environment");
const operators_1 = require("rxjs/operators");
class NotificationsService {
    constructor(httpClient, authService) {
        this.httpClient = httpClient;
        this.authService = authService;
        this.apiUrl = environment_1.environment.apiUrl;
        this.prostagmaApiUrl = `${this.apiUrl}/api/prostagmaApi`;
    }
    getChatRequestNotifications() {
        const obj = {
            recipientId: this.authService.userProfile._id
        };
        return this.httpClient.post(this.prostagmaApiUrl + '/db/getChatRequests', obj)
            .pipe(operators_1.map(res => {
            console.log(res);
            return res;
        }));
    }
}
exports.NotificationsService = NotificationsService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9ucy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvc3RhZ21hLWFwcC9zcmMvYXBwL3NlcnZpY2VzL25vdGlmaWNhdGlvbnMvbm90aWZpY2F0aW9ucy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsbUVBQThEO0FBSTlELDhDQUFtQztBQUVuQyxNQUFhLG9CQUFvQjtJQUsvQixZQUFvQixVQUFzQixFQUFVLFdBQXdCO1FBQXhELGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUhwRSxXQUFNLEdBQUcseUJBQVcsQ0FBQyxNQUFNLENBQUM7UUFDNUIsb0JBQWUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLG1CQUFtQixDQUFDO0lBRzVELENBQUM7SUFFRCwyQkFBMkI7UUFDekIsTUFBTSxHQUFHLEdBQUc7WUFDVixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsR0FBRztTQUM5QyxDQUFDO1FBQ0YsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBaUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxxQkFBcUIsRUFBRSxHQUFHLENBQUM7YUFDM0YsSUFBSSxDQUFDLGVBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztDQUNGO0FBbEJELG9EQWtCQyJ9