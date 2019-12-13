<template>
    <div class="container">
        <h1 :style="{ display: 'block' }">Your current boards</h1>
        <div class="boards">
            <create-new-board-card :onCreate="createBoard" />
            <div
                @click.self="navigate(board.id)"
                v-for="board in allBoards"
                :key="board.id"
                :class="`board-box ${board.color}`"
            >
                <h2 v-if="board.id !== editingBoard.id" @click="toggleEditingBoard($event, board)">
                    {{ board.title }}
                </h2>
                <div v-click-outside="vcoConfig" v-else>
                    <app-input
                        @keyup.enter.native.exact="save"
                        class="board-input"
                        ref="input"
                        small
                        v-model="editingBoard.title"
                    />
                    <font-awesome-icon @click="deleteBoard(board)" class="board-delete" :icon="['far', 'trash-alt']" />
                    <color-picker
                        :defaultColor="editingBoard.color"
                        v-model="editingBoard.color"
                        :colors="['red', 'green', 'blue', 'orange']"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import boards, { NewBoard, BoardsData } from '@/store/boards';
import CreateNewBoardCard from '@/components/CreateNewBoardCard.vue';
import ColorPicker from '@/components/ColorPicker.vue';
import AppInput from '@/components/AppInput.vue';

@Component({
    components: {
        CreateNewBoardCard,
        AppInput,
        ColorPicker,
    },
    name: 'boards',
})
export default class Boards extends Vue {
    editingBoard = {
        title: '',
        id: -1,
        color: '',
    };

    vcoConfig = {
        handler: this.toggleEditingBoard,
        events: ['mousedown'],
    };

    $refs!: {
        input: HTMLFormElement[];
    };

    resetEditBoard() {
        this.editingBoard = {
            title: '',
            id: -1,
            color: '',
        };
    }

    save() {
        boards.editBoard(this.editingBoard);
        this.resetEditBoard();
    }

    deleteBoard(board: BoardsData) {
        console.log('delete');
        boards.deleteBoard(board.id);
    }

    toggleEditingBoard(e: Event, board: BoardsData) {
        if (!board) {
            return this.resetEditBoard();
        }
        this.editingBoard = {
            id: board.id,
            title: board.title,
            color: board.color,
        };

        console.log(this.editingBoard);

        this.$nextTick(() => {
            this.$refs.input[0].$el.focus();
        });
    }

    get allBoards() {
        return boards.getAllBoards;
    }

    async created() {
        await boards.getBoards();
    }

    navigate(id: string) {
        this.$router.push({ name: 'board', params: { id } });
    }

    createBoard(newBoard: NewBoard) {
        boards.createNewBoard(newBoard);
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

.board-input {
    width: 90%;
}
.board-delete {
    font-size: 2rem;
    margin-left: 1rem;
    color: white;
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
