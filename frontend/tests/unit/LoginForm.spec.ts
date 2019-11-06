import { shallowMount, Wrapper } from '@vue/test-utils';
import LoginForm from '@/components/LoginForm.vue';

describe('LoginForm', () => {
    let wrapper: Wrapper<any>;
    const push = jest.fn();
    beforeEach(() => {
        const $router = {
            push,
        };
        wrapper = shallowMount(LoginForm, {
            mocks: {
                $router,
            },
        });
    });
    test('Call login method when login button is clicked', () => {
        const spyLogin = jest.spyOn(wrapper.vm, 'login');
        wrapper.setMethods({ login: spyLogin });
        wrapper.find('#loginButton').vm.$emit('click');

        expect(spyLogin).toBeCalledTimes(1);
    });
    test('Call guest method when guest button is clicked', () => {
        const guest = jest.spyOn(wrapper.vm, 'guest');
        wrapper.setMethods({ guest });
        wrapper.find('#guestButton').vm.$emit('click');

        expect(guest).toBeCalledTimes(1);
    });
    test('guest redirect to boards page', () => {
        wrapper.vm.guest();
        expect(push).toHaveBeenCalledWith({ name: 'boards' });
    });
});
