import { Component, OnInit } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { ToastController} from '@ionic/angular';
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
  constructor(private transfer: FileTransfer,
    public toastController: ToastController, private file: File, private http: HttpClient) { }

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
      duration: 2000
    });
    toast.present();
  }

  public download(fileName, filePath) {
    let url = encodeURI(filePath);
    this.fileTransfer = this.transfer.create();
  
    this.fileTransfer.download(url, this.file.externalDataDirectory + fileName, true).then((entry) => {
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
