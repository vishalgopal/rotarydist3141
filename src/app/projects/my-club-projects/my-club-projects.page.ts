import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-club-projects',
  templateUrl: './my-club-projects.page.html',
  styleUrls: ['./my-club-projects.page.scss'],
})
export class MyClubProjectsPage implements OnInit {

  constructor() { }
  public items = [
    { title: 'Andrew Straus', eventdate: 'July 8, 2:45 PM ', img: 'assets/images/Pictures/faces-images/face_image4.png', description: 'Lorem ipsum dolor sita met dsjdh djsd jsdb dskjfb dfbdjfs sdkf' },
    { title: 'Mark Henry', eventdate: ' July 7, 9:45 PM ', img: 'assets/images/Pictures/faces-images/face_image5.png', description: 'Lorem ipsum dolor sita met dsjdh djsd jsdb dskjfb dfbdjfs sdkf' },
    { title: 'Tom Jack', eventdate: 'July 6, 9:00 PM', img: 'assets/images/Pictures/faces-images/face_image6.png', description: 'Lorem ipsum dolor sita met dsjdh djsd jsdb dskjfb dfbdjfs sdkf' },
    { title: 'Williamson Steward', eventdate: ' July 6, 12:45 PM ', img: 'assets/images/Pictures/faces-images/face_image1.png', description: 'Lorem ipsum dolor sita met dsjdh djsd jsdb dskjfb dfbdjfs sdkf' },
    { title: 'Jaon Broad', eventdate: ' July 5, 6:45 AM ', img: 'assets/images/Pictures/faces-images/face_image2.png', description: 'Lorem ipsum dolor sita met dsjdh djsd jsdb dskjfb dfbdjfs sdkf' },
    { title: 'Jack William', eventdate: 'June 29, 11:05 PM ', img: 'assets/images/Pictures/faces-images/face_image1.png', description: 'Lorem ipsum dolor sita met dsjdh djsd jsdb dskjfb dfbdjfs sdkf' },
    { title: 'Christian James', eventdate: ' June 29, 8:55 PM ', img: 'assets/images/Pictures/faces-images/face_image2.png', description: 'Lorem ipsum dolor sita met dsjdh djsd jsdb dskjfb dfbdjfs sdkf' },
    { title: 'Maria Jeans', eventdate: 'June 25, 2:15 AM ', img: 'assets/images/Pictures/faces-images/face_image3.png', description: 'Lorem ipsum dolor sita met dsjdh djsd jsdb dskjfb dfbdjfs sdkf' },
    { title: 'Andrew Straus', eventdate: ' June 23, 7:36 AM ', img: 'assets/images/Pictures/faces-images/face_image4.png', description: 'Lorem ipsum dolor sita met dsjdh djsd jsdb dskjfb dfbdjfs sdkf' },
    { title: 'Mark Henry', eventdate: 'June 22, 4:05 PM ', img: 'assets/images/Pictures/faces-images/face_image5.png', description: 'Lorem ipsum dolor sita met dsjdh djsd jsdb dskjfb dfbdjfs sdkf' },
    { title: 'Tom Jack', eventdate: 'June 20, 3:45 PM ', img: 'assets/images/Pictures/faces-images/face_image6.png', description: 'Lorem ipsum dolor sita met dsjdh djsd jsdb dskjfb dfbdjfs sdkf' },
    { title: 'Williamson Steward', eventdate: 'June 29, 7:45 AM ', img: 'assets/images/Pictures/faces-images/face_image1.png', description: 'Lorem ipsum dolor sita met dsjdh djsd jsdb dskjfb dfbdjfs sdkf' },
    { title: 'Jack William', eventdate: 'July 16, 1:45 PM', img: 'assets/images/Pictures/faces-images/face_image1.png', description: 'Lorem ipsum dolor sita met dsjdh djsd jsdb dskjfb dfbdjfs sdkf' },
    { title: 'Christian James', eventdate: 'July 12, 3:45 PM ', img: 'assets/images/Pictures/faces-images/face_image2.png', description: 'Lorem ipsum dolor sita met dsjdh djsd jsdb dskjfb dfbdjfs sdkf' },
    { title: 'Maria Jeans', eventdate: 'July 10, 1:45 AM', img: 'assets/images/Pictures/faces-images/face_image3.png', description: 'Lorem ipsum dolor sita met dsjdh djsd jsdb dskjfb dfbdjfs sdkf' },
      { title: 'Jaon Broad', eventdate: 'June 18, 6:45 PM ', img: 'assets/images/Pictures/faces-images/face_image2.png', description: 'Lorem ipsum dolor sita met dsjdh djsd jsdb dskjfb dfbdjfs sdkf' }
];
  ngOnInit() {
  }

}
