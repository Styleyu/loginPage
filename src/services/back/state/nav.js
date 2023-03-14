import routesConfig from "_back/config/routes"

const nav = {
  namespaced: true,
  state: () => ({
    /**
     * 
     * pathMenuNameMap
     * key: path
     * value: [menuName1, menuName2]
     * 
     * menuList: 
     * [
     *  {path:'/a/b/c', menuName: '', menuIcon: '', children: []}
     * ]
     * 
     */
    pathMenuNameMap: null,
    currentMenuNames: [],
    menuList: []
  }),
  actions: {
    init({ state }) {
      // 从配置文件读取menuList
      const filterMenuLst = (config) => {
        const pathMenuNameMap= new Map()
        const recur = (item, parentPath, preAllNames) => {
          let copyItem = {
            path: parentPath + '/' + item.path,
            menuName: item.menuName,
            menuIcon: item.menuIcon
          }
          let thisNames = [...preAllNames,copyItem.menuName]
          pathMenuNameMap.set(copyItem.path, thisNames)
          if (item.children) {
            let cLst = []
            for (let c of item.children) {
              cLst.push(recur(c, copyItem.path, thisNames))
            }
            copyItem.children = cLst
          }
          return copyItem
        }
        state.pathMenuNameMap = pathMenuNameMap
        return Array.prototype.map.call(config, i =>
          recur(i, process.env.VUE_APP_BASE_URL + process.env.VUE_APP_BACK_LOCATION, ['首页'])
        )
      }
      state.menuList = filterMenuLst(routesConfig)
      console.log(state.pathMenuNameMap);
    },
    setCurrentMenuNames({ state }, path) {
      state.currentMenuNames = state.pathMenuNameMap.get(path)
    },
  }
}

export default nav