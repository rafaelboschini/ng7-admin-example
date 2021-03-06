import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User } from 'src/app/_models/user';

/** localstorage mock data for user list  */
let users = JSON.parse(localStorage.getItem('users')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) {}

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
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                case url.indexOf('users/update') > 0 && method === 'PUT':
                    return updateUser();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                case url.match(/\/users\/\d+$/) && method === 'DELETE':
                    return deleteUser();
                default:
                    return next.handle(req);
            }
        }

        function deleteUser() {
            // if (!isLoggedIn()) { return unauthorized(); }

            users = users.filter(x => x.id !== idFromUrl());
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        function getUserById() {
            // if (!isLoggedIn()) { return unauthorized(); }

            const userReturn = users.find((user: { id: number; }) => user.id === idFromUrl());
            return ok(userReturn);
        }

        function updateUser() {
            const user = body;

            users = users.filter(x => x.id !== user.id); /** Remove old register */
            users.push(user); /** Add new fake user yeah yeah */
            localStorage.setItem('users', JSON.stringify(users));

            return ok();
        }

        function register() {
            const user = body;

            if (users.find(x => x.username === user.username)) {
                return error('Username "' + user.username + '" is already taken');
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));

            return ok();
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
                    firstname: 'John Franklin Candy',
                    document: '404876877',
                    profile: 0,
                    token: '',
                    picture: 'assets/user-pictures/johncandy.jpg',
                });

                users.push({
                    id: rndNumber(),
                    username : 'moranis@holywood.com',
                    password: 'moranis123',
                    firstname: 'Frederick Alan Moranis',
                    document: '404876879',
                    profile: 1,
                    token: '',
                    picture: 'assets/user-pictures/rickmorranis.jpg',
                });

                users.push({
                    id: rndNumber(),
                    username : 'bill@holywood.com',
                    password: 'bil123',
                    firstname: 'Bill Murray',
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

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1], 10);
        }

    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
