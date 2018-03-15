<template>
    <el-button class="backHeader fa fa-arrow-up"
               type="primary"
               @click="handleClick"
               title="回到顶部">
    </el-button>
</template>

<script>

    export default {
        mounted(){
            this.initDom();
        },
        data(){
            return{
                //要滚动的目标页面
                scrollTag:{},
                //下拉时的定时器，用于动画效果
                timer:null,
                //滚动条滚动时触发也能马上停下来
                isTop:true
            }
        },
        methods: {
            /**
             * dom初始化
             */
            initDom() {
                //点击滚动的按钮
                let tbtn = document.querySelector('.backHeader');
                //滚动的按钮都放在其父页面上
                this.scrollTag=tbtn.parentElement;
                //获取页面的可视窗口高度
                let clientHeight = this.scrollTag.clientHeight;

                //滚动条滚动时触发
                this.scrollTag.onscroll = ()=>{
                    //在滚动的时候增加判断，当下拉到整体页面的一半时
                    let osTop = this.scrollTag.scrollTop;
                    if (osTop >= clientHeight) {
                        tbtn.style.display = 'block';
                    } else {
                        tbtn.style.display = 'none';
                    }

                    //是否手动拉动滚动条停止滚动会顶部
                    if (!this.isTop) {
                        clearInterval(this.timer);
                    }

                    //手动停止回到顶部
                    this.isTop = false;
                };

            },
            /**
             * 滚动点击处理
             */
            handleClick(){
                //设置定时器
                this.timer = setInterval(()=>{
                    //获取滚动条距离顶部的高度
                    let osTop = this.scrollTag.scrollTop;

                    //越到顶部，减小滚动的速度
                    let isSpeed = Math.floor(-osTop / 6);
                    this.scrollTag.scrollTop = osTop + isSpeed;

                    //不停止滚动
                    this.isTop = true;

                    //判断，然后清除定时器，停止滚动
                    if (osTop === 0) {
                        clearInterval(this.timer);
                    }
                },30);
            }
        },
    }
</script>

<style scoped lang="scss">
    .backHeader {
        position: fixed;
        display: none;
        right: 60px;
        bottom: 30px;
        font-size: 18px;
        color: white;
    }
</style>

