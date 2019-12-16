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
    .contains-task-list {
        list-style-type: none;
        padding-left: 0rem;
    }
    .task-list-item-checkbox {
        margin-right: 0.5rem;
    }
    code {
        white-space: normal;
    }
    ul {
        padding-left: 1.5rem;
    }

    img {
        max-width: 100%;
    }

    ul, ol, img, p, h1, h2, h3, h4 {
        padding-bottom: 0.8rem;
    }
}
</style>
