import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthorizationService } from '../../../service/core/authorization';


import { Login } from '../../viewModel/login.model';
@Component({
	selector: 'fly-login',
	templateUrl: 'fly-login.component.html',
	styleUrls: ['./fly-login.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class FlyLoginComponent implements OnInit, AfterViewInit {
	loginModel: Login = {
		name: '',
		password: ''
	};
	form: FormGroup;
	password: String = '';
	imgUrl: String = 'https://cn.bing.com//az/hprichbg/rb/PupsPlayGalapagos_ZH-CN8090325795_1920x1080.jpg';
	// https://cn.bing.com/HPImageArchive.aspx?format=js&n=1
	bgimg: Object = {
		'background-image': `url(${this.imgUrl})`,
		'background-size': 'cover'
	};
	constructor(private fb: FormBuilder) {
		this.form = this.fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.required]
		});
	}

	ngOnInit() { }

	ngAfterViewInit() {
		// this.form.email.value


	}
	login() {
		// 表单验证不通过 直接返回
		if (this.form.invalid) {
			return;
		}
		console.log(this.form.value);
		// this.authorizationService.login(this.loginModel).subscribe(

		// );


	}


}
