import React from "react";
// Import field components
import {
	NameElement,
	PasswordElement,
	EmailElement,
	TextareaElement,
	AddressElement,
	PhoneElement,
	DateElement,
	TimeElement,
	WebsiteElement,
	FileElement,
	CheckboxElement,
	RadioElement,
	DropdownElement,
	RatingElement,
	SubmitElement,
	CurrencyElement,
	NumberElement,
	CancelElement,
	HeaderElement,
} from "./elements";

function AddFields() {
	return (
		<div className="row no-gutters">
			<div className="col-xl-6">
				<NameElement type="field" />
			</div>
			<div className="col-xl-6">
				<EmailElement type="field" />
			</div>
			<div className="col-xl-6">
				<PasswordElement type="field" />
			</div>
			<div className="col-xl-6">
				<HeaderElement type="field" />
			</div>
			<div className="col-xl-6">
				<TextareaElement type="field" />
			</div>
			<div className="col-xl-6">
				<PhoneElement type="field" />
			</div>
			<div className="col-xl-6">
				<DateElement type="field" />
			</div>
			<div className="col-xl-6">
				<TimeElement type="field" />
			</div>
			<div className="col-xl-6">
				<NumberElement type="field" />
			</div>
			<div className="col-xl-6">
				<WebsiteElement type="field" />
			</div>
			<div className="col-xl-6">
				<FileElement type="field" />
			</div>
			<div className="col-xl-6">
				<CheckboxElement type="field" />
			</div>
			<div className="col-xl-6">
				<RadioElement type="field" />
			</div>
			{/* <div className="col-xl-6">
				<DropdownElement type="field" />
			</div> */}
			<div className="col-xl-6">
				<RatingElement type="field" />
			</div>
			<div className="col-xl-6">
				<SubmitElement type="field" />
			</div>
			<div className="col-xl-6">
				<CancelElement type="field" />
			</div>
			<div className="col-xl-6">
				<AddressElement type="field" />
			</div>
			<div className="col-xl-6">
				<CurrencyElement type="field" />
			</div>
		</div>
	);
}

export default AddFields;
