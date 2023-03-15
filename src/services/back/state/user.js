import { goToLoginPage } from "@/api/jump"
import { dateToString } from "@/utils/date"

const user = {
  namespaced: true,
  state: () => ({
    username: '2020001001',//
    name: '蔡德一',
    number: '2020001001',//编号 学生号/教职工
    identify: '学生',// 学生1 教师2
    group: '软件工程学院软件工程专业2020级1班',
    entryDate: dateToString(new Date(2020, 8, 1, 0, 0, 0), 'd')
  }),
  mutations: {

  },
  actions: {
    logIn() {

    },
    logOut() {
      // @todo: 注销
      goToLoginPage()
    },
  }
}

export default user