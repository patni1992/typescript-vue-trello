<template>
    <li :style="{ backgroundColor: card.color }" class="card">
        <MarkdownRender>{{ card.content }} </MarkdownRender>
    </li>
</template>

<script lang="ts">
import boards, { BoardsData } from '@/store/boards';
import { Component, Vue, Prop } from 'vue-property-decorator';
import CreateNewBoardCard from '@/components/CreateNewBoardCard.vue';
import MarkdownRender from './MarkdownRender.vue';

@Component({
    name: 'card',
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
    z-index: 2;
    position: relative;
    background-color: #fff;
    color: white;
    padding: var(--gap);
    word-wrap: break-word;
    margin-top: var(--gap);

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
