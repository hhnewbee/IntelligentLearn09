export default {
    filterType:state => exclude =>{
        return state.type.filter((value)=>{
            return value!==exclude;
        })
    }
}