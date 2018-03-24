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