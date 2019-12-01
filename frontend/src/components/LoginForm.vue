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
                    <app-button @click="register" id="registerButton" variant="primary" expanded>
                        Sign up
                    </app-button>
                </form>
            </div>
            <div v-show="showLogin" id="login-tab-content">
                <form class="login-form" action="" method="post">
                    <div v-if="loginError" class="error">
                        {{ loginError }}
                    </div>
                    <app-input
                        v-model="loginForm.username"
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

                    <app-button variant="primary" expanded type="button" id="loginButton" @click="login(loginForm)">
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
import { Vue, Component, Prop } from 'vue-property-decorator';
import AppButton from '@/components/AppButton.vue';
import AppInput from '@/components/AppInput.vue';

@Component({
    name: 'LoginForm',
    components: {
        AppButton,
        AppInput,
    },
})
export default class LoginForm extends Vue {
    @Prop(Function) login!: () => void;

    @Prop(Function) guest!: () => void;

    @Prop(Function) register!: () => void;

    @Prop(String) loginError!: string;

    showLogin = true;

    loginForm = {
        username: '',
        password: '',
    };
}
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
    width: 37rem;
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
}

.login-form,
.signup-form {
    margin: 3rem 3.5rem;
}

.form-wrap .help-text {
    margin-top: 0.6em;
    text-align: center;
    font-size: 1.4rem;
}

.error {
    color: #ed4337;
    margin: 1rem 0;
}
</style>
