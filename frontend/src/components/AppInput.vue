<template>
    <textarea
        v-if="type == 'textarea'"
        class="input textarea"
        :value="value"
        v-bind="$attrs"
        @input="input($event.target.value)"
    />

    <input
        v-else
        class="input"
        v-bind="$attrs"
        :type="type"
        :value="value"
        :required="required"
        @input="input($event.target.value)"
    />
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
@Component({
    name: 'AppInput',
})
export default class AppInput extends Vue {
    @Prop(String) value!: string;

    @Prop({ default: 'text' }) type!: string;

    @Prop(Boolean) required!: boolean;

    @Emit()
    input() {}
}
</script>

<style scoped lang="scss">
.input {
    color: inherit;
    font-family: inherit;
    padding: 1.2rem 0 1rem 1.2rem;
    border: 1.2px solid #cfcfcf;
    outline: 0;
    display: inline-block;
    margin: 0;
    padding-right: 1rem;
    width: 100%;
    color: black;
    font-size: 1.6rem;
    border-radius: 0.4rem;
}

.textarea {
    resize: vertical;
    height: 10rem;
}
</style>
