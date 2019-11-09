<template>
    <button
        v-on="$listeners"
        v-bind:value="value"
        v-bind="$attrs"
        class="button"
        :class="[
            variant,
            {
                'full-width': expanded,
            },
        ]"
    >
        <slot />
    </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
    name: 'AppButton',
})
export default class AppButton extends Vue {
    @Prop(String) readonly variant!: string;
    @Prop(Boolean) readonly expanded!: boolean;
    @Prop([String, Number]) readonly value!: string | boolean;
}
</script>

<style scoped lang="scss">
.button {
    padding: 1.2rem 1rem 1rem 1.2rem;
    font-size: 1.6rem;
    border: none;
    color: #fff;
    cursor: pointer;
    text-transform: uppercase;
    text-align: center;
    display: inline-block;
    margin: 0 0 1rem 0;
    border-radius: 0.4rem;

    &:hover {
        filter: brightness(110%);
    }
}

.primary {
    background-color: var(--color-primary);
}

.dark {
    background-color: var(--color-gray);
}

.full-width {
    display: block;
    width: 100%;
}
</style>
