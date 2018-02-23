<template>
    <div id="avatarInfoIL09">
        <!--信息弹出框-->
        <el-popover
                ref="popover2"
                placement="bottom"
                title="标题"
                width="200"
                trigger="click">
            <div id="noticeInfoIL09">
                <div class="item">
                    <div class="typeAsk">
                        <div class="type"></div>
                        <div class="content">
                            <div class="who"></div>
                            <div class="what"></div>
                        </div>
                    </div>
                    <div class="typeComment">
                        <div class="type"></div>
                        <div class="content">
                            <div class="who">
                            </div>
                            <div class="where"></div>
                            <div class="what"></div>
                        </div>
                    </div>
                    <div class="typeInfo">
                        <div class="type"></div>
                        <div class="content"></div>
                    </div>
                </div>
            </div>
        </el-popover>
        <el-button
                plain
                size="mini"
                icon="el-icon-message"
                class="noticeIcon "
                v-popover:popover2>
        </el-button>
        <!--个人信息弹出框-->
        <el-popover
                ref="popover1"
                placement="bottom"
                class="popper"
                width="335"
                trigger="hover">
            <div id="avatarInfOpopper">
                <div class="line1">
                    <img src="../../static/imgs/avatar.jpg"/>
                    <div class="info">
                        <div class="name">
                            newbee
                        </div>
                        <div class="position">
                            前端工程师
                        </div>
                    </div>
                </div>
                <div class="line2">
                    <div class="fa fa-star-o item">
                        &nbsp;我的收藏
                    </div>
                    <div
                            @click="handleChoose(2)"
                            class="fa fa-file-text-o item">
                        &nbsp;学习记录
                    </div>
                    <div class="fa fa-info-circle item">
                        &nbsp;个人信息
                    </div>
                </div>
                <div class="line3">
                    <div v-if="contents.length===0" style="text-align: center;color: #9b9b9b">暂无</div>
                    <div
                            class="content"
                            v-for="content in contents">
                        <div class="contentText">{{content.content}}</div>
                        <div class="el-icon-time">&nbsp;{{content.time}}</div>
                    </div>
                </div>
                <div class="line4">
                    <div
                            style="font-weight: bold"
                            class="fa fa-user item"
                            @click="handleChoose(5)">
                        &nbsp;个人中心
                    </div>
                    <div
                            style="font-weight: bold"
                            class="fa fa-sign-out item"
                            @click="handleOut">
                        &nbsp;退出登录
                    </div>
                </div>
            </div>
        </el-popover>
        <img src="../../static/imgs/avatar.jpg"
             v-popover:popover1>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'

    export default {
        data(){
          return{
              //todo 模拟记录的数据
              contents:[
                  {content: '我的回答内容我的回答内容1我的回答内容我的回答内容1', time: '2013-11-11 22:33'},
                  {content: '我的回答内容我的回答内容1我的回答内容我的回答内容1', time: '2013-13-23 22:33'},
                  {content: '答内容我的回答内容1', time: '2013-12-3 22:33'},
              ]
          }
        },
        methods:{
            ...mapMutations('info',[
                'setAccount',
            ]),
            handleChoose(tar){
                switch (tar){
                    case 2:{
                        this.$router.push({ path: '/userCenter/record#record' });
                        break;
                    }
                }
            },
            handleOut(){
                localStorage.removeItem("ifLogin");
                this.setAccount('');
                window.location="http://localhost:3000";
            }
        },
    }
</script>

<style lang="scss">
    #avatarInfoIL09 {
        display: flex;
        justify-content: center;
        align-items: center;
        .noticeIcon{
            background-color: inherit;
            border-color: inherit;
            font-size: 16px;
            color: inherit;
        }
        img {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            margin-left: 40px;
            cursor: pointer
        }
    }

    #avatarInfOpopper {
        .line1 {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            img {
                border-radius: 50%;
                height: 50px;
                width: 50px
            }
            .info {
                margin-left: 10px;
                .name {
                    font-size: 16px;
                    font-weight: bold;
                }
                .position {
                    font-size: 10px;
                }
            }
        }
        .line2 {
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin: 15px 0;
        }
        .line3{
            margin-bottom: 10px;
            overflow: hidden;
            .content {
                margin-bottom: 10px;
                color: #787d82;
                max-width: 300px;
                padding: 0 15px;
                font-size: 10px;
                .contentText {
                    margin-right: 10px;
                    margin-bottom: 2px;
                    font-size: 13px;
                    font-weight: bold;
                    white-space: nowrap;
                    color: #666a6e;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    cursor: pointer;
                    &:hover {
                        color: #0457bb;
                    }

                }
            }
        }
        .line4{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .item {
            width: 100%;
            height: 36px;
            line-height: 36px;
            cursor: pointer;
            padding: 0 8px;
            margin:0 5px;
            text-align: center;
            background-color: #F8FAFC;
            color: #4d555d;
            border-radius: 4px;
            box-sizing: border-box;
            &:hover{
                background-color: #d9dde1;
            }
        }
    }
</style>

