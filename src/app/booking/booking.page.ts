import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingService } from './booking.service';
import { Booking } from './booking.model';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss']
})
export class BookingPage implements OnInit, OnDestroy {
  loadedBookings: Booking[];
  private bookingSub: Subscription;
  constructor(private bookingService: BookingService,
              private loadingCntrl: LoadingController) {}

  ngOnInit() {
    this.bookingSub = this.bookingService.bookings.subscribe(booking => {
      this.loadedBookings = booking;
    });
    console.log('Loading Booking Page', this.loadedBookings);
  }
  onCancelBooking(bookingId: string, slideEl: IonItemSliding) {
    slideEl.close();
    this.loadingCntrl.create({ message: 'Cancelling'}).then(loadingEl => {
      loadingEl.present();
      this.bookingService.cancelBooking(bookingId).subscribe(() => {
        loadingEl.dismiss();
      });
    });
  }
  ngOnDestroy() {
    if (this.bookingSub) {
      this.bookingSub.unsubscribe();
    }
  }
}
