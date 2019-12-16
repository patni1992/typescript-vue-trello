<template>
    <div v-if="!editMode" @click="toggleEdit" :class="`card ${card.color}`">
        <MarkdownRender>{{ card.content }} </MarkdownRender>
    </div>
    <app-input
        id="edit-card"
        v-click-outside="toggleEdit"
        ref="input"
        @keyup.enter.native.exact.prevent="save"
        type="textarea"
        v-model="content"
        v-else
    />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import MarkdownRender from './MarkdownRender.vue';
import AppInput from '@/components/AppInput.vue';
import cards, { CardsData } from '../store/cards';

@Component({
    name: 'Card',
    components: {
        MarkdownRender,
        AppInput,
    },
})
export default class Card extends Vue {
    @Prop(Object) card!: CardsData;

    editMode = false;
    content = '';

    created() {
        this.content = this.card.content;
    }

    toggleEdit() {
        if (this.editMode) {
            this.editMode = false;
            return;
        }
        this.editMode = true;
        this.$nextTick(() => this.$refs.input.$el.focus());
    }

    save() {
        this.editMode = false;
        cards.updateCard({
            content: this.content,
            color: this.card.color,
            id: this.card.id,
        });
    }

    $refs!: {
        input: HTMLFormElement;
    };
}
</script>

<style lang="scss" scoped>
$card-border-radius: 3px;
.card {
    cursor: pointer;
    width: 30rem;
    z-index: 2;
    position: relative;
    background-color: #fff;
    color: white;
    padding: var(--gap);
    word-wrap: break-word;
    margin-top: var(--gap);
    margin-bottom: 1rem;

    border-radius: $card-border-radius;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);

    code {
        white-space: normal;
    }

    &:first-child {
        margin-top: 0;
    }

    img {
        display: block;
        width: calc(100% + 2 * #{var(--gap)});
        margin: -var(--gap) 0 var(--gap) (-var(--gap));
        border-top-left-radius: $card-border-radius;
        border-top-right-radius: $card-border-radius;
    }
}
</style>
