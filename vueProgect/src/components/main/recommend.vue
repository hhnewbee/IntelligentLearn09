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
                </div>
                <div class="article">
                    <div class="ListType">文章推荐</div>
                    <div class="more">更多&nbsp;<span class="fa fa-chevron-right"></span></div>
                    <div class="articleList">
                        <articleItem
                                v-for="item in articleItems"
                                :key="item.nickname"
                                :itemContent="item">
                        </articleItem>
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
    import course from './courseItem.vue';
    import articleItem from './articleItem.vue';
    import {mapState} from 'vuex';
    import footer_ from '../footer/footer.vue';
    import backHeader from '../header/backHeader.vue';

    export default {
        created() {
//            this.initData();
        },
        data() {
            return {
                //当前要滚动的页面dom
                pageNow: {},
                courseItems: [],
                articleItems: []
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
                this.articleItems = [
                    {
                        title: 'vue和webpack的使用',
                        avatar: 'http://localhost:3100/img/avatar/avatar.jpg',
                        nickname: 'newbee1',
                        time: '2018-1-1',
                        pic: '',
                        content: '这几天在修改 WPJAM 问答网站首页列表的时候，发现一个问题，就是有些问题的标题比较长，为了显示美观，我想将首页列表的标题都设置为1行，如果超出的在最后显示 …，开始的时候我使用 PHP 函数来计算文字个数，但是由于中英文字数算法和长度的问题，总是不能做.',
                        likes: '22',
                        answers: '22',
                        collections: '22'
                    },
                    {
                        title: 'vue和webpack的使用',
                        avatar: 'http://localhost:3100/img/avatar/avatar.jpg',
                        nickname: 'newbee2',
                        time: '2018-1-1',
                        pic: 'http://localhost:3100/img/avatar/avatar.jpg',
                        content: '这几天在修改 WPJAM 问答网站首页列表的时候，发现一个问题，就是有些问题的标题比较长，为了显示美观，我想将首页列表的标题都设置为1行，如果超出的在最后显示 …，开始的时候我使用 PHP 函数来计算文字个数，但是由于中英文字数算法和长度的问题，总是不能做到很完美的效果，后来发现可以通过定义元素的 test-overflow 这个 CSS 属性实现文本溢出省略号。这几天在修改 WPJAM 问答网站首页列表的时候，发现一个问题，就是有些问题的标题比较长，为了显示美观，我想将首页列表的标题都设置为...',
                        likes: '22',
                        answers: '22',
                        collections: '22'
                    },
                    {
                        title: 'vue和webpack的使用',
                        avatar: 'http://localhost:3100/img/avatar/avatar.jpg',
                        nickname: 'newbee3',
                        time: '2018-1-1',
                        pic: 'http://localhost:3100/img/avatar/avatar.jpg',
                        content: '这几天在修改 WPJAM 问答网站首页列表的时候，发现一个问题，就是有些问题的标题比较长，为了显示美观，我想将首页列表的标题都设置为1行，如果超出的在最后显示 …，开始的时候我使用 PHP 函数来计算文字个数，但是由于中英文字数算法和长度的问题，总是不能做到很完美的效果，后来发现可以通过定义元素的 test-overflow 这个 CSS 属性实现文本溢出省略号。这几天在修改 WPJAM 问答网站首页列表的时候，发现一个问题，就是有些问题的标题比较长，为了显示美观，我想将首页列表的标题都设置为...',
                        likes: '22',
                        answers: '22',
                        collections: '22'
                    }
                ];
            },
        },
        components: {
            course,
            articleItem,
            footer_,
            backHeader
        }
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

