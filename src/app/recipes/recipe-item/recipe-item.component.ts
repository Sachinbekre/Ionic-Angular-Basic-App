import { Component, OnInit, Input } from '@angular/core';
import { Rece } from '../rece.module';
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipeItem: Rece;
  constructor() { }

  ngOnInit() {
  }

}
