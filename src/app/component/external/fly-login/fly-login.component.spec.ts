import { TestBed, inject } from '@angular/core/testing';

import { FlyLoginComponent } from './fly-login.component';

describe('a fly-login component', () => {
	let component: FlyLoginComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				FlyLoginComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([FlyLoginComponent], (flyLoginComponent) => {
		component = FlyLoginComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});
