import { resolveBackRoutePath } from "@/api/jump"

export default {
  methods: {
    /**
     * 跳转后端路由 push
     * @param {string} absolutePath 绝对路径
     */
    routerPush(absolutePath) {
      this.$router.push(resolveBackRoutePath(absolutePath))
    },
    /**
     * 跳转后端路由 replace
     * @param {string} absolutePath 
     */
    routerReplace(absolutePath){
      this.$router.replace(resolveBackRoutePath(absolutePath))
    }
  }
}