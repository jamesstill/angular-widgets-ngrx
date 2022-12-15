import { createAction, Action, props } from '@ngrx/store';
import { Widget } from '../../models/widget';

const enum WidgetActionTypes {
    LoadWidgets = '[Widget] Load Widgets',
    LoadWidgetsSuccess = '[Widget] Load Widgets Success',
    LoadWidgetsFailure = '[Widget] Load Widgets Failure',
    SelectCurrentWidget = '[Widget] Select Current Widget',
    SelectCurrentWidgetSuccess = '[Widget] Select Current Widget Success',
    SelectCurrentWidgetFailure = '[Widget] Select Current Widget Failure',
    DeleteWidget = '[Widget] Delete Widget',
    DeleteWidgetSuccess = '[Widget] Delete Widget Success',
    DeleteWidgetFailure = '[Widget] Delete Widget Failure',
    CreateWidget = '[Widget] Create Widget',
    CreateWidgetSuccess = '[Widget] Create Widget Success',
    CreateWidgetFailure = '[Widget] Create Widget Failure',
    UpdateWidget = '[Widget] Update Widget',
    UpdateWidgetSuccess = '[Widget] Update Widget Success',
    UpdateWidgetFailure = '[Widget] Update Widget Failure'
}

export const loadWidgets = createAction(
    WidgetActionTypes.LoadWidgets
);

export const loadWidgetsSuccess = createAction(
    WidgetActionTypes.LoadWidgetsSuccess,
    props<{ widgets: Widget[] }>()
)

export const loadWidgetsFailure = createAction(
    WidgetActionTypes.LoadWidgetsFailure,
    props<{ error: string }>()
)

export const selectCurrentWidget = createAction(
    WidgetActionTypes.SelectCurrentWidget,
    props<{ selectedWidget: Widget }>()
);

export const selectCurrentWidgetSuccess = createAction(
    WidgetActionTypes.SelectCurrentWidgetSuccess,
    props<{ widget: Widget }>()
);

export const selectCurrentWidgetFailure = createAction(
    WidgetActionTypes.SelectCurrentWidgetFailure,
    props<{ error: string }>()
);

export const deleteWidget = createAction(
    WidgetActionTypes.DeleteWidget,
    props<{ id: number }>()
);

export const deleteWidgetSuccess = createAction(
    WidgetActionTypes.DeleteWidgetSuccess,
    props<{ id: number }>()
);

export const deleteWidgetFailure = createAction(
    WidgetActionTypes.DeleteWidgetFailure,
    props<{ error: string }>()
);

export const createWidget = createAction(
    WidgetActionTypes.CreateWidget,
    props<{ widget: Widget }>()
);

export const createWidgetSuccess = createAction(
    WidgetActionTypes.CreateWidgetSuccess,
    props<{ widget: Widget }>()
);

export const createWidgetFailure = createAction(
    WidgetActionTypes.CreateWidgetFailure,
    props<{ error: string }>()
);

export const updateWidget = createAction(
    WidgetActionTypes.UpdateWidget,
    props<{ widget: Widget }>()
);

export const updateWidgetSuccess = createAction(
    WidgetActionTypes.UpdateWidgetSuccess,
    props<{ widget: Widget }>()
);

export const updateWidgetFailure = createAction(
    WidgetActionTypes.UpdateWidgetFailure,
    props<{ error: string }>()
);

