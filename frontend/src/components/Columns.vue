<template>
    <div class="columns">
        <column v-for="column in columns" :key="column.id" :color="color" :column="column" />
    </div>
</template>

<script lang="ts">
import boards, { BoardsData } from '@/store/boards';
import { Component, Vue, Prop } from 'vue-property-decorator';
import CreateNewBoardCard from '@/components/CreateNewBoardCard.vue';
import Column from '@/components/Column.vue';

@Component({
    name: 'board',
    components: {
        Column,
    },
})
export default class Boards extends Vue {
    @Prop(Array) columns!: [];
    @Prop(String) color!: string;
    board = boards.emptyBoard;
    async created() {
        await boards.getBoards();
        this.board = boards.byId[this.$route.params.id];
    }
}
</script>

<style lang="scss" scoped>
.columns {
    display: flex;
    overflow-x: auto;
    > * {
        flex: 0 0 auto;
        margin-left: var(--gap);
    }
    &::after {
        content: '';
        flex: 0 var(--gap);
    }
}
</style>
