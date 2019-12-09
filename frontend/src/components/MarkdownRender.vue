<template>
    <vue-markdown :html="false" class="markdown-render">
        <slot />
    </vue-markdown>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import VueMarkdown from 'vue-markdown';
@Component({
    name: 'MarkdownRender',
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
    ul {
        padding-left: 1.5rem;
    }

    img {
        max-width: 100%;
    }
}
</style>
