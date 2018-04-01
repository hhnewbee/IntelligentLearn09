//页面数据缓存
export let areaCaching={
    data(){
        return{
            //缓存区
            areas:new Map(),
            //旧的缓存区标志，也是当前缓存区标识
            oldTag:null,
            //当前要展示数据
            listNow:{}
        }
    },
    methods:{
        /**
         * 缓存区切换
         * @param tar - 新的缓存标识
         * @param url - 加载内容的url
         */
        handleChangeArea(tar,url){
            //如果不是第一次请求，关闭之前的缓存
            if(this.oldTag){
                this.areas.get(this.oldTag).show=false;
            }
            //判断该缓存是否已经存在
            if(this.areas.has(tar)){
                //如果存在了就复用
                this.areas.get(tar).show=true;
                this.listNow=this.areas.get(tar).itemList;
            }else{
                //如果不存在，则从新加载
                this.$ajaxJava.get(url).then((res)=>{
                    this.listNow=res.data;
                    this.areas.set(tar,{
                        show:true,
                        itemList:res.data
                    })
                });
            }
            //重置旧的缓存区标识
            this.oldTag=tar;
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
            this.heartTime=setInterval(() => {
                //todo 学习时长的心跳包
                this.$ajaxJava.get(url, (res) => {
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
            this.$ajaxJava.get(lOc+data.id).then((res) => {
                //是否已经点赞或者收藏过
                if (res.data.result === '0') {
                    this.$message({
                        message: lOc === 'liking' ? '已经点赞过' : '已经收藏过',
                        type: 'warning',
                        duration:2000,
                        showClose:true
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
export let pageBack={
    methods:{
        handlePageBack(){
            this.$router.push({path:localStorage["backUrl"]});
        }
    }
};
//分类页面加载
export let pageRequire={
    created(){
        this.iniData();
    },
    data() {
        return {
            choose:'最新',
            //类型选择
            typeChoose: "全部"
        }
    },
    methods:{
        iniData(){
            this.handleChangeArea('最新全部P1', 'coursePage/choose=最新/type=全部/page=0');
        },
        /**
         * 最新最热
         */
        handleChoose(label){
            this.handleChangeArea(label+this.typeChoose+'p1', `coursePage/choose=${label}/type=${this.typeChoose}/page=0`);
        },
        /**
         * 类型选择
         */
        hanleType(label){
            this.handleChangeArea(this.choose+label+'p1', `coursePage/choose=${this.choose}/type=${label}/page=0`);
        },
        /**
         * 分页
         */
        handlePage(size){
            this.handleChangeArea(this.choose+this.typeChoose+'p'+size, `coursePage/choose=${this.choose}/type=${this.typeChoose}/page=${size-1}`);
        },
    },
};