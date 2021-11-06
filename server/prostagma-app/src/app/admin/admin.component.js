"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let AdminComponent = class AdminComponent {
    constructor(adminService) {
        this.adminService = adminService;
        this.games$ = new rxjs_1.Observable();
        this.categories$ = new rxjs_1.Observable();
        this.message = 'Ceci est un test';
        this.loading = false;
        this.cat = 'categoryName';
        this.gamesInput = new core_1.EventEmitter();
        this.groupByFn = (item) => item[this.cat];
        this.groupValueFn = (_, children) => this.groupValue(_, children);
    }
    // addGame(addGameButton) {
    //   console.log(addGameButton);
    //   this.adminService.addGame(addGameButton.searchTerm).subscribe(res => {
    //     if (res['status'] === 2 02) {
    //       this.message = res['message' ];
    //     } else if (res['status'] === 200) {
    //       this.message = res['message'];
    //       this.searchGames();
    //     }
    //   });
    // }
    openSelect(select) {
        select.open();
    }
    searchGames() {
        this.games$ = this.adminService.searchGamesInDb().pipe(operators_1.map(games => {
            return games;
        }));
    }
    groupValue(content, arrayValue) {
        return ({ categoryName: content, total: arrayValue.length });
    }
    onSubmit() {
        this.loading = true;
        // TODO Add a feature to display added games and already existing ones in the view.
        this.adminService.addGame(this.formGroup).subscribe(() => {
            this.searchGames();
            this.loading = false;
        });
    }
    // compareElementsFn(item, selection) {
    //   if (selection._id && item._id) {
    //     return selection._id === item._id;
    //   }
    //   if (selection.title && item.title) {
    //     return selection.title === item.title;
    //   }
    //   return false;
    // }
    // compareElements = (item, selection) => this.compareElementsFn(item, selection);
    customSearchFn(term, item) {
        console.log(item);
        console.log(term);
        term = term.toLowerCase();
        return item.title.toLowerCase().indexOf(term) > -1 || item.categoryName.toLowerCase() === term;
    }
    ngOnInit() {
        this.games$ = this.adminService.searchGamesInDb().pipe(operators_1.map(games => {
            console.log(games);
            return games;
        }));
        this.categories$ = this.adminService.getCategories().pipe(operators_1.map(categories => categories));
        //
        // this.adminService.getCategories().subscribe((res) => {
        //   this.gameCategories = res['categories'];
        // });
        this.formGroup = new forms_1.FormGroup({
            selection: new forms_1.FormControl('', forms_1.Validators.required),
            categorySelection: new forms_1.FormControl('', forms_1.Validators.required)
        });
        // console.log(this.formGroup.get('gameSelection'));
    }
};
AdminComponent = __decorate([
    core_1.Component({
        selector: 'app-admin',
        templateUrl: './admin.component.html',
        styleUrls: ['./admin.component.scss'],
    })
], AdminComponent);
exports.AdminComponent = AdminComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvc3RhZ21hLWFwcC9zcmMvYXBwL2FkbWluL2FkbWluLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUE4RDtBQUM5RCwwQ0FBa0U7QUFFbEUsK0JBQWdDO0FBQ2hDLDhDQUFtQztBQVVuQyxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0lBRXpCLFlBQW1CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBSXRDLFdBQU0sR0FBd0IsSUFBSSxpQkFBVSxFQUFXLENBQUM7UUFDeEQsZ0JBQVcsR0FBNkIsSUFBSSxpQkFBVSxFQUFnQixDQUFDO1FBQzlFLFlBQU8sR0FBRyxrQkFBa0IsQ0FBQztRQUU3QixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLFFBQUcsR0FBRyxjQUFjLENBQUM7UUFDckIsZUFBVSxHQUFHLElBQUksbUJBQVksRUFBVSxDQUFDO1FBMkJ4QyxjQUFTLEdBQUcsQ0FBQyxJQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUMsaUJBQVksR0FBRyxDQUFDLENBQVMsRUFBRSxRQUFlLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBcEM1RSxDQUFDO0lBVUQsMkJBQTJCO0lBQzNCLGdDQUFnQztJQUNoQywyRUFBMkU7SUFDM0Usb0NBQW9DO0lBQ3BDLHdDQUF3QztJQUN4QywwQ0FBMEM7SUFDMUMsdUNBQXVDO0lBQ3ZDLDRCQUE0QjtJQUM1QixRQUFRO0lBQ1IsUUFBUTtJQUNSLElBQUk7SUFFSixVQUFVLENBQUMsTUFBeUI7UUFDbEMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFDRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLE1BQU0s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