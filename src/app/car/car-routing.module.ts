import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailsComponent } from './pages/car-details/car-details.component';
import { CarListComponent } from './pages/car-list/car-list.component';
import { CarComponent } from './car.component';

const routes: Routes = [
  {
    path: '',
    component: CarListComponent
  },
  {
    path: ':id',
    component: CarDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarRoutingModule { }
