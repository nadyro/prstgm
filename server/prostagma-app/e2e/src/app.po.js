"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
class AppPage {
    navigateTo() {
        return protractor_1.browser.get(protractor_1.browser.baseUrl);
    }
    getTitleText() {
        return protractor_1.element(protractor_1.by.css('app-root h1')).getText();
    }
}
exports.AppPage = AppPage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnBvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvc3RhZ21hLWFwcC9lMmUvc3JjL2FwcC5wby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUFrRDtBQUVsRCxNQUFhLE9BQU87SUFDbEIsVUFBVTtRQUNSLE9BQU8sb0JBQU8sQ0FBQyxHQUFHLENBQUMsb0JBQU8sQ0FBQyxPQUFPLENBQWlCLENBQUM7SUFDdEQsQ0FBQztJQUVELFlBQVk7UUFDVixPQUFPLG9CQUFPLENBQUMsZUFBRSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBcUIsQ0FBQztJQUNyRSxDQUFDO0NBQ0Y7QUFSRCwwQkFRQyJ9