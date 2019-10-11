import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { LoaderService } from './../../service/loader.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment, SERVER_URL } from '../../../environments/environment';
@Component({
  selector: 'app-rmb-details',
  templateUrl: './rmb-details.page.html',
  styleUrls: ['./rmb-details.page.scss'],
})
export class RmbDetailsPage implements OnInit {
  rmbId;
  rmbDetails: [];
  constructor(
    private route: ActivatedRoute,
    private storage: Storage,
    private router: Router,
    private loader: LoaderService,
    private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.rmbId = this.router.getCurrentNavigation().extras.state.id;
      }
    });
 }

  ngOnInit() {
  }
  getArticle() {
    this.http.get(SERVER_URL + '/api/getrmb/' + this.rmbId)
    .subscribe((response: any) => {
      this.rmbDetails = response;
  });
  }
}
