<template>
    <el-select
            id="searchIL09"
            size="samll"
            remote
            filterable
            clearable
            v-model="valueSearch"
            :remote-method="remoteMethod"
            :loading="loading"
            @change="searchFun"
            placeholder="请搜索">
        <el-option-group
                v-for="group in responseData"
                :key="group.type"
                :label="group.type">
            <el-option
                    v-for="item in group.items"
                    :key="item.value"
                    :label="item.value"
                    :value="item.url">
            </el-option>
        </el-option-group>
    </el-select>
</template>

<script>
    export default {
        created() {
            this.initSearch();
        },
        data() {
            return {
                responseData: [],
                valueSearch: '',
                loading: false,
                timeOut: null,
                axiosSearch: {}
            }
        },
        methods: {
            /**
             * 输入时监听
             * @param query - 当前输入值
             */
            remoteMethod(query) {
                //判断输入的是否为空
                if (query !== '') {
                    this.loading = true;
                    //消抖
                    clearTimeout(this.timeout);
                    this.timeout = setTimeout(() => {
                        this.axiosSearch.get('search/' + query).then((response) => {
                            this.loading = false;
                            let data = response.data;
                            if (!data) {
                                this.responseData = [];

                            } else {
                                this.responseData = data;
                            }
                        });
                    }, 1000);
                }
            },
            /**
             * 搜索初始化
             */
            initSearch() {
                //不能用全局的ajax实例，因为去全局的搜索等待是全页面显示的
                this.axiosSearch = this.$ajax.create();
            },
            /**
             * 开始搜索
             * @param value
             */
            searchFun(value) {
                //todo 搜索后的跳转
                console.log(value);
            }
        }
    }
</script>

<style lang="scss">
    #searchIL09{

    }
</style>

