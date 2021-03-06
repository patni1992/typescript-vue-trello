<template>
    <div class="column">
        <div :class="`header darken-${color}`">
            <add-item
                big
                useHeader
                :textValue="column.title"
                :label="column.title"
                type="input"
                @remove="deleteColumn"
                @save="editColumn"
            />
            <hr class="header-seperator" />
            <add-item label="Add a card" type="textarea" @save="addNewCard" />
        </div>
        <container
            :get-child-payload="getChildPayload"
            @drop="e => onCardDrop(column.id, e)"
            group-name="col"
            class="cards"
            non-drag-area-selector="#edit-card"
            :class="`darken-${color}`"
        >
            <draggable v-for="card in cards" :key="card.id">
                <card :card="card" />
            </draggable>
        </container>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
// @ts-ignore
import { Container, Draggable } from 'vue-smooth-dnd';
import cards from '@/store/cards';
import columns, { ColumnsData } from '@/store/columns';
import Card from '@/components/Card.vue';
import AddItem from '@/components/AddItem.vue';

@Component({
    name: 'Column',
    components: {
        Card,
        Draggable,
        Container,
        AddItem,
    },
})
export default class Column extends Vue {
    @Prop({ type: Object, default: {} }) column!: ColumnsData;

    @Prop(String) color!: string;

    addNewCard(value: string) {
        cards.createCard({
            content: value,
            columnId: this.column.id,
        });
    }

    editColumn(value: string) {
        columns.editColumn({
            title: value,
            id: this.column.id,
        });
    }

    deleteColumn() {
        columns.deleteColumn(this.column.id);
    }

    onCardDrop(columnId: number, dropResult: any) {
        const removing = dropResult.removedIndex !== null && dropResult.addedIndex === null;
        const adding = dropResult.removedIndex === null && dropResult.addedIndex !== null;
        const moveSameColumn = dropResult.removedIndex !== null || dropResult.addedIndex !== null;
        const ignore = dropResult.removedIndex === null && dropResult.addedIndex === null;

        if (ignore) {
            return;
        }

        const payload = {
            from: dropResult.removedIndex,
            to: dropResult.addedIndex,
            action: '',
            card: dropResult.payload,
        };

        if (removing) {
            payload.action = 'REMOVE_CARD_COLUMN';
            cards.moveCard(payload);
        } else if (adding) {
            this.$nextTick(() => {
                payload.card.columnId = columnId;
                payload.card.position = dropResult.addedIndex;
                payload.action = 'ADD_CARD_COLUMN';
                cards.moveCard(payload);
            });
        } else if (moveSameColumn) {
            payload.action = 'MOVE_CARD_SAME_COLUMN';
            cards.moveCard(payload);
        }
    }

    getChildPayload(index: number) {
        return this.cards[index];
    }

    get cards() {
        return cards.cardsByColumnId(this.column.id);
    }

    truncateString(str: string, num: number) {
        if (str.length <= num) {
            return str;
        }

        return `${str.slice(0, num)}...`;
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
    display: table-cell;
    padding: 1rem;
    min-width: 30rem;
    max-width: 34rem;
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
            cursor: pointer;
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

    ul {
        list-style: none;
        margin: 0;
        position: relative;

        overflow-y: auto;
        overflow-x: hidden;
    }
}
</style>
