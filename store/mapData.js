export const state = () =>({
    mapDataList :[],
    mapDataEditCount : 0,
    deleteCountList :[],
    nodeChangedList:[],
})

export const mutations = {
    setMapData (state,mapData){
         state.mapDataList.length = 0;
         console.log(state.mapDataList)
         state.mapDataList = mapData.concat();
        //state.mapDataList.push(mapData)
    },
    setDeleteCount (state,deletCount){
        state.deleteCountList.push(deletCount)
    },
    setMapDataEditCount(state,mapDataEditCount){
        state.mapDataEditCount = mapDataEditCount +1
    },
    setNodeChanged(state,nodeChanged){
        state.nodeChangedList.push(nodeChanged)
    },
}

export const getters = {
    //stateから別の値を計算
    getMapDataEditCount (state) {
      return state.mapDataEditCount
    },
    getDeleteCountListLen (state) {
        return state.deleteCountList.length
      },
    getNodeChangedListLen:(state) =>state.nodeChangedList.length
    //他のgettersの値を使うことも可能　(省略技法ももちろん使える)
    //cubed: (state, getters) => state.count * getters.squared
}