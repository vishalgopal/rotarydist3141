import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { LoaderService } from './../../service/loader.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment, SERVER_URL } from '../../../environments/environment';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {

  eventid: any;
  event: any;
  serverURL = SERVER_URL;
  userid: any;
  eventResponse: any;
  responseData: { attending: any; name: any; id: any; };
  username: any;
  constructor(
      private route: ActivatedRoute,
      private storage: Storage,
      private router: Router,
      private loader: LoaderService,
      private http: HttpClient) {
      this.storage.get('userid');
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.eventid = this.router.getCurrentNavigation().extras.state.eventid;
        }
      });
  }

  ngOnInit() {
    this.storage.get('username').then((usrname) => {
      this.username = usrname;
    });
    this.storage.get('userid').then((usrid) => {
      this.userid = usrid;
      this.eventGet(this.eventid);
    });
  }
  eventGet(eventId: any) {
    // this.loader.showLoader();
    this.http.get(SERVER_URL + '/api/event/' + eventId + "?userid=" + this.userid).subscribe((response: any) => {
    this.event = response[0];
    // this.loader.hideLoader();
    });
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
}
