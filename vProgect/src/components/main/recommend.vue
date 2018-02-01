<template>
    <div>
        <el-carousel type="card" height="200px" indicator-position="inside" style="margin: 0 40px">
            <el-carousel-item v-for="item in 6" :key="item">
                <h3>{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>
        <div class="autoContent">
            <div class="type">智能推荐</div>
            <div class="ctype">课程推荐</div>
            <div class="more">更多  <span class="fa fa-chevron-right"></span></div>
            <div class="courseContent">
                <router-link :to="{name:'course'}">
                    <course></course>
                </router-link>
                <course></course>
                <course></course>
                <course></course>
                <course></course>
                <course></course>
                <course></course>
                <course></course>
            </div>
            <div class="ctype">文章推荐</div>
            <div class="more">更多  <span class="fa fa-chevron-right"></span></div>
            <div class="articleContent">
                <article_></article_>
                <article_></article_>
            </div>
        </div>
    </div>
</template>

<script>
import course from '../main/course.vue';
import article_ from '../main/article.vue';
export default {
    methods:{
        handlerCourse(){
            this.$router.push();
        }
    },
    components:{
        course,
        article_
    }
}
</script>

<style scoped lang="scss">
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    .autoContent{
        margin: 0 40px;
        display: flex;
        flex-direction: column;
        padding: 20px 10px;
        box-shadow: 4px 4px 18px rgba(136, 136, 136, 0.5882352941176471);
        .type{
            font-size: 18px;
            align-items: flex-start;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .ctype{
            font-size: 16px;
            font-weight: bold;
            margin: 5px 0;
            align-self: center;
        }
        .more{
            align-self: flex-end;
            margin-right: 100px;
            cursor: default;
            color:#00a0e9;
        }
        .courseContent{
            align-self: center;
            width: 80%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin: 10px 0;
        }
    }
    .articleContent{
        align-self: center;
        width: 80%;
        margin: 0 40px;
    }
</style>

