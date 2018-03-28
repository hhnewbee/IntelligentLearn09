//页面数据缓存
export let areaCaching={
    data(){
        return{
            //缓存区
            areas:{},
            //当前前缓存的信息
            areaInfoNow:{},
            //当前要展示数据
            listNow:{}
        }
    },
    methods:{
        /**
         * 缓存区切换
         * @param oldTar - 旧的缓存标识
         * @param tar - 新的缓存标识
         * @param url - 加载内容的url
         */
        handleChangeArea(oldTar,tar,url){
            //设置当前缓冲区的信息
            this.areaInfoNow.tar=tar;
            //如果不是第一次请求，关闭之前的缓存
            if(oldTar){
                this.areas[oldTar].show=false;
            }
            //判断该缓存是否已经存在
            if(tar in this.areas){
                //如果存在了就复用，不重新加载
                this.areas[tar].show=true;
                this.listNow=this.area[tar].itemList;
            }else{
                //如果不存在，则从新加载
                this.$ajaxJava.get(url).then((res)=>{
                    this.listNow=res.data;
                    this.areas[tar]={
                        show:true,
                        itemList:res.data
                    };
                });
            }
        }
    }
};
//学习记录
export let recordLearning = {
    methods: {
        /**
         * 监视学习时长的心跳包
         * @constructor
         */
        keepLearning(url) {
            setInterval(() => {
                //todo 学习时长的心跳包
                this.$ajaxJava.get(url, (res) => {

                });
            }, 1000)
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
         * 处理checkbox组件不能监听click事件的问题
         */
        handleGroup(){
            this.$refs['like'].$el.querySelector('span').addEventListener('click',()=>{
                this.handleLikeAcollect('liking',this.courseData);
            });
            this.$refs['collect'].$el.querySelector('span').addEventListener('click',()=>{
                this.handleLikeAcollect('collect',this.courseData);
            });

        },
        /**
         * 喜欢和收藏
         * @param lOc - 是喜欢还是收藏
         * @param data - 要操作的数据
         */
        handleLikeAcollect(lOc, data) {
            this.$ajaxJava.get(`forum/${lOc}/${data.id}`).then((res) => {
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
            this.$router.go(-1);
        }

    }
};