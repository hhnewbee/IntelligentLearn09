<template>
    <div>
        <el-popover
                ref="popover1"
                placement="top"
                trigger="click">
            <div class="userInfo">
                <div class="item item1">
                    <div>
                        <img :src="avatarUrl">
                    </div>
                    <div style="margin: 0 15px">
                        <div style="margin-bottom: 3px">账号：
                            <span>{{account}}</span>
                        </div>
                        <div>专注领域：{{focusArea}}</div>
                    </div>
                </div>
                <div class="item">
                    <div class="item2">姓名：
                        <span ref="name" style="padding: 5px">{{name}}</span>
                    </div>
                    <div class="item2">邮箱：
                        <span ref="eMail" style="padding: 5px">{{eMail}}</span>
                    </div>
                </div>
            </div>
        </el-popover>
        <avatar :username="account"
                :src="avatarUrl"
                @click.native="handleShowInfo"
                v-popover:popover1
                :size="size"></avatar>
        <!--<img :src="avatarUrl"-->
             <!--@click="handleShowInfo"-->
             <!--style="border-radius: 50%;height: 100%;width: 100%"-->
             <!--v-popover:popover1>-->
    </div>
</template>

<script>
    import Avatar from 'vue-avatar'
    export default {
        props: ['account', 'avatarUrl','size'],
        data() {
            return {
                focusArea: '',
                name: '',
                eMail: ''
            }
        },
        methods: {
            handleShowInfo() {
                this.$ajaxJava.get(`user/${this.account}/selfInformation`).then((res) => {
                    this.name = res.data.trueName;
                    this.focusArea = res.data.position;
                    this.eMail = res.data.email;
                })
            }
        },
        components:{
            Avatar
        }
    }
</script>

<style scoped lang="scss">
    .userInfo {
        width: 250px;
        height: 150px;
        .item {
            padding: 8px;
            border-bottom: 1px solid #f8f4f4;
            img {
                width: 60px;
                height: 60px;
                border-radius: 50%;
            }
            .item2 {
                margin: 8px;
                font-size: 13px;
                font-weight: bold;
            }
        }
        .item:nth-child(2) {
            border-bottom: none;
        }
        .item1 {
            position: relative;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 15px;
            font-weight: bold;
        }
    }
</style>

