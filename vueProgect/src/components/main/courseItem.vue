<template>
    <div class="courseItem">
        <div class="pic" @click="handleToCourse">
            <img :src="data.icon">
        </div>
        <div class="name">{{data.title}}</div>
        <div class="detail">
            <span class="learns" style="margin-right: 15px">类型：{{data.type}}</span>
            <span class="likes fa fa-heart">&nbsp;{{data.liking}}&nbsp;人喜欢</span>
        </div>
        <div class="time detail el-icon-time">
            &nbsp;{{data.creationTimestamp | formatDate}}
        </div>
    </div>
</template>

<script>
    export default {
        props: ['data'],
        methods: {
            /**
             * 进入课程页面传递的数据
             */
            handleToCourse() {
                //不能用params，因为页面还要刷新呢
                this.$router.push({path: `/course/${this.data.id}`, query: {path: this.$route.path}});
            }
        }
    }
</script>

<style scoped lang="scss">
    .courseItem {
        width: 200px;
        margin: 20px 0;
        display: flex;
        flex-direction: column;
        .pic {
            width: 100%;
            height: 120px;
            cursor: pointer;
            img {
                border-radius: 5px;
                width: 100%;
                height: 100%;
            }
        }
        .name {
            align-self: flex-start;
            font-size: 16px;
            color: $primaryColor;
            font-weight: bold;
            margin: 12px 10px;
        }
        .detail {
            width: 100%;
            align-self: flex-start;
            font-size: 13px;
            padding: 0 10px;
            color: rgba(133, 135, 136, 0.61);
        }
        .time {
            margin-top: 8px;
        }
    }
</style>

