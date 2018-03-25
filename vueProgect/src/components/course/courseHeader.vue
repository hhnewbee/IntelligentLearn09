<template>
    <div class="courseHeader">
        <div class="title">
            <span :title="courseTitle">
                {{courseTitle}}
            </span>
            <span :title="chapterTitle">
                {{chapterTitle}}
            </span>
        </div>
        <div class="info">
            <el-checkbox-group
                    @change="handleLikeAcollect(checkboxValue,courseData)"
                    style="margin-right: 100px;"
                    fill="#475669"
                    textColor="#409EFF"
                    size="small">
                <el-checkbox-button
                        :true-label="checkboxValue"
                        label="liking"
                        key="liking">
                    {{courseData.liking}}&nbsp;喜欢
                </el-checkbox-button>
                <el-checkbox-button
                        :true-label="checkboxValue"
                        label="collect"
                        key="collect">
                    0&nbsp;收藏
                </el-checkbox-button>
            </el-checkbox-group>
            <info></info>
        </div>
    </div>
</template>

<script>
    import info from '../header/info.vue';
    import {mapState} from 'vuex';
    import {likeAcollect} from '../mixins.js';
    export default {
        data() {
            return {
                //喜欢和收藏的选择
                checkboxValue:''
            }
        },
        computed:{
            ...mapState('course',['courseTitle','chapterTitle','courseData'])
        },
        components: {
            info
        },
        mixins:[likeAcollect]
    }
</script>

<style lang="scss">
    .courseHeader {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #2b3540;
        .title {
            color: #b5b9bc;
            margin-left: 80px;
            span {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 180px;
            }
            span:nth-child(1) {
                font-size: 18px;
                font-weight: bold;
                margin-right: 15px;
            }
            span:nth-child(2) {
                font-size: 13px;
                margin-right: 25px;
            }
        }
        /*.detail {*/
            /*color: #7f8286;*/
            /*font-size: 13px;*/
            /*span {*/
                /*margin-left: 15px;*/
            /*}*/
        /*}*/
        .info {
            display: flex;
            align-items: center;
            margin-right: 80px;
            .el-checkbox-button__inner{
                background-color: #2b3540;
                border-color: #475669;
            }
        }
    }
</style>

