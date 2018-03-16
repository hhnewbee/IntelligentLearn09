<template>
    <div class="footer">
        <div class="text">关于我们</div>
        <div class="text" style="margin-left: 20px">意见反馈</div>
    </div>
</template>

<script>

</script>

<style scoped lang="scss">
    .footer{
        display: flex;
        justify-content: center;
        align-items: center;
        /*background-color: #2E3340;*/
        cursor: pointer;
        height: 100px;
        width: 100%;
        flex-shrink: 0;
        .text{
            font-size: 14px;
            color: #b0bcd0;
            &:hover{
                color: #d7e6fe;
            }
        }
    }
</style>

