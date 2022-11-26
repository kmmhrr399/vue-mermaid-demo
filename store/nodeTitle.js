export const state = () =>({
    titleList :[],
    idList:[]
})

export const mutations = {
    setTitle (state,titleName){
        state.titleList.push(titleName)
    },
    setId (state,titleId){
        state.idList.push(titleId)
    },
}

export const getters = {
    //stateから別の値を計算
    getTitleListLen (state) {
      return state.titleList.length
    },
    getNumListLen (state) {
        return state.idList.length
      },
    //他のgettersの値を使うことも可能　(省略技法ももちろん使える)
    //cubed: (state, getters) => state.count * getters.squared
}