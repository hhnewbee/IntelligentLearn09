<template>
    <div>
        <el-popover
                ref="popover1"
                placement="top"
                trigger="click">
            <div class="items">
                <div>名称：
                    <span>{{name}}</span>
                </div>
                <div>专注领域：
                    <span>{{focusArea}}</span>
                </div>
                <div>邮箱：
                    <span>{{eMail}}</span>
                </div>
            </div>
        </el-popover>
        <img
                style="border-radius: 50%;height: 100%;width: 100%"
                v-popover:popover1
                :src="avatarUrl">
    </div>
</template>

<script>
    export default {
        created(){
            //todo 获取用户信息
//            this.$ajaxJava.get().then((res)=>{
//                this.name=res.name;
//                this.focusArea=res.focusArea;
//                this.eMail=res.eMail;
//            })
        },
        props:['account','avatarUrl'],
        data(){
            return{
                name:'',
                focusArea:'',
                eMail:''
            }
        }
    }
</script>

<style scoped lang="scss">
    .items > div{
        margin: 5px 0;
        font-size: 13px;
        font-weight: bold;
    }
</style>

