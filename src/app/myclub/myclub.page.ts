import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-myclub',
  templateUrl: './myclub.page.html',
  styleUrls: ['./myclub.page.scss'],
})
export class MyclubPage implements OnInit {

  constructor(private storage: Storage, private router: Router ) { }

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
