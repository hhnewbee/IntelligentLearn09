<template>
    <div class="article">
        <div class="left">
            <div class="title">{{articleData.title}}</div>
            <div class="info">
                <img :src="articleData.avatar" style="width: 25px;height: 25px;border-radius: 50%"/>
                <div style="margin: 0 10px">{{articleData.nickName}}</div>
                <div style="margin-right: 10px">时间：{{articleData.time}}</div>
                <div>类型：{{articleData.type}}</div>

                <div style="position: absolute;right: 0">
                    <el-checkbox-group v-model="checkboxGroup" size="small">
                        <el-checkbox-button
                                label="likes"
                                key="likes">
                            {{articleData.likes}}&nbsp;喜欢
                        </el-checkbox-button>
                        <el-checkbox-button
                                label="collections"
                                key="collections">
                            {{articleData.collections}}&nbsp;收藏
                        </el-checkbox-button>
                    </el-checkbox-group>
                </div>
            </div>
            <div class="content"></div>
        </div>
        <div class="right">
            <el-radio-group
                    @change="sideChange"
                    v-model="chatChange"
                    size="medium">
                <el-radio-button label="目录"></el-radio-button>
                <el-radio-button label="讨论"></el-radio-button>
                <el-radio-button label="问题"></el-radio-button>
            </el-radio-group>
            <div class="sideBarContent">
                <keep-alive>
                    <component :is="changePop">
                    </component>
                </keep-alive>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        created() {
            this.initData();
        },
        data() {
            return {
                articleData: {},
                //喜欢和收藏的按钮
                checkboxGroup: [],
                //sidebar的选择
                chatChange: '目录',
                //加载的sidebar
                changePop: 'chapter'
            }
        },
        methods: {
            /**
             * 数据初始化
             */
            initData() {
                this.articleData = {
                    title: 'vue和webpack的用法',
                    avatar: 'http://localhost:3100/img/avatar/avatar.jpg',
                    nickName: 'newbee1',
                    time: '2018-1-1',
                    type: '金融',
                    content: '这几天在修改 WPJAM 问答网站首页列表的时候，发现一个问题，就是有些问题的标题比较长，为了显示美观，我想将首页列表的标题都设置为1行，如果超出的在最后显示 …，开始的时候我使用 PHP 函数来计算文字个数，但是由于中英文字数算法和长度的问题，总是不能做.',
                    likes: '22',
                    collections: '22'
                }
            },
            sideChange(label) {
                switch (label) {
                    case '目录': {
                        this.changePop = 'chapter';
                        break;
                    }
                    case '讨论': {
                        this.changePop = 'discuss';
                        break;
                    }
                    case '问题': {
                        this.changePop = 'questions';
                        break;
                    }
                }
            }
        },
        components: {
            'chapter': () => import('./chapter.vue'),
            'discuss': () => import('./discuss.vue'),
            'questions': () => import('./questions.vue'),
        },
    }
</script>

<style scoped lang="scss">
    .article {
        display: flex;
        justify-content: center;
        background-color: #f6f6f6;
        height: 100%;
        .left {
            padding: 10px 20px;
            margin-left: 20px;
            margin-right: 350px;
            width: 850px;
            background-color: #ffffff;
            height: 100%;
            .title {
                font-size: 28px;
                font-weight: bold;
                color: #45c9dd;
            }
            .info {
                display: flex;
                align-items: center;
                position: relative;
                margin: 10px 0;
                font-size: 13px;
                color: #ccc;
                height: 36px;
            }
        }
        .right {
            height: 100%;
            position: fixed;
            padding-top: 20px;
            margin-right: 60px;
            background-color: #ffffff;
            right: 0;
            width: 300px;
            display: flex;
            flex-direction: column;
            align-items: center;
            .sideBarContent {
                height: 1%;
                flex-grow: 1;
                margin-top: 10px;
            }
        }
    }
</style>

