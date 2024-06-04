import { Component, forwardRef, Input, ViewChild } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from "@angular/forms";
import { Calendar } from "primeng/calendar";
//import * as moment from "moment/moment";
import { DateTime } from "luxon";
import { InputBaseComponent } from "../input-base/input-base.component";

@Component({
    selector: "lens-input-date", 
    templateUrl: "input-date.component.html",
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputDateComponent), multi: true },
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => InputDateComponent), multi: true }
    ]
})
export class InputDateComponent extends InputBaseComponent {
    @Input() public id!: string;
    @Input() public placeholder?: string;

    private _mode: "time" | "date" | "datetime" = "date";
    @Input() public set mode(value: "time" | "date" | "datetime") {
        this.showButtonBar = value === "date" || value === "datetime";
        this.showTime = value === "datetime" || value === "time";
        this.timeOnly = value === "time";
        this._mode = value;
    }

    public get mode(): "time" | "date" | "datetime" {
        return this._mode;
    }

	public get dateFormat(): string {
		let format = "YYYY/M/D";
        switch (this.mode) {
            case "time":
                format = "H:mm";
                break;
            case "datetime":
                format = "YYYY/M/D H:mm";
                break;
        }

		return format;
	}

    public showButtonBar = false;
    public showTime = false;
    public timeOnly = false;

    @ViewChild("date", { read: Calendar, static: true }) private date!: Calendar;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    override validate(control: AbstractControl<any, any>): ValidationErrors | null {
        if (!this.required && !control.value) {
            return null;
        }

        const format = this.dateFormat;

        //const date = moment(control.value, format, true); // TODO: localization!
        //if (!date.isValid()) {
        //    return { invalidDate: "Invalid date entered" };
        //}
		//See: https://moment.github.io/luxon/#/parsing?id=fromformat

		if (typeof(control.value) !== 'string') {
			return null;
		}

		const date = DateTime.fromFormat(control.value, format);

		if (!date.isValid) {
			return { invalidDate : "Invalid date entered, reason: " + date.invalidReason };
		}

        return null;
    }
}