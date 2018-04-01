<template>
    <div class="rightItem">
        <div class="itemName">
            {{option.title}}
        </div>
        <div v-if="contents.length===0" style="text-align: center;color: #9b9b9b">暂无</div>
        <div
                class="content"
                v-for="content in contents">
            <div class="contentText">{{content.content}}</div> b
            <div class="el-icon-time">&nbsp;{{content.time|formatDate}}</div>
        </div>
    </div>
</template>

<script>
export default {
    props:['option','contents']
}
</script>

<style scoped lang="scss">
    .rightItem {
        margin-top: 40px;
        .itemName {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 300px;
            padding-bottom: 10px;
            margin-bottom: 10px;
            border-bottom: 1px solid #ebebeb;
            font-size: 18px;
            font-weight: bold;
            color: #8fdf09;
        }
        .content {
            margin-bottom: 15px;
            color: #022856;
            max-width: 300px;
            padding: 0 15px;
            .contentText {
                margin-right: 10px;
                margin-bottom: 5px;
                font-size: 15px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                cursor: pointer;
                &:hover {
                    color: #0457bb;
                }

            }
            div:nth-child(2){
                color:$secondaryText;
                font-size: 13px;
            }
        }
    }
</style>

