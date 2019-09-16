import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { fakeBackendProvider } from 'src/app/_helpers/fake-backend';
import { HttpClientModule } from '@angular/common/http';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [fakeBackendProvider, UserService]
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('should return user by id', async () => {
    const service: UserService = TestBed.get(UserService);
    
    const list = service.getAll().subscribe(data => {
      expect(data.length).toBeGreaterThan(2);

      const user = service.getById(data[0].id);

      console.log('list user', user);
    });

    //
    
  });
});
