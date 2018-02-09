<template>
    <div id="avatarInfoIL09">
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
        <el-popover
                ref="popover1"
                placement="bottom"
                class="popper"
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
                    <div class="item">
                        <div class="fa fa-star-o" style="font-size: 18px"></div>
                        <div style="font-size: 12px">收藏</div>
                    </div>
                    <div
                            @click="handleChoose(2)"
                            class="item">
                        <div class="fa fa-file-text-o" style="font-size: 18px"></div>
                        <div style="font-size: 12px">记录</div>
                    </div>
                    <div class="item_">
                        <div class="fa fa-info-circle" style="font-size: 18px"></div>
                        <div style="font-size: 12px">信息</div>
                    </div>
                </div>
                <div
                        @click="handleChoose(5)"
                        class="item3"
                        style="margin-top: 10px">
                    <Icon type="android-person" style="font-size: 18px ;margin-right: 5px"></Icon>
                    个人中心
                </div>
                <div class="item3" @click="handleOut">
                    <Icon type="log-out" style="font-size: 18px ;margin-right: 5px" ></Icon>
                    退出登录
                </div>
            </div>
        </el-popover>
        <img src="../../static/imgs/avatar.jpg"
             v-popover:popover1>
    </div>
</template>

<script>
    import {Icon} from 'iview'
    import { mapMutations } from 'vuex'

    export default {
        created(){
            //无意义，不能刷新，因为根本就没有加载到该跳转。得放到根节点中才行
//            this.$router.addRoutes([
//                {
//                    name: "userCenter",
//                    path: '/userCenter',
//                    component: () => import('../userCenter/userCenter.vue'),
//                    children: [
//                        {
//                            path: 'record',
//                            component:() => import('../userCenter/record.vue'),
//                        },
//                    ]
//                },
//            ])
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
        components: {
            Option,
            Icon
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
            margin-top: 15px;
            .item {
                cursor: pointer;
                border-right: 1px solid rgba(156, 181, 216, 0.51);
                padding:0 15px;
                display: flex;
                flex-direction: column;
                align-items: center;
                &:hover{
                    color: #00abf9;
                }
            }
            .item_{
                cursor: pointer;
                padding:0 15px;
                display: flex;
                flex-direction: column;
                align-items: center;
                &:hover{
                    color: #00abf9;
                }
            }
        }
        .item3{
            padding: 5px;
            cursor: pointer;
            border-radius: 5px;
            &:hover{
                background-color: rgba(109, 127, 151, 0.35);
            }
        }
    }
</style>

