<template>
    <div class="columns">
        <column v-for="column in columns" :key="column.id" :color="color" :column="column" />
        <div class="add-column">
            <div class="content">
                <div class="text">
                    Add a column
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import boards from '@/store/boards';
import Column from '@/components/Column.vue';

@Component({
    name: 'Columns',
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
.add-column {
    width: 30rem;

    .text {
        z-index: 2;
        color: white;
        font-weight: bold;
        padding: 1rem;
        cursor: pointer;
    }
}
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

    &:last-child {
        margin-right: 1rem;
    }
}
</style>
