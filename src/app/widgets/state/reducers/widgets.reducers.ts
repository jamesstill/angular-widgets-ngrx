import { createReducer, on } from '@ngrx/store';
import { WidgetState } from '../../widgets.state';
import * as WidgetActions from '../actions/widgets.actions';

// initial empty state
const initialState: WidgetState = {
    widgets: [],
    selectedWidgetId: 0,
    error: ''
};

export const widgetReducer = createReducer<WidgetState>(
    initialState,
    on(WidgetActions.loadWidgetsSuccess, (state, action): WidgetState => {
        return {
            ...state,
            widgets: action.widgets,
            error: ''
        };
    }),

    on(WidgetActions.loadWidgetsFailure, (state, action) => {
        return {
            ...state,
            widgets: [],
            error: action.error
        };
    }),

    on(WidgetActions.selectCurrentWidget, (state, action) => {
        return {
            ...state,
            //selectedWidget: action.selectedWidget
            selectedWidgetId: action.selectedWidget.id
        };
    }),

    on(WidgetActions.createWidgetSuccess, (state, action): WidgetState => {
        return {
            ...state,
            widgets: [...state.widgets, action.widget],
            selectedWidgetId: action.widget.id,
            error: ''
        };
    }),

    on(WidgetActions.createWidgetFailure, (state, action): WidgetState => {
        return {
            ...state,
            error: action.error
        };
    }),

    on(WidgetActions.updateWidgetSuccess, (state, action): WidgetState => {
        let idx = state.widgets.findIndex(w => w.id === action.widget.id);
        const updatedWidgets = [...state.widgets];
        updatedWidgets[idx] = action.widget;
        return {
            ...state,
            widgets: updatedWidgets,
            selectedWidgetId: action.widget.id,
            error: ''
        };
    }),

    on(WidgetActions.updateWidgetFailure, (state, action): WidgetState => {
        return {
            ...state,
            error: action.error
        };
    }),

    on(WidgetActions.deleteWidgetSuccess, (state, action): WidgetState => {
        return {
            ...state,
            widgets: state.widgets.filter(w => w.id !== action.id),
            error: ''
        };
    }),
    
    on(WidgetActions.deleteWidgetFailure, (state, action): WidgetState => {
        return {
            ...state,
            error: action.error
        };
    })
);
