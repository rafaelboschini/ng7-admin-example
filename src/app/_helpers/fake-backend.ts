import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User } from 'src/app/_models/user';

/** localstorage mock data for user list  */
let users = JSON.parse(localStorage.getItem('users')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = req;

        /** wrap in delayed observable to simulate server api call */
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                default:
                    return next.handle(req);
            }
        }

        /** Route function */
        function getUsers() {
            const rndNumber = () => Math.floor(Math.random() * 6000) + 1;

            if (localStorage) {
                users = JSON.parse(localStorage.getItem('users'));
            }

            if (users === null || users.length === 1) {
                users = [];
                users.push({
                    id: rndNumber(),
                    username : 'johncandy@holywood.com',
                    password: 'sugar123',
                    firstName: 'John Franklin Candy',
                    document: '404876877',
                    profile: 0,
                    token: '',
                    picture: 'assets/user-pictures/johncandy.jpg',
                });

                users.push({
                    id: rndNumber(),
                    username : 'moranis@holywood.com',
                    password: 'moranis123',
                    firstName: 'Frederick Alan Moranis',
                    document: '404876879',
                    profile: 1,
                    token: '',
                    picture: 'assets/user-pictures/rickmorranis.jpg',
                });

                users.push({
                    id: rndNumber(),
                    username : 'bill@holywood.com',
                    password: 'bil123',
                    firstName: 'Bill Murray',
                    cpf: '404876878',
                    profile: 1,
                    token: '',
                    picture: 'assets/user-pictures/bill.jpg',
                });

                localStorage.setItem('users', JSON.stringify(users));
            } else {
                users = JSON.parse(localStorage.getItem('users'));
            }

            return ok(users);
        }

        function authenticate() {
            const { username, password } = body;

            if (users.length === 0) {
                getUsers().subscribe( data => {
                    users = data.body;
                });
            }

            const user = users.find(x => x.username === username && x.password === password);

            if (!user) { return error('Username or password is incorrect'); }

            user.token = 'fake-jwt-token';

            return of(new HttpResponse({ status: 200, body: user }));
        }

        /** Helper functions */
        function ok(user?: User) {
            return of(new HttpResponse({ status: 200, body: user }));
        }

        function error(message) {
            return throwError({ error: { message } });
        }

    }


    

}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
