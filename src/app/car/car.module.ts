import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarRoutingModule } from './car-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CarListComponent } from './pages/car-list/car-list.component';
import { CarService } from './services/car.service';
import { CarComponent } from './car.component';
import { CarFormComponent } from './components/car-form/car-form.component';
import { CarDetailsComponent } from './pages/car-details/car-details.component';
import { CarCardComponent } from './components/car-card/car-card.component';


@NgModule({
  declarations: [
    CarListComponent,
    CarComponent,
    CarFormComponent,
    CarDetailsComponent,
    CarCardComponent
  ],
  imports: [
    CommonModule,
    CarRoutingModule,
    SharedModule
  ],
  providers: [
    CarService
  ]
})
export class CarModule { }
