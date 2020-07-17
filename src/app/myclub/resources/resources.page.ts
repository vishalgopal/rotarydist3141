import { Component, OnInit } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { ToastController,Platform} from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment, SERVER_URL } from '../../../environments/environment';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.page.html',
  styleUrls: ['./resources.page.scss'],
})
export class ResourcesPage implements OnInit {

  public resources : any;
  private fileTransfer: FileTransferObject;
  public storageDirectory:any;

  constructor(private transfer: FileTransfer,
    public toastController: ToastController, private file: File,public platform: Platform, private http: HttpClient) { 
      this.platform.ready().then(() => {
        // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
        if(!this.platform.is('cordova')) {
          return false;
        }
  
        if (this.platform.is('ios')) {
          this.storageDirectory = this.file.documentsDirectory;
        }
        else if(this.platform.is('android')) {
          this.storageDirectory = this.file.dataDirectory;
        }
        else {
          // exit otherwise, but you could add further types here e.g. Windows
          return false;
        }
      });
    }

  ngOnInit() {
  }
  ionViewWillEnter()
  {
    this.getresources();
  }
  getresources() {
      this.http.get(SERVER_URL + '/api/getresources/')
      .subscribe((response: any) => {
        this.resources = response;
        console.log(response)
    });
  }
  async presentToast(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000
    });
    toast.present();
  }

  public download(fileName, filePath) {
    let url = encodeURI(filePath);
    this.fileTransfer = this.transfer.create();
  
    this.fileTransfer.download(url, this.storageDirectory + fileName, true).then((entry) => {
      //here logging our success downloaded file path in mobile. 
      console.log('download completed: ' + entry.toURL());
      this.presentToast('download completed: ' + entry.toURL());
      
    }).catch((error) => {
      //here logging an error. 
      console.log('download failed: ' + JSON.stringify(error));
      this.presentToast('download failed: ' + JSON.stringify(error));
    });
  }
}
