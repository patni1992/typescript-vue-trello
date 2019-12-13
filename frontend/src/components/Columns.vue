<template>
    <Container :get-child-payload="getChildPayload" @drop="onColumnDrop" orientation="horizontal">
        <Draggable v-for="column in columns" :key="column.id">
            <column :color="color" :column="column" />
        </Draggable>

        <div :class="`add-column `">
            <div :class="`content darken-${color}`">
                <add-item
                    @save="addColumn"
                    label="add a new column"
                    placeholder="Enter a column title"
                    big
                    type="input"
                />
            </div>
        </div>
    </Container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Container, Draggable } from 'vue-smooth-dnd';
import Column from '@/components/Column.vue';
import columns from '@/store/columns';
import AppInput from '@/components/AppInput.vue';
import AddItem from '@/components/AddItem.vue';

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
        AppInput,
        AddItem,
    },
})
export default class Columns extends Vue {
    @Prop(Array) columns!: [];

    @Prop(String) color!: string;

    @Prop(Number) boardId!: number;

    showColumnInput = false;

    getChildPayload(index: number) {
        return this.columns[index];
    }

    addColumn(title: string) {
        columns.createColumn({ title, boardId: this.boardId });
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

    padding: 1rem;
    .content {
        border-radius: 5px;
        padding: 0.8rem 1rem;
    }
    .text {
        z-index: 2;
        color: white;
        font-weight: bold;

        cursor: pointer;
    }
}
</style>
