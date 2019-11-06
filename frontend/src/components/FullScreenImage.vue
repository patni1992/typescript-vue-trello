<template>
    <div class="background-image">
        <div class="children">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'FullScreenImage',
});
</script>

<style scoped lang="scss">
.background-image {
    background-image: url('~@/assets/post-notes.jpg');
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-color: #999;
    height: 100vh;
    width: 100vw;
    position: relative;
}

.children {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 3rem;
}
</style>
