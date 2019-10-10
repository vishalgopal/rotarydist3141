import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newsletters',
  templateUrl: './newsletters.page.html',
  styleUrls: ['./newsletters.page.scss'],
})
export class NewslettersPage implements OnInit {

  constructor() { }
  public items = [
    {
      title: 'Newsletter 3',
      eventdate: 'July 8, 2:45 PM ',
      description: 'Lorem ipsum dolor sita met dsjdh djsd jsdb dskjfb dfbdjfs sdkf'
    },
    {
      title: 'Newsletter 2',
      eventdate: ' July 7, 9:45 PM ',
      description: 'Lorem ipsum dolor sita met dsjdh djsd jsdb dskjfb dfbdjfs sdkf'
    },
    {
      title: 'Newsletter 1',
      eventdate: 'July 6, 9:00 PM',
      description: 'Lorem ipsum dolor sita met dsjdh djsd jsdb dskjfb dfbdjfs sdkf'
    }
  ];
  ngOnInit() {
  }

}
