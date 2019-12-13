<template>
    <div v-click-outside="clickOutside" v-show="show">
        <app-input
            @keyup.enter.native.exact="save"
            class="board-input"
            ref="input"
            small
            v-model="ediitingBoard.title"
        />
        <font-awesome-icon class="board-delete" :icon="['far', 'trash-alt']" />
        <color-picker :colors="['red', 'green', 'blue', 'orange']" />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import ColorPicker from '@/components/ColorPicker.vue';
import AppInput from '@/components/AppInput.vue';
import { BoardsData } from '../store/boards';

@Component({
    components: {
        AppInput,
        ColorPicker,
    },
    name: 'boards',
})
export default class Boards extends Vue {
    @Prop(Object) board!: BoardsData;

    @Prop(Boolean) show!: boolean;

    ediitingBoard = {
        color: '',
        title: '',
        id: -1,
    };

    $refs!: {
        input: HTMLFormElement;
    };

    save() {
        console.log(this.ediitingBoard);
    }

    created() {
        this.ediitingBoard = {
            id: this.board.id,
            title: this.board.title,
            color: this.board.color,
        };

        this.$nextTick(() => {
            this.$refs.input.$el.focus();
        });
    }

    clickOutside(e) {
        this.$nextTick(() => {
            if (this.show) {
                this.$emit('clickOutside');
            }
        });
    }
}
</script>

<style lang="scss" scoped>
.board-input {
    width: 90%;
}
.board-delete {
    font-size: 2rem;
    margin-left: 1rem;
    color: white;
}
</style>
