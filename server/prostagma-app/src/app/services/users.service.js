"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const operators_1 = require("rxjs/operators");
const environment_1 = require("../../environments/environment");
let UsersService = class UsersService {
    constructor(httpClient, authService) {
        this.httpClient = httpClient;
        this.authService = authService;
        this.apiUrl = environment_1.environment.apiUrl;
        this.prostagmaApiUrl = `${this.apiUrl}/api/prostagmaApi`;
    }
    getUserById(userId) {
        const obj = { id: userId };
        return this.httpClient.post(this.prostagmaApiUrl + '/db/getUsersById', obj).pipe(operators_1.map(users => {
            return users;
        }));
    }
    getUsersExceptCurrent() {
        return this.httpClient.get(this.prostagmaApiUrl + '/db/getUsers').pipe(operators_1.map(users => {
            users.map(u => {
                if (u._id === this.authService.userProfile._id) {
                    users.splice(users.indexOf(u), 1);
                    return users;
                }
            });
            return users;
        }));
    }
};
UsersService = __decorate([
    core_1.Injectable({
        providedIn: 'root'
    })
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb3N0YWdtYS1hcHAvc3JjL2FwcC9zZXJ2aWNlcy91c2Vycy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQXlDO0FBR3pDLDhDQUFtQztBQUduQyxnRUFBMkQ7QUFLM0QsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtJQUl2QixZQUFvQixVQUFzQixFQUFVLFdBQXdCO1FBQXhELGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUMxRSxJQUFJLENBQUMsTUFBTSxHQUFHLHlCQUFXLENBQUMsTUFBTSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxlQUFlLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxtQkFBbUIsQ0FBQztJQUMzRCxDQUFDO0lBRU0sV0FBVyxDQUFDLE1BQWM7UUFDL0IsTUFBTSxHQUFHLEdBQUcsRUFBQyxFQUFFLEVBQUUsTUFBTSxFQUFDLENBQUM7UUFDekIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBUSxJQUFJLENBQUMsZUFBZSxHQUFHLGtCQUFrQixFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbEcsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUNNLHFCQUFxQjtRQUMxQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFVLElBQUksQ0FBQyxlQUFlLEdBQUcsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMxRixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNaLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUU7b0JBQzlDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDbEMsT0FBTyxLQUFLLENBQUM7aUJBQ2Q7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNOLENBQUM7Q0FDRixDQUFBO0FBMUJZLFlBQVk7SUFIeEIsaUJBQVUsQ0FBQztRQUNWLFVBQVUsRUFBRSxNQUFNO0tBQ25CLENBQUM7R0FDVyxZQUFZLENBMEJ4QjtBQTFCWSxvQ0FBWSJ9