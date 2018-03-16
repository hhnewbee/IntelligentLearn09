export default {
    data(){
        return{
            //缓存区
            areas:{},
            //当前前缓存的信息
            areaInfoNow:{},
            //当前缓存的数据列表，用于添加新数据作用
            listNow:[],
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
            //关闭之前的缓存
            this.areas.oldTar.show=true;
            //判断该缓存是否已经存在
            if(tar in this.areas){
                //如果存在了就复用，不重新加载
                this.areas.tar.show=true;
                this.listNow=this.area.tar.itemList;
            }else{
                //如果不存在，则从新加载
                this.$ajax.get(url).then((res)=>{
                    this.listNow=res.data;
                    this.areas.tar={
                        show:true,
                        itemList:this.listNow
                    }
                });
            }
            //设置当前缓冲区的信息
            this.areaInfoNow.tar=tar
        }
    }
}