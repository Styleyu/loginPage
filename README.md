# innovation-credits

**NOTE: 使用YARN命令**

# 开发服务器

- 登录界面 /login

- 后台界面 /back


## 路径说明

- api: 相关全局api，请提前查看阅读src/api

- services/back/api: 后台页面使用的api

- services/back/config: 后台页面配置文件，如ui配置、菜单配置、routes配置

- services/back/views: 路由页面

## 编码规范

- js行末不加分号

- 导入依赖时，用别名路径代替相对路径

- 自己页面用到的重用组件写在自己的目录，如views/user/components

- 路由配置不写name，只写path(为了防止冲突)，以"/父分类/子分类"为格式(/user/detail)

- api不标注"异步"的默认为同步api

- css 使用rem单位代替px，和当前标签字体强相关使用em

- 路由界面**不要**使用mounted来定义每次进入的动作，应该使用路由守卫函数


## 环境配置

- .env, .env.production 全局环境变量配置
  - 注意：不要把敏感数据如API KEY放在里面！

- .env.development.local 本地开发配置，不会同步到git，如**配置开发服务器**等等


## UI组件相关api

- 字体图标: https://fontawesome.com/

- element ui: https://element.eleme.cn/#/zh-CN/