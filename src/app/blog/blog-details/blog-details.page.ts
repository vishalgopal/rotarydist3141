import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { LoaderService } from './../../service/loader.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment, SERVER_URL } from '../../../environments/environment';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.page.html',
  styleUrls: ['./blog-details.page.scss'],
})
export class BlogDetailsPage implements OnInit {
  articleId: any;
  userid: string;
  article: any;
  responseData: any;
  selectedItem: any;
  constructor(
      private route: ActivatedRoute,
      private storage: Storage,
      private router: Router,
      private loader: LoaderService,
      private http: HttpClient) {
      this.storage.get('userid');
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.articleId = this.router.getCurrentNavigation().extras.state.articleId;
        }
      });
   }

  ngOnInit() {
    this.storage.get('userid').then((usrid) => {
      this.userid = usrid;
      this.getArticle();
    });
  }
  getArticle() {
    this.http.get(SERVER_URL + '/api/getarticle/' + this.articleId + '?userid=' + this.userid)
    .subscribe((response: any) => {
      this.article = response[0];
  });
  }
  updatelike(event, status, article){
    this.responseData = {
      memberId: this.userid,
      status: status
    };
    this.http.put(SERVER_URL + '/api/updatelike/' + article._id,
    this.responseData)
    .subscribe((response: any) => {
      console.log('Updated!');
      this.selectedItem = article;  // don't forget to update the model here
      article.isLiked = !article.isLiked;
  });
}
}
