<template>
    <div id="userInfoIL09">
        <el-breadcrumb class="breadcrumb">
            <el-breadcrumb-item
                    class="el-icon-edit-outline">&nbsp;个人信息
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="item item1">
            <div class="avator-mode"
                 @mouseenter="handleSetShow"
                 @mouseleave="handleSetClose">
                <img :src="avatarUrl">
                <div class="update-avator"
                     id="setAvatar">
                    <p>更换头像</p>
                </div>
                <avatar-cropper trigger="#setAvatar"
                                @uploaded="handleUploaded"
                                :upload-handlers="{withCredentials:true}"
                                upload-url="http://172.16.148.27:8080/user/icon">
                </avatar-cropper>
            </div>
            <div style="margin: 0 30px">
                <div>账号：
                    <span>{{account}}</span>
                </div>
                <div>专注领域：
                    <el-select v-model="areaFocus_"
                               multiple
                               @change="handleFocusChange"
                               placeholder="请选择专注领域">
                        <el-option v-for="item in filterType('全部')"
                                   :key="item"
                                   :label="item"
                                   :value="item">
                        </el-option>
                    </el-select>
                </div>
            </div>

            <div class="learnInfo">
                <div>学习时长：<span>{{learnTime}}h</span></div>
                <div>访问次数：<span>{{visitTime}}次</span></div>
            </div>
        </div>
        <div class="item">
            <div class="item2">姓名：
                <span ref="name" style="padding: 5px">{{name}}</span>
                <span
                        @click="handleEditInfo('name',$event)"
                        class="control">修改</span>
            </div>
            <div class="item2">邮箱：
                <span ref="email" style="padding: 5px">{{email}}</span>
                <span
                        @click="handleEditInfo('email',$event)"
                        class="control">修改</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapState, mapMutations} from 'vuex';
    import AvatarCropper from "vue-avatar-cropper";

    export default {
        data() {
            return {
                name: '',
                email: '',
                learnTime: 0,
                visitTime: 0,
                selfInformation: {},
                areaFocus_:[]
            }
        },
        activated() {
            this.$ajaxJava.get('user').then((res) => {
                this.selfInformation = res.data.user.selfInformation;
                this.name = res.data.user.selfInformation.name;
                this.email = res.data.user.selfInformation.email;
                this.learnTime = this.$formatHouse(res.data.user.learnTime);
                this.visitTime = res.data.user.visitTime;
                let position=res.data.user.selfInformation.position;
                this.areaFocus_=position.match('/')?position.split('/'):[position]
            })
        },
        computed: {
            ...mapGetters(['filterType']),
            ...mapState('info', ['account', 'avatarUrl']),
        },
        methods: {
            ...mapMutations('info', [
                'setAvatarUrl',
                'setAreaFocus'
            ]),
            /**
             * 修改个人信息
             * @param tar
             * @param e
             */
            handleEditInfo(tar, e) {
                let target = e.currentTarget;
                let content = this.$refs[tar];
                //修改还是保存的判断
                if (target.innerText === '修改') {
                    content.contentEditable = true;
                    content.focus();
                    target.style.color = '#8fdf09';
                    target.innerText = "保存";
                } else {
                    content.contentEditable = false;
                    target.style.color = '#00abf9';
                    target.innerText = "修改";
                    this.selfInformation[tar] = content.textContent;
                    this.$ajax.create().post('user/selfInformation', this.selfInformation).then(() => {
                        this.$message.success('修改成功');
                    })
                }
            },
            /**
             * 显示修改
             */
            handleSetShow() {
                document.querySelector('#setAvatar').style.bottom = '0';
            },
            /**
             * 不显示显示修改
             */
            handleSetClose() {
                document.querySelector('#setAvatar').style.bottom = '-30px';
            },
            /**
             * 头像上传成功
             * @param resp
             */
            handleUploaded(resp) {
                this.setAvatarUrl(resp);
                this.selfInformation.imgPath = resp;
                this.$ajax.create().post('user/selfInformation', this.selfInformation).then(() => {
                    this.$message.success('头像修改成功');
                })
            },
            /**
             * 修改关注领域
             * @param focus
             */
            handleFocusChange(focus) {
                    this.selfInformation.position=focus.join('/');
                    this.$ajax.create().post('user/selfInformation', this.selfInformation).then(() => {
                    this.$message.success('修改成功');
                })
            }
        },
        components: {
            AvatarCropper
        }
    }
</script>

<style lang="scss">
    #userInfoIL09 {
        .item {
            margin: 20px 100px;
            padding: 10px;
            border-bottom: 1px solid #f8f4f4;
            .avator-mode {
                position: relative;
                width: 100px;
                height: 100px;
                border-radius: 50%;
                overflow: hidden;
                img {
                    width: 100%;
                    height: 100%;
                }
                .update-avator {
                    font-size: 12px;
                    position: absolute;
                    width: 100%;
                    left: 0;
                    bottom: -30px;
                    transition: bottom .3s;
                    p {
                        cursor: pointer;
                        background: rgba(0, 0, 0, .6);
                        color: #fff;
                        text-align: center;
                        line-height: 30px;
                    }
                }
            }
            .learnInfo {
                position: absolute;
                font-size: 15px;
                right: 0;
                div:nth-child(1) {
                    margin-bottom: 5px;
                }
            }
            .item2 {
                margin: 20px;
                font-size: 15px;
                font-weight: bold;
            }
            .control {
                font-size: 14px;
                color: #00abf9;
                cursor: pointer;
                margin-left: 10px;
            }
        }
        .item1 {
            position: relative;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 18px;
            font-weight: bold;
            .el-input__inner {
                border: none
            }
        }
    }

</style>

