import { Component, OnInit } from '@angular/core';
import { BookingService } from './booking.service';
import { Booking } from './booking.model';
import { IonItemSliding } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {
  loadedBookings: Booking[];
  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    console.log("booking page");
    this.loadedBookings = this.bookingService.bookings;
  }
  onCancelBooking(offerId: string, slideEl: IonItemSliding) {
    slideEl.close();
  }

}
