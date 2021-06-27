import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BikesService} from "../../core/services/bikes.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Bike} from "../../core/models/bike.model";
import { MaxSizeValidator } from '@angular-material-components/file-input';
import {Observable, Subscription} from "rxjs";
import {BikeFormFields} from "../../core/models/bikeFormFields.model";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-bike-editor',
  templateUrl: './bike-editor.component.html',
  styleUrls: ['./bike-editor.component.scss']
})
export class BikeEditorComponent implements OnInit, OnDestroy {

  bikeId = 0;
  bikeForm: any;
  gear: FormArray = new FormArray([]);
  modeEdit = false;
  bike: any;
  maxImgSizeMb = 3;
  subscriptions = new Subscription();
  formFields$: Observable<BikeFormFields> | undefined;

  constructor(private activatedRoute: ActivatedRoute,
              public bikeService: BikesService,
              private router: Router,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formFields$ = this.bikeService.getBikeFormFields();

    const sub = this.activatedRoute.params.pipe(
      switchMap((params: any) => {
        const param = 'id';
        this.bikeId = +params[param];

        this.bikeForm = new FormGroup({
            picture: new FormControl(null, [
              MaxSizeValidator(this.maxImgSizeMb * 1048576)
            ]),
            name: new FormControl('Test', [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(20)]),
            description: new FormControl('test', [
              Validators.required]),
            price: new FormControl('10', [
              Validators.required]),
            type: new FormControl('road', [
              Validators.required]),
            size: new FormControl('medium', [
              Validators.required]),
            status: new FormControl('available', [
              Validators.required]),
            gear: this.formBuilder.array([])
        });

        return this.bikeService.getBikeDetails(this.bikeId);
        })
      )
      .subscribe((bike: Bike) => {
        this.modeEdit = !!this.bikeId;
        if (this.modeEdit) {
          this.bike = bike;
          this.setForm();
        }
      });
    this.subscriptions.add(sub);
  }

  setForm(): void {
    const bdSub = this.bikeService.getBikeDetails(this.bikeId).subscribe((bike: Bike) => {
      this.bikeForm.setValue({
        picture: bike.picture,
        name: bike.name,
        description: bike.description,
        price: bike.price,
        type: bike.type,
        size: bike.size,
        gear: [],
        status: bike.status
      });

      if (bike.gear !== undefined) {
        for (const item of bike.gear) {
          this.addItem(item);
        }
      }
    });
    this.subscriptions.add(bdSub);
  }

  createItem(name: string): FormGroup {
    return this.formBuilder.group({
      name: [name]
    });
  }

  addItem(name: string): void {
    this.gear = this.bikeForm.get('gear') as FormArray;
    this.gear.push(this.createItem(name));
  }

  removeItem(index: number): void {
    this.gear = this.bikeForm.get('gear') as FormArray;
    this.gear.removeAt(index);
  }

  onCancel(): void {
    this.router.navigate(['/admin/bikes']);
  }

  onSave(): void {
    if (this.modeEdit) {
      this.bikeService.updateBike({...this.bikeForm.value, id: this.bikeId});
    } else {
      this.bikeService.createBike(this.bikeForm.value);
    }
    // this.router.navigate(['/admin/bikes']);
  }

  generateUUID(): number {
    return new Date().getTime() + Math.round(Math.random() * 1E7);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
