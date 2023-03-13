import { goToLoginPage } from "@/api/jump"

const user = {
  namespaced: true,
  state: () => ({
    username: '蔡寻坤是真爱粉'
  }),
  mutations: {

  },
  actions: {
    logIn() {

    },
    logOut() {
      goToLoginPage()
    },
  }
}

export default user