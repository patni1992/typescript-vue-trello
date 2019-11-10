import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators';
import { loginUser } from '@/api';
import store from '@/store';

function getToken() {
    const token = localStorage.getItem('token');

    return token ? token : '';
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
}

export interface UserLogin {
    username: string;
    password: string;
}

@Module({ dynamic: true, name: 'user', store, namespaced: true })
class User extends VuexModule implements UserState {
    public token = getToken();
    public username = '';
    public email = '';
    public firstName = '';
    public lastName = '';
    public profileImage = '';

    @Mutation
    private SET_TOKEN(token: string) {
        this.token = token;
    }

    @Mutation
    private SET_USERNAME(name: string) {
        this.username = name;
    }

    @Mutation
    private SET_PROFILE_IMAGE(profileImage: null | string) {
        if (profileImage) {
            this.profileImage = profileImage;
        }
    }

    @Mutation
    private SET_LAST_NAME(name: string) {
        this.lastName = name;
    }

    @Mutation
    private SET_FIRST_NAME(name: string) {
        this.lastName = name;
    }

    @Mutation
    private SET_EMAIL(email: string) {
        this.email = email;
    }

    @Action({ rawError: true })
    public async login(userInfo: UserLogin) {
        const response = await loginUser(userInfo);
        const {
            user: { username, lastName, firstName, email, profileImage },
            token,
        } = response.data;
        this.SET_USERNAME(username);
        this.SET_EMAIL(email);
        this.SET_LAST_NAME(lastName);
        this.SET_FIRST_NAME(firstName);
        this.SET_PROFILE_IMAGE(profileImage);
        this.SET_TOKEN(token);
    }

    @Action
    public async LogOut() {
        localStorage.removeItem('token');
        this.SET_TOKEN('');
    }
}

export default getModule(User);
