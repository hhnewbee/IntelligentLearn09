<template>
    <div class="discuss">
        <div class="header">
            <div class="userList" v-show="showUserList">
                <div class="item">
                    <div class="avatar">
                        <img src="../../static/imgs/avatar.jpg"/>
                    </div>
                    <div class="name">
                        newbee
                    </div>
                </div>
                <div class="item">
                    <div class="avatar">
                        <img src="../../static/imgs/avatar.jpg"/>
                    </div>
                    <div class="name">
                        newbee
                    </div>
                </div>
                <div class="item">
                    <div class="avatar">
                        <img src="../../static/imgs/avatar.jpg"/>
                    </div>
                    <div class="name">
                        newbee
                    </div>
                </div>
                <div class="item">
                    <div class="avatar">
                        <img src="../../static/imgs/avatar.jpg"/>
                    </div>
                    <div class="name">
                        newbee
                    </div>
                </div>
                <div class="item">
                    <div class="avatar">
                        <img src="../../static/imgs/avatar.jpg"/>
                    </div>
                    <div class="name">
                        newbee
                    </div>
                </div>
            </div>
            <div class="change fa fa-bars" @click="handleShowList"></div>
            <div class="group">
                <div class="small fa fa-television">
                    12人在线
                </div>
            </div>
            <div class="user">
                <div class="pic"></div>
                <div class="name"></div>
            </div>
        </div>
        <div class="chat">
            <vue-scrollbar class="my-scrollbar" ref="Scrollbar">
                <div class="message">
                    <div class="item">
                        <div class="info">
                            <div class="avatar">
                                <img src="../../static/imgs/avatar.jpg"/>
                            </div>
                            <div class="name">
                                newbee
                            </div>
                        </div>
                        <div class="content">
                            <div class="tig"></div>
                            你好dewdwededawdawdewadeawdeawdaw
                        </div>
                    </div>
                    <div class="item item-right">
                        <div class="info">
                            <div class="avatar">
                                <img src="../../static/imgs/avatar.jpg"/>
                            </div>
                            <div class="name">
                                newbee
                            </div>
                        </div>
                        <div class="content">
                            <div class="tig"></div>
                            你好dewdwededawdawdewadeawdeawdaw
                        </div>
                    </div>
                    <div class="item item-right">
                        <div class="info">
                            <div class="avatar">
                                <img src="../../static/imgs/avatar.jpg"/>
                            </div>
                            <div class="name">
                                newbee
                            </div>
                        </div>
                        <div class="content">
                            <div class="tig"></div>
                            你好dewdwededawdawdewadeawdeawdaw
                        </div>
                    </div>
                    <div class="item item-right">
                        <div class="info">
                            <div class="avatar">
                                <img src="../../static/imgs/avatar.jpg"/>
                            </div>
                            <div class="name">
                                newbee
                            </div>
                        </div>
                        <div class="content">
                            <div class="tig"></div>
                            你好dewdwededawdawdewadeawdeawdaw
                        </div>
                    </div>
                    <div class="item item-right">
                        <div class="info">
                            <div class="avatar">
                                <img src="../../static/imgs/avatar.jpg"/>
                            </div>
                            <div class="name">
                                newbee
                            </div>
                        </div>
                        <div class="content">
                            <div class="tig"></div>
                            你好dewdwededawdawdewadeawdeawdaw
                        </div>
                    </div>
                    <div class="item item-right">
                        <div class="info">
                            <div class="avatar">
                                <img src="../../static/imgs/avatar.jpg"/>
                            </div>
                            <div class="name">
                                newbee
                            </div>
                        </div>
                        <div class="content">
                            <div class="tig"></div>
                            你好dewdwededawdawdewadeawdeawdaw
                        </div>
                    </div>
                    <div class="item item-right">
                        <div class="info">
                            <div class="avatar">
                                <img src="../../static/imgs/avatar.jpg"/>
                            </div>
                            <div class="name">
                                newbee
                            </div>
                        </div>
                        <div class="content">
                            <div class="tig"></div>
                            你好dewdwededawdawdewadeawdeawdaw
                        </div>
                    </div>
                </div>
            </vue-scrollbar>
            <div class="control">
                <textarea type="text"></textarea>
                <div class="button">SEND</div>
            </div>
        </div>
        <div class="list"></div>
    </div>
</template>

<script>
    import VueScrollbar from 'vue2-scrollbar'
    import "vue2-scrollbar/dist/style/vue2-scrollbar.css";
    export default {
        data(){
            return{
                showUserList:false
            }
        },
        methods:{
          handleShowList(){
              this.showUserList=!this.showUserList;
          }
        },
        components:{
            VueScrollbar
        }
    }
</script>

<style scoped lang="scss">
    @mixin center {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .discuss {
        display: flex;
        justify-content: center;
        flex-direction: column;
        height: 100%;
        .header {
            height: 40px;
            border-bottom: 1px solid #0e1216;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .userList{
                z-index: 100;
                top: 40px;
                left: 10px;
                position: absolute;
                background-color: gray;
                &::before{
                    bottom: 100%;
                    left: 6%;
                    content: " ";
                    position: absolute;
                    pointer-events: none;
                    border: solid transparent;
                    border-bottom-color: gray;
                    border-width: 10px;
                }
                .item{
                    width: 200px;
                    display: flex;
                    justify-content:center;
                    align-items: center;
                    .avatar{
                        img{
                            height: 50px;
                            width: 50px;
                            border-radius: 50%;
                        }
                    }
                    .name{
                        font-size: 16px;
                        font-weight: bold;
                    }
                }
            }
            .change{
                font-size: 18px;
                color: #495a6c;
                margin-left:20px;
                padding: 5px;
                cursor: pointer;
                &:hover{
                    color: #748eab;
                }
            }
            .group{
                @include center;
                margin-left: 10px;
                .samll{
                    font-size: 10px;
                }
            }
        }
        .chat {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex-grow: 1;
            .my-scrollbar {
                background-color: #14191e;
                max-height: 100%;
                height: 100%;
                margin-right: 10px;
                .vue-scrollbar__scrollbar-vertical .scrollbar, .vue-scrollbar__scrollbar-horizontal .scrollbar {
                    background: rgb(32, 40, 48);
                }
            }
            .message {
                //避免overfloat时会拉伸影响其他布局
                height: 100%;
                flex-grow: 1;
                box-sizing: border-box;
                padding: 15px;
                padding-right: 20px;
                width: 100%;
                .item {
                    .info {
                        display: flex;
                        align-items: center;
                        margin-bottom: 15px;
                        .avatar {
                            margin-right: 10px;
                            img {
                                border: 1px solid #262e37;
                                border-radius: 50%;
                                width: 40px;
                                height: 40px;
                            }
                        }
                        .name {
                            font-size: 15px;
                            font-weight: 600;
                            color: #b5b9bc;
                        }
                    }
                    .content {
                        padding: 6px;
                        margin-bottom: 20px;
                        background-color: #262e37;
                        border-radius: 7px;
                        position: relative;
                        font-size: 14px;
                        color: #b5b9bc;
                        .tig {
                            bottom: 100%;
                            left: 4%;
                            content: " ";
                            position: absolute;
                            pointer-events: none;
                            border: solid transparent;
                            border-bottom-color: #262e37;
                            border-width: 10px;
                        }
                    }
                }
                .item-right {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    .info {
                        display: block;
                        .name {
                            margin-top: 9px;
                            margin-right: 10px;
                            float: right;
                        }
                        .avatar {
                            margin: 0;
                            float: right;
                        }
                    }
                    .content {
                        .tig {
                            left: auto;
                            right: 4%;
                        }
                    }
                }
            }
            .control {
                width: 100%;
                border-top: 1px solid #0e1216;
                display: flex;
                align-items: center;
                padding: 10px;
                box-sizing: border-box;
                textarea {
                    flex-grow: 1;
                    width: 50%;
                    height: 40px;
                    border-radius: 5px;
                    resize: none;
                    padding: 5px;
                    border: 1px solid #262e37;
                    font-size: 14px;
                    color: #b5b9bc;
                    background-color: #262e37;
                }
                .button {
                    font-weight: bold;
                    cursor: pointer;
                    margin-left: 10px;
                    border-radius: 5px;
                    font-size: 18px;
                    @include center;
                    color: #262e37;
                    &:hover{
                        color: #b5b9bc;
                    }
                }
            }
        }
    }
</style>

