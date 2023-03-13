  import menus from "_back/config/menus"

const nav = {
  namespaced: true,
  state: () => ({
    /**
     * key: path
     * value: [name1, name2]
     */
    pathMenuNameMap: null,
    currentLocations: []
  }),
  actions: {
    init({ state }) {
      const map = new Map()

      // 依次将路径添加到map
      const append = (item, parentList) => {
        let path, menuNameList = parentList
        if (item.path) {
          path = item.path
        }
        menuNameList = [...parentList, item.name]
        if (path)
          map.set(path, menuNameList)
        if (item.children) {
          item.children.forEach(c => append(c, menuNameList))
        }
      }
      menus.forEach(i => append(i, ['首页']))
      state.pathMenuNameMap = map
    },
    setCurrentLocation({ state }, path) {
      state.currentLocations = state.pathMenuNameMap.get(path)
    }
  }
}

export default nav