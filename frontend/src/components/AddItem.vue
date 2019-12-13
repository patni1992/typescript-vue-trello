<template>
    <div class="add-card">
        <p :class="{ big: big }" v-if="!showAddInput" @click="setShowAddInput($event, true)">
            {{ label }}
            <font-awesome-icon class="add-card-icon" :icon="['far', 'plus']" />
        </p>
        <AppInput
            class="app-input"
            @keyup.enter.native.exact="save"
            v-model="title"
            :type="type"
            ref="input"
            v-click-outside="vcoConfig"
            v-else
            :placeholder="placeholder"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import Card from '@/components/Card.vue';
import AppInput from '@/components/AppInput.vue';

@Component({
    name: 'AddItem',
    components: {
        Card,
        AppInput,
    },
})
export default class AddInput extends Vue {
    @Prop(String) type!: 'textarea' | 'input';

    @Prop(String) label!: string;

    @Prop(Boolean) big!: boolean;

    @Prop(String) placeholder!: string;

    vcoConfig = {
        handler: this.setShowAddInput,
        events: ['mousedown'],
    };

    title = '';
    showAddInput = false;

    @Emit()
    save() {
        const eventValue = this.title;
        this.title = '';
        this.showAddInput = false;

        return eventValue;
    }

    $refs!: {
        input: HTMLFormElement;
    };

    setShowAddInput(e: Event, val: boolean) {
        this.showAddInput = val || false;
        if (val) {
            this.$nextTick(() => this.$refs.input.$el.focus());
        }
    }
}
</script>

<style lang="scss" scoped>
.big {
    font-weight: 700;
    font-size: 1.8rem;
}
.add-card {
    padding: 0.6rem 0;
    cursor: pointer;
    &-icon {
        margin-left: 0.5rem;
    }
}
</style>
