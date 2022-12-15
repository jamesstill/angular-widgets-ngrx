import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DebugElement } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-widgets-ngrx'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-widgets-ngrx');
  });

  /*
    Per https://angular.io/guide/testing-components-basics
    you can test a component fixture's nativeElement or its 
    debugElement. 
  */

  it('should find the <a> containing app title', () => {

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    //const del: DebugElement = fixture.debugElement;
    const nel: HTMLElement = fixture.nativeElement;
    expect(nel.querySelector('a')?.textContent).toContain('Angular Widgets');
  });


  /*
  it('should render title in navbar-brand', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    // notice how nativeElement is a convenience method off of debugElement
    const del: DebugElement = fixture.debugElement;
    const nel: HTMLElement = del.nativeElement;
    const a = nel.querySelector('a'); // anchor tag

    expect(a?.textContent).toContain('Home');
    expect(a?.textContent).toContain('Widgets');

    //const compiled = fixture.nativeElement as HTMLElement;
    //expect(fixture.debugElement.query(By.css('navbar-brand')).)
    //expect(compiled.querySelector('.content span')?.textContent).toContain('Home');
    //expect(compiled.querySelector('span')?.textContent).toContain('Angular Widgets');
  });

  */
});
