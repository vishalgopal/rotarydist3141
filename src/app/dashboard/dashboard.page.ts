import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { environment, SERVER_URL } from '../../environments/environment';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  userid;
  notificationcnt;
  constructor(
    private storage: Storage,
    private router: Router,
    private http: HttpClient ) { }
  slides =
    [
      { name: 'Topic Seven', img: 'assets/images/home/event1.jpg', id: 5, details: 'Topic category' },
      { name: 'Topic Ten', img: 'assets/images/home/project1.jpg', id: 5, details: 'Topic category' },
      { name: 'Topic Eleven', img: 'assets/images/home/event1.jpg', id: 5, details: 'Topic category' }
    ];
    eventsOpts = {
      slidesPerView: 'auto',
      spaceBetween: 15,
      // autoplay: {
      //   delay: 3000,
      //   disableOnInteraction: false,
      // },
      speed: 600,
    };

    projectsOpts = {
      slidesPerView: 'auto',
      spaceBetween: 15,
      // autoplay: {
      //   delay: 3500,
      //   disableOnInteraction: false,
      // },
      speed: 600,
    };
  ngOnInit() {
    this.storage.get('userid').then((userid) => {
      this.userid = userid;
      this.getAnnounceCount();
    });
  }
  getAnnounceCount() {
    this.http.get(SERVER_URL + '/api/getannouncementcount/' + this.userid)
    .subscribe((response: any) => {
      this.notificationcnt = response;
  });
}
  openEvent(event){
    const navigationExtras: NavigationExtras = {
      state: {
        eventType: event,
      }
    };
    this.storage.set('eventType', event);
    this.router.navigate(['/events/my-club-events'], navigationExtras);
  }
}
