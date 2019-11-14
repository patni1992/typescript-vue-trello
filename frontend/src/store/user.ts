import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators';
import { loginUser, api } from '@/api';
import store from '@/store';

function getToken() {
    const token = localStorage.getItem('token');

    return token ? token : '';
}

function getUserData(key: string) {
    const userStr = localStorage.getItem('user');
    const userData = userStr ? JSON.parse(userStr) : null;

    if (userData) {
        return userData[key];
    }
}

if (getToken()) {
    api.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;
}

export interface UserInfo {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    profileImage: null | string;
}

export interface UserState extends UserInfo {
    token: string;
    profileImage: string;
    isGuest: boolean;
}

export interface UserLogin {
    username: string;
    password: string;
}

@Module({ dynamic: true, name: 'user', store, namespaced: true })
class User extends VuexModule implements UserState {
    token = getToken();
    username = getUserData('username') || '';
    email = getUserData('email') || '';
    firstName = getUserData('firstName') || '';
    lastName = getUserData('lastName') || '';
    profileImage = getUserData('profileImage') || '';
    isGuest = getUserData('profileImage') || false;

    get isLoggedIn() {
        return this.token ? true : false;
    }

    @Mutation
    SET_TOKEN(token: string) {
        this.token = token;
    }

    @Mutation
    SET_USERNAME(username: string) {
        this.username = username;
    }

    @Mutation
    SET_PROFILE_IMAGE(profileImage: null | string) {
        if (profileImage) {
            this.profileImage = profileImage;
        }
    }

    @Mutation
    SET_LAST_NAME(lastName: string) {
        this.lastName = lastName;
    }

    @Mutation
    SET_FIRST_NAME(firstName: string) {
        this.firstName = firstName;
    }

    @Mutation
    SET_EMAIL(email: string) {
        this.email = email;
    }

    @Mutation
    SET_IS_GUEST(isGuest: boolean) {
        this.isGuest = isGuest;
    }

    @Action({ rawError: true })
    public async login(userInfo: UserLogin) {
        const response = await loginUser(userInfo);
        const {
            user: { username, lastName, firstName, email, profileImage },
            token,
        } = response.data;

        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', token);

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        this.SET_USERNAME(username);
        this.SET_EMAIL(email);
        this.SET_LAST_NAME(lastName);
        this.SET_FIRST_NAME(firstName);
        this.SET_PROFILE_IMAGE(profileImage);
        this.SET_TOKEN(token);
    }

    @Action
    public async logout() {
        localStorage.removeItem('token');
        this.SET_TOKEN('');
        delete api.defaults.headers.common['Authorization'];
    }
}

export default getModule(User);
