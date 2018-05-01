<template>
    <div class="test">
        <el-input v-model="discussName"
                  style="width: 200px;margin-bottom: 10px;margin-right: 10px"
                  size="small">
        </el-input>
        <el-button size="mini"
                   :disabled="discussName===''"
                   @click="addChat"
                   type="primary">
            确定
        </el-button>
        <div style="display: flex;flex-wrap: wrap;justify-content: space-around">
            <div v-for="(chat,index) in chatGroups"
                 :key="index"
                 style="margin-right: 10px">
                <div class="chatHeader">
                    <i class="fas fa-times" style="color: #8a8a8a;float: right"></i>
                </div>
                <discuss :discussInfo="chat"
                         style="width: 400px;height: 300px;margin-bottom: 10px;">
                </discuss>
            </div>
        </div>
    </div>
</template>

<script>
    import discuss from '../components/discuss.vue';

    export default {
        data() {
            return {
                //聊天的用户组群
                chatGroups: [],
                //输入要参与聊天的昵称
                discussName: ''
            }
        },
        methods: {
            addChat() {
                this.chatGroups.push({
                    theme: 'vue与webpack的学习',
                    nickName: this.discussName,
                    avatarUrl: ''
                },)
            }
        },
        components: {
            discuss
        }
    }
</script>

<style scoped lang="scss">
    .test {
        margin: 20px 40px;
        .chatHeader {
            overflow: hidden;
            padding: 5px 10px;
            background-color: $secondaryText;
        }
    }
</style>

