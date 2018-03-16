<template>
    <div ref="ueditor"></div>
</template>

<script>
//    import '../../static/venders/UEditor/ueditor.config.js';
    import '../../static/venders/UEditor/themes/default/css/ueditor.min.css'
    import '../../static/venders/UEditor/ueditor.all.js';
    import '../../static/venders/UEditor/lang/zh-cn/zh-cn.js';

    export default {
        name: 'set',
        data () {
            return {
                ue: ''
            }
        },
        mounted () {
            this.ue = UE.getEditor('ueditor',{
                BaseUrl: '',
                UEDITOR_HOME_URL: 'static/venders/UEditor/',
                toolbars: [
                    ['fullscreen', 'source', 'undo', 'redo'],
                    ['bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc']
                ]
            })
        },
        methods: {
            save(){
                let ueditordata = UE.getEditor('ueditor').getContent();
            }
        }
    };
</script>

<style>
</style>