import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { GenericPopupComponent } from 'src/app/shared/components/generic-popup/generic-popup.component';
import { CarFormComponent } from '../../components/car-form/car-form.component';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['brand', 'nationality', 'dateOfCreation', 'update', 'delete'];

  car$: Observable<Car[]>;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private carService: CarService, private dialog: MatDialog, private _snackBar: MatSnackBar, private router: Router) {

  };

  ngOnInit(): void {
    this.car$ = this.carService.get();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  fetchData() {
    this.car$ = this.carService.get();
  }

  openCarForm(car?: Car) {
    const dialogRef = this.dialog.open(CarFormComponent, {
      height: '85%',
      width: '60%',
      data: {
        isCreateForm: car ? false : true,
        car: car ? car : undefined
      }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.fetchData();
        }
      });
  }

  delete(id: number) {
    const ref = this.dialog.open(GenericPopupComponent, {
      data: {
        title: 'Confirmation de suppression',
        message: 'êtes-vous sûr de vouloir supprimer cette marque de voiture ?',
        typeMessage: 'none',
        yesButtonVisible: true,
        noButtonVisible: true,
        cancelButtonVisible: false,
        defaultButton: 'No',
        yesButtonLabel: 'Oui',
        noButtonLabel: 'Non',
      },
    })

    ref.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.carService.delete(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(result => {
              this._snackBar.open(result, '', {
                duration: 2000,
                panelClass: ['bg-success']
              });
              this.fetchData();
            });
        }
      });
  }

  showCarDetails(carId: number) {
    this.router.navigate(['/cars/' + carId]);
  }

}
