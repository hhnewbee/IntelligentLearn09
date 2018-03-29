<template>
    <div class="userInfo">
        <div class="item item1">
            <div>
                <img :src="info.avatarUrl">
            </div>
            <div style="margin: 0 30px">
                <div>账号：
                    <span>{{info.account}}</span>
                </div>
                <div>专注领域：{{info.focusArea}}</div>
            </div>

            <div class="learnInfo">
                <div>学习时长：<span>48h</span></div>
            </div>
        </div>
        <div class="item">
            <div class="item2">姓名：
                <span ref="name" style="padding: 5px">{{info.name}}</span>
            </div>
            <div class="item2">邮箱：
                <span ref="eMail" style="padding: 5px">{{info.eMail}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['info']
    }
</script>

<style scoped lang="scss">
    .userInfo {
        .item {
            margin: 20px 100px;
            padding: 10px;
            border-bottom: 1px solid #f8f4f4;
            img {
                width: 95px;
                height: 95px;
                border-radius: 50%;
            }
            .learnInfo {
                display: flex;
                align-items: center;
                position: absolute;
                right: 0;
            }
            .item2{
                margin: 20px;
                font-size: 15px;
                font-weight: bold;
            }
        }
        .item1 {
            position: relative;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 18px;
            font-weight: bold;
        }
    }
</style>

