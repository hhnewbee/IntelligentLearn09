//学习记录
export let recordLearning = {
    methods: {
        /**
         * 监视学习时长的心跳包
         * @constructor
         */
        keepLearning(id) {
            setInterval(() => {
                //todo 学习时长的心跳包
                this.$ajaxJava.get(`/${id}`, (res) => {

                });
            }, 1000)
        },
        /**
         * 该学习内容的访问次数
         */
        beginLearning(id) {
            //todo 该学习内容的访问次数
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
            this.$ajaxJava.get(`forum/${lOc}/${data.id}`).then((res) => {
                //是否已经点赞或者收藏过
                if (res.data.result === '0') {
                    this.$message({
                        message: lOc === 'liking' ? '已经点赞过' : '已经收藏过',
                        type: 'warning'
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