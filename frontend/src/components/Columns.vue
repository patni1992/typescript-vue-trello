<template>
    <Container :get-child-payload="getChildPayload" @drop="onColumnDrop" orientation="horizontal">
        <Draggable v-for="column in columns" :key="column.id">
            <column :color="color" :column="column" />
        </Draggable>

        <div :class="`add-column `">
            <div :class="`content darken-${color}`">
                <div class="text da">
                    Add a column
                </div>
            </div>
        </div>
    </Container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Container, Draggable } from 'vue-smooth-dnd';
import Column from '@/components/Column.vue';
import columns from '@/store/columns';

interface DropResponse {
    removedIndex: number;
    addedIndex: number;
    payload: any;
}

@Component({
    name: 'Columns',
    components: {
        Column,
        Container,
        Draggable,
    },
})
export default class Columns extends Vue {
    @Prop(Array) columns!: [];

    @Prop(String) color!: string;

    @Prop(Number) boardId!: number;

    getChildPayload(index: number) {
        return this.columns[index];
    }

    onColumnDrop(dropResult: DropResponse) {
        columns.moveColumn({
            from: dropResult.removedIndex,
            to: dropResult.addedIndex,
            columnId: dropResult.payload.id,
            boardId: this.boardId,
        });
    }
}
</script>

<style lang="scss" scoped>
.add-column {
    min-width: 30rem;
    display: table-cell;
    height: 10rem;
    padding: 1rem;
    .content {
        border-radius: 5px;
        height: 4rem;
    }
    .text {
        z-index: 2;
        color: white;
        font-weight: bold;
        padding: 1rem;
        cursor: pointer;
    }
}
</style>
