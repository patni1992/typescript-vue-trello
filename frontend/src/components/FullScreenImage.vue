<template>
    <div class="background-image">
        <div class="children">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
    name: 'FullScreenImage',
})
export default class FullScreenImage extends Vue {}
</script>

<style scoped lang="scss">
.background-image {
    background-image: url('~@/assets/post-notes.jpg');
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    height: 100%;
    overflow: hidden;

    position: relative;
}

.children {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 3rem;

    margin-top: 15rem;
}
</style>
