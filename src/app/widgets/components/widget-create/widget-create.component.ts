import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Widget } from '../../models/widget';

// ngrx
import { Store } from '@ngrx/store';
import { State } from '../../state';
import { WidgetActions } from '../../state/actions';

@Component({
  selector: 'app-widget-create',
  templateUrl: './widget-create.component.html',
  styleUrls: ['./widget-create.component.css'],
})
export class WidgetCreateComponent implements OnInit {
  widgetCreateForm!: FormGroup;
  public pageTitle = 'Create Widget';
  public errorMessage = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private readonly store: Store<State>) { }

  ngOnInit(): void {

    this.widgetCreateForm = new FormGroup({
      id: new FormControl(0),
      shape: new FormControl(''),
      name: new FormControl(''),
    });
  }

  onSubmit() {

    let widget = this.widgetCreateForm.value as Widget;
    this.store.dispatch(WidgetActions.createWidget({ widget }));

    // Navigate back to the list
    this.router.navigate(['/widgets']);
  }

  goBack(): void {
    this.router.navigate(['/widgets'], {
      queryParamsHandling: 'preserve',
      queryParams: { message: '' },
    });
  }
}
