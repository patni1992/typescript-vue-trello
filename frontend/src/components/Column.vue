<template>
    <div class="column">
        <div class="header" :style="{ backgroundColor: color }">
            <div>{{ truncateString(column.title, 63) }}</div>
        </div>
        <ul :style="{ backgroundColor: color }">
            <card v-for="card in cards" :key="card" :card="card" />
        </ul>
        <div class="footer">
            Add a card...
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import cards, { CardsData } from '@/store/cards';
import { ColumnsData } from '@/store/columns';
import Card from '@/components/Card.vue';

@Component({
    name: 'column',
    components: {
        Card,
    },
})
export default class Column extends Vue {
    @Prop({ type: Object, default: {} }) column!: ColumnsData;

    @Prop(String) color!: string;

    truncateString(str: string, num: number) {
        if (str.length <= num) {
            return str;
        }

        return `${str.slice(0, num)}...`;
    }

    cards: CardsData[] = [];

    created() {
        this.cards = cards.cardsByColumnId(this.column.id);
    }
}
</script>

<style lang="scss" scoped>
$column-width: 30rem;
$scrollbar-thickness: 17px;
$list-header-height: 36px;
$list-footer-height: 36px;
$list-border-radius: 5px;
$list-bg-color: #e2e4e6;

.column {
    width: $column-width;
    height: calc(100% - var(--gap) - #{$scrollbar-thickness});

    > * {
        background-color: $list-bg-color;
        color: #333;

        padding: 0 var(--gap);
    }

    .header {
        line-height: 2rem;
        font-size: 16px;
        padding: var(--gap);
        max-height: 4em;
        font-weight: bold;

        border-top-left-radius: $list-border-radius;
        border-top-right-radius: $list-border-radius;
        color: white;
        position: relative;

        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: inherit;
            z-index: 0;
            background-color: black;
            opacity: 0.3;
        }

        div {
            z-index: 2;
            position: relative;
            color: white;
        }
    }

    .footer {
        line-height: $list-footer-height;
        border-bottom-left-radius: $list-border-radius;
        border-bottom-right-radius: $list-border-radius;
        background-color: transparent;
        color: white;
        cursor: pointer;
        padding: 0.5rem 1rem;
    }

    ul {
        list-style: none;
        margin: 0;
        position: relative;
        max-height: calc(100% - #{$list-header-height} - #{$list-footer-height} - 1rem);
        overflow-y: auto;
        overflow-x: hidden;
        padding-bottom: 1rem;

        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            background-color: black;
            opacity: 0.3;
            overflow: auto;
        }
    }
}
</style>
