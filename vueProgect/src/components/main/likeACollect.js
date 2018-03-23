export default {
    methods: {
        handleLikeACollect(lOc, id) {
            this.$ajaxJava.get(`/${lOc}/${id}`, (res) => {
                if (!res) {
                    this.$message({
                        message: lOc==='like'? '已经点赞过':'已经收藏过',
                        type: 'warning'
                    });
                }
            })
        }
    }
}