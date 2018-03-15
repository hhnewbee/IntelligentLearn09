/**
 * 上传前限制上传的类型
 * @param fileType
 * @param warnText
 * @returns {boolean|*}
 */
export function handleLimitFileType(fileType,warnText) {
    //函数柯里化来预设参数，只有@事件绑定才可带参执行，:数据绑定不行
    return (file)=>{
        //type应该以'image'开头
        const isImg = file.type.startsWith(fileType);
        if (!isImg) {
            this.$message.error(warnText);
        }
        return isImg;
    }
}
//混合导出
export let uploadMixins={
    methods:{
        handleLimitFileType
    }
};
//默认导出
export default {
    handleLimitFileType
}
