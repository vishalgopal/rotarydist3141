import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(
    private storage: Storage,
    private router: Router ) { }
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
