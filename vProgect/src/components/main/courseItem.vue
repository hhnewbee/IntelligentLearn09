<template>
    <div class="course">
        <div class="pic">
            <img src="../../static/imgs/avatar.jpg">
        </div>
        <div class="name">Vue+webpack</div>
        <div class="detail">
            <span class="likes fa fa-heart">&nbsp;222</span>
            <span class="learns fa fa-user" style="margin-left: 10px">&nbsp;222</span>
        </div>
    </div>
</template>

<script>

</script>

<style scoped lang="scss">
    .course{
        width: 200px;
        margin: 20px 0;
        display: flex;
        flex-direction: column;
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
            align-self: flex-start;
            font-size: 16px;
            color: #18C0DF;
            font-weight: bold;
            margin: 12px 10px;
        }
        .detail{
            align-self: flex-start;
            font-size: 13px;
            margin: 0 10px;
            color: rgba(133, 135, 136, 0.61);
        }
    }
</style>

