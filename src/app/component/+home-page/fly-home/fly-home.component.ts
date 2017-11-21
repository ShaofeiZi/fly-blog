import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
@Component({
  selector: 'fly-home',
  templateUrl: 'fly-home.component.html'
})

export class FlyHomeComponent implements OnInit {
  courses$: any;
  checked: boolean;
  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    console.error(moment.duration(1, 'minutes').humanize());
  }
  aaaa() {
    this.http.get('https://api-identity-stage.guanplus.com/api/v1/account/token').subscribe(
      l => {
        this.courses$ = l;
      }
    );
  }


}
