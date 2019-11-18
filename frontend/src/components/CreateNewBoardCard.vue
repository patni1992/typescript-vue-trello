<template>
    <div class="box" v-click-outside="setShowCreate">
        <div class="new-board" @click.stop="setShowCreate($event, true)" v-if="!showCreate">
            <h2>Create new board</h2>
        </div>
        <div class="create-board" v-if="showCreate">
            <input v-model="boardTitle" placeholder="Add board title" />
            <color-picker :colors="['#0279BF', '#FFAB4A', '#4ABF6B', '#eb5a46']" v-model="selectedColor" />
            <button class="create-btn" type="button">
                Create
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import board, { BoardsData } from '@/store/board';
import { Component, Vue } from 'vue-property-decorator';
import ColorPicker from '@/components/ColorPicker.vue';
@Component({
    name: 'CreateNewBoardCard',
    components: {
        ColorPicker,
    },
})
export default class CreateNewBoardCard extends Vue {
    showCreate = false;
    boardTitle = '';
    selectedColor = '';
    setShowCreate(e: Event, val: boolean) {
        this.showCreate = val ? val : false;
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
}
</style>
