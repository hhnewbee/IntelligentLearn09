<template>
    <div id="questionPageIL09">
        <div class="left">
            <div class="choose">
                <el-radio-group
                        v-model="choose"
                        size="small"
                        style="margin-right: 20px">
                    <el-radio-button label="最新"></el-radio-button>
                    <el-radio-button label="最热"></el-radio-button>
                </el-radio-group>
            </div>
            <articleItem
                    v-for="item in items"
                    :key="item.nickname"
                    :itemContent="item">
            </articleItem>
            <el-pagination
                    style="flex-shrink: 0;align-self: center;margin-bottom: 20px"
                    background
                    layout="prev, pager, next"
                    :total="1000">
            </el-pagination>
        </div>
        <div class="right">
            <div class="rightItem">
                <div class="itemName">
                    文章分类
                </div>
                <el-radio-group
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

    export default {
        created(){
            this.initPage();
        },
        data() {
            return {
                choose: '最新',
                typeChoose: '金融',
                items:[],
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
            initPage(){
                this.items=[
                    {
                        title:'vue和webpack的使用',
                        avatar:'http://localhost:3100/img/avatar/softIcon.jpg',
                        nickname:'newbee1',
                        time:'2018-1-1',
                        pic:'',
                        content:'这几天在修改 WPJAM 问答网站首页列表的时候，发现一个问题，就是有些问题的标题比较长，为了显示美观，我想将首页列表的标题都设置为1行，如果超出的在最后显示 …，开始的时候我使用 PHP 函数来计算文字个数，但是由于中英文字数算法和长度的问题，总是不能做这几天在修改 WPJAM 问答网站首页列表的时候，发现一个问题，就是有些问题的标题比较长，为了显示美观，我想将首页列表的标题都设置为1行，如果超出的在最后显示 …，开始的时候我使用 PHP 函数来计算文字个数，但是由于中英文字数算法和长度的问题，总是不能做',
                        likes:'22',
                        answers:'22',
                        collections:'22'
                    },
                    {
                        title:'vue和webpack的使用',
                        avatar:'http://localhost:3100/img/avatar/softIcon.jpg',
                        nickname:'newbee1',
                        time:'2018-1-1',
                        pic:'',
                        content:'这几天在修改 WPJAM 问答网站首页列表的时候，发现一个问题，就是有些问题的标题比较长，为了显示美观，我想将首页列表的标题都设置为1行，如果超出的在最后显示 …，开始的时候我使用 PHP 函数来计算文字个数，但是由于中英文字数算法和长度的问题，总是不能做.',
                        likes:'22',
                        answers:'22',
                        collections:'22'
                    },
                    {
                        title:'vue和webpack的使用',
                        avatar:'http://localhost:3100/img/avatar/softIcon.jpg',
                        nickname:'newbee1',
                        time:'2018-1-1',
                        pic:'',
                        content:'这几天在修改 WPJAM 问答网站首页列表的时候，发现一个问题，就是有些问题的标题比较长，为了显示美观，我想将首页列表的标题都设置为1行，如果超出的在最后显示 …，开始的时候我使用 PHP 函数来计算文字个数，但是由于中英文字数算法和长度的问题，总是不能做.',
                        likes:'22',
                        answers:'22',
                        collections:'22'
                    },
                    {
                        title:'vue和webpack的使用',
                        avatar:'http://localhost:3100/img/avatar/softIcon.jpg',
                        nickname:'newbee1',
                        time:'2018-1-1',
                        pic:'',
                        content:'这几天在修改 WPJAM 问答网站首页列表的时候，发现一个问题，就是有些问题的标题比较长，为了显示美观，我想将首页列表的标题都设置为1行，如果超出的在最后显示 …，开始的时候我使用 PHP 函数来计算文字个数，但是由于中英文字数算法和长度的问题，总是不能做.',
                        likes:'22',
                        answers:'22',
                        collections:'22'
                    },
                ];
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
        }
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

