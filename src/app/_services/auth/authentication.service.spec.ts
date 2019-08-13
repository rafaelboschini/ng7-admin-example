import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { fakeBackendProvider } from '../../_helpers/fake-backend';
import { AuthenticationService } from './authentication.service';

const mockmail = 'bill@holywood.com';
const mockpass = 'bil123';

describe('AuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [fakeBackendProvider, AuthenticationService]
  }));

  it('should be created', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(service).toBeTruthy();
  });

  it('should testing login success', async () => {
      const service: AuthenticationService = TestBed.get(AuthenticationService);

      try {
        const result = await service.login(mockmail, mockpass);
        expect(result).toBeTruthy();

      } catch (err) {
        fail('Login method not working');

      }

    }
  );

  it('should testing login with wrong credentials', async () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);

    return await service.login('john@rmless.com', '54321').then( (result) => {
        fail('Login method not working');
      }).catch( err => {
        expect(err.error.message).toBe('Username or password is incorrect');
      });
    }
  );

  it('should testing currentuser property when loggedin', async () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);

    const result = await service.login(mockmail, mockpass).then(data => {
      expect(service.currentUser).toBeTruthy();
      expect(service.currentUserValue.username).toBe(mockmail);
    });
  });

});
