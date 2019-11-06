<template>
    <div class="home">
        <FullScreenImage>
            <login-form />
        </FullScreenImage>
    </div>
</template>

<script>
import FullScreenImage from '@/components/FullScreenImage.vue';
import LoginForm from '@/components/LoginForm.vue';

export default {
    name: 'auth',
    components: {
        FullScreenImage,
        LoginForm,
    },
};
</script>
