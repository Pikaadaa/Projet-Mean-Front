import { CarService } from '../../services/car.service';
import { Car } from '../../models/car';
import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface CarFormData {
  isCreateForm: boolean;
  car: Car;
}

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss']
})
export class CarFormComponent implements OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  carForm = this.fb.group({
    id: [0, [Validators.required]],
    brand: ['', [Validators.required]],
    nationality: ['', [Validators.required]],
    dateOfCreation: ['', [Validators.required]]
  });

  constructor(public dialogRef: MatDialogRef<CarFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CarFormData, private fb: FormBuilder,
    private carService: CarService, private _snackBar: MatSnackBar) {

    if (!data.isCreateForm) {
      this.setCarForm(data.car);
    }

  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  setCarForm(car: Car) {
    this.carForm.setValue({
      id: car.id,
      brand: car.brand,
      nationality: car.nationality,
      dateOfCreation: car.dateOfCreation
    });
  }

  get title() {
    if (this.data.isCreateForm) {
      return 'Formulaire de création';
    }
    return 'Formulaire de modification';
  }

  get submitBtnName() {
    if (this.data.isCreateForm) {
      return 'Ajouter';
    }
    return 'Modifier';
  }

  onSubmit() {
    if (this.carForm.valid) {
      this.carForm.value.dateOfCreation = new Date(this.carForm.value.dateOfCreation).toISOString();
      if (this.data.isCreateForm) {
        this.carForm.value.id = Date.now() + Math.random();
        this.carService.create(this.carForm.value as Car)
          .pipe(takeUntil(this.destroy$))
          .subscribe(result => {
            this._snackBar.open(result, '', {
              duration: 2000,
              panelClass: ['bg-success']
            });

            this.dialogRef.close(true);
          });
      } else {
        this.carService.update(this.carForm.value as Car)
          .pipe(takeUntil(this.destroy$))
          .subscribe(result => {
            this._snackBar.open(result, '', {
              duration: 2000,
              panelClass: ['bg-success']
            });
            this.dialogRef.close(true);
          });
      }
    }
  }
}
