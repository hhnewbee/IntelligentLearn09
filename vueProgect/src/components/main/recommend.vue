<template>
    <transition name="fade">
        <div class="recommend">
            <!--轮播图-->
            <el-carousel
                    type="card"
                    height="200px"
                    indicator-position="inside"
                    class="carousel">
                <el-carousel-item v-for="item in carousel" :key="item.id">
                    <img :src="item" style="width: 100%;height: 100%" @click="handleCarousel(item)"/>
                </el-carousel-item>
            </el-carousel>
            <div class="recommendContent">
                <div class="type">智能推荐</div>
                <div class="course">
                    <div class="ListType">课程推荐</div>
                    <div class="more" @click="handleMore('coursesPage')">更多&nbsp;<span class="fa fa-chevron-right"></span></div>
                    <div class="courseList">
                        <img v-if="listNow.courses.slice(0,12).length===0"
                             style="margin: 0 auto"
                             src="../../static/imgs/notData.png">
                        <courseItem v-for="item in listNow.courses.slice(0,12)"
                                    :key="item.title"
                                    :data="item">
                        </courseItem>
                    </div>
                </div>
                <div class="article">
                    <div class="ListType">文章推荐</div>
                    <div class="more" @click="handleMore('articlesPage')">更多&nbsp;<span class="fa fa-chevron-right"></span></div>
                    <div class="articleList">
                        <img v-if="listNow.articles.length===0"
                             src="../../static/imgs/notData.png">
                        <articleItem
                                v-for="item in listNow.articles"
                                :key="item.title"
                                :itemData="item">
                        </articleItem>
                    </div>
                </div>
            </div>
            <footer_></footer_>
            <backHeader></backHeader>
        </div>
    </transition>
</template>

<script>
    import courseItem from './courseItem.vue';
    import articleItem from './articleItem.vue';
    import footer_ from '../footer/footer.vue';
    import backHeader from '../header/backHeader.vue';
    import {areaCaching} from '../mixins.js';

    export default {
        created() {
            this.initData();
        },
        data(){
            return{
                carousel:[]
            }
        },
        watch:{
            //轮播图的数据
            listNow(){
                //todo 手动添加轮播图，为了展示效果
//                this.carousel= [
//                    'http://127.0.0.1:3100/img/lb/a.jpg',
//                    'http://127.0.0.1:3100/img/lb/b.jpg',
//                    'http://127.0.0.1:3100/img/lb/c.jpg',
//                    'http://127.0.0.1:3100/img/lb/d.jpg',
//                    'http://127.0.0.1:3100/img/lb/e.jpg',
//                ]
                //todo 部署需要，又改了回去
                this.carousel=this.listNow.courses.slice(0,5);
            }
        },
        methods: {
            initData() {
                this.handleChangeArea('p1', 'recommend');
            },
            /**
             * 轮播图进入
             */
            handleCarousel(item) {
                this.$router.push({path: `/course/${item.id}`, query: {path: this.$route.path}});
            },
            /**
             * 更多
             */
            handleMore(path){
                this.$router.push({path: `/main/${path}`});
            }
        },
        components: {
            courseItem,
            articleItem,
            footer_,
            backHeader
        },
        mixins: [areaCaching]
    }
</script>

<style scoped lang="scss">
    $cnntentWith: 1200px;
    .fade-enter-active, .fade-leave-active {
        //transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
        //opacity: 0;
    }

    .recommend {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: $mainPageColor;
        a {
            text-decoration: none;
        }
        //轮播图
        .carousel {
            width: $cnntentWith;
            margin: 20px 40px 0;
            flex-shrink: 0;
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
        }
        .recommendContent {
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: $cnntentWith;
            padding: 20px 0;
            margin: 20px 50px;
            box-shadow: 4px 4px 18px rgba(136, 136, 136, 0.5882352941176471);
            background-color: white;
            /*智能推荐*/
            .type {
                align-self: flex-start;
                font-size: 18px;
                font-weight: bold;
                margin-left: 40px;
                margin-bottom: 5px;
                color: $primaryColor;
            }
            /*分类标题*/
            .ListType {
                font-size: 16px;
                font-weight: bold;
                margin: 10px 0;
                align-self: center;
                color: $primaryColor;
            }
            .more {
                align-self: flex-end;
                margin-right: 100px;
                cursor: pointer;
                font-size: 14px;
                color: #8a8a8a;
                &:hover{
                    color:$primaryColor
                }
            }
            .course {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                .courseList {
                    width: 80%;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    margin: 10px 0;
                }
            }
            .article {
                display: flex;
                flex-direction: column;
                width: 100%;
                background-color: #fafafa;
                padding-top: 20px;
                .articleList {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin: 0 40px;
                }
            }
        }
    }
</style>

