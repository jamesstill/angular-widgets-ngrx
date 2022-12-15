import { Widget } from './models/widget';

export interface WidgetState {
    widgets: Widget[];
    selectedWidgetId: number;
    error: string;
}