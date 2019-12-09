<template>
    <div class="box" v-click-outside="setShowCreate">
        <div class="new-board" @click.stop="setShowCreate($event, true)" v-if="!showCreate">
            <h2>Create new board</h2>
        </div>
        <div class="create-board" v-if="showCreate">
            <input v-model="boardTitle" placeholder="Add board title" />
            <color-picker :colors="['red', 'green', 'blue', 'orange']" v-model="selectedColor" />
            <button @click="createBoard" :disabled="!boardTitle.length" class="create-btn" type="button">
                Create
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ColorPicker from '@/components/ColorPicker.vue';

interface onCreateData {
    title: string;
    color: string;
}
@Component({
    name: 'CreateNewBoardCard',
    components: {
        ColorPicker,
    },
})
export default class CreateNewBoardCard extends Vue {
    @Prop(Function) onCreate!: (newBoard: onCreateData) => void;

    showCreate = false;

    boardTitle = '';

    selectedColor = '';

    setShowCreate(e: Event, val: boolean) {
        this.showCreate = val || false;
    }

    createBoard() {
        this.onCreate({ title: this.boardTitle, color: this.selectedColor });
        this.boardTitle = '';
    }
}
</script>

<style lang="scss" scoped>
.box {
    width: 30rem;
    margin: 1rem;
    height: 17rem;
    padding: 0;
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

.new-board {
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    height: 100%;
}

.create-board {
    margin: 1rem;
    input {
        width: 100%;
        padding: 0.8rem;
    }
}

.create-btn {
    margin-top: 1rem;
    padding: 1rem 2.5rem;
    color: white;
    background-color: #46b364;
    font-weight: 700;
    display: block;
    transition: all 0.7s;
    cursor: pointer;

    &:disabled {
        background-color: #cccccc;
        color: black;
        cursor: not-allowed;
    }
}
</style>
