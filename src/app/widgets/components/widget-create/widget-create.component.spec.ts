import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { WidgetCreateComponent } from './widget-create.component';
import { WidgetService } from '../../services/widget.service';
import { WidgetServiceStub } from '../../services/widget.service.stub';
import { provideMockStore } from '@ngrx/store/testing';

describe('WidgetCreateComponent', () => {
  let component: WidgetCreateComponent;
  let fixture: ComponentFixture<WidgetCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetCreateComponent ],
      imports: [ RouterTestingModule, HttpClientModule ],
      providers: [
        provideMockStore(),
        { provide: WidgetService, useClass: WidgetServiceStub }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
