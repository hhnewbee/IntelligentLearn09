<template>
    <div class="container" ref="container" :style="containerStyle" :class="ing">
        <div class="head">
            <div class="control">
                <div class="move" @mousedown="mdown('move', $event)"></div>
                <div class="min fa fa-minus"></div>
                <div class="max fa fa-window-restore"  @mousedown="mdown('max',$event)"></div>
                <div class="resize fa fa-arrows-alt" ref="resize" @mousedown="mdown('resize',$event)"></div>
            </div>
        </div>
        <div class="contant">
            <comments></comments>
        </div>
    </div>
</template>

<script>
    import comments from '../comments/index.vue';
    export default {
        data() {
            return {
                containerStyle:{
                    bottom:"0px",
                    left:"0px",
                    width: "500px",
                    height: "400px"
                },
                ing:{
                    ing:false
                },
                data:{
                    pd:0,
                    tx:0,
                    ty:0,
                    x:0,
                    y:0,
                    maxW:0,
                    maxH:0,
                    height:0,
                    width:0,
                    heightL:0,
                    widthL:0,
                    offsetTop:0,
                    offsetLeft:0,
                    offsetBottom:0,
                    windowW:0,
                    windowH:0,
                    oh:0,
                    ow:0,
                    ol:0,
                    ob:0
        }
            }
        },
        methods: {
            mdown(target,e) {
                //获取目标相当于viewport的距离
                this.data.offsetTop = this.$refs.container.getBoundingClientRect().top;
                this.data.offsetLeft = this.$refs.container.getBoundingClientRect().left;
                //获取目标相当于底部的距离，从底部开始bottom做为计算，因为缩放的方向是向上的
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
                        this.ing=false;
                    });
                    //移动不能超过的距离=窗口-控件
                    this.data.heightL= this.data.windowH - (this.$refs.container.offsetHeight);
                    this.data.widthL= this.data.windowW - (this.$refs.container.offsetWidth);
                    //鼠标距当前viewport的距离-目标距viewport的距离得到鼠标距目标的距离
                    this.data.tx= e.pageX - this.data.offsetLeft;
                    this.data.ty = this.data.windowH - e.pageY- this.data.offsetBottom;
                }
                else if(target==="resize"){
                    document.addEventListener("mousemove",this.resizeHandler);
                    document.addEventListener("mouseup",(e)=>{
                        //鼠标抬起，出去移动监听事件
                        document.removeEventListener("mousemove",this.resizeHandler);
                        this.ing=false;
                    });
                    //拉的最大宽度
                    this.data.maxW = this.data.windowW - this.data.offsetLeft;
                    //拉的最大高度
                    this.data.maxH =  this.data.offsetTop+this.$refs.container.clientHeight;
                    this.data.offsetButtom=this.data.windowH-this.data.maxH;
                }
                else if(target==="max"){
                    if(!this.data.pd){
                        this.data.oh =this.data.height;
                        this.data.ow =this.data.width;
                        this.data.ol =this.data.offsetLeft;
                        this.data.ob = this.data.offsetBottom;
                        this.containerStyle.bottom="0px";
                        this.containerStyle.left="0px";
                        this.containerStyle.width=this.data.windowW+"px";
                        this.containerStyle.height=this.data.windowH+"px";
                        this.data.pd=1;
                    }else{
                        this.containerStyle.bottom=this.data.ob+'px';
                        this.containerStyle.left=this.data.ol+'px';
                        this.containerStyle.width=this.data.ow+'px';
                        this.containerStyle.height=this.data.oh+'px';
                        this.data.pd=0;
                    }
                }
                //防止拖动过程中内容被选中
                this.ing=true;
            },
            moveHandler(e) {
                //移动时鼠标减去鼠标距元素的距离得到元素实际的位移
                let movetoT =this.data.windowH- e.pageY - this.data.ty;
                let movetoL = e.pageX - this.data.tx;
                //防止移动出去，注意没有单位时有的浏览器不起效果
                this.containerStyle.bottom = (movetoT <= 0 ? 0 : movetoT >= this.data.heightL ? this.data.heightL : movetoT) + "px";
                this.containerStyle.left = (movetoL <= 0 ? 0 : movetoL >= this.data.widthL ? this.data.widthL : movetoL) + "px";
                this.containerStyle.userSelect = "none";
            },
            resizeHandler(e){
                let nW = e.pageX - this.data.x + this.data.width;
                let nH = -(e.pageY - this.data.y) + this.data.height;
                this.containerStyle.width= Math.min(this.data.maxW, Math.max(nW, 500)) + "px";
                this.containerStyle.height=Math.min(this.data.maxH, Math.max(nH, 400)) + "px";
                //固定位置
                this.$refs.container.style.bottom=this.data.offsetButtom+"px";
            },
        },
        components:{
            comments
        }
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
        position: absolute;
        z-index: 100000000;
        //如果固定contant的高的话，不用弹性布局的扩充是无法拉升的，或者再内嵌一个高百分之百的布局也可以
        display: flex;
        flex-direction: column;
        .head {
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
        }
        .contant {
            flex-grow: 1;
            height: 100%;
            overflow: hidden;
            border: 1px solid  $gray;
        }

        .ing{
            user-select:none
        }
    }
</style>

