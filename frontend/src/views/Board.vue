<template>
    <div :class="`container ${board.color}`">
        <h2 class="board-header">{{ board.title }}</h2>
        <Columns :columns="columns" :color="board.color" :boardId="board.id" />
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

    get columns() {
        const boardId = Number(this.$route.params.id);
        return columns.getColumnsByBoardId(boardId);
    }

    async created() {
        const boardId = Number(this.$route.params.id);
        await Promise.all([columns.getColumnsAndCards(boardId), boards.getBoardById(boardId)]);

        this.board = boards.byId[boardId];
    }
}
</script>

<style lang="scss" scoped>
.container {
    padding-top: 1.2rem;
    overflow: auto;
    color: #eee;
    height: 100%;
    width: 100%;
}

.board-header {
    padding: var(--gap);
    display: flex;
    color: white;
}
</style>
