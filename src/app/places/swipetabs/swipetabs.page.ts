import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-swipetabs',
  templateUrl: './swipetabs.page.html',
  styleUrls: ['./swipetabs.page.scss'],
})
export class SwipetabsPage implements OnInit {
page = 0;
@ViewChild('slider') slider:IonSlides;
contacts: any[] = [];

constructor() {
  for (let i = 1; i <= 7; i++) {
    let number = Math.floor(Math.random()* (9999999999-6666666666 +1))+6666666666;
    this.contacts.push({
      name: `Contact #${ i }`,
      phoneNumber: number
    });
  }
 }

  ngOnInit() {
    console.log("qwertyu");
  }

  selectedTab(index) {
    this.slider.slideTo(index);
  }

  moveButton(){
    this.slider.getActiveIndex().then(index => {
      this.page = index;
    })
  }
  doReorder(ev) {
    const itemMove = this.contacts.splice(ev.detail.from, 1)[0];
    this.contacts.splice(ev.detail.to, 0, itemMove);
    ev.detail.complete();
    console.log(this.contacts);
    
  }
  images =[
    {
      img:'assets/images/sachin.jpg'
    },
    {
      img:'assets/images/image1.jpg'
    },
    {
      img:'assets/images/image2.jpg'
    },
    {
      img:'assets/images/image3.jpg'
    },
    {
      img:'assets/images/image4.jpg'
    }
  ];
}
