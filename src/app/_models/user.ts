import { UserProfile } from './user-profile';

export class User {
    id: number;
    username: string;
    password: string;
    firstname: string;
    document: string;
    profile: UserProfile;
    token: string;
    picture: string;
}
