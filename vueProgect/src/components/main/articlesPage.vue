<template>
    <div id="questionPageIL09">
        <div class="left">
            <div class="choose">
                <el-radio-group
                        @change="handleChoose"
                        v-model="choose"
                        size="small"
                        style="margin-right: 20px">
                    <el-radio-button label="最新"></el-radio-button>
                    <el-radio-button label="最热"></el-radio-button>
                </el-radio-group>
            </div>
            <articleItem
                    v-for="item in listNow"
                    :key="item.id"
                    :itemData="item">
            </articleItem>
            <el-pagination
                    @size-change="handlePage"
                    style="flex-shrink: 0;align-self: center;margin-bottom: 20px"
                    background
                    layout="prev, pager, next"
                    :total="listNow.page">
            </el-pagination>
        </div>
        <div class="right">
            <div class="rightItem">
                <div class="itemName">
                    文章分类
                </div>
                <el-radio-group
                        @change="hanleType"
                        v-model="typeChoose"
                        style="padding:0 10px"
                        size="small">
                    <el-radio-button
                            v-for="ty in type"
                            :key=ty
                            :label=ty
                            class="chooseItem"></el-radio-button>
                </el-radio-group>
            </div>
            <rightItem
                    :contents="constructionArticle"
                    :option="{title:'文章推荐'}"></rightItem>
        </div>
    </div>
</template>

<script>
    import articleItem from './articleItem.vue';
    import rightItem from './rightItem.vue';
    import {mapState} from 'vuex'
    import {areaCaching,pageRequire} from '../mixins.js';

    export default {
        created(){
            this.initRight();
        },
        data() {
            return {
                //推荐文章
                constructionArticle:[],
            }
        },
        computed:{
            ...mapState(['type']),
        },
        methods:{
            /**
             * 初始化页面数据
             */
            initRight(){
                //侧边的推荐文章列表
                this.constructionArticle = [
                        {content: '我的回答内容我的回答内容1我的回答内容我的回答内容1', time: '2013-11-11 22:33'},
                        {content: '我的回答内容我的回答内容1我的回答内容我的回答内容1', time: '2013-13-23 22:33'},
                        {content: '答内容我的回答内容1', time: '2013-12-3 22:33'},
                        {content: '我的回答内容我的回答内容1我的回答内容我的回答内容1', time: '2013-1-4 22:33'},
                        {content: '我的回答内容我的回答内容1我的回答内容我的回答内容1', time: '2013-12-23 22:33'}
                    ]
            }
        },
        components: {
            articleItem,
            rightItem
        },
        mixins:[areaCaching,pageRequire]
    }
</script>

<style lang="scss">
    #questionPageIL09 {
        display: flex;
        justify-content: center;
        background-color: #f6f6f6;
        padding: 20px 20px;
        .left {
            display: flex;
            flex-direction: column;
            margin-right: 60px;
            .choose {
                align-self: flex-end;
            }

        }
        .right {
            width: 300px;
            display: flex;
            flex-direction: column;
            align-items: center;
            .rightItem {
                margin-top: 45px;
                .itemName {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding-bottom: 10px;
                    margin-bottom: 10px;
                    border-bottom: 1px solid #ebebeb;
                    font-size: 18px;
                    font-weight: bold;
                    color: #8fdf09;
                }
                .el-radio-button__inner {
                    border-radius: 4px;
                    border: none;
                }
                .chooseItem {
                    margin: 6px;
                }
            }
        }
    }
</style>

