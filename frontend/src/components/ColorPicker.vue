<template>
    <div class="color-picker">
        <span :class="`dot ${color}`" @click="selectColor(color)" v-for="color in colors" :key="color">
            <font-awesome-icon
                v-if="selected === color"
                class="checked"
                :style="{ color: 'white' }"
                :icon="['far', 'check']"
            />
        </span>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component({
    name: 'ColorPicker',
})
export default class ColorPicker extends Vue {
    @Prop(String) defaultColor!: string;

    @Prop({ type: Array, required: true }) colors!: string[];

    selected = this.defaultColor ? this.defaultColor : this.colors[0];

    selectColor(color: string) {
        this.selected = color;
        this.$emit('input', color);
    }
}
</script>

<style lang="scss" scoped>
.color-picker {
    background-color: white;
    margin-top: 1rem;
    padding: 0.2rem;
    display: inline-flex;
}

.dot {
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
    display: inline-block;
    margin: 0.2rem 0.6rem;
    position: relative;
}

.checked {
    position: absolute;
    top: 4px;
    left: 4px;
}
</style>
