<template>
    <div class="auth">
        <FullScreenImage>
            <login-form :loginError="loginError" :login="login" :guest="guest" :register="register" />
        </FullScreenImage>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FullScreenImage from '@/components/FullScreenImage.vue';
import LoginForm from '@/components/LoginForm.vue';
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
        user.SET_IS_GUEST(true);
        this.$router.push({ name: 'boards' });
    }

    async register(v) {
        await user.register(v)
        this.$snotify.success('Successfully registered, you can now login');
    }
}
</script>

<style lang="scss" scoped>
.auth {
    height: inherit;
}
</style>
