import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment, SERVER_URL } from '../../environments/environment';

@Component({
  selector: 'app-rmb',
  templateUrl: './rmb.page.html',
  styleUrls: ['./rmb.page.scss'],
})
export class RmbPage implements OnInit {
  items: any;

  constructor(
    private route: ActivatedRoute,
    private storage: Storage,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getRMB();
  }
  getRMB() {
    this.http.get(SERVER_URL + '/api/getrmb/')
    .subscribe((response: any) => {
      this.items = response;
  });
  }
}
