import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Widget } from '../../models/widget';

// ngrx
import { Store } from '@ngrx/store';
import { State } from '../../state';
import { getSelectedWidget, getSelectedWidgetId, selectWidgets } from '../../state/selectors/widgets.selectors';
import { WidgetActions } from '../../state/actions';
import { selectCurrentWidget } from '../../state/actions/widgets.actions';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetListComponent implements OnInit {

  widgets$: Observable<Widget[]>;
  selectedWidget$: Observable<Widget>;
  errorMessage = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private readonly store: Store<State>
  ) {

    // store select function expects a selector as an arg
    this.widgets$ = this.store.select(selectWidgets) as Observable<Widget[]>;
    this.selectedWidget$ = this.store.select(getSelectedWidget) as Observable<Widget>;
  }

  ngOnInit(): void {

    // dispath function expects an action as an arg
    this.store.dispatch(WidgetActions.loadWidgets());
  }

  selectWidget(widget: Widget): void {
    console.log('Widget ID ' + widget.id + ' was selected. Dispatching to store...');
    this.selectedWidget$ = of(widget);
    this.store.dispatch(WidgetActions.selectCurrentWidget({ selectedWidget: widget }));
  }

  deleteWidget(widget: Widget): void {
    var widgetName = `${widget.shape} ${widget.name}`;
    if (confirm(`Really delete the widget: ${widgetName}?`)) {
      console.log('Widget ID ' + widget.id + ' is to be deleted. Dispatching to store...');
      this.store.dispatch(WidgetActions.deleteWidget({ id: widget.id }));
    }
  }
  
}
