<template>
    <el-dialog
            title="密码寻回"
            id="findPassIL09"
            :before-close="handlerClose"
            :visible.sync="dialogFormVisible">
        <el-form
                :model="formData2"
                :rules="formRule"
                ref="form"
                style="width: 100%">
            <el-form-item
                    prop="account">
                <span>请输入你的账号，密码将发送至该账号填写的邮箱上</span>
                <el-input v-model="formData2.account"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handlerSure">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        data() {
            let checkAccount = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入账号'));
                }
                callback()
            };
            return {
                formData2: {
                    account: ''
                },
                formRule: {
                    account: [
                        {validator: checkAccount, trigger: 'blur'}
                    ],
                }
            }
        },
        props: ["dialogFormVisible"],
        methods: {
            handlerSure() {
                this.$refs["form"].validate((valid) => {
                    if (valid) {
                        this.$emit('update:dialogFormVisible', false);
                    } else {
                        return false;
                    }
                });
            },
            handlerClose(){
                this.$emit('update:dialogFormVisible', false);
            }
        }
    }
</script>

<style lang="scss">
    #findPassIL09 {
        .el-dialog {
            width: 30%;
        }
        .el-dialog__body {
            padding: 0 20px;
            color: #606266;
            line-height: 24px;
            font-size: 14px;
        }
    }
</style>

