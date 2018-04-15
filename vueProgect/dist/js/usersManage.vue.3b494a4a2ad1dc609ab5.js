webpackJsonp([8],{

/***/ "8WVW":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      class: [
        _vm.type === "textarea" ? "el-textarea" : "el-input",
        _vm.inputSize ? "el-input--" + _vm.inputSize : "",
        {
          "is-disabled": _vm.disabled,
          "el-input-group": _vm.$slots.prepend || _vm.$slots.append,
          "el-input-group--append": _vm.$slots.append,
          "el-input-group--prepend": _vm.$slots.prepend,
          "el-input--prefix": _vm.$slots.prefix || _vm.prefixIcon,
          "el-input--suffix": _vm.$slots.suffix || _vm.suffixIcon
        }
      ],
      on: {
        mouseenter: function($event) {
          _vm.hovering = true
        },
        mouseleave: function($event) {
          _vm.hovering = false
        }
      }
    },
    [
      _vm.type !== "textarea"
        ? [
            _vm.$slots.prepend
              ? _c(
                  "div",
                  {
                    staticClass: "el-input-group__prepend",
                    attrs: { tabindex: "0" }
                  },
                  [_vm._t("prepend")],
                  2
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.type !== "textarea"
              ? _c(
                  "input",
                  _vm._b(
                    {
                      ref: "input",
                      staticClass: "el-input__inner",
                      attrs: {
                        tabindex: _vm.tabindex,
                        autocomplete: _vm.autoComplete,
                        "aria-label": _vm.label
                      },
                      domProps: { value: _vm.currentValue },
                      on: {
                        input: _vm.handleInput,
                        focus: _vm.handleFocus,
                        blur: _vm.handleBlur,
                        change: _vm.handleChange
                      }
                    },
                    "input",
                    _vm.$props,
                    false
                  )
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.$slots.prefix || _vm.prefixIcon
              ? _c(
                  "span",
                  { staticClass: "el-input__prefix", style: _vm.prefixOffset },
                  [
                    _vm._t("prefix"),
                    _vm._v(" "),
                    _vm.prefixIcon
                      ? _c("i", {
                          staticClass: "el-input__icon",
                          class: _vm.prefixIcon
                        })
                      : _vm._e()
                  ],
                  2
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.$slots.suffix ||
            _vm.suffixIcon ||
            _vm.showClear ||
            (_vm.validateState && _vm.needStatusIcon)
              ? _c(
                  "span",
                  { staticClass: "el-input__suffix", style: _vm.suffixOffset },
                  [
                    _c(
                      "span",
                      { staticClass: "el-input__suffix-inner" },
                      [
                        !_vm.showClear
                          ? [
                              _vm._t("suffix"),
                              _vm._v(" "),
                              _vm.suffixIcon
                                ? _c("i", {
                                    staticClass: "el-input__icon",
                                    class: _vm.suffixIcon
                                  })
                                : _vm._e()
                            ]
                          : _c("i", {
                              staticClass:
                                "el-input__icon el-icon-circle-close el-input__clear",
                              on: { click: _vm.clear }
                            })
                      ],
                      2
                    ),
                    _vm._v(" "),
                    _vm.validateState
                      ? _c("i", {
                          staticClass: "el-input__icon",
                          class: ["el-input__validateIcon", _vm.validateIcon]
                        })
                      : _vm._e()
                  ]
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.$slots.append
              ? _c(
                  "div",
                  { staticClass: "el-input-group__append" },
                  [_vm._t("append")],
                  2
                )
              : _vm._e()
          ]
        : _c(
            "textarea",
            _vm._b(
              {
                ref: "textarea",
                staticClass: "el-textarea__inner",
                style: _vm.textareaStyle,
                attrs: { tabindex: _vm.tabindex, "aria-label": _vm.label },
                domProps: { value: _vm.currentValue },
                on: {
                  input: _vm.handleInput,
                  focus: _vm.handleFocus,
                  blur: _vm.handleBlur,
                  change: _vm.handleChange
                }
              },
              "textarea",
              _vm.$props,
              false
            )
          )
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-78ecde44", esExports)
  }
}

/***/ }),

/***/ "8s4O":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'ElButton',

  inject: {
    elFormItem: {
      default: ''
    }
  },

  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: String,
    icon: {
      type: String,
      default: ''
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean
  },

  computed: {
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    buttonSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    }
  },

  methods: {
    handleClick(evt) {
      this.$emit('click', evt);
    },
    handleInnerClick(evt) {
      if (this.disabled) {
        evt.stopPropagation();
      }
    }
  }
});

/***/ }),

/***/ "9BW/":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {};
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }

  return target;
});;


/***/ }),

/***/ "Doj+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = calcTextareaHeight;
let hiddenTextarea;

const HIDDEN_STYLE = `
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important
`;

const CONTEXT_STYLE = [
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'text-rendering',
  'text-transform',
  'width',
  'text-indent',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing'
];

function calculateNodeStyling(targetElement) {
  const style = window.getComputedStyle(targetElement);

  const boxSizing = style.getPropertyValue('box-sizing');

  const paddingSize = (
    parseFloat(style.getPropertyValue('padding-bottom')) +
    parseFloat(style.getPropertyValue('padding-top'))
  );

  const borderSize = (
    parseFloat(style.getPropertyValue('border-bottom-width')) +
    parseFloat(style.getPropertyValue('border-top-width'))
  );

  const contextStyle = CONTEXT_STYLE
    .map(name => `${name}:${style.getPropertyValue(name)}`)
    .join(';');

  return { contextStyle, paddingSize, borderSize, boxSizing };
}

function calcTextareaHeight(
  targetElement,
  minRows = 1,
  maxRows = null
) {
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea');
    document.body.appendChild(hiddenTextarea);
  }

  let {
    paddingSize,
    borderSize,
    boxSizing,
    contextStyle
  } = calculateNodeStyling(targetElement);

  hiddenTextarea.setAttribute('style', `${contextStyle};${HIDDEN_STYLE}`);
  hiddenTextarea.value = targetElement.value || targetElement.placeholder || '';

  let height = hiddenTextarea.scrollHeight;
  const result = {};

  if (boxSizing === 'border-box') {
    height = height + borderSize;
  } else if (boxSizing === 'content-box') {
    height = height - paddingSize;
  }

  hiddenTextarea.value = '';
  let singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;

  if (minRows !== null) {
    let minHeight = singleRowHeight * minRows;
    if (boxSizing === 'border-box') {
      minHeight = minHeight + paddingSize + borderSize;
    }
    height = Math.max(minHeight, height);
    result.minHeight = `${ minHeight }px`;
  }
  if (maxRows !== null) {
    let maxHeight = singleRowHeight * maxRows;
    if (boxSizing === 'border-box') {
      maxHeight = maxHeight + paddingSize + borderSize;
    }
    height = Math.min(maxHeight, height);
  }
  result.height = `${ height }px`;
  hiddenTextarea.parentNode && hiddenTextarea.parentNode.removeChild(hiddenTextarea);
  hiddenTextarea = null;
  return result;
};


/***/ }),

/***/ "EMXe":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_vue_loader_lib_selector_type_script_index_0_button_vue__ = __webpack_require__("8s4O");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_loader_lib_template_compiler_index_id_data_v_de350bd0_hasScoped_false_buble_transforms_vue_loader_lib_selector_type_template_index_0_button_vue__ = __webpack_require__("dN9Q");
var disposed = false
var normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_vue_loader_lib_selector_type_script_index_0_button_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__vue_loader_lib_template_compiler_index_id_data_v_de350bd0_hasScoped_false_buble_transforms_vue_loader_lib_selector_type_template_index_0_button_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "node_modules\\element-ui\\packages\\button\\src\\button.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-de350bd0", Component.options)
  } else {
    hotAPI.reload("data-v-de350bd0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "IHkg":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Show migrating guide in browser console.
 *
 * Usage:
 * import Migrating from 'element-ui/src/mixins/migrating';
 *
 * mixins: [Migrating]
 *
 * add getMigratingConfig method for your component.
 *  getMigratingConfig() {
 *    return {
 *      props: {
 *        'allow-no-selection': 'allow-no-selection is removed.',
 *        'selection-mode': 'selection-mode is removed.'
 *      },
 *      events: {
 *        selectionchange: 'selectionchange is renamed to selection-change.'
 *      }
 *    };
 *  },
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  mounted() {
    if (true) return;
    if (!this.$vnode) return;
    const { props = {}, events = {} } = this.getMigratingConfig();
    const { data, componentOptions } = this.$vnode;
    const definedProps = data.attrs || {};
    const definedEvents = componentOptions.listeners || {};

    for (let propName in definedProps) {
      if (definedProps.hasOwnProperty(propName) && props[propName]) {
        console.warn(`[Element Migrating][${this.$options.name}][Attribute]: ${props[propName]}`);
      }
    }

    for (let eventName in definedEvents) {
      if (definedEvents.hasOwnProperty(eventName) && events[eventName]) {
        console.warn(`[Element Migrating][${this.$options.name}][Event]: ${events[eventName]}`);
      }
    }
  },
  methods: {
    getMigratingConfig() {
      return {
        props: {},
        events: {}
      };
    }
  }
});


/***/ }),

/***/ "IfJE":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return manageMixin; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins__ = __webpack_require__("NuJq");


var manageMixin = {
    data: function data() {
        return {
            //要删除的行
            delectRows: [],
            //批量删除按钮是否可用
            ifDelect: true,
            //当前列表要显示的数据
            tableData: [],
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
            //图表的数据
            chartData: [],
            //显示更多功能
            ifMoreFun: false,
            //图标类型选择
            options: [],
            //每次获取的item条数
            itemCount: 0,
            //当前页数
            page: 1,
            //搜索的页数
            pageSearch: 1,
            //显示的页数
            currentPage: 1
        };
    },

    methods: {
        /**
         *批量选择
         * @param selction
         */
        handleSelectBatch: function handleSelectBatch(selction) {
            //把要删除的数据进行集合
            this.delectRows = selction;
        },

        /**
         * 删除选择的数据
         */
        handleDelectRows: function handleDelectRows() {
            var _this = this;

            //形成id数组
            var deleteId = this.delectRows.map(function (de) {
                return de.id;
            });
            this.$ajax.create().post(this.urlDelect, deleteId).then(function () {
                _this.$message.success('删除成功');
                //本地更新删除效果
                //如果全部选择
                if (_this.ifSelecttALl) {
                    //清空数据
                    _this.tableData = [];
                    //删除按钮禁用
                    _this.ifDelect = true;
                    return;
                }
                //如果是部分选择，遍历出相同元素所处的位置并且删除
                for (var i = 0; i < _this.tableData.length; i++) {
                    for (var x = 0; x < _this.delectRows.length; x++) {
                        if (_this.delectRows[x] === _this.tableData[i]) {
                            _this.tableData.splice(i, 1);
                        }
                    }
                }
                //清空数据防止重复遍历
                _this.delectRows = [];
            });
        },

        /**
         * 选择所有时
         */
        handleSelectAll: function handleSelectAll(selction) {
            this.delectRows = selction;
            this.ifDelect = !this.ifDelect;
            this.ifSelecttALl = true;
        },

        /**
         * 单行删除
         * @param scope
         */
        handleDeleteRow: function handleDeleteRow(scope) {
            var _this2 = this;

            this.$ajax.create().post(this.urlDelect, [scope.row.id]).then(function () {
                _this2.$message.success('删除成功');
                _this2.tableData.splice(scope.$index, 1);
            });
        },

        /**
         * 删除所有数据
         */
        handleDelectAll: function handleDelectAll() {},

        /**
         * 分页
         * @param size
         */
        handlePage: function handlePage(size) {
            //如果是搜索翻页
            if (this.ifSearch) {
                this.pageSearch = size;
                this.handleChangeArea('search' + size + this.searchInput, this.urlSearch);
            } else {
                this.page = size;
                this.handleChangeArea('p' + size, this.url);
            }
        },

        /**
         * 判断是展示图表还是表格
         * @param value
         */
        handleChartChange: function handleChartChange(value) {
            this.ifTable = value !== this.options[1].value;
        },

        /**
         * 搜索数据
         */
        handleSearch: function handleSearch() {
            //重置搜索的页数
            this.pageSearch = 1;
            //搜索的链接
            this.handleChangeArea('search1' + this.searchInput, this.urlSearch);
            //展示搜索的数据
            this.ifSearch = true;
            //设置当前所在页数
            this.currentPage = this.pageSearch;
        },

        /**
         * 搜索返回
         */
        handleBackSearch: function handleBackSearch() {
            this.ifSearch = false;
            //加载之前的数据
            this.handleChangeArea('p' + this.page, this.url);
            //设置当前所在页数
            this.currentPage = this.page;
        },

        /**
         * 当个查看
         * @param type - 查看数据的类型
         * @param scope - 课程/文章的id/用户账号
         */
        handleSee: function handleSee(type, scope) {
            //判断是什么类型的查看
            switch (type) {
                case 'course':
                    {
                        this.$router.push({ path: '/course/' + scope.row.id });
                        break;
                    }
                case 'article':
                    {
                        window.open('http://localhost:3000/#/main/articlePage/article/' + scope.row.id);
                        break;
                    }
                case 'user':
                    {
                        this.infoData = scope.row;
                        //获取数据
                        this.handleChangeArea('dialog' + scope.row.id + '\u6700\u8FD1\u4E00\u5468', 'admin/user/' + scope.row.id + '/week');
                        //展现数据
                        this.dialogUserVisible = true;
                        break;
                    }
                case 'message':
                    {
                        this.$ajaxJava.get('message/' + scope.row.id).then(function () {
                            scope.row.status = '已读';
                        });
                        this.dialogInfo = true;
                        this.dialogTime = scope.row.time;
                        this.dialogContent = scope.row.content;
                        break;
                    }
                case 'record':
                    {
                        if (scope.row.courseId) {
                            this.$router.push({ path: '/course/' + scope.row.courseId });
                        } else {
                            window.open('http://localhost:3000/#/main/articlePage/article/' + scope.row.forumId);
                        }
                    }
            }
        },

        /**
         * 设置图表数据
         */
        setChartData: function setChartData() {
            var _this3 = this;

            //清空之前的数据
            this.chartData = [[], [], []];
            this.tableData.forEach(function (data) {
                _this3.chartData[0].push(data.name);
                _this3.chartData[1].push(data.useTime);
                _this3.chartData[2].push(data.accessTimes);
            });
            //todo 手动设置。为了展示效果
            this.chartData[1] = [];
            this.chartData[1].push([20], [3], [10], [1], [5], [12]);
        },

        /**
         * 显示更多功能
         */
        handleShowMore: function handleShowMore() {
            this.ifMoreFun = !this.ifMoreFun;
        },

        /**
         * 表格初始化
         * @param tableOptions - 表格类型选项
         */
        initData: function initData(tableOptions) {
            //获取加载item的条数
            this.setItemCount();
            //加载数据
            this.handleChangeArea('p1', this.url);
            //初始图表类型选项的值
            this.options = tableOptions;
            this.selectValue = tableOptions[0].value;
        },

        /**
         * 根据屏幕判断item加载的数目
         */
        setItemCount: function setItemCount() {
            //获取表格的高度，表头固定是48，每个单元固定是60
            this.itemCount = Math.floor((this.$refs['table'].$el.clientHeight - 48) / 60);
        }
    },
    watch: {
        //监听数据变化以更新视图
        tableData: function tableData() {
            //更新图表
            this.setChartData();
        },

        //监听是否有删除的数据以显示删除按钮
        delectRows: function delectRows() {
            this.ifDelect = this.delectRows.length === 0;
        }
    },
    mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins__["a" /* areaCaching */]]
};


/***/ }),

/***/ "JVMY":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__manageMixin_js__ = __webpack_require__("IfJE");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__("NYxO");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_element_ui_packages_button_src_button_vue__ = __webpack_require__("EMXe");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__node_modules_element_ui_packages_input_src_input_vue__ = __webpack_require__("dKx3");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["a"] = ({
    mounted: function mounted() {
        this.initData([{ value: '学习记录' }, { value: '学习详情' }]);
    },
    data: function data() {
        return {
            //主页面的页数
            tableMainPage: 1,
            //图表类型切换
            userTypes: [{ value: '管理员' }, { value: '普通用户' }],
            //用户类型选项值
            userSelectV: '普通用户',
            //查看用户弹出框
            dialogUserVisible: false,
            //弹出框的图表类型选择
            typeSelect: '图表',
            //弹出框的图表时间选择
            timeSelect: 'week',
            //dialog表格还是图表
            ifDialogTable: false,
            //dialog分页
            dialogPage: 1,
            //详细信息
            infoData: {},
            //表格数据
            tableData_: [],
            //图表数据
            chatData_: [[], [], []],
            //是否要发布信息
            dialogPushInfo: false,
            //要发布的信息类型
            typePushInfo: '',
            //要发布的信息
            infoPush: '',
            //时间的选项值
            timesOptions: [{ label: '最近一周', value: 'week' }, { label: '最近一月', value: 'month' }, { label: '最近一年', value: 'year' }]
        };
    },

    computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_1_vuex__["d" /* mapState */])('info', ['role']), {
        url: function url() {
            return '/admin/users/page=' + (this.page - 1) + '/size=' + this.itemCount;
        },
        urlSearch: function urlSearch() {
            return '/admin/users/page=' + (this.pageSearch - 1) + '/size=' + this.itemCount;
        }
    }),
    methods: {
        /**
         * 用户类型切换
         * @param value
         */
        handleUserTypeChange: function handleUserTypeChange(value) {
            //todo 根据不同的类型取查找不同的数据
            //this.tableData=this.pageData=this.$ajax.get();
        },

        /**
         * 设置获取数据的格式
         */
        setDataFormat: function setDataFormat(resDatas) {
            var _this = this;

            var tableData = [];
            resDatas.forEach(function (data, index) {
                var newData = {};
                newData.index = index;
                newData.id = data.id;
                newData.date = _this.$formatDate(data.creationTimestamp);
                newData.account = data.account;
                newData.name = data.selfInformation.trueName;
                newData.areaFocus = data.selfInformation.position;
                newData.status = true;
                //查看更多才显示的
                newData.eMail = data.selfInformation.email;
                newData.avatarUrl = data.selfInformation.imgPath;
                newData.useTime = _this.$formatMinutes(data.learnTime);
                newData.learnTime = _this.$formatHouse(data.learnTime);
                newData.accessTimes = data.visitTime;
                tableData.push(newData);
            });
            return tableData;
        },

        /**
         * 切换弹出框表格类型
         */
        handleTypeChange: function handleTypeChange(value) {
            //todo 格式化不同类型的数据
            if (this.ifDialogTable = value === '表格') {
                this.handleChangeArea('dialogTable' + this.infoData.id + this.dialogPage, '/user/history/page=0/size=6');
            } else {
                this.handleChangeArea('dialogChat' + this.timeSelect + this.infoData.id, 'admin/user/' + this.infoData.id + '/' + this.timeSelect);
            }
        },

        /**
         * 切换弹出框表格时间
         */
        handleTimeChange: function handleTimeChange(value) {
            //todo 请求不同时间的数据
            this.handleChangeArea('dialogChat' + value, 'admin/user/' + this.infoData.id + '/' + value);
        },

        /**
         * 格式化表格数据
         */
        setTableData: function setTableData(datas) {
            var _this2 = this;

            datas.history.forEach(function (data) {
                if (data.course) {
                    _this2.tableData_.push({
                        date: _this2.$formatDate(data.createTime),
                        name: data.course.title,
                        type: data.course.type,
                        time: _this2.$formatMinutes(data.learnTime) + '分钟',
                        times: data.visitTime
                    });
                } else {
                    _this2.tableData_.push({
                        date: _this2.$formatDate(data.createTime),
                        name: data.forum.title,
                        type: data.forum.type,
                        time: _this2.$formatMinutes(data.learnTime) + '分钟',
                        times: data.visitTime
                    });
                }
            });
        },

        /**
         * 格式化图表数据
         */
        setChatData: function setChatData(datas) {
            var _this3 = this;

            //清空原来的数据
            this.chatData_ = [];
            //数据格式化
            var i = 0;
            var time = [];
            if (this.timeSelect === 'week') {
                for (i = 6; i >= 0; i--) {
                    time.push(this.$moment().day(-i).fromNow());
                }
            } else if (this.timeSelect === 'month') {
                for (i = 29; i >= 0; i--) {
                    time.push(this.$moment().day(-i).fromNow());
                }
            } else {
                for (i = 11; i >= 0; i--) {
                    time.push(this.$moment().month(-i).fromNow());
                }
            }
            this.chatData_.splice(0, 1, time);
            this.chatData_.splice(1, 1, datas.learnTime.reverse().map(function (item) {
                return _this3.$formatMinutes(item);
            }));
            this.chatData_.splice(2, 1, datas.visitTime.reverse());
        },

        /**
         * 弹出框分页
         */
        handleDialogPage: function handleDialogPage(page) {
            this.dialogPage = page;
            this.handleChangeArea('dialogTable' + this.infoData.id + this.dialogPage, '' + (this.infoData.account + page));
        },

        /**
         * 发布全局信息
         */
        handlePushInfoAll: function handlePushInfoAll() {
            this.dialogPushInfo = true;
            this.typePushInfo = '全部信息';
        },

        /**
         * 发布部分信息
         */
        handlePushInfoBranch: function handlePushInfoBranch() {
            this.dialogPushInfo = true;
            this.typePushInfo = '部分信息';
        },

        /**
         * 发布通知
         */
        handlePushInfo: function handlePushInfo() {
            var _this4 = this;

            this.$ajaxJava.post('admin/notification', {
                content: this.infoPush
            }).then(function () {
                _this4.$message.success('发送成功');
                _this4.infoPush = '';
            });
        },

        /**
         * 添加管理员
         */
        handleAddAdmin: function handleAddAdmin() {
            var _this5 = this;

            //todo 如果打开弹出框再添加管理员，listNow的数据不是原来的
            this.delectRows.forEach(function (de) {
                var user = _this5.listNow.users[de.index];
                //修改user属性，并且返回
                user.admin = user.role;
                delete user.role;
                _this5.$ajax.create().post('superAdmin/user', user).then(function () {
                    _this5.$message.success(user.account + '\u6210\u4E3A\u7BA1\u7406\u4EBA\u5458');
                });
            });
        }
    },

    watch: {
        //监听加载的数据变化
        listNow: function listNow() {
            //如果是主页的数据
            if (!this.dialogUserVisible) {
                this.tableData = this.setDataFormat(this.listNow.users);
                this.tableMainPage = this.listNow.page;
                //如果是弹出框的缓存数据
            } else {
                if (this.typeSelect === '表格') {
                    this.setTableData(this.listNow);
                } else {
                    this.setChatData(this.listNow);
                }
            }
        }
    },
    components: {
        ElInput: __WEBPACK_IMPORTED_MODULE_3__node_modules_element_ui_packages_input_src_input_vue__["a" /* default */],
        ElButton: __WEBPACK_IMPORTED_MODULE_2__node_modules_element_ui_packages_button_src_button_vue__["a" /* default */],
        hightChart: function hightChart() {
            return __webpack_require__.e/* import() */(27).then(__webpack_require__.bind(null, "F/t1"));
        }
    },
    mixins: [__WEBPACK_IMPORTED_MODULE_0__manageMixin_js__["a" /* manageMixin */]]
});

/***/ }),

/***/ "NuJq":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return areaCaching; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return recordLearning; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return likeAcollect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return pageBack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return pageRequire; });
//页面数据缓存
var areaCaching = {
    data: function data() {
        return {
            //缓存区
            areas: new Map(),
            //旧的缓存区标志，也是当前缓存区标识
            oldTag: null,
            //当前要展示数据
            listNow: {}
        };
    },

    methods: {
        /**
         * 缓存区切换
         * @param tar - 新的缓存标识
         * @param url - 加载内容的url
         */
        handleChangeArea: function handleChangeArea(tar, url) {
            var _this = this;

            //如果不是第一次请求，关闭之前的缓存
            if (this.oldTag) {
                this.areas.get(this.oldTag).show = false;
            }
            //判断该缓存是否已经存在
            if (this.areas.has(tar)) {
                //如果存在了就复用
                this.areas.get(tar).show = true;
                this.listNow = this.areas.get(tar).itemList;
            } else {
                //如果不存在，则从新加载
                this.$ajaxJava.get(url).then(function (res) {
                    _this.listNow = res.data;
                    _this.areas.set(tar, {
                        show: true,
                        itemList: res.data
                    });
                });
            }
            //重置旧的缓存区标识
            this.oldTag = tar;
        }
    }
};
//学习记录
var recordLearning = {
    data: function data() {
        return {
            heartTime: ''
        };
    },

    methods: {
        /**
         * 监视学习时长的心跳包
         * @constructor
         */
        keepLearning: function keepLearning(url) {
            var _this2 = this;

            this.heartTime = setInterval(function () {
                //todo 改进学习时长的心跳包，用websock代替
                _this2.$ajax.create().get(url, function (res) {});
            }, 2000);
        },

        /**
         * 该学习内容的访问次数
         */
        beginLearning: function beginLearning(id) {
            this.$ajaxJava.get('/' + id, function (res) {});
        }
    }
};
//点赞和收藏
var likeAcollect = {
    methods: {
        /**
         * 喜欢和收藏
         * @param lOc - 是喜欢还是收藏
         * @param data - 要操作的数据
         */
        handleLikeAcollect: function handleLikeAcollect(lOc, data) {
            var _this3 = this;

            this.$ajaxJava.get(lOc + data.id).then(function (res) {
                //是否已经点赞或者收藏过
                if (res.data.result === '0') {
                    _this3.$message({
                        message: lOc.match('liking') ? '已经点赞过' : '已经收藏过',
                        type: 'warning',
                        duration: 2000,
                        showClose: true
                    });
                } else {
                    if (_this3.$refs[lOc + data.id]) {
                        _this3.$refs[lOc + data.id].style.color = '#409EFF';
                    }
                    data[lOc]++;
                }
            });
        }
    }
};
//页面返回
var pageBack = {
    methods: {
        handlePageBack: function handlePageBack() {
            this.$router.push({ path: localStorage["backUrl"] });
        }
    }
};
//分类页面加载
var pageRequire = {
    data: function data() {
        return {
            //最新、最热
            choose: '最新',
            //类型选择
            typeChoose: "",
            //url
            url: ''
        };
    },

    methods: {
        iniData: function iniData() {
            //处理关注领域
            if (this.areaFocus.indexOf('/') !== -1) {
                this.typeChoose = this.areaFocus.split('/', 1)[0];
            } else {
                this.typeChoose = this.areaFocus;
            }
            this.handleChangeArea('new' + this.typeChoose + 'P1', this.url + '/choose=new/type=' + this.typeChoose + '/page=0/size=12');
        },

        /**
         * 最新最热
         */
        handleChoose: function handleChoose(label) {
            var valueChoose = label === '最新' ? 'new' : 'hot';
            this.handleChangeArea(valueChoose + this.typeChoose + 'p1', this.url + '/choose=' + valueChoose + '/type=' + this.typeChoose + '/page=0/size=12');
        },

        /**
         * 类型选择
         */
        hanleType: function hanleType(label) {
            var valueChoose = this.choose === '最新' ? 'new' : 'hot';
            this.handleChangeArea(valueChoose + label + 'p1', this.url + '/choose=' + valueChoose + '/type=' + label + '/page=0/size=12');
        },

        /**
         * 分页
         */
        handlePage: function handlePage(size) {
            var valueChoose = this.choose === '最新' ? 'new' : 'hot';
            this.handleChangeArea(valueChoose + this.typeChoose + 'p' + size, this.url + '/choose=' + valueChoose + '/type=' + this.typeChoose + '/page=' + (size - 1));
        }
    }
};

/***/ }),

/***/ "T5OH":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "manageStyle" },
    [
      _c(
        "el-breadcrumb",
        { staticClass: "breadcrumb" },
        [
          _c("el-breadcrumb-item", { staticClass: "el-icon-setting" }, [
            _vm._v("\n             后台管理\n        ")
          ]),
          _vm._v(" "),
          _c("el-breadcrumb-item", [
            _c("span", { on: { click: _vm.handleBackSearch } }, [
              _vm._v("\n                用户管理\n            ")
            ])
          ]),
          _vm._v(" "),
          _vm.ifSearch
            ? _c("el-breadcrumb-item", [_vm._v("搜索\n        ")])
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "header" },
        [
          _c(
            "el-input",
            {
              staticStyle: { width: "300px" },
              attrs: { size: "small", placeholder: "请输入内容" },
              model: {
                value: _vm.searchInput,
                callback: function($$v) {
                  _vm.searchInput = $$v
                },
                expression: "searchInput"
              }
            },
            [
              _c("span", {
                staticClass: "el-icon-search searchIcon",
                attrs: { slot: "suffix" },
                on: { click: _vm.handleSearch },
                slot: "suffix"
              })
            ]
          ),
          _vm._v(" "),
          _vm.role === "superadmin"
            ? _c(
                "el-button",
                {
                  staticStyle: { "margin-left": "10px" },
                  attrs: { type: "success", size: "small" },
                  on: { click: _vm.handleAddAdmin }
                },
                [_vm._v("\n            添加管理员\n        ")]
              )
            : _vm._e(),
          _vm._v(" "),
          _c("el-button", {
            staticStyle: { "margin-left": "10px" },
            attrs: { type: "primary", size: "small", icon: "el-icon-menu" },
            on: { click: _vm.handleShowMore }
          }),
          _vm._v(" "),
          _c(
            "el-select",
            {
              staticStyle: {
                width: "110px",
                position: "absolute",
                right: "160px"
              },
              attrs: { size: "small", placeholder: "请选择" },
              on: { change: _vm.handleUserTypeChange },
              model: {
                value: _vm.userSelectV,
                callback: function($$v) {
                  _vm.userSelectV = $$v
                },
                expression: "userSelectV"
              }
            },
            _vm._l(_vm.userTypes, function(item) {
              return _c("el-option", {
                key: item.value,
                attrs: { value: item.value }
              })
            })
          ),
          _vm._v(" "),
          _c(
            "el-select",
            {
              staticStyle: {
                width: "110px",
                position: "absolute",
                right: "40px"
              },
              attrs: { size: "small" },
              on: { change: _vm.handleChartChange },
              model: {
                value: _vm.selectValue,
                callback: function($$v) {
                  _vm.selectValue = $$v
                },
                expression: "selectValue"
              }
            },
            _vm._l(_vm.options, function(item) {
              return _c("el-option", {
                key: item.value,
                attrs: { value: item.value }
              })
            })
          )
        ],
        1
      ),
      _vm._v(" "),
      _vm.ifMoreFun
        ? _c(
            "div",
            { staticClass: "moreFun" },
            [
              _c(
                "el-button",
                {
                  attrs: {
                    disabled: _vm.ifDelect,
                    type: "primary",
                    size: "small",
                    icon: "el-icon-delete"
                  },
                  on: { click: _vm.handleDelectRows }
                },
                [_vm._v("\n            批量删除\n        ")]
              ),
              _vm._v(" "),
              _c(
                "el-button",
                {
                  attrs: {
                    type: "danger",
                    size: "small",
                    icon: "el-icon-delete"
                  },
                  on: { click: _vm.handleDelectAll }
                },
                [_vm._v("\n            全部删除\n        ")]
              ),
              _vm._v(" "),
              _c(
                "el-dialog",
                {
                  attrs: { visible: _vm.dialogPushInfo, width: "40%" },
                  on: {
                    "update:visible": function($event) {
                      _vm.dialogPushInfo = $event
                    }
                  }
                },
                [
                  _c(
                    "div",
                    {
                      staticStyle: {
                        display: "flex",
                        "flex-direction": "column"
                      }
                    },
                    [
                      _c(
                        "div",
                        {
                          staticStyle: {
                            "align-self": "flex-start",
                            "font-size": "14px",
                            color: "#8a8a8a",
                            "margin-bottom": "10px"
                          }
                        },
                        [_vm._v(_vm._s(_vm.typePushInfo))]
                      ),
                      _vm._v(" "),
                      _c("el-input", {
                        attrs: { type: "textarea", resize: "none", rows: 6 },
                        model: {
                          value: _vm.infoPush,
                          callback: function($$v) {
                            _vm.infoPush = $$v
                          },
                          expression: "infoPush"
                        }
                      }),
                      _vm._v(" "),
                      _c(
                        "el-button",
                        {
                          staticStyle: {
                            "align-self": "flex-end",
                            "margin-top": "10px"
                          },
                          attrs: {
                            type: "primary",
                            disabled: _vm.infoPush === ""
                          },
                          on: { click: _vm.handlePushInfo }
                        },
                        [_vm._v("发布\n                ")]
                      )
                    ],
                    1
                  )
                ]
              ),
              _vm._v(" "),
              _c(
                "el-button",
                {
                  staticStyle: { "margin-left": "10px" },
                  attrs: { type: "success", size: "small" },
                  on: { click: _vm.handlePushInfoAll }
                },
                [_vm._v("\n            全局信息\n        ")]
              ),
              _vm._v(" "),
              _c(
                "el-button",
                {
                  staticStyle: { "margin-left": "10px" },
                  attrs: { type: "success", size: "small" },
                  on: { click: _vm.handlePushInfoBranch }
                },
                [_vm._v("\n            批量信息\n        ")]
              )
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "content" },
        [
          _c(
            "el-table",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.ifTable,
                  expression: "ifTable"
                }
              ],
              ref: "table",
              attrs: { data: _vm.tableData, height: "100%", border: "" },
              on: {
                "select-all": _vm.handleSelectAll,
                select: _vm.handleSelectBatch
              }
            },
            [
              _c("el-table-column", {
                attrs: {
                  fixed: "",
                  align: "center",
                  type: "selection",
                  width: "45"
                }
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: {
                  prop: "date",
                  align: "center",
                  label: "开通时间",
                  width: "100"
                }
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: {
                  prop: "account",
                  align: "center",
                  label: "账号",
                  "min-width": "200"
                }
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: {
                  prop: "name",
                  align: "center",
                  label: "姓名",
                  width: "100"
                }
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: {
                  prop: "areaFocus",
                  align: "center",
                  label: "专注领域",
                  width: "230"
                }
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: { align: "center", label: "用户状态", width: "150" },
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(scope) {
                      return _c(
                        "div",
                        {},
                        [
                          _c("el-switch", {
                            attrs: {
                              "active-text": "开通",
                              "inactive-text": "关闭",
                              "active-color": "#13ce66",
                              "inactive-color": "#ff4949"
                            },
                            model: {
                              value: scope.row.status,
                              callback: function($$v) {
                                _vm.$set(scope.row, "status", $$v)
                              },
                              expression: "scope.row.status"
                            }
                          })
                        ],
                        1
                      )
                    }
                  }
                ])
              }),
              _vm._v(" "),
              _c("el-table-column", {
                attrs: {
                  label: "操作",
                  align: "center",
                  fixed: "right",
                  width: "110"
                },
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(scope) {
                      return [
                        _c(
                          "el-button",
                          {
                            attrs: { type: "text", size: "small" },
                            on: {
                              click: function($event) {
                                _vm.handleSee("user", scope)
                              }
                            }
                          },
                          [
                            _vm._v(
                              "\n                        查看\n                    "
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "el-button",
                          {
                            staticStyle: { color: "red" },
                            attrs: { type: "text", size: "small" },
                            on: {
                              click: function($event) {
                                _vm.handleDeleteRow(scope.$index)
                              }
                            }
                          },
                          [
                            _vm._v(
                              "\n                        删除\n                    "
                            )
                          ]
                        )
                      ]
                    }
                  }
                ])
              })
            ],
            1
          ),
          _vm._v(" "),
          !_vm.ifTable
            ? _c("hightChart", { attrs: { chartData: _vm.chartData } })
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      _c("el-pagination", {
        staticStyle: { "align-self": "center" },
        attrs: {
          background: "",
          layout: "prev, pager, next",
          "current-page": _vm.currentPage,
          "page-size": 1,
          total: _vm.tableMainPage
        },
        on: { "current-change": _vm.handlePage }
      }),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: { visible: _vm.dialogUserVisible, width: "60%" },
          on: {
            "update:visible": function($event) {
              _vm.dialogUserVisible = $event
            }
          }
        },
        [
          _c("div", { staticClass: "userInfo" }, [
            _c("div", { staticClass: "item item1" }, [
              _c("div", [
                _c("img", { attrs: { src: _vm.infoData.avatarUrl } })
              ]),
              _vm._v(" "),
              _c("div", { staticStyle: { margin: "0 15px" } }, [
                _c("div", { staticStyle: { "margin-bottom": "3px" } }, [
                  _vm._v("账号：\n                        "),
                  _c("span", [_vm._v(_vm._s(_vm.infoData.account))])
                ]),
                _vm._v(" "),
                _c("div", [
                  _vm._v("专注领域：" + _vm._s(_vm.infoData.areaFocus))
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "learnInfo" }, [
                _c("div", [
                  _vm._v("学习时长："),
                  _c("span", [_vm._v(_vm._s(_vm.infoData.learnTime) + "h")])
                ]),
                _vm._v(" "),
                _c("div", [
                  _vm._v("访问次数："),
                  _c("span", [_vm._v(_vm._s(_vm.infoData.accessTimes) + "次")])
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "item" }, [
              _c("div", { staticClass: "item2" }, [
                _vm._v("姓名：\n                    "),
                _c("span", { ref: "name", staticStyle: { padding: "5px" } }, [
                  _vm._v(_vm._s(_vm.infoData.name))
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "item2" }, [
                _vm._v("邮箱：\n                    "),
                _c("span", { ref: "eMail", staticStyle: { padding: "5px" } }, [
                  _vm._v(_vm._s(_vm.infoData.eMail))
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", [
              _c(
                "div",
                {
                  staticStyle: {
                    display: "flex",
                    "justify-content": "flex-end",
                    margin: "10px 0"
                  }
                },
                [
                  _c(
                    "el-select",
                    {
                      staticStyle: { width: "110px", "margin-right": "10px" },
                      attrs: { size: "small", placeholder: "请选择" },
                      on: { change: _vm.handleTypeChange },
                      model: {
                        value: _vm.typeSelect,
                        callback: function($$v) {
                          _vm.typeSelect = $$v
                        },
                        expression: "typeSelect"
                      }
                    },
                    _vm._l(["表格", "图表"], function(item) {
                      return _c("el-option", {
                        key: item,
                        attrs: { value: item }
                      })
                    })
                  ),
                  _vm._v(" "),
                  _c(
                    "el-select",
                    {
                      staticStyle: { width: "110px" },
                      attrs: { size: "small", placeholder: "请选择" },
                      on: { change: _vm.handleTimeChange },
                      model: {
                        value: _vm.timeSelect,
                        callback: function($$v) {
                          _vm.timeSelect = $$v
                        },
                        expression: "timeSelect"
                      }
                    },
                    _vm._l(_vm.timesOptions, function(item) {
                      return _c("el-option", {
                        key: item.value,
                        attrs: { label: item.label, value: item.value }
                      })
                    })
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticStyle: {
                    display: "flex",
                    "flex-direction": "column",
                    "align-items": "center"
                  }
                },
                [
                  _c(
                    "el-table",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.ifDialogTable,
                          expression: "ifDialogTable"
                        }
                      ],
                      ref: "table",
                      attrs: {
                        data: _vm.tableData_,
                        height: "400",
                        border: ""
                      },
                      on: {
                        "select-all": _vm.handleSelectAll,
                        select: _vm.handleSelectBatch
                      }
                    },
                    [
                      _c("el-table-column", {
                        attrs: {
                          prop: "date",
                          align: "center",
                          label: "学习时间",
                          width: "100"
                        }
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: {
                          prop: "name",
                          align: "center",
                          label: "名称",
                          "min-width": "200"
                        }
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: {
                          prop: "type",
                          align: "center",
                          label: "类别",
                          width: "150"
                        }
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: {
                          prop: "time",
                          align: "center",
                          label: "学习时间",
                          width: "100"
                        }
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: {
                          prop: "times",
                          align: "center",
                          label: "访问次数",
                          width: "100"
                        }
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: {
                          label: "操作",
                          align: "center",
                          fixed: "right",
                          width: "110"
                        },
                        scopedSlots: _vm._u([
                          {
                            key: "default",
                            fn: function(scope) {
                              return [
                                _c(
                                  "el-button",
                                  {
                                    attrs: { type: "text", size: "small" },
                                    on: {
                                      click: function($event) {
                                        _vm.handleSee("user", scope)
                                      }
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n                                    查看\n                                "
                                    )
                                  ]
                                )
                              ]
                            }
                          }
                        ])
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  !_vm.ifDialogTable
                    ? _c("hightChart", {
                        staticStyle: { padding: "0" },
                        attrs: { chartData: _vm.chatData_ }
                      })
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.ifDialogTable
                    ? _c("el-pagination", {
                        staticStyle: { "align-self": "center" },
                        attrs: {
                          background: "",
                          layout: "prev, pager, next",
                          total: _vm.listNow.page
                        },
                        on: { "current-change": _vm.handleDialogPage }
                      })
                    : _vm._e()
                ],
                1
              )
            ])
          ])
        ]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-72b836f2", esExports)
  }
}

/***/ }),

/***/ "dKx3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_vue_loader_lib_selector_type_script_index_0_input_vue__ = __webpack_require__("mLYV");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_loader_lib_template_compiler_index_id_data_v_78ecde44_hasScoped_false_buble_transforms_vue_loader_lib_selector_type_template_index_0_input_vue__ = __webpack_require__("8WVW");
var disposed = false
var normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_vue_loader_lib_selector_type_script_index_0_input_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__vue_loader_lib_template_compiler_index_id_data_v_78ecde44_hasScoped_false_buble_transforms_vue_loader_lib_selector_type_template_index_0_input_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "node_modules\\element-ui\\packages\\input\\src\\input.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-78ecde44", Component.options)
  } else {
    hotAPI.reload("data-v-78ecde44", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "dN9Q":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "button",
    {
      staticClass: "el-button",
      class: [
        _vm.type ? "el-button--" + _vm.type : "",
        _vm.buttonSize ? "el-button--" + _vm.buttonSize : "",
        {
          "is-disabled": _vm.disabled,
          "is-loading": _vm.loading,
          "is-plain": _vm.plain,
          "is-round": _vm.round
        }
      ],
      attrs: {
        disabled: _vm.disabled,
        autofocus: _vm.autofocus,
        type: _vm.nativeType
      },
      on: { click: _vm.handleClick }
    },
    [
      _vm.loading
        ? _c("i", {
            staticClass: "el-icon-loading",
            on: { click: _vm.handleInnerClick }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.icon && !_vm.loading
        ? _c("i", { class: _vm.icon, on: { click: _vm.handleInnerClick } })
        : _vm._e(),
      _vm._v(" "),
      _vm.$slots.default
        ? _c(
            "span",
            { on: { click: _vm.handleInnerClick } },
            [_vm._t("default")],
            2
          )
        : _vm._e()
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-de350bd0", esExports)
  }
}

/***/ }),

/***/ "mBcC":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_usersManage_vue__ = __webpack_require__("JVMY");
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_72b836f2_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_usersManage_vue__ = __webpack_require__("T5OH");
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("y58T")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-72b836f2"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_usersManage_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_72b836f2_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_usersManage_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "vueProgect\\src\\components\\userCenter\\usersManage.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-72b836f2", Component.options)
  } else {
    hotAPI.reload("data-v-72b836f2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "mLYV":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_element_ui_src_mixins_emitter__ = __webpack_require__("ufP2");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_element_ui_src_mixins_migrating__ = __webpack_require__("IHkg");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__calcTextareaHeight__ = __webpack_require__("Doj+");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_element_ui_src_utils_merge__ = __webpack_require__("9BW/");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'ElInput',

  componentName: 'ElInput',

  mixins: [__WEBPACK_IMPORTED_MODULE_0_element_ui_src_mixins_emitter__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1_element_ui_src_mixins_migrating__["a" /* default */]],

  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },

  data() {
    return {
      currentValue: this.value,
      textareaCalcStyle: {},
      prefixOffset: null,
      suffixOffset: null,
      hovering: false,
      focused: false
    };
  },

  props: {
    value: [String, Number],
    placeholder: String,
    size: String,
    resize: String,
    name: String,
    form: String,
    id: String,
    maxlength: Number,
    minlength: Number,
    readonly: Boolean,
    autofocus: Boolean,
    disabled: Boolean,
    type: {
      type: String,
      default: 'text'
    },
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    rows: {
      type: Number,
      default: 2
    },
    autoComplete: {
      type: String,
      default: 'off'
    },
    max: {},
    min: {},
    step: {},
    validateEvent: {
      type: Boolean,
      default: true
    },
    suffixIcon: String,
    prefixIcon: String,
    label: String,
    clearable: {
      type: Boolean,
      default: false
    },
    tabindex: String
  },

  computed: {
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    validateState() {
      return this.elFormItem ? this.elFormItem.validateState : '';
    },
    needStatusIcon() {
      return this.elForm ? this.elForm.statusIcon : false;
    },
    validateIcon() {
      return {
        validating: 'el-icon-loading',
        success: 'el-icon-circle-check',
        error: 'el-icon-circle-close'
      }[this.validateState];
    },
    textareaStyle() {
      return Object(__WEBPACK_IMPORTED_MODULE_3_element_ui_src_utils_merge__["a" /* default */])({}, this.textareaCalcStyle, { resize: this.resize });
    },
    inputSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    isGroup() {
      return this.$slots.prepend || this.$slots.append;
    },
    showClear() {
      return this.clearable && this.currentValue !== '' && (this.focused || this.hovering);
    }
  },

  watch: {
    'value'(val, oldValue) {
      this.setCurrentValue(val);
    }
  },

  methods: {
    focus() {
      (this.$refs.input || this.$refs.textarea).focus();
    },
    getMigratingConfig() {
      return {
        props: {
          'icon': 'icon is removed, use suffix-icon / prefix-icon instead.',
          'on-icon-click': 'on-icon-click is removed.'
        },
        events: {
          'click': 'click is removed.'
        }
      };
    },
    handleBlur(event) {
      this.focused = false;
      this.$emit('blur', event);
      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.blur', [this.currentValue]);
      }
    },
    inputSelect() {
      (this.$refs.input || this.$refs.textarea).select();
    },
    resizeTextarea() {
      if (this.$isServer) return;
      var { autosize, type } = this;
      if (type !== 'textarea') return;
      if (!autosize) {
        this.textareaCalcStyle = {
          minHeight: Object(__WEBPACK_IMPORTED_MODULE_2__calcTextareaHeight__["a" /* default */])(this.$refs.textarea).minHeight
        };
        return;
      }
      const minRows = autosize.minRows;
      const maxRows = autosize.maxRows;

      this.textareaCalcStyle = Object(__WEBPACK_IMPORTED_MODULE_2__calcTextareaHeight__["a" /* default */])(this.$refs.textarea, minRows, maxRows);
    },
    handleFocus(event) {
      this.focused = true;
      this.$emit('focus', event);
    },
    handleInput(event) {
      const value = event.target.value;
      this.$emit('input', value);
      this.setCurrentValue(value);
    },
    handleChange(event) {
      this.$emit('change', event.target.value);
    },
    setCurrentValue(value) {
      if (value === this.currentValue) return;
      this.$nextTick(_ => {
        this.resizeTextarea();
      });
      this.currentValue = value;
      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.change', [value]);
      }
    },
    calcIconOffset(place) {
      const pendantMap = {
        'suf': 'append',
        'pre': 'prepend'
      };

      const pendant = pendantMap[place];

      if (this.$slots[pendant]) {
        return { transform: `translateX(${place === 'suf' ? '-' : ''}${this.$el.querySelector(`.el-input-group__${pendant}`).offsetWidth}px)` };
      }
    },
    clear() {
      this.$emit('input', '');
      this.$emit('change', '');
      this.setCurrentValue('');
      this.focus();
    }
  },

  created() {
    this.$on('inputSelect', this.inputSelect);
  },

  mounted() {
    this.resizeTextarea();
    if (this.isGroup) {
      this.prefixOffset = this.calcIconOffset('pre');
      this.suffixOffset = this.calcIconOffset('suf');
    }
  }
});

/***/ }),

/***/ "ufP2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    var name = child.$options.componentName;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
});


/***/ }),

/***/ "y58T":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

});