export const state = () =>({
    mapDataList :[],
    mapNameList:[],
    mapIdList:[],
    mapDataEditCount : 0,
    deleteCountList :[],
    nodeChangedList:[],
})

export const mutations = {
    setMapData (state,mapData){
         //state.mapDataList.slice(0,state.mapDataList.length-1)
         console.log(state.mapDataList)
         state.mapDataList = mapData.slice();
        //state.mapDataList.push(mapData)
        //Commitはコンポーネントのketsugouメソッドで行われている。
    },
    setMapName (state,mapName){
        state.mapNameList.push(mapName)
    },
    setMapId (state,mapId){
        state.mapIdList.push(mapId)
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
    getNodeChangedListLen:(state) =>state.nodeChangedList.length,
    getmapNameListLen:(state) =>state.mapNameList.length,
    getmapNameIdListLen:(state) =>state.mapIdList.length,
    //他のgettersの値を使うことも可能　(省略技法ももちろん使える)
    //cubed: (state, getters) => state.count * getters.squared
}