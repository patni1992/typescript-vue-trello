<template>
    <div :class="`container ${board.color}`">
        <h2 class="board-header">{{ board.title }}</h2>
        <Columns :columns="columns" :color="board.color" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import boards from '@/store/boards';
import columns, { ColumnsData } from '@/store/columns';
import Columns from '@/components/Columns.vue';

@Component({
    name: 'board',
    components: {
        Columns,
    },
})
export default class Boards extends Vue {
    board = boards.emptyBoard;

    columns: ColumnsData[] = [];

    async created() {
        await Promise.all([
            columns.getColumnsAndCards(this.$route.params.id),
            boards.getBoardById(Number(this.$route.params.id)),
        ]);
        this.board = boards.byId[Number(this.$route.params.id)];
        this.columns = columns.getAllColumns;
    }
}
</script>

<style lang="scss" scoped>
.container {
    padding-top: 1.2rem;

    color: #eee;
}

.board-header {
    padding: var(--gap);
    display: flex;
    color: white;
}
</style>
