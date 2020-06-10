import { Component, OnInit } from '@angular/core';
import { LoaderService } from './../../service/loader.service';

// Rest API
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment, SERVER_URL } from '../../../environments/environment';
import { Calendar } from '@ionic-native/calendar/ngx';

@Component({
  selector: 'app-my-club-events',
  templateUrl: './my-club-events.page.html',
  styleUrls: ['./my-club-events.page.scss'],
})
export class MyClubEventsPage implements OnInit {
  eventResponse: any;
  items: any;
  clubid: any;
  userid: any;
  serverURL = SERVER_URL;
  eventType: any;
  username: any;
  clubDesignation: any;
  responseData: any;
  constructor(
    private loader: LoaderService, private router: Router, private http: HttpClient, private storage: Storage, private calendar: Calendar) {
     }

  ngOnInit() {
      this.storage.get('clubDesignation').then((clbd) => {
        this.clubDesignation = clbd;
      });
      this.storage.get('username').then((clbd) => {
        this.username = clbd;
      });
      this.storage.get('eventType').then((eventtype) => {
        this.eventType = eventtype;
        this.storage.get('userid').then((usrid) => {
          this.userid = usrid;
          this.storage.get('clubid').then((clbid) => {
            this.clubid = clbid;
            this.eventGet();
          });
        });
      });
  }

  eventGet() {
    // this.loader.showLoader();
    this.http.get(SERVER_URL + '/api/eventbytypemyclub/' + this.eventType + '/' + this.clubid + "?userid=" + this.userid)
    .subscribe((response: any) => {
      this.items = response;
      // this.loader.hideLoader();
    });
  }
  openEventPage(eventId: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        eventid: eventId
      }
    };
    this.router.navigate(['/event-details'], navigationExtras);
  }
  respondEvent(userresponse: any, eventId: any) {
      this.eventResponse = userresponse;
      this.responseData = {
        attending: userresponse,
        name: this.username,
        id: this.userid
      };
      this.http.put(SERVER_URL + '/api/eventupdate/' + eventId,
      this.responseData)
      .subscribe((response: any) => {
        console.log('Updated!');
    });
  }
  
  addToCalendar(title,eventDate,description)
  {
    let date = new Date(eventDate);
    let options = {firstReminderMinutes: 15 };
 
    this.calendar.createEventInteractivelyWithOptions('My Club Event', title, description, date, date,options).then(res => {
      console.log
    }, err => {
      console.log('err: ', err);
    });

  }
}
