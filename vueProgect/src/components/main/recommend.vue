<template>
    <transition name="fade">
        <div class="recommend">
            <!--轮播图-->
            <el-carousel
                    type="card"
                    height="200px"
                    indicator-position="inside"
                    class="carousel">
                <el-carousel-item v-for="item in 6" :key="item">
                    <h3>{{ item }}</h3>
                </el-carousel-item>
            </el-carousel>
            <div class="recommendContent">
                <div class="type">智能推荐</div>
                <div class="course">
                    <div class="ListType">课程推荐</div>
                    <div class="more">更多&nbsp;<span class="fa fa-chevron-right"></span></div>
                    <div class="courseList">
                        <router-link :to="{name:'course',params: {file: item.file}}"
                                     v-for="item in listNow.courses"
                                     :key="item.title">
                            <courseItem :data="item"></courseItem>
                        </router-link>
                    </div>
                </div>
                <div class="article">
                    <div class="ListType">文章推荐</div>
                    <div class="more">更多&nbsp;<span class="fa fa-chevron-right"></span></div>
                    <div class="articleList">
                        <router-link :to="{name:'article',params: { articleId: item.id }}"
                                     v-for="item in listNow.articles"
                                     :key="item.title">
                            <articleItem
                                    :itemContent="item">
                            </articleItem>
                        </router-link>
                    </div>
                </div>
                <el-pagination
                        style="align-self: center;margin-top: 20px"
                        background
                        layout="prev, pager, next"
                        :total="1000">
                </el-pagination>
            </div>
            <footer_></footer_>
            <backHeader></backHeader>
        </div>
    </transition>
</template>

<script>
    import courseItem from './courseItem.vue';
    import articleItem from './articleItem.vue';
    import {mapState} from 'vuex';
    import footer_ from '../footer/footer.vue';
    import backHeader from '../header/backHeader.vue';
    import areaCaching from './areaCaching.js';
    export default {
        created() {
            this.initData();
        },
        data() {
            return {
                //当前要滚动的页面dom
                pageNow: {},
            }
        },
        computed: {
            ...mapState('info', [
                'account',
                'avatarUrl'
            ])
        },
        methods: {
            initData() {
                this.handleChangeArea(null,'p1','recommend');
            },
        },
        components: {
            courseItem,
            articleItem,
            footer_,
            backHeader
        },
        mixins:[areaCaching]
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
        background-color: #f6f6f6;
        a {
            text-decoration: none;
        }
        //轮播图
        .carousel {
            width: $cnntentWith;
            margin: 30px 40px 0;
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
                color: #00a0e9;
            }
            /*分类标题*/
            .ListType {
                font-size: 16px;
                font-weight: bold;
                margin: 10px 0;
                align-self: center;
            }
            .more {
                align-self: flex-end;
                margin-right: 100px;
                color: #00a0e9;
                cursor: pointer;
            }
            .course {
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

