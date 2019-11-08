import { shallowMount, Wrapper } from '@vue/test-utils';
import LoginForm from '@/components/LoginForm.vue';

describe('LoginForm', () => {
    let wrapper: Wrapper<any>;
    let login: jest.Mock;
    let guest: jest.Mock;
    let register: jest.Mock;

    beforeEach(() => {
        login = jest.fn();
        guest = jest.fn();
        register = jest.fn();
        wrapper = shallowMount(LoginForm, {
            propsData: {
                login,
                guest,
                register,
            },
        });
    });

    test('is called', () => {
        expect(wrapper.name()).toBe('LoginForm');
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    test('call login method when login button is clicked', () => {
        wrapper.find('#loginButton').vm.$emit('click');

        expect(login).toBeCalledTimes(1);
    });

    test('call guest method when guest button is clicked', () => {
        wrapper.find('#guestButton').vm.$emit('click');
        expect(guest).toBeCalledTimes(1);
    });
    test('call register method when register button is clicked', () => {
        wrapper.find('#registerButton').vm.$emit('click');

        expect(register).toBeCalledTimes(1);
    });
});
