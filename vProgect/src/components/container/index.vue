<template>
    <div class="container" ref="container" :style="containerStyle">
        <div class="head">
            <div class="control">
                <div class="move" @mousedown="mdown('move', $event)"></div>
                <div class="min fa fa-minus"></div>
                <div class="max fa fa-window-restore"></div>
                <div class="resize fa fa-arrows-alt" ref="resize" @mousedown="mdown('resize',$event)"></div>
            </div>
            <div class="manage">
                <div class="info">
                    <img class="portrial" src="image/favicon.ico">
                    <div class="name">
                        newbee
                    </div>
                </div>
                <div class="search">
                    <div class="fa fa-search"></div>
                    <input type="text">
                    <div class="fa  fa-angle-down"></div>
                </div>
                <div class="change">
                    <div class="fa fa-comments-o"></div>
                    <div class="iconfont icon-pinglun1"></div>
                </div>
                <div class="set"></div>
            </div>
        </div>
        <div class="contant">
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                containerStyle:{
                    userSelect :"auto",
                },
                data:{
                    tx:0,
                    ty:0,
                    x:0,
                    y:0,
                    maxW:0,
                    maxH:0,
                    height:0,
                    width:0,
                    theightL:0,
                    twidthL:0,
                    offsetTop:0,
                    offsetLeft:0,
                    offsetBottom:0,
                    windowW:0,
                    windowH:0
                }
            }
        },
        methods: {
            mdown(target,e) {
                //获取目标相当于viewport的距离
                this.data.offsetTop = this.$refs.container.getBoundingClientRect().top;
                this.data.offsetLeft = this.$refs.container.getBoundingClientRect().left;
                this.data.offsetBottom=getComputedStyle(this.$refs.container,null).getPropertyValue("bottom").slice(0,-2);
                //得到viewport的宽高度，不包含下拉框
                this.data.windowW = document.documentElement.clientWidth;
                this.data.windowH = document.documentElement.clientHeight;
                //获取目标的宽高
                this.data.height=this.$refs.container.offsetHeight;
                this.data.width=this.$refs.container.offsetWidth;
                //鼠标的坐标
                this.data.x= e.pageX;
                this.data.y= e.pageY;
                if(target==="move"){
                    document.addEventListener("mousemove",this.moveHandler);
                    document.addEventListener("mouseup",(e)=>{
                        //鼠标抬起，出去移动监听事件
                        document.removeEventListener("mousemove",this.moveHandler);
                        this.containerStyle.userSelect='auto';
                    });
                    //移动不能超过的距离=窗口-控件
                    this.data.heightL= this.data.windowH - (this.$refs.container.offsetHeight);
                    this.data.widthL= this.data.windowW - (this.$refs.container.offsetWidth);
                    //鼠标距当前viewport的距离-目标距viewport的距离得到鼠标距目标的距离
                    this.data.tx= e.pageX - this.data.offsetLeft;
                    this.data.ty = this.data.windowH - e.pageY- this.data.offsetBottom;
                }
                if(target==="resize"){
                    document.addEventListener("mousemove",this.resizeHandler);
                    document.addEventListener("mouseup",(e)=>{
                        //鼠标抬起，出去移动监听事件
                        document.removeEventListener("mousemove",this.resizeHandler);
                        this.containerStyle.userSelect='auto';
                    });
                    //拉的最大宽度
                    this.data.maxW = this.data.windowW - this.data.offsetLeft;
                    //拉的最大高度
                    this.data.maxH =  this.data.height+this.data.offsetTop;
                    this.data.offsetButtom=this.data.windowH-this.data.maxH;
                    console.log(this.data.offsetButtom);
                }
                //防止拖动过程中内容被选中
                this.containerStyle.userSelect='none';
            },
            moveHandler(e) {
                //移动时鼠标减去鼠标距元素的距离得到元素实际的位移
                let movetoT =this.data.windowH- e.pageY - this.data.ty;
                console.log(movetoT);
                let movetoL = e.pageX - this.data.tx;
                //防止移动出去，注意没有单位时有的浏览器不起效果
                this.$refs.container.style.bottom = (movetoT <= 0 ? 0 : movetoT >= this.data.heightL ? this.data.heightL : movetoT) + "px";
                this.$refs.container.style.left = (movetoL <= 0 ? 0 : movetoL >= this.data.widthL ? this.data.widthL : movetoL) + "px";
                this.containerStyle.userSelect = "none";
            },
            resizeHandler(e){
                let nW = e.pageX - this.data.x + this.data.width;
                let nH = -(e.pageY - this.data.y) + this.data.height;
                this.$refs.container.style.width= Math.min(this.data.maxW, Math.max(nW, 500)) + "px";
                this.$refs.container.style.height=Math.min(this.data.maxH, Math.max(nH, 400)) + "px";
                //固定位置
                this.$refs.container.style.bottom=this.data.offsetButtom+"px";
                console.log(this.$refs.container.style.bottom);
            },
        },
    }
</script>

<style scoped lang="scss">
    $rightb: #f2f5f8;
    $leftb: #444753;
    $gray: #b4b8c1;
    $green: #86BB71;
    $blue: #94C2ED;
    @mixin center {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    * {
        padding: 0;
        margin: 0;
        cursor: default;
    }

    .container {
        width: 500px;
        height: 400px;
        min-height: 400px;
        min-width: 500px;
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 100000000;
        //如果固定contant的高的话，不用弹性布局的扩充是无法拉升的，或者再内嵌一个高百分之百的布局也可以
        display: flex;
        flex-direction: column;
        .head {
            height: 95px;
            width: 100%;
            .control {
                display: flex;
                justify-content: flex-end;
                height: 30px;
                background-color: $gray;
                .move {
                    height: 100%;
                    width: 1px;
                    flex-grow: 1;
                    cursor: move;
                }
                .min {
                    height: 100%;
                    width: 30px;
                    color: #747882;
                    @include center;
                }
                .max {
                    height: 100%;
                    width: 30px;
                    color: #747882;
                    @include center;
                }
                .resize {
                    height: 100%;
                    width: 30px;
                    color: #747882;
                    cursor: ne-resize;
                    @include center;
                }
            }
            .manage {
                height: 45px;
                display: flex;
                margin: 10px;
                align-items: center;
                justify-content: space-evenly;
                color: $gray;
                .info {
                    align-items: center;
                    display: flex;
                    .portrial {
                        height: 45px;
                        width: 45px;
                        border-radius: 50%;
                    }
                    .name {
                        margin: 0 10px;
                        font-size: 14px;
                        font-weight: 600;
                    }
                }
                .search {
                    flex-grow: 1;
                    width: 200px;
                    height: 20px;
                    margin: 0 10px;
                    display: flex;
                    .fa {
                        height: 100%;
                        border-bottom: 1px solid $gray;
                    }
                    input {
                        padding: 0 5px;
                        font-size: 14px;
                        width: 100%;
                        height: 100%;
                        color: #1E9FFF;
                        border: none;
                        border-bottom: 1px solid $gray;
                        outline: none;
                    }
                }
                .change {
                    display: flex;
                    margin: 0 10px;
                    align-items: center;
                    & > div {
                        margin-left: 3px;
                    }
                    div:nth-child(3), div:nth-child(5) {
                        margin-left: 8px;
                    }
                    .fa-comments, .fa-commenting {
                        font-size: 18px;
                    }
                    .fa-heart {
                    }
                    .num {
                        font-size: 13px;
                        font-weight: 600;
                    }
                }
            }
        }
        .contant {
            flex-grow: 1;
            height: 305px;
            background-color: $gray;
            overflow: hidden;
        }
    }

    #dsj-cc-container-1540913112-button {
        width: 50px;
        height: 50px;
        position: fixed;
        right: 0;
        top: 50%;
        background-color: rgba(30, 159, 255, 0.11);
        transform: translateY(-100%);
    }

</style>

