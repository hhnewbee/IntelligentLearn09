export const course = {
    namespaced: true,
    state: {
        courseTitle:'',
        chapterTitle:'',
        videoUrl:'http://172.16.148.27:8080/static/video/第一节/02_合并请求.mp4',
        likes:0,
        collections:0
    },
    mutations: {
        setCourseTitle(state,newCourseTitle){
            state.courseTitle=newCourseTitle;
        },
        setChapterTitle(state,newChapterTitle){
            state.chapterTitle=newChapterTitle;
        },
        setvideoUrl(state,newvideoUrl){
            state.videoUrl=newvideoUrl;
        },
        setLikes(state,newLikes){
            state.likes=newLikes;
        },
        setCollections(state,newCollection){
            state.collections=newCollection;
        },
    },
    actions: {

    },
    getters: {

    }
};