import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projForm: FormGroup;
  projectStatus = ['stable', 'critical', 'finshed'];

  ngOnInit() {
    this.projForm = new FormGroup({
      'projectName': new FormControl(null, Validators.required, this.nameForbiddingValidator),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'projStatus': new FormControl('placeholder')
    });
    this.projForm.statusChanges.subscribe({
      next: (status) => {
        console.log(status);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('fulfilled');
      }
    });
  }

  onSubmit() {
    console.log(this.projForm);

  }

  nameForbiddingValidator(control: FormControl): Promise<any> | Observable <any> {
    const observable = new Observable((observer: Observer<any>) => {
      setTimeout(() => {
        if (control.value === 'Test') {
          observer.next({forbidName: true});
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 2000);
    });
    return observable;
  }


}
