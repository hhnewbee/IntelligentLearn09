<template>
    <div class="article">
        <div class="detail">
            <img
                    class="avatar"
                    :src="itemContent.avatar">
            <div class="name">{{itemContent.nickname}}</div>
            <div class="time">{{itemContent.time}}</div>
        </div>
        <div class="content">
            <img
                    v-if="itemContent.pic"
                    :src="itemContent.pic"
                    class="media">
            <span class="text">{{itemContent.content}}</span>
        </div>
        <div class="info">
            <div class="likes fa fa-heart ic">&nbsp;{{itemContent.likes}}人喜欢</div>
            <div class="comments fa fa-comments ic">&nbsp;{{itemContent.answers}}个回答</div>
            <div class="collection fa fa-star ic">&nbsp;{{itemContent.collections}}个收藏</div>
        </div>
    </div>
</template>

<script>
export default{
    props:['itemContent']
}
</script>

<style scoped lang="scss">
    .article{
        width: 800px;
        padding:16px 20px;
        margin: 15px 0;
        background-color: #ffffff;
        box-shadow: 2px 2px 10px rgba(136, 136, 136, 0.51);
        .detail{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 13px;
            color: rgba(57,66,79,0.61);
            .avatar{
                width: 30px;
                height: 30px;
                margin-right: 10px;
                border-radius: 50%
            }
            .name{
                font-weight: bold;
                font-size: 16px;
                margin-right: 10px;
                color:#1a1a1a;
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
                max-height: 105px;
                width: 1%;
                flex-grow: 1;
                font-size: 15px;
                font-weight:400;
                line-height:1.67;
                color: #000000;
                overflow:hidden;
                .more{
                    padding-right: 8px;
                    cursor: pointer;
                    text-align: center;
                    color: #175199;
                    &:hover{
                        color: #00abf9;
                    }
                }
            }
        }
        .info{
            display: flex;
            color: rgba(57,66,79,0.61);
            justify-content: flex-start;
            align-items: center;
            font-size: 13px;
            .ic{
                font-size: 14px;
                margin-right:20px;
            }
        }
    }
</style>

