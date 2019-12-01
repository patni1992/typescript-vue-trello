<template>
    <div :style="{ backgroundColor: board.color }" class="container">
        <h2 class="board-header">{{ board.title }}</h2>
        <Columns :columns="columns" :color="board.color" />
    </div>
</template>

<script lang="ts">
import boards, { BoardsData } from '@/store/boards';
import columns, { ColumnsData } from '@/store/columns';
import { Component, Vue } from 'vue-property-decorator';
import CreateNewBoardCard from '@/components/CreateNewBoardCard.vue';
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
            columns.getColumnsAndCards(Number(this.$route.params.id)),
            boards.getBoardById(Number(this.$route.params.id)),
        ]);
        this.board = boards.byId[Number(this.$route.params.id)];
        this.columns = columns.getAllColumns;
    }
}
</script>

<style lang="scss" scoped>
.container {
    height: calc(100vh - var(--header-height));
    padding-top: 1.2rem;
    display: grid;
    grid-template-rows: 4rem 1fr;
    color: #eee;
}

.board-header {
    padding-left: var(--gap);
    display: flex;
    color: white;
}
</style>
