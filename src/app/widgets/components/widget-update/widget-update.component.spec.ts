import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { WidgetUpdateComponent } from './widget-update.component';
import { WidgetService } from '../../services/widget.service';
import { WidgetServiceStub } from '../../services/widget.service.stub';
import { WidgetActions } from '../../state/actions';

describe('WidgetUpdateComponent', () => {
  let component: WidgetUpdateComponent;
  let fixture: ComponentFixture<WidgetUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetUpdateComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        { 
          provide: WidgetService, useClass: WidgetServiceStub 
        },
        provideMockStore()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
