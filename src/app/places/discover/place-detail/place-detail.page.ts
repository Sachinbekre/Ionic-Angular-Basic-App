import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { CreateBookingComponent } from 'src/app/booking/create-booking/create-booking.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  place: Place;
  private placeSub: Subscription;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private placeService: PlacesService,
              private navCntrl: NavController,
              private modalCntrl: ModalController,
              private actionSheet: ActionSheetController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCntrl.navigateBack('/places/tabs/discover');
        return;
      }
      this.placeSub = this.placeService.getPlace(paramMap.get('placeId')).subscribe(places => {
        this.place = places;
      });
    });
    console.log('Places', this.place);
  }
  onBookPlace() {
    // this.router.navigateByUrl('/places/tabs/discover');
    // this.navCntrl.navigateBack('/places/tabs/discover');
    this.actionSheet.create({
      header: 'Choose an Action',
      buttons: [
        {
          text: 'Select Date',
          handler: () => {
            this.openBookingModel('Select');
          }
        },
        {
          text: 'Random Date',
          handler: () => {
            this.openBookingModel('Random');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).then(actonEl => {
      actonEl.present();
    });
  }
  openBookingModel(mode: 'Select' | 'Random'){
    console.log(mode);
    this.modalCntrl
    .create({ component: CreateBookingComponent,
              componentProps: {
                selectedPlace: this.place, selectedMode: mode
              }})
    .then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    })
    .then(resultData => {
      console.log(resultData.data, resultData.role);
      if (resultData.role === 'confirm') {
        console.log('Booked!');
      }
    });
  }
  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
}
