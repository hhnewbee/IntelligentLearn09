<template>
    <div class="courseHeader">
        <div class="title">
            <span title="vue与webpack的学习">
                vue与webpack的学习
            </span>
            <span title="第一节：vue的介绍">
                第一节：vue的介绍
            </span>
        </div>
        <div class="detail">
            <span class="fa fa-user-o">
                 &nbsp;{{learns}}已学习
            </span>
            <span class="fa fa-television">
                 &nbsp;{{online}}在观看
            </span>
        </div>
        <div style="display: flex;align-items: center;margin-right: 20px">
            <el-checkbox-group
                    style="margin-right: 40px"
                    v-model="checkboxGroup"
                    size="small">
                <el-checkbox-button
                        label="likes"
                        key="likes">
                    23&nbsp;喜欢
                </el-checkbox-button>
                <el-checkbox-button
                        label="collections"
                        key="collections">
                    22&nbsp;收藏
                </el-checkbox-button>
            </el-checkbox-group>
            <info style="float: right;right: 10px"></info>
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
            learns:122,
            online:12,
            //喜欢和收藏的选择
            checkboxGroup:[]
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
        background-color: #2b3540;
        .title{
            color: #b5b9bc;
            margin-left: 80px;
            span{
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 180px;
            }
            span:nth-child(1){
                font-size: 18px;
                font-weight: bold;
                margin-right: 15px;
            }
            span:nth-child(2){
                font-size: 13px;
                margin-right: 25px;
            }
        }
        .detail{
            color: #7f8286;
            font-size: 13px;
            span{
                margin-left: 15px;
            }
        }
    }
</style>

