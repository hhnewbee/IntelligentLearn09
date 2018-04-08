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
                    v-for="question in listNow.questions"
                    :key="question.id"
                    :itemData="question">
            </articleItem>
            <el-pagination
                    @size-change="handlePage"
                    style="flex-shrink: 0;align-self: center;margin-bottom: 20px"
                    background
                    layout="prev, pager, next"
                    :total="listNow.pages">
            </el-pagination>
        </div>
        <div class="right">
            <el-button type="primary"
                       @click='openEditor'
                       style="width: 100%;flex-shrink: 0">
                我要提问
            </el-button>
            <el-dialog
                    title="编辑提问"
                    :visible.sync="EditorVisible">
                <myLearnerEditor></myLearnerEditor>
            </el-dialog>
            <div class="rightItem">
                <div class="itemName">
                    问题分类
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
                    style="flex-shrink: 0"
                    :contents="constructionArticle"
                    :option="{title:'问题推荐'}"></rightItem>
        </div>
    </div>
</template>

<script>
    import articleItem from '../main/articleItem.vue';
    import rightItem from './rightItem.vue';
    import myLearnerEditor from '../edit/myLearnerEditor.vue';
    import {mapState} from 'vuex';
    import {areaCaching,pageRequire} from '../mixins.js';


    export default {
        created() {
            //areaFocus没有在init前被初始化，所以放到事件循环最后加载
            setTimeout(this.iniData,1);
            this.initRight();
        },
        data() {
            return {
                //推荐问题
                constructionArticle: [],
                //回答编辑区显示
                EditorVisible:false
            }
        },
        computed: {
            ...mapState(['type']),
            ...mapState('info',['areaFocus']),
        },
        methods: {
            /**
             * 初始化右边页面数据
             */
            initRight() {
                this.constructionArticle = [
                        {content: '我的回答内容我的回答内容1我的回答内容我的回答内容1', time: '2013-11-11 22:33'},
                        {content: '我的回答内容我的回答内容1我的回答内容我的回答内容1', time: '2013-13-23 22:33'},
                        {content: '答内容我的回答内容1', time: '2013-12-3 22:33'},
                        {content: '我的回答内容我的回答内容1我的回答内容我的回答内容1', time: '2013-1-4 22:33'},
                        {content: '我的回答内容我的回答内容1我的回答内容我的回答内容1', time: '2013-12-23 22:33'}
                    ]
            },
            /**
             * 打开提问editor
             */
            openEditor(){
                this.EditorVisible=true;
            }
        },
        components: {
            articleItem,
            rightItem,
            myLearnerEditor
        },
        mixins:[areaCaching,pageRequire]
    }
</script>

<style lang="scss">
    #questionPageIL09 {
        display: flex;
        justify-content: center;
        /*触发bfc，防止父元素的margin与子元素的折叠*/
        overflow: auto;
        background-color:$mainPageColor;
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
            .el-dialog{
                min-width: 580px;
                height: 80%;
                .el-dialog__body{
                    height: 90%;
                }
            }
            .rightItem {
                margin-top: 20px;
                flex-shrink: 0;
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

