import { createSelector } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { getWidgetFeatureState } from '../';
import { Widget } from '../../models/widget';
import { WidgetActions } from '../actions';
import { widgetReducer } from '../reducers/widgets.reducers';

export const selectWidgets = createSelector(
    getWidgetFeatureState,
    state => state.widgets
);

export const getSelectedWidgetId = createSelector(
    getWidgetFeatureState,
    state => state.selectedWidgetId
);

export const getWidget = (id: number) => createSelector(
    getWidgetFeatureState,
    (state) => {
        if (id === 0) {
            return { id: 0 };
        } else {
            return id ? state.widgets.find(w => w.id === id) : undefined;
        }
    }
);

export const getSelectedWidget = createSelector(
    getWidgetFeatureState,
    getSelectedWidgetId,
    (state, currentWidgetId) => {
        if (currentWidgetId === 0) {
            return { id: 0 };
        } else {
            return currentWidgetId ? state.widgets.find(w => w.id === currentWidgetId) : undefined;
        }
    }
);