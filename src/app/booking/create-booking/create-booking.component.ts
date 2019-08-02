import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Place } from 'src/app/places/place.model';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: "app-create-booking",
  templateUrl: "./create-booking.component.html",
  styleUrls: ["./create-booking.component.scss"]
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;
  @Input() selectedMode: "select" | "Random";
  @ViewChild("f") form: NgForm;
  startDate: string;
  endDate: string;
  constructor(private modalCntrl: ModalController) {}

  ngOnInit() {
    const availableFrom = new Date(this.selectedPlace.availableFrom);
    const availableTo = new Date(this.selectedPlace.availableTo);
    if (this.selectedMode === "Random") {
      this.startDate = new Date(
        availableFrom.getTime() +
          Math.random() *
            (availableTo.getTime() -
              7 * 24 * 60 * 60 * 1000 -
              availableFrom.getTime())
      ).toISOString();
      this.endDate = new Date(
        new Date(this.startDate).getTime() +
          Math.random() *
            (new Date(this.startDate).getTime() +
              6 * 24 * 60 * 60 * 1000 -
              new Date(this.startDate).getTime())
      ).toISOString();
    }
  }
  onCancle() {
    this.modalCntrl.dismiss(null, "cancel");
  }
  onBookPlace() {
    console.log(this.form.value);
    // if (!this.form.valid || !this.dateValid) {
    //   return;
    // }
    this.modalCntrl.dismiss(
      {
        bookingData: {
          firstName: this.form.value["first-name"],
          lastName: this.form.value["last-name"],
          guestNumber: this.form.value["guest-number"],
          startDate: this.form.value["dateFrom"],
          endDate: this.form.value["dateTo"]
        }
      },
      "confirm"
    );
  }
  dateValid() {
    const startDate = new Date(this.form.value["dateFrom"]);
    const endDate = new Date(this.form.value["dateTo"]);
    return endDate > startDate;
  }
}
