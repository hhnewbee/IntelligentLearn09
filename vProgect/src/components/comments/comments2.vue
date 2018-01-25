<template>
    <div class="container2">
        <div class="info">
            <img class="avatar">
            <div class="name"></div>
            <div class="tag"></div>
            <div class="time"></div>
            <div class='control'>
                <i class="fa fa-heart"></i>
                <span class="count">1</span>
                <i class="strong fa fa-comments"></i>
                <span class="count">1</span>
                <i class="fa fa-reply"></i>
            </div>
            <div class="content"></div>
            <div class="commentd">
            </div>
        </div>
    </div>
</template>

<script>

</script>

<style scoped lang="scss">
    .container2 {
        .info {
            display: flex;
            align-items: center;
            position: relative;
            background: #FCFCFC;
            padding: 7.5px 12px;
            border-bottom: 1px solid #E5E5E5;
            border-radius: 4px 4px 0 0;
            .name {
                font-size: 14px;
                font-weight: 700;
                color: #506873;
            }
            .tag {
                background: #F44336;
                color: #FFF;
                font-size: 12px;
                padding: 3px 5px;
                font-weight: 700;
                margin-left: 10px;
                border-radius: 3px;
            }
            .time {
                color: #999;
                font-size: 13px;
                margin-left: 10px;
            }
            .button {
                position: absolute;
                right: 12px;
                display: flex;
                align-items: center;
                i {
                    margin-left: 14px;
                    color: #A6A6A6;
                    transition: color 0.3s ease;
                }
                i:hover {
                    color: #FF5722;
                }
                .strong {
                    font-size: 17px;
                }
                span {
                    margin-left: 6px;
                    color: #A6A6A6;
                    font-size: 13px;
                }
            }
        }
    }

</style>

