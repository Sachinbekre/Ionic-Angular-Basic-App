import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'places', pathMatch: 'full' },
  { path: 'recipes',
    children : [
      {
        path : '',
        loadChildren: './recipes/recipes.module#RecipesPageModule'
      },
      {
        path : ':recipeId',
        loadChildren: './recipes/recipes-detail/recipes-detail.module#RecipesDetailPageModule'
      }
    ]
  },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  { path: 'places', loadChildren: './places/places.module#PlacesPageModule', canLoad: [AuthGuard] },
  { path: 'booking', loadChildren: './booking/booking.module#BookingPageModule', canLoad: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
