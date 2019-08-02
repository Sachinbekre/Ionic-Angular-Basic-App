import { Injectable } from '@angular/core';
import { Rece } from './rece.module';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recepies: Rece[] = [
    {
      id : 'r1',
      title: 'Veg Biriyani',
      imgUrl: '../../assets/images/veg-palav.jpg'
     },
     {
      id : 'r2',
      title: 'Masala Dosa',
      imgUrl: '../../assets/images/masaladosa.jpg'
     },
     {
      id : 'r3',
      title: 'Crunchy Ajwain Poori',
      imgUrl: '../../assets/images/poori.jpg'
     }
  ];
  constructor() { }
  getAllRecipes() {
    return [...this.recepies];
  }
  getRecipe(recipeId: string) {
    return {
      ...this.recepies.find(recipe => {
      return recipe.id === recipeId;
    })};
  }
  deleteRecipe(recipeId: string) {
    this.recepies = this.recepies.filter(recipe => {
      return recipe.id !== recipeId;
      });
  }
}
