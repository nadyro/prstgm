"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let HeaderComponent = class HeaderComponent {
    constructor(authService, chatService) {
        this.authService = authService;
        this.chatService = chatService;
        this.counter = 0;
        this.notification = '';
        this.clickCounter = 0;
        this.opened = 0;
    }
    displayMobileHeader(menu, menuDisplayer) {
        const elemHeight = 35 * 4;
        const menuName = menuDisplayer.childNodes[1];
        if (this.clickCounter === 0) {
            // setTimeout(() => {
            //   menu.style.display = 'block';
            // }, 400);
            menu.style.display = 'block';
            menuDisplayer.style.height = 'auto';
            menuDisplayer.style.width = 'auto';
            menuDisplayer.style.borderTopLeftRadius = 0;
            menuDisplayer.style.borderBottomLeftRadius = 0;
            menuName.style.top = 0;
            menuName.style.transform = 'translateY(0%)';
            menuName.childNodes[1].style.transform = 'rotate(180deg)';
            this.clickCounter++;
            this.opened++;
        }
        else {
            menu.style.display = 'none';
            menuDisplayer.style.height = '60px';
            menuDisplayer.style.width = '60px';
            menuDisplayer.style.borderTopLeftRadius = '35px';
            menuDisplayer.style.borderBottomLeftRadius = '35px';
            menuName.style.top = '50%';
            menuName.style.transform = 'translateY(-50%)';
            menuName.childNodes[1].style.transform = 'rotate(0deg)';
            this.clickCounter--;
            this.opened--;
        }
    }
    signOutUser() {
        this.authService.logout().subscribe(res => {
            console.log(1);
        });
    }
    ngOnInit() {
        this.notification = '';
    }
};
HeaderComponent = __decorate([
    core_1.Component({
        selector: 'app-header',
        templateUrl: './header.component.html',
        styleUrls: ['./header.component.scss']
    })
], HeaderComponent);
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb3N0YWdtYS1hcHAvc3JjL2FwcC9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUFnRDtBQVNoRCxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0lBSzFCLFlBQW1CLFdBQXdCLEVBQVUsV0FBd0I7UUFBMUQsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUp0RSxZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ1osaUJBQVksR0FBRyxFQUFFLENBQUM7UUFDbEIsaUJBQVksR0FBRyxDQUFDLENBQUM7UUFDakIsV0FBTSxHQUFHLENBQUMsQ0FBQztJQUVsQixDQUFDO0lBRUQsbUJBQW1CLENBQUMsSUFBUyxFQUFFLGFBQWtCO1FBQy9DLE1BQU0sVUFBVSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDMUIsTUFBTSxRQUFRLEdBQUcsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QyxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssQ0FBQyxFQUFFO1lBQzNCLHFCQUFxQjtZQUNyQixrQ0FBa0M7WUFDbEMsV0FBVztZQUNYLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUM3QixhQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDcEMsYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1lBQ25DLGFBQWEsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxDQUFDO1lBQzVDLGFBQWEsQ0FBQyxLQUFLLENBQUMsc0JBQXNCLEdBQUcsQ0FBQyxDQUFDO1lBQy9DLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUN2QixRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQztZQUM1QyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsZ0JBQWdCLENBQUM7WUFDMUQsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNmO2FBQU07WUFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7WUFDNUIsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBQ3BDLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztZQUNuQyxhQUFhLENBQUMsS0FBSyxDQUFDLG1CQUFtQixHQUFHLE1BQU0sQ0FBQztZQUNqRCxhQUFhLENBQUMsS0FBSyxDQUFDLHNCQUFzQixHQUFHLE1BQU0sQ0FBQztZQUNwRCxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUM7WUFDM0IsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsa0JBQWtCLENBQUM7WUFDOUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLGNBQWMsQ0FBQztZQUN4RCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2Y7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO0lBQ3pCLENBQUM7Q0FFRixDQUFBO0FBakRZLGVBQWU7SUFMM0IsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxZQUFZO1FBQ3RCLFdBQVcsRUFBRSx5QkFBeUI7UUFDdEMsU0FBUyxFQUFFLENBQUMseUJBQXlCLENBQUM7S0FDdkMsQ0FBQztHQUNXLGVBQWUsQ0FpRDNCO0FBakRZLDBDQUFlIn0=