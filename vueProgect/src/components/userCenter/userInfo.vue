<template>
    <div class="userInfo">
        <el-breadcrumb class="breadcrumb">
            <el-breadcrumb-item
                    class="el-icon-edit-outline">&nbsp;个人信息
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="item item1">
            <div>
                <img src="http://localhost:3100/img/avatar/avatar.jpg">
                <div></div>
            </div>
            <div style="margin: 0 30px">
                <div>姓名：
                    <span>newbee</span>
                </div>
                <div>专注领域：
                    <el-select v-model="areaFocus"
                               multiple
                               placeholder="请选择专注领域">
                        <el-option v-for="item in filterType('全部')"
                                   :key="item"
                                   :label="item"
                                   :value="item">
                        </el-option>
                    </el-select>
                </div>
            </div>

            <div class="learnInfo">
                <div>学习时长：<span>48h</span></div>
                <div style="margin-left: 10px">访问次数：<span>50</span></div>
            </div>
        </div>
        <div class="item">
            <div class="item2">账号：
                <span ref="account">1540913111</span>
                <span
                        @click="handleEditInfo('account',$event)"
                        class="control">修改</span>
            </div>
            <div class="item2">姓名：
                <span ref="name" style="padding: 5px">CEO</span>
                <span
                        @click="handleEditInfo('name',$event)"
                        class="control">修改</span>
            </div>
            <div class="item2">邮箱：
                <span ref="eMail" style="padding: 5px">1352905383@qq.com</span>
                <span
                        @click="handleEditInfo('eMail',$event)"
                        class="control">修改</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
        data(){
            return{
                areaFocus:[]
            }
        },
        computed: {
            ...mapGetters(['filterType']),
        },
        methods:{
            handleEditInfo(tar,e){
                let target=e.currentTarget;
                let content=this.$refs[tar];
                //修改还是保存的判断
                if(target.innerText==='修改'){
                    content.contentEditable=true;
                    content.focus();
                    target.style.color='#8fdf09';
                    target.innerText="保存";
                }else{
                    content.contentEditable=false;
                    target.style.color='#00abf9';
                    target.innerText="修改";
                }
            }
        }
    }
</script>

<style lang="scss">
    .userInfo {
        .item {
            margin: 20px 100px;
            padding: 10px;
            border-bottom: 1px solid #f8f4f4;
            img {
                width: 95px;
                height: 95px;
                border-radius: 50%;
            }
            .learnInfo {
                display: flex;
                align-items: center;
                position: absolute;
                right: 0;
            }
            .item2{
                margin: 20px;
                font-size: 15px;
                font-weight: bold;
            }
            .control{
                font-size: 14px;
                color: #00abf9;
                cursor: pointer;
                margin-left: 10px;
            }
        }
        .item1 {
            position: relative;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 18px;
            font-weight: bold;
            .el-input__inner{
                border:none
            }
        }
    }

</style>

