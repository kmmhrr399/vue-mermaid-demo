export const state = () =>{
    title :"aiueokakikukeko"
}

export const mutations = {
    seta (state,titleName){
        state.title = titleName
    }
}

export const getters = {
    //stateから別の値を計算
    getTitlea (state) {
      return state.title
    }
}