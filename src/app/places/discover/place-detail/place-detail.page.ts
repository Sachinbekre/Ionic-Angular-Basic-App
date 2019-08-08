import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  NavController,
  ModalController,
  ActionSheetController,
  LoadingController
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Place } from '../../place.model';
import { CreateBookingComponent } from '../../../booking/create-booking/create-booking.component';
import { BookingService } from '../../../booking/booking.service';
import { PlacesService } from '../../places.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss']
})
export class PlaceDetailPage implements OnInit, OnDestroy, AfterViewInit {
  public place: Place;
  isBookable = false;
  private placeSub: Subscription;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private placeService: PlacesService,
    private navCntrl: NavController,
    private modalCntrl: ModalController,
    private actionSheet: ActionSheetController,
    private bookingService: BookingService,
    private loadingCntrl: LoadingController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCntrl.navigateBack('/places/tabs/discover');
        return;
      }
      this.placeSub = this.placeService
        .getPlace(paramMap.get('placeId'))
        .subscribe(places => {
          this.place = places;
          console.log(this.place);
          this.isBookable = places.userId !== this.authService.userId;
          console.log('checking', this.isBookable);
        });
    });
    console.log('checking', this.isBookable);
  }
  ngAfterViewInit() {}
  ionViewWillEnter() {}
  onBookPlace() {
    // this.router.navigateByUrl('/places/tabs/discover');
    // this.navCntrl.navigateBack('/places/tabs/discover');
    this.actionSheet
      .create({
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
      })
      .then(actonEl => {
        actonEl.present();
      });
  }
  openBookingModel(mode: 'Select' | 'Random') {
    console.log(mode);
    this.modalCntrl
      .create({
        component: CreateBookingComponent,
        componentProps: {
          selectedPlace: this.place,
          selectedMode: mode
        }
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resultData => {
        if (resultData.role === 'confirm') {
          return this.loadingCntrl
            .create({
              message: 'Booking Place...'
            })
            .then(loadingEl => {
              loadingEl.present();
              const data = resultData.data.bookingData;
              this.bookingService
                .addBooking(
                  this.place.id,
                  this.place.title,
                  this.place.imgUrl,
                  data.firstName,
                  data.lastName,
                  data.guestNumber,
                  data.startDate,
                  data.endDate
                ).subscribe(() => {
                  loadingEl.dismiss();
                });
            });
        }
      });
  }
  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
}
