import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Widget } from '../models/widget';
import { WidgetService } from './widget.service';

describe('WidgetService Tests with HttpClient Mock', () => {

    let client: HttpClient;
    let controller: HttpTestingController;
    let service: WidgetService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [WidgetService]
        });

        // inject dependencies
        client = TestBed.inject(HttpClient);
        controller = TestBed.inject(HttpTestingController);
        service = TestBed.inject(WidgetService);
    });

    afterEach(() => {
        controller.verify();
    });


    describe('getWidgets', () => {

        let testWidgets: Widget[];

        beforeEach(() => {
            service = TestBed.inject(WidgetService);
            testWidgets = [
                { id: 1, shape: 'Square', name: 'Widget' },
                { id: 2, shape: 'Round', name: 'Cog' }
            ] as Widget[];
        });

        it('should return test widgets when calling getWidgets()', () => {
            service.getWidgets().subscribe({
                next: widgets =>
                    expect(widgets)
                        .withContext('should return all test widgets')
                        .toEqual(testWidgets),
                error: fail
            });

            const req = controller.expectOne(service.widgetUrl);
            expect(req.request.method).toEqual('GET');

            req.flush(testWidgets);
        });

        it('should be OK returning no widgets', () => {
            service.getWidgets().subscribe({
                next: widgets => expect(widgets.length)
                    .withContext('should be an empty array of widgets')
                    .toEqual(0),
                error: fail
            });

            const req = controller.expectOne(service.widgetUrl);
            req.flush([]); // Respond with no widgets
        });

        it('should turn 404 into a user-friendly error', () => {
            const msg = 'Deliberate 404';
            service.getWidgets().subscribe({
                next: widgets => fail('expected to fail'),
                error: error => expect(error.message).toContain(msg)
            });

            const req = controller.expectOne(service.widgetUrl);

            // respond with a 404 and the error message in the body
            req.flush(msg, { status: 404, statusText: 'Not Found' });
        });

        it('should return widgets on multiple calls', () => {
            service.getWidgets().subscribe();
            service.getWidgets().subscribe();
            service.getWidgets().subscribe({
                next: widgets => expect(widgets)
                    .withContext('should return all test widgets')
                    .toEqual(testWidgets),
                error: fail
            });

            const requests = controller.match(service.widgetUrl);
            expect(requests.length)
                .withContext('three successive calls to getWidgets()')
                .toEqual(3);

            requests[0].flush([]);
            requests[1].flush({ id: 1, shape: 'Square', name: 'Widget' });
            requests[2].flush(testWidgets);
        });

    });

    describe('updateWidgets', () => {

        it('should update a widget and return it', () => {
            const widget: Widget = { id: 1, shape: 'Rectangular', name: 'Widget' };

            service.updateWidget(widget).subscribe({
                next: data => expect(data)
                    .withContext('should return the updated widget')
                    .toEqual(widget),
                error: fail
            });

            const req = controller.expectOne(service.widgetUrl);
            expect(req.request.method).toEqual('PUT');
            expect(req.request.body).toEqual(widget);

            // expect service to return widget after PUT
            const expectedResponse = new HttpResponse(
                { status: 200, statusText: 'OK', body: widget });
            req.event(expectedResponse);

        });

        it('should return user friendly error on network error', done => {

            // Create mock ProgressEvent with type `error`, raised when something goes
            // wrong at the network level. Connection timeout, DNS error, offline, etc.
            const errorEvent = new ProgressEvent('error');
            const widget: Widget = { id: 1, shape: 'Rectangular', name: 'Widget' };

            service.updateWidget(widget).subscribe({
                next: widgets => fail('intentional failure simulating network error'),
                error: error => {
                    expect(error).toBe(errorEvent);
                    done();
                }
            });

            const req = controller.expectOne(service.widgetUrl);
            req.error(errorEvent);
        });

    });

    describe('addWidget', () => {

        it('should create a widget and return it', () => {
            const widget: Widget = { id: 17, shape: 'Round', name: 'Gear' };
            
            service.addWidget(widget).subscribe({
                next: data => expect(data)
                    .withContext('should set id to null for genId()')     
                    .toEqual(widget),
                error: fail
            });

            const req = controller.expectOne(service.widgetUrl);
            expect(req.request.method).toEqual('POST');
            //expect(req.request.body).toEqual(newWidget);

            // expect service to return widget after POST
            const expectedResponse = new HttpResponse(
                { status: 200, statusText: 'OK', body: widget });
            req.event(expectedResponse);

        });

        it('should return user friendly error on network error', done => {

            // Create mock ProgressEvent with type `error`, raised when something goes
            // wrong at the network level. Connection timeout, DNS error, offline, etc.
            const errorEvent = new ProgressEvent('error');
            const widget: Widget = { id: 1, shape: 'Rectangular', name: 'Widget' };

            service.addWidget(widget).subscribe({
                next: widgets => fail('intentional failure simulating network error'),
                error: error => {
                    expect(error).toBe(errorEvent);
                    done();
                }
            });

            const req = controller.expectOne(service.widgetUrl);
            req.error(errorEvent);
        });

    });


    describe('deleteWidget', () => {

        const widget: Widget = { id: 1 };
        
        it('should delete a widget and return the deleted widget id number only', () => {

            const url = `${service.widgetUrl}/${widget.id}`;

            service.deleteWidget(widget).subscribe({
                next: data => expect(data)
                    .withContext('should return the deleted widget id')
                    .toEqual(widget),
                error: fail
            });

            const req = controller.expectOne(url);
            expect(req.request.method).toEqual('DELETE');
            expect(req.request.body).toEqual(null);

            // expect service to return widget after DELETE
            const expectedResponse = new HttpResponse(
                { status: 200, statusText: 'OK', body: widget });
            req.event(expectedResponse);

        });
        

        it('should return user friendly error on network error', done => {

            // Create mock ProgressEvent with type `error`, raised when something goes
            // wrong at the network level. Connection timeout, DNS error, offline, etc.
            const errorEvent = new ProgressEvent('error');
            const widget: Widget = { id: 1 };
            const url = `${service.widgetUrl}/${widget.id}`;

            service.deleteWidget(widget.id).subscribe({
                next: data => fail('intentional failure simulating network error'),
                error: error => {
                    expect(error).toBe(errorEvent);
                    done();
                }
            });

            const req = controller.expectOne(url);
            req.error(errorEvent);
        });

    });

});