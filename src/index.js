import {NavigationComponent} from './components/navigation.component'
import {CreateComponent} from './components/create.component'
import {PostComponent} from './components/posts.component'
import {FavoriteComponent} from './components/favorite.component'
import {ArhiveComponent} from './components/arhive.component'


const navigation = new NavigationComponent('navigation')

const create = new CreateComponent('create')
const posts = new PostComponent('posts')
const favorite = new FavoriteComponent('favorite')
const arhive = new ArhiveComponent('arhive')

navigation.regiserTabs([
  {name: 'create', component: create},
  {name: 'posts', component: posts},
  {name: 'favorite', component: favorite},
  {name: 'arhive', component: arhive}
])