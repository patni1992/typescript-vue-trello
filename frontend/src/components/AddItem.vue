<template>
    <div class="add-card">
        <div v-if="!showAddInput">
            <h2 v-if="big" class="big" @click="setShowAddInput($event, true)">
                {{ label }}
                <font-awesome-icon v-if="!textValue" class="add-card-icon" :icon="['far', 'plus']" />
            </h2>
            <p v-else @click="setShowAddInput($event, true)">
                {{ label }}
                <font-awesome-icon v-if="!textValue" class="add-card-icon" :icon="['far', 'plus']" />
            </p>
        </div>
        <div v-click-outside="vcoConfig" class="container" v-else>
            <AppInput
                class="app-input"
                @keyup.enter.native.exact="save"
                v-model="title"
                :type="type"
                ref="input"
                :placeholder="placeholder"
            />
            <span @click="remove">
                <font-awesome-icon v-if="textValue" class="delete" :icon="['far', 'trash-alt']" />
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator';
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

    @Prop(String) textValue!: string;

    @Prop(Boolean) big!: boolean;

    @Prop(String) placeholder!: string;

    @Watch('showAddInput')
    onChildChanged(val: string, oldVal: string) {
        if (this.textValue) {
            this.title = this.textValue;
        }
    }

    vcoConfig = {
        handler: this.setShowAddInput,
        events: ['mousedown'],
    };

    title = '';
    showAddInput = false;

    @Emit()
    remove(e: Event) {
        this.showAddInput = false;

        return e;
    }

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
.container {
    display: flex;

    justify-content: center;
    align-items: center;
}

.delete {
    font-size: 1.8rem;
    margin: 0.8rem;
}
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
