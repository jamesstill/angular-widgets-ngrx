import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Widget } from '../../models/widget';

// ngrx
import { Store } from '@ngrx/store';
import { State } from '../../state';
import { WidgetActions } from '../../state/actions';
import { getWidget } from '../../state/selectors/widgets.selectors';

@Component({
  selector: 'app-widget-update',
  templateUrl: './widget-update.component.html',
  styleUrls: ['./widget-update.component.css']
})
export class WidgetUpdateComponent implements OnInit {

  widgetUpdateForm!: FormGroup;
  widget$: Observable<Widget>;
  public pageTitle = 'Update Widget';
  public errorMessage = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private readonly store: Store<State>) {

    // get id number passed in from router
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.widget$ = this.store.select(getWidget(id)) as Observable<Widget>;
  }

  ngOnInit(): void {

    let widget = {} as Widget;
    this.widget$.subscribe((w) => widget = w);

    this.widgetUpdateForm = new FormGroup({
      'id': new FormControl(widget.id),
      'shape': new FormControl(widget.shape),
      'name': new FormControl(widget.name)
    });
  }

  onSubmit() {

    let widget = this.widgetUpdateForm.value as Widget;
    this.store.dispatch(WidgetActions.updateWidget({ widget }));

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