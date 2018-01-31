<template>
    <div class="article">
        <div class="name">vue+webpack</div>
        <div class="detail">
            <div class="avatar">
                <img src="../../static/imgs/avatar.jpg" style="border-radius: 50%">
            </div>
            <div class="name">newbee</div>
            <div class="time">2015-3-23</div>
        </div>
        <div class="content">
            <div class="media">
                <img src="../../static/imgs/avatar.jpg" style="border-radius: 5px">
            </div>
            <div class="text">
                <span>这几天在修改 WPJAM 问答网站首页列表的时候，发现一个问题，就是有些问题的标题比较长，为了显示美观，我想将首页列表的标题都设置为1行，如果超出的在最后显示 …，开始的时候我使用 PHP 函数来计算文字个数，但是由于中英文字数算法和长度的问题，总是不能做到很完美的效果，后来发现可以通过定义元素的 text-overflow 这个 CSS 属性实现文本溢出省略号。这几天在修改 WPJAM 问答网站首页列表的时候，发现一个问题，就是有些问题的标题比较长，为了显示美观，我想将首页列表的标题都设置为...
                </span>
                <span class="more">查看更多
                    <span class="fa fa-chevron-down"></span>
                </span>
            </div>
        </div>
        <div class="info">
            <div class="likes fa fa-heart ic"> 22</div>
            <div class="comments fa fa-comments ic"> 22</div>
            <div class="collection fa fa-star ic"> 22</div>
            <div class="share fa fa-paper-plane ic"> 22</div>
        </div>
    </div>
</template>

<script>

</script>

<style scoped lang="scss">
    .article{
        box-shadow: 4px 4px 10px rgba(136, 136, 136, 0.51);
        margin-top: 20px;
        padding: 10px;
        .name{
            font-size: 19px;
            font-weight: bold;
            color: #00a0e9;
        }
        .detail{
            margin-left: 8px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 8px;
            font-size: 13px;
            color: rgba(57,66,79,0.61);
            .avatar{
                width: 30px;
                height: 30px;
                margin-right: 10px;
            }
            .name{
                font-size: 15px;
                margin-right: 10px;
                color:#1a1a1a;
            }
            .time{
                font-size: 13px;
            }
        }
        .content{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .media{
                margin-right: 30px;
                width: 300px;
                height: 120px;
            }
            .text{
                font-size: 15px;
                width: 100%;
                text-overflow:ellipsis;
                overflow:hidden;
                margin: 5px 0;
                display: -webkit-box;
                -webkit-line-clamp: 5;
                -webkit-box-orient: vertical;
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
            margin-top: 20px;
            display: flex;
            color: rgba(57,66,79,0.61);
            justify-content: flex-start;
            align-items: center;
            font-size: 13px;
            .ic{
                font-size: 15px;
                margin: 0 10px;
            }
        }
        img{
            width: 100%;
            height: 100%;
        }
    }
</style>

