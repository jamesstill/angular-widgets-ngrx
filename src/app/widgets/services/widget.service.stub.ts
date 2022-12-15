import { Widget } from '../models/widget';
import { Observable, of, throwError } from 'rxjs';

export class WidgetServiceStub {

    private widgets: Widget[] = [
        { id: 12, name: 'Widget', shape: 'Square' },
        { id: 13, name: 'Gear', shape: 'Round' },
        { id: 14, name: 'Sprocket', shape: 'Octagonal' },
        { id: 15, name: 'Pinion', shape: 'Rectangular' },
        { id: 16, name: 'Cog', shape: 'Oblong' }
    ];


    getWidgets(): Observable<Widget[]> {
        return of(this.widgets);
    }

    searchWidgets(term: string): Observable<Widget[]> {
        return of(this.widgets.filter(s => s.name?.includes(term)));
    }

    getWidget(id: number): Observable<Widget> {
        return of(this.widgets.filter(w => w.id === id)[0]);
    }

    // this feels wrong for a stub...
    initializeWidget(): Widget {
        return {
          id: 0, 
          shape: '',
          name: ''
        };
      }


}