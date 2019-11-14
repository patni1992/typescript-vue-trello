<template>
    <div class="container">
        <h1 :style="{ display: 'block' }">Your current boards</h1>
        <div class="boards">
            <div :style="{ backgroundColor: board.color }" v-for="board in allBoards" :key="board.id" class="board-box">
                <h2>{{ board.title }}</h2>
            </div>
            <create-new-board-card />
        </div>
    </div>
</template>

<script lang="ts">
import board, { BoardsData } from '@/store/board';
import { Component, Vue } from 'vue-property-decorator';
import CreateNewBoardCard from '@/components/CreateNewBoardCard.vue';

@Component({
    components: {
        CreateNewBoardCard,
    },
    name: 'boards',
})
export default class Boards extends Vue {
    get allBoards() {
        return board.getAllBoards;
    }
    async created() {
        await board.getBoards();
    }
}
</script>

<style lang="scss" scoped>
.container {
    h1 {
        text-align: center;
        margin: 2rem 0;
    }
}
.boards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100rem;
    margin: 0 auto;
}
.board-box {
    width: 30rem;
    margin: 1rem;
    height: 17rem;

    cursor: pointer;
    padding: 1rem;

    &:hover {
        filter: brightness(94%);
    }

    h2 {
        color: white;
        font-size: 1.8rem;
    }
}
</style>
