/// <reference types="datatables.net" />
/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/l-lin/angular-datatables/master/LICENSE
 */
import { ElementRef, OnDestroy, OnInit, Renderer2, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { ADTSettings } from './models/settings';
import * as i0 from "@angular/core";
export declare class DataTableDirective implements OnDestroy, OnInit {
    private el;
    private vcr;
    private renderer;
    /**
     * The DataTable option you pass to configure your table.
     */
    dtOptions: ADTSettings;
    /**
     * This trigger is used if one wants to trigger manually the DT rendering
     * Useful when rendering angular rendered DOM
     */
    dtTrigger: Subject<ADTSettings>;
    /**
     * The DataTable instance built by the jQuery library [DataTables](datatables.net).
     *
     * It's possible to execute the [DataTables APIs](https://datatables.net/reference/api/) with
     * this variable.
     */
    dtInstance: Promise<DataTables.Api>;
    private dt;
    constructor(el: ElementRef, vcr: ViewContainerRef, renderer: Renderer2);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private displayTable;
    private applyNgPipeTransform;
    private applyNgRefTemplate;
    private getColumnUniqueId;
    static ɵfac: i0.ɵɵFactoryDeclaration<DataTableDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DataTableDirective, "[datatable]", never, { "dtOptions": { "alias": "dtOptions"; "required": false; }; "dtTrigger": { "alias": "dtTrigger"; "required": false; }; }, {}, never, never, false, never>;
}
