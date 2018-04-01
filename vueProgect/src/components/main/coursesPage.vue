<template>
    <div id="cursesPageIL09">
        <div class="typeHeader">
            <div class="itemName">
                分类：
            </div>
            <el-radio-group
                    @change="hanleType"
                    v-model="typeChoose"
                    style="padding:0 10px"
                    size="small">
                <el-radio-button
                        v-for="ty in type"
                        :key=ty
                        :label=ty
                        class="chooseItem">
                </el-radio-button>
            </el-radio-group>
        </div>
        <div class="choose">
            <el-radio-group
                    @change="handleChoose"
                    v-model="choose"
                    size="small"
                    style="margin-right: 20px">
                <el-radio-button label="最新"></el-radio-button>
                <el-radio-button label="最热"></el-radio-button>
            </el-radio-group>
        </div>

        <div class="coursesContent">
            <courseItem :data="item"
                        v-for="item in listNow.courses"
                        :key="item.title">
            </courseItem>
        </div>
        <el-pagination
                @size-change="handlePage"
                background
                layout="prev, pager, next"
                :total="listNow.page">
        </el-pagination>
        <footer_></footer_>
    </div>
</template>

<script>
    import courseItem from './courseItem.vue'
    import {mapState} from 'vuex'
    import footer_ from '../footer/footer.vue';
    import {areaCaching,pageRequire} from '../mixins.js';

    export default {
        components: {
            courseItem,
            footer_,
        },
        computed:{
            ...mapState(['type']),
        },
        mixins:[pageRequire,areaCaching]
    }
</script>

<style lang="scss">
    #cursesPageIL09{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 40px 0 10px;
        background-color: $mainPageColor;
        .typeHeader {
            height: 50px;
            width: 90%;
            margin: 0 20px;
            padding: 0 0 5px;
            border-bottom: 1px solid #d8dbdc;
            .itemName {
                float: left;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                font-size: 15px;
                font-weight: bold;
                color: #8fdf09;
            }
            .el-radio-button__inner {
                border-radius: 4px;
                border: none;
                font-size: 14px;
            }
            .chooseItem {
                margin: 6px;
            }
        }
        .choose {
            align-self: flex-end;
            margin-top: 20px;
            margin-right: 100px;
        }
        .coursesContent {
            display: flex;
            justify-content: space-around;
            align-items: center;
            flex-shrink: 0;
            flex-wrap: wrap;
            width: 1100px;
            margin: 20px 60px;
            padding: 15px ;
            box-shadow: 4px 4px 18px rgba(136, 136, 136, 0.588235);
            cursor: pointer;
            box-sizing: content-box;
            background-color: white;
            .courseItem{
                margin: 25px;
            }
        }

    }
</style>

