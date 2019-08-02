import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';

import { Place } from './place.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  // tslint:disable-next-line: variable-name
  private _places = new BehaviorSubject<Place[]>([
    new Place(
      'p1',
      'Manhattan Mansion',
      'In the heart of New York City.',
      '../../assets/images/paris.jpg',
      149.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    ),
    new Place(
      'p2',
      'Amour Toujours',
      'A romantic place in Paris!',
      '../../assets/images/parisNight.jpg',
      189.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    ),
    new Place(
      'p3',
      'The Foggy Palace',
      'Not your average city trip!',
      '../../assets/images/san.jpg',
      99.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    )
  ]);

  constructor(private authService: AuthService) {
  }
  get places() {
    return this._places.asObservable();
  }
  getPlace(id: string) {
    return this.places.pipe(
      take(1),
      map(places => {
        return { ...places.find(p => p.id === id) };
      })
    );
  }
  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dataeTo: Date
  ) {
    const newPlace = new Place(
      Math.random.toString(),
      title,
      description,
      'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
      price,
      dateFrom,
      dataeTo,
      this.authService.userId
    );
    return this.places.pipe(
      take(1),
      delay(2000),
      tap(places => {
        this._places.next(places.concat(newPlace));
      })
    );
  }
  // onUpdatePlaces(placeId: string, title: string, description: string) {
  //   console.log(placeId, ' ', title);
  //   return this.places.pipe(
  //     take(1),
  //     delay(2000),
  //     tap(places => {
  //       const updatedPlaceIndex = places.findIndex(pl =>
  //         pl.id === placeId
  //       );
  //       const updatedPlaces = [...places];
  //       const oldPlace = updatedPlaces[updatedPlaceIndex];
  //       console.log(oldPlace);
  //       updatedPlaces[updatedPlaceIndex] = new Place(
  //         oldPlace.id,
  //         title,
  //         description,
  //         oldPlace.imgUrl,
  //         oldPlace.price,
  //         oldPlace.availableFrom,
  //         oldPlace.availableTo,
  //         oldPlace.userId
  //       );
  //       console.log(updatedPlaces[updatedPlaceIndex]);
  //       this._places.next(updatedPlaces);
  //     })
  //   );
  // }
  onUpdatePlaces(placeId: string, title: string, description: string) {
    console.log(placeId, title, description);
    return this.places.pipe(
      take(1),
      delay(1000),
      tap(places => {
        const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
        const updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imgUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
        );
        this._places.next(updatedPlaces);
      })
    );
  }

}
