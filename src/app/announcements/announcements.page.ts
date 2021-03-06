import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment, SERVER_URL } from '../../environments/environment';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.page.html',
  styleUrls: ['./announcements.page.scss'],
})
export class AnnouncementsPage implements OnInit {

  items: any;
  userid;
  constructor(
    private route: ActivatedRoute,
    private storage: Storage,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.storage.get('userid').then((userid) => {
      this.userid = userid;
      this.getNotificaition();
    });
    
  }
  getNotificaition() {
    this.http.get(SERVER_URL + '/api/getannouncement/' + this.userid)
    .subscribe((response: any) => {
      this.items = response;
  });
  }
}
