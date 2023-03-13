import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// NOTE: STEP1. 引入图标
import { faHatWizard, faHouse } from '@fortawesome/free-solid-svg-icons'

// NOTE: STEP2. 添加到library
library.add(
  faHatWizard, faHouse
)


export default FontAwesomeIcon