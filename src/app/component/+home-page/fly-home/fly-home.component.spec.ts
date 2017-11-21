import { TestBed, inject } from '@angular/core/testing';

import { FlyHomeComponent } from './fly-home.component';

describe('a fly-home component', () => {
	let component: FlyHomeComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				FlyHomeComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([FlyHomeComponent], (flyHomeComponent) => {
		component = flyHomeComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});
