import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { WidgetDetailComponent } from './widget-detail.component';
import { Widget } from '../../models/widget';
import { Observable, of } from 'rxjs';
import { WidgetService } from '../../services/widget.service';
import { WidgetServiceStub } from '../../services/widget.service.stub';
import { provideMockStore } from '@ngrx/store/testing';

describe('WidgetDetailComponent', () => {
  let component: WidgetDetailComponent;
  let fixture: ComponentFixture<WidgetDetailComponent>;
  let route: ActivatedRoute;
  //let widget: Widget = { id: 1, name: 'Widget', shape: 'Square' };
  let widget$: Observable<Widget> = of({ id: 1, name: 'Widget', shape: 'Square' });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WidgetDetailComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientModule
      ],
      providers: [
        provideMockStore(),
        { provide: WidgetService, useClass: WidgetServiceStub },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: 1 })
            }
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WidgetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // inject ActivatedRoute
  beforeEach(() => {
    route = TestBed.inject(ActivatedRoute)
  });

  it('should create WidgetDetail component', () => {
    expect(component).toBeTruthy();
  });

  /*
  it('should successfully fetch the widget', () => {

    let widget = { id: 0 } as Widget;
    component.widget$.subscribe((w) => widget = w);

    expect(component.widget$ !== null);
    fixture.whenStable().then(() => {
      expect(widget !== null);
    });
    
  });

  it('should fetch the widget from the ActivatedRoute', () => {
    fixture.whenStable().then(() => {

      let widget = { id: 0 } as Widget;
      component.widget$.subscribe((w) => widget = w);

      expect(widget.id === 1);
    });
  });
  */
});
