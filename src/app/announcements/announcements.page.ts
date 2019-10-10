import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.page.html',
  styleUrls: ['./announcements.page.scss'],
})
export class AnnouncementsPage implements OnInit {

  constructor() { }
  public items = [
    {
      title: 'Digit 9.0',
      eventdate: 'July 8, 2:45 PM ',
      description: 'Click here to see offer'
    },
    {
      title: 'Aastha Medical',
      eventdate: ' July 7, 9:45 PM ',
      description: 'Click here to see offer'
    },
    {
      title: 'Fazlani Foods',
      eventdate: 'July 6, 9:00 PM',
      description: 'Click here to see offer'
    }
  ];
  ngOnInit() {
  }

}
