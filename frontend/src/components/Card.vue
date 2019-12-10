<template>
    <div :class="`card ${card.color}`">
        <MarkdownRender>{{ card.content }} </MarkdownRender>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import MarkdownRender from './MarkdownRender.vue';

@Component({
    name: 'Card',
    components: {
        MarkdownRender,
    },
})
export default class Card extends Vue {
    @Prop(Object) card!: object;
}
</script>

<style lang="scss" scoped>
$card-border-radius: 3px;
.card {
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
