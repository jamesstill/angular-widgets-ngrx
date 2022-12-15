import { createFeatureSelector } from '@ngrx/store';
import * as AppState from '../../app.state';
import { WidgetState } from '../widgets.state';
import { Widget } from '../models/widget';

export interface State extends AppState.State {
    widgets: WidgetState;
    selectedWidgetId: number;
    error: string;
}

export const getWidgetFeatureState = createFeatureSelector<WidgetState>('widgets');