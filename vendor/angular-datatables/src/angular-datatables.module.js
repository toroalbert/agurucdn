/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/l-lin/angular-datatables/master/LICENSE
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableDirective } from './angular-datatables.directive';
import * as i0 from "@angular/core";
var DataTablesModule = /** @class */ (function () {
    function DataTablesModule() {
    }
    DataTablesModule.forRoot = function () {
        return {
            ngModule: DataTablesModule
        };
    };
    DataTablesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.2", ngImport: i0, type: DataTablesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    DataTablesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.2", ngImport: i0, type: DataTablesModule, declarations: [DataTableDirective], imports: [CommonModule], exports: [DataTableDirective] });
    DataTablesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.2", ngImport: i0, type: DataTablesModule, imports: [CommonModule] });
    return DataTablesModule;
}());
export { DataTablesModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.2", ngImport: i0, type: DataTablesModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [DataTableDirective],
                    exports: [DataTableDirective]
                }]
        }] });
//# sourceMappingURL=angular-datatables.module.js.map