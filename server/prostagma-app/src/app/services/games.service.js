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
let GamesService = class GamesService {
    constructor(http) {
        this.http = http;
        this.apiUrl = environment_1.environment.apiUrl;
        this.prostagmaApiUrl = `${this.apiUrl}/api/prostagmaApi`;
    }
    getGames() {
        return (this.http.get(this.prostagmaApiUrl + '/db/getGames').pipe(operators_1.map(res => {
            console.log(res);
            return (res);
        })));
    }
};
GamesService = __decorate([
    core_1.Injectable()
], GamesService);
exports.GamesService = GamesService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb3N0YWdtYS1hcHAvc3JjL2FwcC9zZXJ2aWNlcy9nYW1lcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQXlDO0FBRXpDLDhDQUFtQztBQUNuQyxnRUFBMkQ7QUFHM0QsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtJQUN2QixZQUFvQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBR3BDLFdBQU0sR0FBRyx5QkFBVyxDQUFDLE1BQU0sQ0FBQztRQUM1QixvQkFBZSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sbUJBQW1CLENBQUM7SUFIcEQsQ0FBQztJQUtELFFBQVE7UUFDTixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNGLENBQUE7QUFiWSxZQUFZO0lBRHhCLGlCQUFVLEVBQUU7R0FDQSxZQUFZLENBYXhCO0FBYlksb0NBQVkifQ==