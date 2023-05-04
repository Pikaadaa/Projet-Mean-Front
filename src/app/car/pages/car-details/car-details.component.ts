import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {

  carId: number;
  car$: Observable<Car>;

  ngOnInit(): void {
    if (this.carId) {
      this.car$ = this.carService.getById(this.carId);
    }
  }

  constructor(private route: ActivatedRoute, private carService: CarService, private location: Location) {
    this.carId = +this.route.snapshot.paramMap.get('id');
  }

  goBack() {
    this.location.back();
  }

  showReceivedValue(value: boolean) {
    console.log(value);
  }

}
