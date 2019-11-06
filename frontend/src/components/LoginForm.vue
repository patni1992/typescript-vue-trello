<template>
    <div class="form-wrap">
        <div class="tabs">
            <h3 :class="{ active: showLogin }" @click="showLogin = true" class="tab">
                Login
            </h3>
            <h3 :class="{ active: !showLogin }" @click="showLogin = false" class="tab">
                Sign Up
            </h3>
        </div>
        <div class="tabs-content">
            <div v-show="!showLogin" id="signup-tab-content" class="active">
                <form class="signup-form" action="" method="post">
                    <app-input type="email" id="user_email" placeholder="Email" />
                    <app-input type="text" id="user_name" placeholder="Username" />
                    <app-input type="password" id="user_pass" placeholder="Password" />
                    <app-input type="password" id="user_pass_repeat" placeholder="Confirm password" />
                    <app-button variant="primary" expanded>
                        Sign up
                    </app-button>
                </form>
            </div>
            <div v-show="showLogin" id="login-tab-content">
                <form class="login-form" action="" method="post">
                    <app-input
                        v-model="loginForm.userName"
                        type="text"
                        class="input"
                        id="login_username"
                        placeholder="Email or Username"
                    />
                    <app-input
                        v-model="loginForm.password"
                        type="password"
                        class="input"
                        id="login_password"
                        placeholder="Password"
                    />

                    <app-button variant="primary" expanded type="button" id="loginButton" @click="login">
                        Login
                    </app-button>
                    <app-button variant="dark" expanded type="button" id="guestButton" @click="guest">
                        Continue as Guest
                    </app-button>
                </form>
                <div class="help-text">
                    <p><a href="#">Forget your password?</a></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AppButton from '@/components/AppButton.vue';
import AppInput from '@/components/AppInput.vue';
export default Vue.extend({
    name: 'LoginForm',
    components: {
        AppButton,
        AppInput,
    },
    data() {
        return {
            showLogin: true,
            loginForm: {
                userName: '',
                password: '',
            },
        };
    },
    methods: {
        login() {
            console.log(this.loginForm);
        },
        guest() {
            this.$router.push({ name: 'boards' });
        },
        signUp() {
            alert('this bitche sign up ');
        },
    },
    props: {
        msg: String,
    },
});
</script>

<style scoped lang="scss">
.tab {
    cursor: pointer;
}

.form-wrap .tabs {
    overflow: hidden;
    a {
        text-decoration: none;
    }
}

.form-wrap {
    background-color: rgba(255, 255, 255, 0.9);
    width: 40rem;
    height: 38rem;
    margin: 3em auto;
    box-shadow: 0px 1px 8px #bebebe;
    .tabs {
        h3 {
            padding: 1rem 0;
            text-align: center;
            font-weight: 400;
            background-color: #e6e7e8;
            display: block;
            color: #666;
            float: left;
            width: 50%;
        }
        .active {
            background-color: #fff;
        }
    }
    .tabs-content {
        padding: 1.5em;
    }
}

.form-wrap .help-text {
    margin-top: 0.6em;
    text-align: center;
    font-size: 1.4rem;
}
</style>
