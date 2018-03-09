<template>
    <div class="questionPage">
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
            <questionItem
                    v-for="item in items"
                    :key="item.nickname"
                    :itemContent="item">
            </questionItem>
        </div>
        <div class="right">
            <el-button type="primary" style="width: 100%">我要提问</el-button>
            <div class="rightItem">
                <div class="itemName">
                    分类
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
        </div>
    </div>
</template>

<script>
    import questionItem from '../comments/questionItem.vue';
    import {mapState} from 'vuex'

    export default {
        created(){
            this.initPage();
        },
        data() {
            return {
                choose: '最新',
                typeChoose: '金融',
                items:[]
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
                        avatar:'http://localhost:3100/img/avatar/avatar.jpg',
                        nickname:'newbee1',
                        time:'2018-1-1',
                        pic:'',
                        content:'这几天在修改 WPJAM 问答网站首页列表的时候，发现一个问题，就是有些问题的标题比较长，为了显示美观，我想将首页列表的标题都设置为1行，如果超出的在最后显示 …，开始的时候我使用 PHP 函数来计算文字个数，但是由于中英文字数算法和长度的问题，总是不能做.',
                        likes:'22',
                        answers:'22',
                        collections:'22'
                    },
                    {
                        avatar:'http://localhost:3100/img/avatar/avatar.jpg',
                        nickname:'newbee2',
                        time:'2018-1-1',
                        pic:'http://localhost:3100/img/avatar/avatar.jpg',
                        content:'这几天在修改 WPJAM 问答网站首页列表的时候，发现一个问题，就是有些问题的标题比较长，为了显示美观，我想将首页列表的标题都设置为1行，如果超出的在最后显示 …，开始的时候我使用 PHP 函数来计算文字个数，但是由于中英文字数算法和长度的问题，总是不能做到很完美的效果，后来发现可以通过定义元素的 test-overflow 这个 CSS 属性实现文本溢出省略号。这几天在修改 WPJAM 问答网站首页列表的时候，发现一个问题，就是有些问题的标题比较长，为了显示美观，我想将首页列表的标题都设置为...',
                        likes:'22',
                        answers:'22',
                        collections:'22'
                    },
                    {
                        avatar:'http://localhost:3100/img/avatar/avatar.jpg',
                        nickname:'newbee3',
                        time:'2018-1-1',
                        pic:'http://localhost:3100/img/avatar/avatar.jpg',
                        content:'这几天在修改 WPJAM 问答网站首页列表的时候，发现一个问题，就是有些问题的标题比较长，为了显示美观，我想将首页列表的标题都设置为1行，如果超出的在最后显示 …，开始的时候我使用 PHP 函数来计算文字个数，但是由于中英文字数算法和长度的问题，总是不能做到很完美的效果，后来发现可以通过定义元素的 test-overflow 这个 CSS 属性实现文本溢出省略号。这几天在修改 WPJAM 问答网站首页列表的时候，发现一个问题，就是有些问题的标题比较长，为了显示美观，我想将首页列表的标题都设置为...',
                        likes:'22',
                        answers:'22',
                        collections:'22'
                    }
                ]
            }
        },
        components: {
            questionItem
        }
    }
</script>

<style lang="scss">
    .questionPage {
        display: flex;
        justify-content: center;
        /*触发bfc，防止父元素的margin与子元素的折叠*/
        overflow: hidden;
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
                margin-top: 20px;
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

