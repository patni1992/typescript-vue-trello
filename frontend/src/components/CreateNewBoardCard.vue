<template>
    <div class="board-box" @click="setShowCreate($event, true)" v-click-outside="setShowCreate">
        <div v-if="!showCreate">
            <h2>Create new board</h2>
        </div>
        <div v-if="showCreate">
            <h2>mest vahs</h2>
        </div>
    </div>
</template>

<script lang="ts">
import board, { BoardsData } from '@/store/board';
import { Component, Vue } from 'vue-property-decorator';
@Component({
    name: 'CreateNewBoardCard',
})
export default class CreateNewBoardCard extends Vue {
    showCreate = false;
    setShowCreate(e: Event, val: boolean) {
        this.showCreate = val ? val : false;
    }
}
</script>

<style lang="scss" scoped>
.board-box {
    width: 30rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: #ddd;

    &:hover {
        filter: brightness(94%);
    }

    h2 {
        color: black;
        font-size: 1.8rem;
    }
}
</style>
