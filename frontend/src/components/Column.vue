<template>
    <div class="column">
        <div :class="`header darken-${color}`">
            <h2 class="header-title">{{ truncateString(column.title, 63) }}</h2>
            <hr class="header-seperator" />
            <add-card @save="addNewCard" />
        </div>
        <ul :class="`darken-${color}`">
            <draggable group="cards" v-model="cards">
                <card v-for="card in cards" :key="card.id" :card="card" />
            </draggable>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync } from 'vue-property-decorator';
import draggable from 'vuedraggable';
import cards from '@/store/cards';
import { ColumnsData } from '@/store/columns';
import Card from '@/components/Card.vue';
import AddCard from '@/components/AddCard.vue';

@Component({
    name: 'column',
    components: {
        Card,
        draggable,
        AddCard,
    },
})
export default class Column extends Vue {
    @Prop({ type: Object, default: {} }) column!: ColumnsData;

    @Prop(String) color!: string;

    @PropSync('name', { type: String }) syncedName!: string;

    addNewCard(value: string) {
        cards.createCard({
            content: value,
            columnId: this.column.id,
        });
    }

    get cards() {
        return cards.cardsByColumnId(this.column.id);
    }

    set cards(v) {
        cards.moveCards({ columnId: this.column.id, cards: v });
    }

    truncateString(str: string, num: number) {
        if (str.length <= num) {
            return str;
        }

        return `${str.slice(0, num)}...`;
    }

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
        color: #333;

        padding: 0 var(--gap) 2rem var(--gap);
    }

    .header {
        line-height: 2rem;
        font-size: 16px;
        padding: var(--gap);
        font-weight: bold;
        z-index: 100;
        border-top-left-radius: $list-border-radius;
        border-top-right-radius: $list-border-radius;
        color: white;
        position: relative;

        &-title {
            font-size: 1.8rem;
        }

        &-seperator {
            margin: 1rem 0;
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
        padding: 2.5rem 1rem;
    }

    ul {
        list-style: none;
        margin: 0;
        position: relative;

        overflow-y: auto;
        overflow-x: hidden;
    }
}
</style>
