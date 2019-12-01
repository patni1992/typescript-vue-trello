<template>
    <header class="header">
        <router-link class="logo" :style="{ textDecoration: 'none', display: 'flex' }" to="/">
            <font-awesome-icon :style="{ color: 'white' }" :icon="['far', 'clipboard-list-check']" />
            <h1 class="logo-text">Boards</h1>
        </router-link>
    </header>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
    name: 'AppHeader',
})
export default class AppHeader extends Vue {}
</script>

<style scoped lang="scss">
.header {
    display: flex;
    height: var(--header-height);
    align-items: center;
    background-color: #555555;
    font-size: 1.6rem;
    padding: 1rem;
}

.logo {
    margin-right: 0.8rem;
    color: white;
    font-size: 2.5rem;

    &-text {
        margin-left: 1rem;
        font-size: 2.5rem;
    }
}
</style>
