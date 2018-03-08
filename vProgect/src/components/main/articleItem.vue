<template>
    <div class="articleItem">
        <div class="title">{{itemContent.title}}</div>
        <div class="detail">
            <infoDetail
                    :avatarUrl="itemContent.avatar"
                    :classes="[avatarClass]">
            </infoDetail>
            <div class="name">{{itemContent.nickname}}</div>
            <div class="time">时间：{{itemContent.time}}</div>
        </div>
        <div class="content">
            <img
                    v-if="itemContent.pic"
                    :src="itemContent.pic"
                    class="media">
            <span
                    @click="handleIn"
                    class="text">{{itemContent.content}}</span>
        </div>
        <div class="info">
            <div class="likes fa fa-heart ic">&nbsp;{{itemContent.likes}}人喜欢</div>
            <div class="comments fa fa-comments ic">&nbsp;{{itemContent.answers}}个问题</div>
            <div class="collection fa fa-star ic">&nbsp;{{itemContent.collections}}个收藏</div>
        </div>
    </div>
</template>

<script>
    import infoDetail from '../userCenter/infoDetail.vue';
    export default{
        props:['itemContent'],
        data(){
            return{
                avatarClass: 'avatar',
            }
        },
        methods:{
            handleIn(id){
                window.open("http://localhost:3000/#/main/articlePage/article/1519225331783");
            }
        },
        components:{
            infoDetail
        }
    }
</script>

<style scoped lang="scss">
    .articleItem{
        width: 800px;
        padding:16px 20px;
        margin: 15px 0;
        background-color: #ffffff;
        box-shadow: 2px 2px 10px rgba(136, 136, 136, 0.51);
        .title{
            margin-bottom: 5px;
            font-size: 19px;
            font-weight: bold;
            color: #00a0e9;
        }
        .detail{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 13px;
            color: rgba(57,66,79,0.61);
            .avatar{
                width: 25px;
                height: 25px;
                margin-right: 10px;
                cursor: pointer;
            }
            .name{
                font-weight: bold;
                font-size: 14px;
                margin-right: 10px;
                color: #9b9b9b;
            }
            .time{
                font-size: 12px;
            }
        }
        .content{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-top: 5px;
            margin-bottom: 10px;
            .media{
                width: 190px;
                height: 105px;
                margin-right: 15px;
                border-radius: 5px
            }
            .text{
                width: 1%;
                max-height: 105px;
                flex-grow: 1;
                font-size: 15px;
                font-weight:400;
                line-height:1.67;
                color: #000000;
                overflow:hidden;
                cursor: pointer;
                &:hover{
                    color: #6a6a6a
                }
            }
        }
        .info{
            display: flex;
            color: rgba(57,66,79,0.61);
            justify-content: flex-start;
            align-items: center;
            font-size: 13px;
            cursor: pointer;
            .ic{
                font-size: 14px;
                margin-right:20px;
                &:hover{
                    color: rgba(17, 18, 22, 0.61);
                }
            }
        }
    }
</style>



