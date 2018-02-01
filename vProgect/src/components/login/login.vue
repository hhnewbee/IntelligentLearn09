<template>
    <div id="loginIL09">
        <el-form :model="formData"
                 :rules="rules"
                 ref="loginForm"
                 class="demo-ruleForm loginForm">
            <el-form-item
                    prop="account">
                <el-input
                        prefix-icon="fa fa-user"
                        placeholder="请输入账号"
                        v-model="formData.account"></el-input>
            </el-form-item>
            <el-form-item
                    prop="passwd">
                <el-input
                        prefix-icon="fa fa-lock"
                        type="password"
                        placeholder="请输入密码"
                        class="pass"
                        v-model="formData.passwd">
                    <span slot="suffix" class="forget" @click="dialogFormVisible = true">忘记密码</span>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button
                        type="primary"
                        class="submit"
                        @click="submitForm('loginForm')">
                    提交
                </el-button>
            </el-form-item>
            <find-pass :dialogFormVisible.sync="dialogFormVisible"></find-pass>
        </el-form>
    </div>
</template>

<script>
    import findPass from '../login/finePass.vue';

    export default {
        data() {
            //表单进行验证
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                }
                callback();
            };
            let validateAcco = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入账号'));
                }
                callback();
            };
            return {
                dialogFormVisible: false,
                formData: {
                    account: '',
                    passwd: ''
                },
                rules: {
                    account: [
                        {validator: validateAcco, trigger: 'blur,change'}

                    ],
                    passwd: [
                        {validator: validatePass, trigger: 'blur,change'}
                    ],
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$ajax.post('login', {
                            account: this.formData.account,
                            passwd: this.formData.passwd
                        }).then((response) => {
                            if (!response.data) {
                                this.$message({
                                    type: 'warn',
                                    message: `账号或者密码错误`
                                });
                                return;
                            }
                            localStorage["ifLogin"] = response.data.account;
                            this.$router.push({ path: '/main/recommend' });
                        });
                    } else {
                        return false;
                    }
                });
            },
        },
        components: {
            findPass
        }
    }
</script>

<style lang="scss">
    #loginIL09{
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .loginForm{
            width: 330px;
            padding: 20px;
            .forget {
                font-size: 12px;
                cursor: pointer;
            }
            .pass {
                .el-input__inner {
                    padding-right: 52px;
                }

            }
            .submit {
                width: 100%;
            }
        }
    }
</style>

