export const info = {
    namespaced: true,
    state: {
        account:'',
        accountHashMap:'',
        avatarUrl:'',
        name:'',
        areaFocus:'',
        eMail:'',
        //权限
        limit:''
    },
    mutations: {
        setAccount(state,newAccount){
            state.account=newAccount;
        },
        setAccountHashMap(state,newAccountHashMap){
            state.accountHashMap=newAccountHashMap;
        },
        setAvatarUrl(state,newAvatarUrl){
            state.avatarUrl=newAvatarUrl;
        },
        setName(state,newName){
            state.name=newName;
        },
        setAreaFocus(state,newAreaFocus){
            state.areaFocus=newAreaFocus;
        },
        setEMail(state,newEMail){
            state.eMail=newEMail;
        },
        setLimit(state,newLimit){
            state.limit=newLimit;
        }
    },
    actions: {

    },
    getters: {

    }
};
