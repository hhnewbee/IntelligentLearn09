<template>
    <page>
        <div class="coursesContent">
            <course></course>
            <course></course>
            <course></course>
            <course></course>
            <course></course>
            <course></course>
            <course></course>
            <course></course>
        </div>
    </page>
</template>

<script>
    import page from './page.vue';
    import course from './course.vue'
    export default {
        data(){
          return{
              courses:[]
          }
        },
        components: {
            page,
            course
        }
    }
</script>

<style scoped lang="scss">
    .coursesContent{
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        width: 80%;
        margin: 20px 0;
    }
</style>

