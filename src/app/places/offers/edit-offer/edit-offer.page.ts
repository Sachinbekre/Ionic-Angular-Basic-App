import { Component, OnInit, OnDestroy } from "@angular/core";
import { Place } from "../../place.model";
import { ActivatedRoute, Router } from "@angular/router";
import { PlacesService } from "../../places.service";
import { NavController, LoadingController } from "@ionic/angular";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl
} from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-edit-offer",
  templateUrl: "./edit-offer.page.html",
  styleUrls: ["./edit-offer.page.scss"]
})
export class EditOfferPage implements OnInit, OnDestroy {
  place: Place;
  private placeSub: Subscription;
  form: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private placeService: PlacesService,
    private navCntrl: NavController,
    private loadingCntrl: LoadingController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has("placeId")) {
        this.navCntrl.navigateBack("/places/tabs/offers");
        return;
      }
      this.placeSub = this.placeService
        .getPlace(paramMap.get("placeId"))
        .subscribe(places => {
          this.place = places;
        });
      console.log(this.place);
    });
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required, Validators.maxLength(180)]
      })
    });
  }

  ionViewDidEnter() {}
  ionViewWillLeave() {}
  ionViewDidLeave() {}

  onEditOffer() {
    if (!this.form.valid) {
      return;
    }
    return this.loadingCntrl
      .create({ message: "Updating Places..." })
      .then(loadingEl => {
        loadingEl.present();
        this.placeService
          .onUpdatePlaces(
            this.place.id,
            this.form.value.title,
            this.form.value.description
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.form.reset();
            this.router.navigate(["/places/tabs/offers"]);
          });
      });
  }
  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
}
