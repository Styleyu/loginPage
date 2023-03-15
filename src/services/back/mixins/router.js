import { resolveBackRoutePath } from "@/api/jump"

export default {
  methods: {
    /**
     * 跳转后端路由
     * @param {string} absolutePath 
     */
    routerPush(absolutePath) {
      this.$router.push(resolveBackRoutePath(absolutePath))
    }
  }
}