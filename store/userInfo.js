export const state = () =>({
    userId :"",
})

export const mutations = {
    setUserId (state,userId){
        state.userId = userId
    },
}

export const getters = {
    //stateから別の値を計算
    //他のgettersの値を使うことも可能　(省略技法ももちろん使える)
    //cubed: (state, getters) => state.count * getters.squared
}