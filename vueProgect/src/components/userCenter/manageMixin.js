import {areaCaching} from "../mixins";

let manageMixin={
    data() {
        return {
            //要删除的行
            delectRows: [],
            //批量删除按钮是否可用
            ifDelect: true,
            //当前列表要显示的数据
            tableData: [],
            //正常分页时显示的数据,
            pageData: [],
            //是否删除当前列表的所有数据
            ifSelecttALl: false,
            //显示搜索状态
            ifSearch: false,
            //搜索的字段
            searchInput: '',
            //图表类型选项的值
            selectValue: '',
            //图表与表格的切换
            ifTable: true,
            //图表类型切换
            userTypes: [{value: '管理员'}, {value: '普通用户'}],
            //图表的数据
            chartData: [[], [], []],
            //显示更多功能
            ifMoreFun: false,
            //图标类型选择
            options:'',
            //每次获取的item条数
            itemCount:0,
            //当前页数
            page:1
        }
    },
    methods: {
        /**
         *批量选择
         * @param selction
         */
        handleSelectBatch(selction) {
            //把要删除的数据进行集合
            this.delectRows = selction;
        },
        /**
         * 删除选择的数据
         */
        handleDelectRows() {
            //如果全部选择
            if (this.ifSelecttALl) {
                //清空数据
                this.tableData = [];
                //删除按钮禁用
                this.ifDelect = true;
                return;
            }
            //遍历出相同元素所处的位置并且删除
            for (let i = 0; i < this.tableData.length; i++) {
                for (let x = 0; x < this.delectRows.length; x++) {
                    if (this.delectRows[x] === this.tableData[i]) {
                        this.tableData.splice(i, 1);
                    }
                }
            }
            //清空数据防止重复遍历
            this.delectRows = [];
        },
        /**
         * 选择所有时
         */
        handleSelectAll() {
            this.ifDelect = !this.ifDelect;
            this.ifSelecttALl = true;
        },
        /**
         * 单行删除
         * @param index
         */
        handleDeleteRow(index) {
            this.tableData.splice(index, 1);
        },
        /**
         * 删除所有数据
         */
        handleDelectAll() {
        },
        /**
         * 分页
         * @param size
         */
        handlePage(size) {
            this.page=size;
            this.handleChangeArea(null,'p'+size,this.url);
            this.tableData = this.pageData=this.listNow;
        },
        /**
         * 判断是展示图表还是表格
         * @param value
         */
        handleChartChange(value) {
            this.ifTable = value !== this.options[1].value;
        },
        /**
         * 搜索数据
         */
        handleSearch() {
            this.tableData = [
                {
                    date: '2016-05-03',
                    name: 'vue与webpack初步1',
                    type: '课程',
                    category: '金融',
                    newDate: '2016-05-03',
                    avatar: 'http://localhost:3100/img/avatar/softIcon.jpg',
                    nickName: 'newbee',
                    useTime: 100,
                    accessTimes: 30,
                }, {
                    date: '2016-05-03',
                    name: 'vue与webpack初步2',
                    type: '课程',
                    category: '金融',
                    newDate: '2017-05-03',
                    avatar: 'http://localhost:3100/img/avatar/softIcon.jpg',
                    nickName: 'newbee',
                    useTime: 130,
                    accessTimes: 20,
                },];
            //展示搜索的数据
            this.ifSearch = true;
        },
        /**
         * 搜索返回
         */
        handleBackSearch() {
            this.ifSearch = false;
            this.tableData = this.pageData;
        },
        /**
         * 当个查看
         * @param type - 查看数据的类型
         * @param target - 课程/文章的id/用户账号
         */
        handleSee(type,target) {
            //判断是什么类型的查看
            switch(type){
                case 'course':{
                    this.$router.push({path:`/course/${target}`});
                    break;
                }
                case 'article':{
                    this.$router.push({path:`/articlePage/article/${target}`});
                    break;
                }
                case 'user':{
                    this.dialogUserVisible=true;
                    break;
                }
                case 'message':{
                    // this.content=target.row.content;
                    break;
                }
            }
        },
        /**
         * 设置图表数据
         */
        setChartData() {
            //清空之前的数据
            this.chartData = [[], [], []];
            this.tableData.forEach((data) => {
                this.chartData[0].push(data.name);
                this.chartData[1].push(data.useTime);
                this.chartData[2].push(data.accessTimes);
            })
        },

        /**
         * 显示更多功能
         */
        handleShowMore() {
            this.ifMoreFun = !this.ifMoreFun;
        },
        /**
         * 表格初始化
         * @param tableOptions - 表格类型选项
         */
        initData(tableOptions) {
            //获取加载item的条数
            this.setItemCount();
            //加载数据
            this. handlePage(1);
            //初始图表类型选项的值
            this.options=tableOptions;
            this.selectValue=tableOptions[0].value;
        },
        /**
         * 根据屏幕判断item加载的数目
         */
        setItemCount(){
            //获取表格的高度，表头固定是48，每个单元固定是60
            this.itemCount=Math.floor((this.$refs['table'].$el.clientHeight-48)/60);
        },
    },
    watch: {
        //监听数据变化以更新视图
        tableData() {
            //更新图表
            this.setChartData();
        },
        //监听是否有删除的数据以显示删除按钮
        delectRows() {
            this.ifDelect = this.delectRows.length === 0;
        },
    },
    mixins:[areaCaching]
};
export {manageMixin};