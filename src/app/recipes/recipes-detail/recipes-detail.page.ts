import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { Rece } from '../rece.module';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.page.html',
  styleUrls: ['./recipes-detail.page.scss'],
})
export class RecipesDetailPage implements OnInit {
  loadRecipe: Rece;
  constructor(private activateRoute: ActivatedRoute,
              private recipeService: RecipesService,
              private router: Router,
              private alertContlr: AlertController) {
               }

  ngOnInit() {
    this.loadRecipe = this.recipeService.getRecipe('r1');
    this.activateRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('recipeId')) {
        // redirect
        this.router.navigate(['./recipes']);
        console.log('called');
        return;
      }
      const recipeId = paramMap.get('recipeId');
      console.log('get Param', recipeId);
      this.loadRecipe = this.recipeService.getRecipe(recipeId);
    });
  }
  onDeleteRecipe() {
    this.alertContlr.create({
      header: 'Are you sure?',
      message: 'Do you really want to delete the recipe',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.recipeService.deleteRecipe(this.loadRecipe.id);
            this.router.navigate(['./recipes']);
          }
        }
      ]
    }).then(alertEl => {
     alertEl.present();
    });
  }
}
