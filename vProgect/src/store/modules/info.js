export const info = {
    namespaced: true,
    state: {
        account:'',
        accountHashMap:'',
        avatar:'',
        name:'',
        areaFocus:'',
        eMail:'',
    },
    mutations: {
        setAccount(state,newAccount){
            state.account=newAccount;
        },
        setAccountHashMap(state,newAccountHashMap){
            state.accountHashMap=newAccountHashMap;
        },
        setAvatar(state,newAvatar){
            state.avatar=newAvatar;
        },
        setName(state,newName){
            state.name=newName;
        },
        setAreaFocus(state,newAreaFocus){
            state.areaFocus=newAreaFocus;
        },
        setEMail(state,newEMail){
            state.eMail=newEMail;
        }
    },
    actions: {

    },
    getters: {

    }
};
