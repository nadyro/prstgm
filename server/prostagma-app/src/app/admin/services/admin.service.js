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
const environment_1 = require("../../../environments/environment");
let AdminService = class AdminService {
    constructor(http) {
        this.http = http;
        this.apiUrl = environment_1.environment.apiUrl;
        this.prostagmaApiUrl = `${this.apiUrl}/api/prostagmaApi`;
    }
    addGame(gameForm) {
        const obj = { gamesForm: gameForm.value };
        console.log(obj);
        return this.http.post(this.prostagmaApiUrl + '/db/admin/addGame', obj).pipe(operators_1.map(res => {
            console.log(res);
            return (res);
        }));
    }
    getCategories() {
        return this.http.get(this.prostagmaApiUrl + '/db/admin/getCategories').pipe(operators_1.map(categories => {
            return categories;
        }));
    }
    searchGamesInDb(id, games) {
        if (id) {
            return this.http.get(this.prostagmaApiUrl + '/db/admin/getGames?id=' + id).pipe(operators_1.map(gamesReturned => {
                console.log(gamesReturned);
                return gamesReturned;
            }));
        }
        else {
            return this.http.get(this.prostagmaApiUrl + '/db/admin/getGames').pipe(operators_1.map(gamesReturned => {
                return (gamesReturned);
            }));
        }
    }
    deleteGameInDb(gameId) {
        console.log('Test');
        return (this.http.delete(this.prostagmaApiUrl + '/db/admin/deleteGame/' + gameId).pipe(operators_1.map(res => {
            console.log(res);
            return (res);
        })));
    }
};
AdminService = __decorate([
    core_1.Injectable()
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW4uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb3N0YWdtYS1hcHAvc3JjL2FwcC9hZG1pbi9zZXJ2aWNlcy9hZG1pbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQXlDO0FBRXpDLDhDQUFtQztBQU1uQyxtRUFBOEQ7QUFHOUQsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtJQUN2QixZQUFvQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBR3BDLFdBQU0sR0FBRyx5QkFBVyxDQUFDLE1BQU0sQ0FBQztRQUM1QixvQkFBZSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sbUJBQW1CLENBQUM7SUFIcEQsQ0FBQztJQUtELE9BQU8sQ0FBQyxRQUFtQjtRQUN6QixNQUFNLEdBQUcsR0FBRyxFQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFDLENBQUM7UUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFpQixJQUFJLENBQUMsZUFBZSxHQUFHLG1CQUFtQixFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDcEcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUVELGFBQWE7UUFDWCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFlLElBQUksQ0FBQyxlQUFlLEdBQUcseUJBQXlCLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3pHLE9BQU8sVUFBVSxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDTixDQUFDO0lBRUQsZUFBZSxDQUFDLEVBQVcsRUFBRSxLQUEyQjtRQUN0RCxJQUFJLEVBQUUsRUFBRTtZQUNOLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQVUsSUFBSSxDQUFDLGVBQWUsR0FBRyx3QkFBd0IsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQ3RGLGVBQUcsQ0FBQyxhQUFhLENBQUMsRUFBRTtnQkFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDM0IsT0FBTyxhQUFhLENBQUM7WUFDekIsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNMO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFVLElBQUksQ0FBQyxlQUFlLEdBQUcsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQzdFLGVBQUcsQ0FBQyxhQUFhLENBQUMsRUFBRTtnQkFDbEIsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzNCLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDTDtJQUNILENBQUM7SUFFRCxjQUFjLENBQUMsTUFBVztRQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLHVCQUF1QixHQUFHLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDL0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0YsQ0FBQTtBQTVDWSxZQUFZO0lBRHhCLGlCQUFVLEVBQUU7R0FDQSxZQUFZLENBNEN4QjtBQTVDWSxvQ0FBWSJ9