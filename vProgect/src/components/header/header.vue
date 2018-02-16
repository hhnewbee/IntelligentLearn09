<template>
    <div class="header_">
        <el-menu
                :defaultActive="$route.path"
                ref="menus"
                class="elMenu"
                mode="horizontal"
                :router='true'
                @select="menuSelect">
            <div class="img" style="float:left;margin-right:100px;margin-left: 35px">
                <img src="../../static/imgs/avatar.jpg">
            </div>
            <el-menu-item index="/main/recommend">首页</el-menu-item>
            <el-menu-item index="/main/coursesPage">课程</el-menu-item>
            <el-menu-item
                    index="/main/articlesPage">
                文章
            </el-menu-item>
            <el-menu-item
                    index="/main/questionPage">
                问答
            </el-menu-item>
            <auto-complete
                    v-model="search.value"
                    icon="ios-search"
                    placeholder="search here"
                    :remote-method="searchIng"
                    @on-select="searchSelect"
                    @on-search="searchIng"
                    class="search">
                <div class="demo-auto-complete-item" v-for="item in search.data">
                    <div class="demo-auto-complete-group">
                        <span>{{ item.type }}</span>
                    </div>
                    <Option v-for="option in item.items"
                            :value="option.url"
                            :key="option.value">
                        <span class="demo-auto-complete-title">{{ option.value }}</span>
                    </Option>
                </div>
                <Option v-if="search.nothing"
                        :value="search.value"
                        :disabled="true"
                        :key="search.value">
                    <span class="demo-auto-complete-title">{{search.nothingText}}</span>
                </Option>
                <Col class="demo-spin-col"
                     v-if="search.longding">
                <Spin fix>
                    <Icon type="load-c" size=18             class="demo-spin-icon-load">
                    </Icon>
                </Spin>
                </Col>
            </auto-complete>
            <div class="img"
                 style="float:right;margin-right: 35px;">
                <avatarInfo></avatarInfo>
            </div>
        </el-menu>
    </div>
</template>

<script>
    import 'iview/dist/styles/iview.css'
    import {AutoComplete, Option, Spin, Icon, Col} from 'iview';
    import avatarInfo from './info.vue';

    export default {

        data() {
            return {
                name: 'newbee',
                position: '前端开发',
                search: {
                    value: '',
                    data: [],
                    longding: false,
                    nothing: false,
                    nothingText: "无匹配数据",
                    axios: {},
                    time: null
                }
            }
        },
        created() {
            this.search.axios = this.$ajax.create();
        },
        methods: {
            menuSelect(item) {
                console.log(item);
            },
            searchSelect(item) {
                console.log(item);
                this.search.value = '';
            },
            searchIng(query) {
                clearTimeout(this.search.time);
                this.search.time = setTimeout(() => {
                    if (!query) {
                        this.search.nothing = false;
                        this.search.longding = false;
                        return;
                    }
                    this.search.data = {};
                    this.search.longding = true;
                    this.search.axios.get('search/' + query).then((response) => {
                        this.search.longding = false;
                        let data = response.data;
                        if (!data) {
                            this.search.nothing = true;
                        } else {
                            this.search.nothing = false;
                            this.search.data = data;
                        }
                    });
                }, 1000);

            }
        },
        components: {
            AutoComplete,
            Option,
            Spin,
            Icon,
            Col,
            avatarInfo
        }
    }
</script>

<style scoped lang="scss">
    .header_ {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        z-index: 100;
        .elMenu{
            display: flex;
            justify-content: space-between;
            flex-wrap: nowrap;
        }
        .img {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 61px;
            box-sizing: border-box;
            padding: 0 20px;
            border-bottom: 2px solid transparent;
            outline: none;
            img {
                width: 45px;
                height: 45px;
            }
        }
        .search {
            margin-top: 15px;
            width: 300px;
            margin-left: 100px;
            .demo-auto-complete-item {
                padding: 4px 0;
                border-bottom: 1px solid #F6F6F6;
            }
            .demo-auto-complete-group {
                font-size: 12px;
                padding: 4px 6px;
            }
            .demo-auto-complete-group span {
                color: #666;
                font-weight: bold;
            }
            .demo-auto-complete-group a {
                float: right;
            }
            .demo-auto-complete-count {
                float: right;
                color: #999;
            }
            .demo-auto-complete-more {
                display: block;
                margin: 0 auto;
                padding: 4px;
                text-align: center;
                font-size: 12px;
            }
            .demo-spin-col {
                height: 25px;
                position: relative;
            }
            .demo-spin-icon-load {
                animation: ani-demo-spin 1s linear infinite;
            }
            @keyframes ani-demo-spin {
                from {
                    transform: rotate(0deg);
                }
                50% {
                    transform: rotate(180deg);
                }
                to {
                    transform: rotate(360deg);
                }
            }
        }
        .button {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 130px;
        }
    }
</style>

