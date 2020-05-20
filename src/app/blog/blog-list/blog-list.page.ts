import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { LoaderService } from './../../service/loader.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment, SERVER_URL } from '../../../environments/environment';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.page.html',
  styleUrls: ['./blog-list.page.scss'],
})
export class BlogListPage implements OnInit {

  catId: any;
  catItems: any = [{
      _id: '',
      articles: [],
      }];
  serverURL = SERVER_URL;
  userid: any;
  responseData: { memberId: any; reqtype: any; };
  constructor(
      private route: ActivatedRoute,
      private storage: Storage,
      private router: Router,
      private loader: LoaderService,
      private http: HttpClient) {
      this.storage.get('userid');
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.catId = this.router.getCurrentNavigation().extras.state.catId;
        }
      });
  }
  ngOnInit() {
    this.storage.get('userid').then((usrid) => {
      this.userid = usrid;
      this.catGet(this.catId);
    });
  }
  catGet(catId: any) {
    // this.loader.showLoader();
    this.http.get(SERVER_URL + '/api/categories/' + catId + "?userid=" + this.userid).subscribe((response: any) => {
    this.catItems = response[0];
    // this.loader.hideLoader();
    });
  }
  openArticlePage(articleId) {
    const navigationExtras: NavigationExtras = {
      state: {
        articleId: articleId
      }
    };
    this.router.navigate(['/blog-details'], navigationExtras);
  }

}
