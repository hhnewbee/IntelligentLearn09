/**
 * 表格通用方法
 * @type {{methods: {handleSelectBatch: (function(*=)), handleSelectAll: (function()), handleSee: (function(*=)), handleDeleteRow: (function(*=)), initData: (function())}}}
 */
let tableBasicMixin = {
    props:['ifTable','tableData','tableOptions'],
    methods:{
        /**
         * 批量选择
         * @param selction
         */
        handleSelectBatch(selction){
            this.$emit('selectBatch',selction);
        },
        /**
         * 选择全部
         *
         */
        handleSelectAll(){
            this.$emit('selectAll');
        },
        /**
         * 查看一行
         * @param row
         */
        handleSee(row){
            this.$emit('rowSee',row);
        },
        /**
         *删除一行
         * @param index
         */
        handleDeleteRow(index){
            this.$emit('rowDelete',index);
        },
        initData(){
            //初始化时当前的表格格式
            this.$emit('update:tableOptions', this.tableOptions_);
        }
    }
};
export {tableBasicMixin};