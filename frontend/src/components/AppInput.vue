<template>
    <textarea
        v-if="type == 'textarea'"
        class="input textarea"
        :style="{ height: inputHeight }"
        v-bind="$attrs"
        v-model="currentValue"
        ref="textarea"
    />

    <input
        v-else
        class="input"
        :class="{ small: small }"
        v-bind="$attrs"
        :type="type"
        :required="required"
        v-model="currentValue"
    />
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
@Component({
    name: 'AppInput',
})
export default class AppInput extends Vue {
    @Prop(String) value!: string;

    @Prop({ default: 'text' }) type!: string;

    @Prop(Boolean) small!: boolean;

    @Prop(Boolean) required!: boolean;

    $refs!: {
        textarea: HTMLFormElement;
    };

    inputHeight = '0';
    currentValue = '';

    resize() {
        if (!this.$refs.textarea) {
            return;
        }
        const height = this.currentValue.trim() ? this.$refs.textarea.scrollHeight : 120;
        this.inputHeight = `${height}px`;
    }

    created() {
        this.currentValue = this.value;
    }

    mounted() {
        if (this.type === 'textarea') {
            this.resize();
        }
    }

    @Watch('currentValue')
    oncurrentValueChanged(v: string) {
        if (this.type === 'textarea') {
            this.resize();
        }

        this.$emit('input', this.currentValue);
    }

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

.small {
    padding: 0.6rem 0.8rem;
}

.textarea {
    resize: vertical;
    min-height: 12rem;
}
</style>
