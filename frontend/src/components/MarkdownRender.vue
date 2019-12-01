<template>
    <vue-markdown class="markdown-render">
        <slot />
    </vue-markdown>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import VueMarkdown from 'vue-markdown';
@Component({
    name: 'markdownRender',
    components: {
        VueMarkdown,
    },
})
export default class Card extends Vue {}
</script>


<style lang="scss">
// Dont apply scoped, will not affect vue-markdown
.markdown-render {
    code {
        white-space: normal;
    }
}
</style>
