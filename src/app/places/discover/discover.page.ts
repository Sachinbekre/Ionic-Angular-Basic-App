import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { MenuController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlaces: Place[];
  placesSub: Subscription;
  relavantPlaces: Place[];
  listedLoadedPlaces: Place[];
  constructor(private placesService: PlacesService,
              private menuCntrl: MenuController,
              private authService: AuthService) { }

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe(places => {
      this.loadedPlaces = places;
      this.relavantPlaces = this.loadedPlaces;
    });
    console.log(this.relavantPlaces);
  }
  onOpenMenu() {
    this.menuCntrl.toggle();
  }
  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    if (event.detail.value === 'all') {
      this.relavantPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.relavantPlaces.slice(1);
    } else {
      this.relavantPlaces = this.loadedPlaces.filter(place => {
        place.userId !== this.authService.userId;
      });
      this.listedLoadedPlaces = this.relavantPlaces.slice(1);
    }
    console.log(event.detail);
  }
  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}
