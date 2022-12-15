import { Injectable } from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { WidgetActions } from '../actions';
import { selectWidgets } from '../selectors/widgets.selectors';
import { map, mergeMap, concatMap, catchError, withLatestFrom } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { select, Store } from '@ngrx/store';

@Injectable()
export class WidgetEffects {

    constructor(
        private actions$: Actions,
        private store: Store,
        private service: WidgetService
    ) { }

    loadWidgets$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(WidgetActions.loadWidgets),
            withLatestFrom(this.store.pipe(select(selectWidgets))),
            mergeMap(() => this.getWidgets())
        )
    });

    createWidget$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(WidgetActions.createWidget),
            concatMap(action =>
                this.service.addWidget(action.widget)
                    .pipe(
                        map(data => WidgetActions.createWidgetSuccess({ widget: data })),
                        catchError(error => of(WidgetActions.createWidgetFailure({ error: error })))
                    ))
        )
    });

    updateWidget$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(WidgetActions.updateWidget),
            concatMap(action =>
                this.service.updateWidget(action.widget)
                    .pipe(
                        map(() => WidgetActions.updateWidgetSuccess({ widget: action.widget })),
                        catchError(error => of(WidgetActions.updateWidgetFailure({ error: error })))
                    ))
        )
    });

    deleteWidget$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(WidgetActions.deleteWidget),
            concatMap(action =>
                this.service.deleteWidget(action.id)
                    .pipe(
                        map(widget => WidgetActions.deleteWidgetSuccess({ id: action.id })),
                        catchError(error => of(WidgetActions.deleteWidgetFailure({ error: error })))
                    ))
        )
    });

    getWidgets() {
        return this.service.getWidgets()
            .pipe(
                map(data => WidgetActions.loadWidgetsSuccess({ widgets: data })),
                catchError(error => of(WidgetActions.loadWidgetsFailure({ error: error })))
            );
    }

    getWidget(id: number) {
        return this.service.getWidget(id)
            .pipe(
                map(data => WidgetActions.selectCurrentWidgetSuccess({ widget: data })),
                catchError(error => of(WidgetActions.selectCurrentWidgetFailure({ error: error })))
            );
    }
}