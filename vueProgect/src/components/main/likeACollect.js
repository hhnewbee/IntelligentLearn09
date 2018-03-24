export default {
    methods: {
        /**
         * 喜欢和收藏
         * @param lOc - 是喜欢还是收藏
         * @param data - 要操作的数据
         */
        handleLikeACollect(lOc,data) {
            this.$ajaxJava.get(`/${lOc}/${data.id}`, (res) => {
                //是否已经点赞或者收藏过
                if (!res) {
                    this.$message({
                        message: lOc==='like'? '已经点赞过':'已经收藏过',
                        type: 'warning'
                    });
                }else{
                    if(this.$refs[lOc+data.id][0]){
                        this.$refs[lOc+data.id][0].style.color='#409EFF';
                    }
                    data[lOc]++
                }
            })
        },
    }
}