<template>
    <input
        class="input"
        :type="type"
        :value="value"
        :required="required"
        v-on:input="updateValue($event.target.value)"
    />
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

export default Vue.extend({
    name: 'AppInput',
    props: {
        value: String,
        type: {
            type: String,
            default: 'text',
        },

        required: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        updateValue(value: string) {
            this.$emit('input', value);
        },
    },
});
</script>

<style scoped lang="scss">
.input {
    color: inherit;
    font-family: inherit;
    padding: 1.2rem 0 1rem 1.2rem;
    border: 1.2px solid #cfcfcf;
    outline: 0;
    display: inline-block;
    margin: 0 0 1rem 0;
    padding-right: 1rem;
    width: 100%;
    color: black;
    font-size: 1.6rem;
    border-radius: 0.4rem;
}
</style>
