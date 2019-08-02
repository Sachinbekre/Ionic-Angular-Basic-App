import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss']
})
export class OffersPage implements OnInit, OnDestroy {
  loadedOffers: Place[];
  private placesSub: Subscription;

  constructor(private placeService: PlacesService, private router: Router) {}

  ngOnInit() {
      this.placesSub = this.placeService.places.subscribe(places => {
        this.loadedOffers = places;
      });
  }
  onEditingBook(bookId, slider) {
    this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', bookId]);
  }
  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}
