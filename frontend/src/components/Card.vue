<template>
    <li class="card">{{ card }}</li>
</template>

<script lang="ts">
import boards, { BoardsData } from '@/store/boards';
import { Component, Vue, Prop } from 'vue-property-decorator';
import CreateNewBoardCard from '@/components/CreateNewBoardCard.vue';

@Component({
    name: 'card',
})
export default class Card extends Vue {
    @Prop(String) card!: string;
}
</script>

<style lang="scss" scoped>
$card-border-radius: 3px;
.card {
    z-index: 2;
    position: relative;
    background-color: #fff;
    padding: var(--gap);

    margin-top: var(--gap);

    border-radius: $card-border-radius;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);

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
