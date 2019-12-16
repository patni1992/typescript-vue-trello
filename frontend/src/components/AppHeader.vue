<template>
    <header class="header">
        <router-link id="logo-link" class="logo" :to="{ name: 'boards' }">
            <font-awesome-icon :style="{ color: 'white' }" :icon="['far', 'clipboard-list-check']" />
            <h1 class="logo-text">Boards</h1>
        </router-link>
        <div v-if="isLoggedIn || isGuest" class="user">
            <span id="username">{{ username }}</span>
            <span id="sign-out-icon" @click="logout" class="sign-out">
                <font-awesome-icon :icon="['far', 'sign-out-alt']" />
            </span>
        </div>
    </header>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import user from '@/store/user';

@Component({
    name: 'AppHeader',
})
export default class AppHeader extends Vue {
    username = user.username;

    get isLoggedIn() {
        return user.isLoggedIn;
    }

    get isGuest() {
        return user.isGuest;
    }

    logout() {
        user.logout();
        this.$router.push({ name: 'auth' });
    }
}
</script>

<style scoped lang="scss">
.header {
    display: flex;
    height: var(--header-height);
    align-items: center;
    background-color: #555555;
    font-size: 1.6rem;
    padding: 1rem 2rem;
    justify-content: space-between;
}

.user {
    font-size: 2rem;
    color: white;
    display: flex;
}

.sign-out {
    margin-left: 2rem;
    font-size: 2.5rem;
    cursor: pointer;
}

.logo {
    text-decoration: none;
    display: flex;
    margin-right: 0.8rem;
    color: white;
    font-size: 2.5rem;

    &-text {
        margin-left: 1rem;
        font-size: 2.5rem;
    }
}
</style>
