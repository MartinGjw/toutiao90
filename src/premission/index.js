import router from '../router'
import progresss from 'nprogress'
import 'nprogress/nprogress.css'

router.beforeEach(function (to, from, next) {
  progresss.start()
  if (to.path.startsWith('/home')) {
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  progresss.done()
})
