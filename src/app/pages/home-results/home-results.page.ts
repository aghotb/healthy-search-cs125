import { Component } from '@angular/core';
import { Storage } from '@ionic/storage'

import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController } from '@ionic/angular';

// Modals
import { SearchFilterPage } from '../../pages/modal/search-filter/search-filter.page';
import { ImagePage } from './../modal/image/image.page';
// Call notifications test by Popover and Custom Component.
import { NotificationsComponent } from './../../components/notifications/notifications.component';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';
import { Condition } from 'selenium-webdriver';

@Component({
  selector: 'app-home-results',
  templateUrl: './home-results.page.html',
  styleUrls: ['./home-results.page.scss']
})
export class HomeResultsPage {
  searchKey = '';
  yourLocation = '123 Test Street';
  themeCover = 'assets/img/ionic4-Start-Theme-cover.jpg';
  results = [];
  radius = 1;
  organizeby = '';
  minmaxprice = {lower: 0, upper: 10};
  dishtype = '';
  dishnationality = '';
  condition = [];
  preferred_eating_time = 'none';
  zipcode = '55555';
  

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private storage: Storage
  ) {
    storage.get('condition').then((p) => {
      this.condition = p;
    })
    storage.get('preferred_eating_time').then((p) => {
      this.preferred_eating_time = p;
    })
  }

 

  ionViewWillEnter() {
    this.menuCtrl.enable(true);

  }

  settings() {
    this.navCtrl.navigateForward('settings');
  }

  async search() {
    this.results = []

    this.storage.get('condition').then((p) => {
      this.condition = p;
    })
    this.storage.get('preferred_eating_time').then((p) => {
      this.preferred_eating_time = p;
    })

    this.storage.get("zipcode").then((p) => {
      this.zipcode = p;
    })

    this.results.push(
      {
        name: "Maria's Mexican Restaurant & Bakery",
        address: "6055 E Lake Mead Blvd",
        city: "Las Vegas",
        state: "NV",
        stars: 5,
        price_range: 1
      }
    )
    this.results.push(
      {
        name: "La Creperie",
        address: "3655 Las Vegas Blvd S",
        city: "Las Vegas",
        state: "NV",
        stars: 4,
        price_range: 2
      }
    )
    this.results.push(
      {
        name: "Pita Pit",
        address: "1263 Silverado Ranch Blvd",
        city: "Las Vegas",
        state: "NV",
        stars: 4,
        price_range: 1
      }
    )
    this.results.push(
      {
        name: "Empress Court",
        address: "3570 Las Vegas Blvd S",
        city: "Las Vegas",
        state: "NV",
        stars: 4,
        price_range: 3
      }
    )
    this.results.push(
      {
        name: "Maria's Mexican Restaurant & Bakery",
        address: "6055 E Lake Mead Blvd",
        city: "Las Vegas",
        state: "NV",
        stars: 4,
        price_range: 1
      }
    )
    this.results.push(
      {
        name: "Chipotle Mexican Grill",
        address: "3475 Las Vegas Blvd S",
        city: "Las Vegas",
        state: "NV",
        stars: 4,
        price_range: 1
      }
    )
  }

  async alertLocation() {
    const changeLocation = await this.alertCtrl.create({
      header: 'Change Location',
      message: 'Type your Address.',
      inputs: [
        {
          name: 'location',
          placeholder: 'Enter your new Location',
          type: 'text'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Change',
          handler: async (data) => {
            console.log('Change clicked', data);
            this.yourLocation = data.location;
            const toast = await this.toastCtrl.create({
              message: 'Location was change successfully',
              duration: 3000,
              position: 'top',
              closeButtonText: 'OK',
              showCloseButton: true
            });

            toast.present();
          }
        }
      ]
    });
    changeLocation.present();
  }

  async searchFilter () {
    const modal = await this.modalCtrl.create({
      component: SearchFilterPage
    });

    modal.onDidDismiss()
    .then((data) => {
      const obj = data['data'];
      this.radius = obj.radius;
      this.minmaxprice = obj.minmaxprice;
      this.organizeby = obj.organizeby;
      this.dishtype = obj.dishtype;
      this.dishnationality = obj.dishnationality;
    });

    return await modal.present();
  }

  async presentImage(image: any) {
    const modal = await this.modalCtrl.create({
      component: ImagePage,
      componentProps: { value: image }
    });
    return await modal.present();
  }

  async notifications(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: NotificationsComponent,
      event: ev,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }

}
