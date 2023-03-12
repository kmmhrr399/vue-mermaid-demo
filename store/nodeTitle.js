export const state = () =>({
    titleList :[],
    idList:[],
    linkTextList:[],
    linkTextListCount :0
})

export const mutations = {
    setTitle (state,titleName){
        state.titleList.push(titleName)
    },
    setId (state,titleId){
        state.idList.push(titleId)
    },
    setLinkTextList(state,linkText){
        state.linkTextList.slice(0,state.linkTextList.length-1)
        console.log("ストア内のlinktextは\n"+linkText)
        state.linkTextList=linkText.concat()
    },
    setLinkTextListCount(state){
        state.linkTextListCount++
    }
}

export const getters = {
    //stateから別の値を計算
    getTitleListLen (state) {
      return state.titleList.length
    },
    getNumListLen (state) {
        return state.idList.length
      },
    getLinkTextListCount (state) {
        return state.linkTextListCount
      },
    //他のgettersの値を使うことも可能　(省略技法ももちろん使える)
    //cubed: (state, getters) => state.count * getters.squared
}