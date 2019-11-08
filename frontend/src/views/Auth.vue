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

export default Vue.extend({
    name: 'auth',
    components: {
        FullScreenImage,
        LoginForm,
    },
    methods: {
        login() {
            console.log('login');
        },
        guest() {
            console.log('lguest');
        },
        register() {
            console.log('register');
        },
    },
});
</script>
