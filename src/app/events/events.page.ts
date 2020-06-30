import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  eventType: any;
  userrole: any;

  constructor(private storage: Storage) { }

  ngOnInit() {
    this.storage.get('eventType').then((eventtype) => {
      this.eventType = eventtype;
    });
    this.storage.get('role').then((role) => {
      this.userrole = role;
    });
  }

}
