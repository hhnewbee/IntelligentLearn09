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
            //todo 模拟初始化请求数据
            this.pageData = [
                {
                    date: '2016-05-03',
                    account: '154091333',
                    name: 'newbee',
                    sex: '男',
                    areaFocus: '金融',
                    status: true,
                    accessTimes: 40,
                    useTime: 200,
                }, {
                    date: '2016-05-03',
                    account: '154091334',
                    name: 'newbee',
                    sex: '男',
                    areaFocus: '汽车',
                    status: true,
                    accessTimes: 30,
                    useTime: 150,
                }, {
                    date: '2016-05-03',
                    account: '154091335',
                    name: 'newbee',
                    sex: '男',
                    areaFocus: '互联网',
                    status: true,
                    accessTimes: 20,
                    useTime: 120,
                }, {
                    date: '2016-05-03',
                    account: '154091336',
                    name: 'newbee',
                    sex: '男',
                    areaFocus: '产品',
                    status: true,
                    accessTimes: 20,
                    useTime: 101,
                }, {
                    date: '2016-05-03',
                    account: '154091337',
                    name: 'newbee',
                    sex: '男',
                    areaFocus: '设计',
                    status: false,
                    accessTimes: 10,
                    useTime: 101,
                }, {
                    date: '2016-05-03',
                    account: '154091338',
                    name: 'newbee',
                    sex: '男',
                    areaFocus: '教育',
                    status: true,
                    accessTimes: 90,
                    useTime: 181,
                }
            ];
            //初始化时当前的表格数据
            this.$emit('update:tableData', this.pageData);
            this.$emit('update:tableOptions', this.tableOptions_);

        }
    }
};
export {tableBasicMixin};