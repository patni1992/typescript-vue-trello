<template>
    <div class="auth">
        <FullScreenImage>
            <login-form :login="login" :guest="guest" :register="register" />
        </FullScreenImage>
    </div>
</template>

<script lang="ts">
import FullScreenImage from '@/components/FullScreenImage.vue';
import LoginForm from '@/components/LoginForm.vue';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
    components: {
        FullScreenImage,
        LoginForm,
    },
    name: 'auth',
})
export default class Auth extends Vue {
    login() {
        console.log('login');
    }
    guest() {
        console.log('lguest');
    }
    register() {
        console.log('register');
    }
}
</script>
