<template>
    <div class="page">
        <div class="header">
            <div class="type">
                <span class="itemName">类别 :</span>
                <div class="items">
                    <span
                            v-for="item in typeItems"
                            :key="item"
                            :ref="item"
                            @click="handleTypeItemChoose(item)"
                            class="item itemNotChoose">{{item}}</span>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="control">
                <span
                        v-for="item in ctypeItems"
                        :ref=item
                        @click="handleCitemChoose(item)"
                        class='citem'>{{item}}</span>
            </div>
            <div class="page">
                <slot></slot>
            <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="1000">
                </el-pagination>
            </div>
            <div class="foooter"></div>
        </div>
        <footer_></footer_>
    </div>
</template>

<script>
    import footer_ from '../footer/footer.vue';
    export default {
        data() {
            return {
                //类型的选项
                typeItems: ['全部','金融', '汽车'],
                //最新或者最热的选项
                ctypeItems:['最新','最热']
            }
        },
        mounted(){
            this.itemClick();
        },
        methods:{
            /**
             * 类型item的选择处理
             * @param item
             */
            handleTypeItemChoose(item){
                let cl=null;
                this.typeItems.forEach((typeItem)=>{
                    cl=this.$refs[typeItem][0].classList;
                    //判断类型的选择
                    if(typeItem===item){
                        cl.remove('itemNotChoose');
                        cl.add('itemChoose');
                    }else{
                        cl.remove('itemChoose');
                        cl.add('itemNotChoose');
                    }
                })
            },
            /**
             * 初始化类型模拟点击
             */
            itemClick(){
                this.$refs['全部'][0].click();
                this.$refs['最新'][0].click();
            },
            /**
             * 最新或者最热的转换
             * @param item
             */
            handleCitemChoose(item){
                this.ctypeItems.forEach((citem)=>{
                    if(item===citem){
                        this.$refs[citem][0].style.color='#00abf9'
                    }else{
                        this.$refs[citem][0].style.color='#b5b5b5'
                    }
                })
            }
        },
        components:{
            footer_
        }
    }
</script>

<style scoped lang="scss">
    .page{
        display: flex;
        flex-direction: column;
        .header {
            margin: 0 60px;
            .type {
                padding-top: 10px;
                padding-bottom: 20px;
                display: flex;
                align-items: center;
                border-bottom: 1px solid #f0e9e9;
                .itemName {
                    font-weight: bold;
                    font-size: 15px;
                }
                .items {
                    padding-left: 10px;
                    .itemChoose {
                        background-color: #2b333b;
                        color: #ffffff;
                    }
                    .itemNotChoose{
                        color: #14191e;
                        background-color: #ffffff;
                    }
                    .item{
                        margin-left: 10px;
                        padding: 10px;
                        border-radius: 2px;
                        font-size: 15px;
                        cursor: pointer;
                    }
                }
            }
        }
        .content{
            display: flex;
            flex-direction: column;
            margin: 20px 60px;
            padding: 15px 20px;
            box-shadow: 4px 4px 18px rgba(136, 136, 136, 0.588235);
            cursor: pointer;
            .control{
                display: flex;
                justify-content: flex-end;
                .citem{
                    font-size: 14px;
                    color: #b5b5b5;
                    margin-right: 10px
                }
            }
            .page{
                display: flex;
                flex-direction: column;
                align-items: center;
            }
        }
    }
</style>

