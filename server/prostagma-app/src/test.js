"use strict";
// This file is required by karma.conf.js and loads recursively all the .spec and framework files
Object.defineProperty(exports, "__esModule", { value: true });
require("zone.js/dist/zone-testing");
const testing_1 = require("@angular/core/testing");
const testing_2 = require("@angular/platform-browser-dynamic/testing");
// First, initialize the Angular testing environment.
testing_1.getTestBed().initTestEnvironment(testing_2.BrowserDynamicTestingModule, testing_2.platformBrowserDynamicTesting());
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Byb3N0YWdtYS1hcHAvc3JjL3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGlHQUFpRzs7QUFFakcscUNBQW1DO0FBQ25DLG1EQUFtRDtBQUNuRCx1RUFHbUQ7QUFJbkQscURBQXFEO0FBQ3JELG9CQUFVLEVBQUUsQ0FBQyxtQkFBbUIsQ0FDOUIscUNBQTJCLEVBQzNCLHVDQUE2QixFQUFFLENBQ2hDLENBQUM7QUFDRiw4QkFBOEI7QUFDOUIsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBQzNELHdCQUF3QjtBQUN4QixPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDIn0=