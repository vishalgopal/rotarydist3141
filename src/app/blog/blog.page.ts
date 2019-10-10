import { Component, OnInit } from '@angular/core';
import { LoaderService } from './../service/loader.service';

// Rest API
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment, SERVER_URL } from '../../environments/environment';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.page.html',
  styleUrls: ['./blog.page.scss'],
})
export class BlogPage implements OnInit {
  items: any;
  userid: string;
  status: any;
  serverURL = SERVER_URL;
  responseData: any;
  selectedItem: any;
  constructor(private loader: LoaderService, private router: Router, private http: HttpClient, private storage: Storage) { }
  slides =
    [
      { name: 'Topic Seven', img: 'assets/images/fashion/fashion7.jpg', id: 5, details: 'Topic category' },
      { name: 'Topic Ten', img: 'assets/images/fashion/fashion10.jpg', id: 5, details: 'Topic category' },
      { name: 'Topic Eleven', img: 'assets/images/fashion/fashion11.jpg', id: 5, details: 'Topic category' }
    ];
  ngOnInit() {
    this.storage.get('userid').then((usrid) => {
      this.userid = usrid;
      this.eventGet();
    });
  }
  eventGet() {
    // this.loader.showLoader();
    this.http.get(SERVER_URL + '/api/categorieslikes' + '?userid=' + this.userid)
    .subscribe((response: any) => {
      this.items = response;
      // this.loader.hideLoader();
    });
  }
  listClick(event, newValue) {
    console.log(newValue);
    this.selectedItem = newValue;  // don't forget to update the model here
    newValue.isfollowing = !newValue.isfollowing;
    // ... do other stuff here ...
  }
  openBlogList(catId: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        catId: catId
      }
    };
    this.router.navigate(['/blog-list'], navigationExtras);
  }
  toggle(){
    this.status = !this.status;
  }
  updatefollow(event, followStr, catId){
      this.responseData = {
        memberId: this.userid,
        reqtype: followStr
      };
      this.http.put(SERVER_URL + '/api/updatefollow/' + catId._id,
      this.responseData)
      .subscribe((response: any) => {
        console.log('Updated!');
        this.selectedItem = catId;  // don't forget to update the model here
        catId.isfollowing = !catId.isfollowing;
    });
  }
}
