import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Widget } from '../models/widget';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const widgets: Widget[] = [
      { id: 12, name: 'Widget', shape: 'Square' },
      { id: 13, name: 'Gear', shape: 'Round' },
      { id: 14, name: 'Sprocket', shape: 'Octagonal' },
      { id: 15, name: 'Pinion', shape: 'Rectangular' },
      { id: 16, name: 'Cog', shape: 'Oblong' }
    ];
    return { widgets };
  }

  // Overrides the genId method to ensure that a widget always has a mock 
  // database-generated ID. If the array has one or more elements genId 
  // returns highest ID + 1. If the array is empty then returns an initial
  // default seed value (99).
  genId(widgets: Widget[]): number {
    return widgets.length > 0 ? Math.max(...widgets.map(w => w.id)) + 1 : 99;
  }
}