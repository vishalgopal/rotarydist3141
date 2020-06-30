import { Component, OnInit } from '@angular/core';
// Rest API
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { SERVER_URL } from '../../environments/environment';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-privacy-settings',
  templateUrl: './privacy-settings.page.html',
  styleUrls: ['./privacy-settings.page.scss'],
})
export class PrivacySettingsPage implements OnInit {

  public userid : any;
  public personalData: any;
  public items : any; 
  public privacyform: FormGroup;

  constructor(private _FB: FormBuilder, private router: Router, private http: HttpClient, private storage: Storage,
    public toastController: ToastController) { }

    ngOnInit() {
      this.storage.get('userid').then((usrid) => {
        console.log("usrid : "+usrid );
        this.userid = usrid;
      });

          this.privacyform = this._FB.group({
            personal: [true],
            business: [true],
            family: [true]
      });

      this.http.get(SERVER_URL + '/api/getuser/' + this.userid)
    .subscribe((response: any) => {
      this.items = response[0];
      this.personalData = JSON.stringify(this.items);

      this.privacyform.patchValue(this.items);
      console.log("test "+this.personalData );
    });
    }

setPrivacy()
{
  console.log(this.privacyform.value);
  this.http.put(SERVER_URL + '/api/updateuserprivacy/' + this.userid,this.privacyform.value)
  .subscribe((response: any) => {
    console.log("test "+response );
  });
}
}
