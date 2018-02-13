<template>
    <page>
        <div class="articlesContent">
            <article_></article_>
            <article_></article_>
            <article_></article_>
            <article_></article_>
        </div>
    </page>
</template>

<script>
    import page from './page.vue';
    import article_ from './article.vue'
    export default {
        components: {
            page,
            article_
        }
    }
</script>

<style scoped lang="scss">
    .articlesContent{
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        width: 80%;
        margin: 20px 0;
    }
</style>

