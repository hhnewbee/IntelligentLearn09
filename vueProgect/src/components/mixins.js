//页面数据缓存
export let areaCaching = {
    data() {
        return {
            //缓存区
            areas: new Map(),
            //旧的缓存区标志，也是当前缓存区标识
            oldTag: null,
            //当前要展示数据
            listNow: {}
        }
    },
    methods: {
        /**
         * 缓存区切换
         * @param tar - 新的缓存标识
         * @param url - 加载内容的url
         */
        handleChangeArea(tar, url) {
            //如果不是第一次请求，关闭之前的缓存
            if (this.oldTag) {
                this.areas.get(this.oldTag).show = false;
            }
            //判断该缓存是否已经存在
            if (this.areas.has(tar)) {
                //如果存在了就复用
                this.areas.get(tar).show = true;
                this.listNow = this.areas.get(tar).itemList;
            } else {
                //如果不存在，则从新加载
                this.$ajaxJava.get(url).then((res) => {
                    this.listNow = res.data;
                    this.areas.set(tar, {
                        show: true,
                        itemList: res.data
                    })
                });
            }
            //重置旧的缓存区标识
            this.oldTag = tar;
        }
    }
};
//学习记录
export let recordLearning = {
    data() {
        return {
            heartTime: ''
        }
    },
    methods: {
        /**
         * 监视学习时长的心跳包
         * @constructor
         */
        keepLearning(url) {
            this.heartTime = setInterval(() => {
                //todo 改进学习时长的心跳包，用websock代替
                this.$ajax.create().get(url, (res) => {
                });
            }, 2000);
        },
        /**
         * 该学习内容的访问次数
         */
        beginLearning(id) {
            this.$ajaxJava.get(`/${id}`, (res) => {

            });
        }
    }
};
//点赞和收藏
export let likeAcollect = {
    methods: {
        /**
         * 喜欢和收藏
         * @param lOc - 是喜欢还是收藏
         * @param data - 要操作的数据
         */
        handleLikeAcollect(lOc, data) {
            this.$ajaxJava.get(lOc + data.id).then((res) => {
                //是否已经点赞或者收藏过
                if (res.data.result === '0') {
                    this.$message({
                        message: lOc.match('liking') ? '已经点赞过' : '已经收藏过',
                        type: 'warning',
                        duration: 2000,
                        showClose: true
                    });
                } else {
                    if (this.$refs[lOc + data.id]) {
                        this.$refs[lOc + data.id].style.color = '#409EFF';
                    }
                    data[lOc]++
                }
            });
        }
    }
};
//页面返回
export let pageBack = {
    methods: {
        handlePageBack() {
            this.$router.push({path: localStorage["backUrl"]});
        }
    }
};
//分类页面加载
export let pageRequire = {
    data() {
        return {
            //最新、最热
            choose: '最新',
            //类型选择
            typeChoose: "",
            //url
            url:''
        }
    },
    methods: {
        iniData() {
            //处理关注领域
            if (this.areaFocus.indexOf('/') !== -1) {
                this.typeChoose = this.areaFocus.split('/', 1)[0];
            }else{
                this.typeChoose = this.areaFocus;
            }
            this.handleChangeArea(`new${this.typeChoose}P1`, `${this.url}/choose=new/type=${this.typeChoose}/page=0/size=10`);
        },
        /**
         * 最新最热
         */
        handleChoose(label) {
            let valueChoose = label === '最新' ? 'new' : 'hot';
            this.handleChangeArea(valueChoose + this.typeChoose + 'p1', `${this.url}/choose=${valueChoose}/type=${this.typeChoose}/page=0/size=10`);
        },
        /**
         * 类型选择
         */
        hanleType(label) {
            let valueChoose = this.choose === '最新' ? 'new' : 'hot';
            this.handleChangeArea(valueChoose + label + 'p1', `${this.url}/choose=${valueChoose}/type=${label}/page=0/size=10`);
        },
        /**
         * 分页
         */
        handlePage(size) {
            let valueChoose = this.choose === '最新' ? 'new' : 'hot';
            this.handleChangeArea(valueChoose + this.typeChoose + 'p' + size, `${this.url}/choose=${valueChoose}/type=${this.typeChoose}/page=${size - 1}`);
        },
    },
};