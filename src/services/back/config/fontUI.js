import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// NOTE: STEP1. 引入图标
import { faHatWizard, faHouse, faUser, faCircleUser, faCircleInfo, faRightFromBracket }
  from '@fortawesome/free-solid-svg-icons'

// NOTE: STEP2. 添加到library
library.add(
  faHatWizard, faHouse, faUser, faCircleUser, faCircleInfo, faRightFromBracket
)


export default FontAwesomeIcon