<template>
    <div>
        <h1>This is id {{ $route.params.id }}</h1>
    </div>
</template>

<script lang="ts">
import board, { BoardsData } from '@/store/board';
import { Component, Vue } from 'vue-property-decorator';
import CreateNewBoardCard from '@/components/CreateNewBoardCard.vue';

@Component({
    name: 'board',
})
export default class Boards extends Vue {}
</script>

<style lang="scss" scoped></style>
