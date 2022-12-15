import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Widget } from '../../models/widget';

// ngrx
import { Store } from '@ngrx/store';
import { State } from '../../state';
import { getWidget } from '../../state/selectors/widgets.selectors';

@Component({
  selector: 'app-widget-detail',
  templateUrl: './widget-detail.component.html',
  styleUrls: ['./widget-detail.component.css'],
})
export class WidgetDetailComponent implements OnInit {
  pageTitle = 'Widget';
  widget$: Observable<Widget>;
  errorMessage = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private readonly store: Store<State>) {

    // get id number passed in from router
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.widget$ = this.store.select(getWidget(id)) as Observable<Widget>;
  }

  ngOnInit(): void { }

  goBack(): void {
    this.router.navigate(['/widgets'], {
      queryParamsHandling: 'preserve',
      queryParams: { message: '' },
    });
  }
}
