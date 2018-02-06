<template>
    <div class="courseHeader">
        <div class="title">
            <div class="fa fa-angle-left"></div>
            <div class="title1 tl" title="vue与webpack的学习">
                vue与webpack的学习
            </div>
            <div class="title2 tl" title="第一节：vue的介绍">
                第一节：vue的介绍
            </div>
        </div>
        <div class="detail">
            <i class="fa fa-heart like"></i>
            <span class="text">
                 {{info.likes}}
            </span>
            <i class="fa fa-user-o"></i>
            <span class="text">
                 有{{info.learns}}人学习本课程
            </span>
            <i class="fa fa-television"></i>
            <span class="text">
                {{info.online}}人正在观看
            </span>
        </div>
        <div class="info">
            <info></info>
        </div>
    </div>
</template>

<script>
import info from '../header/info.vue';
export default {
    created(){
        //TODO 获取数据
//        this.$ajax.get('').then((response)=>{
//            this.info=response.data;
//        })
    },
    props:[
        'title1',
        'title2',
    ],
    data(){
        return{
            info:{
                likes:122,
                learns:122,
                online:12
            }
        }
    },
    components:{
        info
    }
}
</script>

<style scoped lang="scss">
    .courseHeader{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #14191e;
        .title{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            color: #b5b9bc;
            .fa{
                font-size: 30px;
                margin-right: 30px;
            }
            .tl{
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 170px;
            }
            .title1{
                font-size: 16px;
                font-weight: bold;
                margin-right: 10px;
            }
            .title2{
                font-size: 13px;
                margin-right: 10px;
            }
        }
        .detail{
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #b5b9bc;
            .like{
                cursor: pointer;
                &:hover{
                    color: rgba(203, 20, 25, 0.87);
                }
            }
            .fa{
                margin-left: 15px;
                font-size: 16px;
            }
            .text{
                margin-left:3px;
            }
        }
    }
</style>

