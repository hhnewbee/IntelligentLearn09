<template>
    <div class="course">
        <div class="pic">
            <img src="../../static/imgs/avatar.jpg">
        </div>
        <div class="name">Vue+webpack</div>
        <div class="detail">
            <span class="likes fa fa-heart"> 222</span>
            <span class="learns fa fa-user" style="margin-left: 10px"> 222</span>
        </div>
        <div class="introduction">为你准备好了全面、系统的Python3入门视频课程
            Python教程很多，但能做到如此全面系统，带你入门并打牢基础的视频类课程，全网都是稀缺的，你可以自行比较一下</div>
    </div>
</template>

<script>

</script>

<style scoped lang="scss">
    .course{
        margin: 10px 0;
        display: flex;
        flex-direction: column;
        width: 200px;
        .pic{
            width: 100%;
            height: 120px;
            img{
                border-radius: 5px;
                width: 100%;
                height: 100%;
            }
        }
        .name{
            align-self: center;
            font-size: 16px;
            font-weight: bold;
            margin: 5px 0;
        }
        .detail{
            font-size: 13px;
            color: rgba(57, 66, 79, 0.61);
        }
        .introduction{
            text-overflow:ellipsis;
            overflow:hidden;
            margin: 5px 0;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    }
</style>

