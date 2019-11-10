<template>
    <div class="auth">
        <FullScreenImage>
            <login-form :loginError="loginError" :login="login" :guest="guest" :register="register" />
        </FullScreenImage>
    </div>
</template>

<script lang="ts">
import FullScreenImage from '@/components/FullScreenImage.vue';
import LoginForm from '@/components/LoginForm.vue';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import user from '@/store/user';

@Component({
    components: {
        FullScreenImage,
        LoginForm,
    },
    name: 'auth',
})
export default class Auth extends Vue {
    loginError = '';
    async login(userInfo: { username: string; password: string }) {
        try {
            await user.login(userInfo);
            this.loginError = '';
            this.$router.push({ name: 'boards' });
        } catch (e) {
            if (e.response.status === 401) {
                this.loginError = 'Wrong username or password';
            }
        }
    }
    guest() {
        console.log('lguest');
    }
    register() {
        console.log('register');
    }
}
</script>

<style lang="scss" scoped>
.auth {
    height: inherit;
}
</style>
