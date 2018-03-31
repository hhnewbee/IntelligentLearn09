<template>
    <div class="courseHeader">
        <div class="title">
            <span class="back fa fa-angle-left" @click="handlePageBack"></span>
            <span :title="courseTitle">
                {{courseTitle}}
            </span>
            <span :title="chapterTitle">
                {{chapterTitle}}
            </span>
        </div>
        <div class="info">
            <el-checkbox-group
                    style="margin-right: 100px;width: 140px"
                    fill="#475669"
                    textColor="#409EFF"
                    size="small">
                <el-checkbox-button
                        @click.native="handleLikeAcollect('course/liking/',courseData)"
                        label="liking"
                        key="liking">
                    {{courseData.liking}}&nbsp;喜欢
                </el-checkbox-button>
                <el-checkbox-button
                        @click.native="handleLikeAcollect('course/collect/',courseData)"
                        label="collect"
                        key="collect">
                    0&nbsp;收藏
                </el-checkbox-button>
            </el-checkbox-group>
            <info style="color: #4e6075"></info>
        </div>
    </div>
</template>

<script>
    import info from '../header/info.vue';
    import {mapState} from 'vuex';
    import {likeAcollect, pageBack} from '../mixins.js';

    export default {
        mounted() {
            if (this.$route.query.path) {
                localStorage["backUrl"] = this.$route.query.path;
            }
        },
        data() {
            return {
                //组件的选项数组
                checkBoxGroup: [],
            }
        },
        computed: {
            ...mapState('course', ['courseTitle', 'chapterTitle', 'courseData'])
        },
        components: {
            info
        },
        mixins: [likeAcollect, pageBack]
    }
</script>

<style lang="scss">
    .courseHeader {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #2b3540;
        color: $secondaryText;
        .title {
            margin-left: 60px;
            max-width: 400px;
            min-width: 400px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: flex;
            align-items: center;
            span:nth-child(1) {
                font-size: 30px;
                font-weight: bold;
                margin-right: 20px;
                cursor: pointer;
            }
            span:nth-child(2) {
                font-size: 18px;
                margin-right: 25px;
            }
            span:nth-child(3) {
                font-size: 13px;
                margin-right: 25px;
            }
        }
        .info {
            display: flex;
            align-items: center;
            margin-right: 80px;
            .el-checkbox-button__inner {
                background-color: #2b3540;
                border-color: #475669;
                color: $secondaryText;
                &:hover {
                    color: $primaryColor;
                }
            }
        }
    }
</style>

