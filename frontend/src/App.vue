<template>
    <div class="app" id="app">
        <app-header />
        <router-view />
        <vue-snotify></vue-snotify>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppHeader from '@/components/AppHeader.vue';

@Component({
    components: {
        AppHeader,
    },
    name: 'app',
})
export default class Boards extends Vue {}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lato:400,700|Roboto:400,700&display=swap');
*,
*::after,
*::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
}

h1 {
    font-size: 3rem;
    font-family: 'Roboto', sans-serif;
}

p,
input,
button,
a {
    font-family: 'Lato', sans-serif;
    font-size: 1.6rem;
}

a {
    color: var(--color-primary);
}

html {
    // This defines what 1rem is
    font-size: 62.5%; //1 rem = 10px; 10px/16px = 62.5%
}

body {
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    font-size: 1.6rem;
}

html,
body {
    height: 100%;
}
.app {
    height: 100%;
}
</style>
