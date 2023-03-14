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
        const recur = (item, parentPath) => {
          let copyItem = {
            path: parentPath + '/' + item.path,
            menuName: item.menuName,
            menuIcon: item.menuIcon
          }
          pathMenuNameMap.set(copyItem.path, copyItem.menuName)
          if (item.children) {
            let cLst = []
            for (let c of item.children) {
              cLst.push(recur(c, copyItem.path))
            }
            copyItem.children = cLst
          }
          return copyItem
        }
        state.pathMenuNameMap = pathMenuNameMap
        return Array.prototype.map.call(config, i =>
          recur(i, process.env.VUE_APP_BASE_URL + process.env.VUE_APP_BACK_LOCATION)
        )
      }
      state.menuList = filterMenuLst(routesConfig)
      console.log(state.menuList);
    },
    setCurrentMenuNames({ state }, path) {
      state.currentMenuNames = state.pathMenuNameMap.get(path)
    },
  }
}

export default nav