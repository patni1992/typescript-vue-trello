import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Vue from 'vue';
import { faClipboardListCheck, faSignOutAlt } from '@fortawesome/pro-regular-svg-icons';
import AppHeader from '@/components/AppHeader.vue';

library.add(faClipboardListCheck);
library.add(faSignOutAlt);
Vue.component('font-awesome-icon', FontAwesomeIcon);

describe('AppHeader', () => {
    test('is called', () => {
        const wrapper = shallowMount(AppHeader, {
            stubs: {
                RouterLink: RouterLinkStub,
            },
        });
        expect(wrapper.name()).toBe('AppHeader');
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    test('renders Router link to boards page', () => {
        const wrapper = shallowMount(AppHeader, {
            stubs: {
                RouterLink: RouterLinkStub,
            },
        });

        expect(wrapper.find('#logo-link').props().to).toMatchObject({ name: 'boards' });
    });

    test('if logged in show username', () => {
        const wrapper = shallowMount(AppHeader, {
            data() {
                return {
                    username: 'John Doe',
                };
            },
            computed: {
                isLoggedIn() {
                    return true;
                },
            },
            stubs: {
                RouterLink: RouterLinkStub,
            },
        });
        expect(wrapper.find('#username').text()).toBe('John Doe');
    });

    test('if logged in show sign-out-icon', () => {
        const wrapper = shallowMount(AppHeader, {
            computed: {
                isLoggedIn() {
                    return true;
                },
            },
            stubs: {
                RouterLink: RouterLinkStub,
            },
        });
        expect(wrapper.find('#sign-out-icon').exists()).toBe(true);
    });

    test('if not logged in hide username', () => {
        const wrapper = shallowMount(AppHeader, {
            computed: {
                isLoggedIn() {
                    return false;
                },
            },
            stubs: {
                RouterLink: RouterLinkStub,
            },
        });

        expect(wrapper.find('#username').exists()).toBe(false);
    });

    test('clicking sign-out-icon calls logout method', () => {
        const logout = jest.fn();
        const wrapper = shallowMount(AppHeader, {
            computed: {
                isLoggedIn() {
                    return true;
                },
            },
            methods: {
                logout,
            },
            stubs: {
                RouterLink: RouterLinkStub,
            },
        });

        wrapper.find('#sign-out-icon').trigger('click');

        expect(logout).toBeCalledTimes(1);
    });

    test('logout redirect to auth page', () => {
        const $router = {
            push: jest.fn(),
        };

        const wrapper: any = shallowMount(AppHeader, {
            mocks: {
                $router,
            },
            stubs: {
                RouterLink: RouterLinkStub,
            },
        });

        wrapper.vm.logout();

        expect($router.push).toBeCalledWith({ name: 'auth' });
    });
});
