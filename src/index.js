import {NavigationComponent} from './components/navigation.component'
import {CreateComponent} from './components/create.component'
import {PostComponent} from './components/posts.component'
import {FavoriteComponent} from './components/favorite.component'
import {ArhiveComponent} from './components/arhive.component'
import {LoaderComponent} from './components/loader.component'


const navigation = new NavigationComponent('navigation')

const loader = new LoaderComponent('loader')
const create = new CreateComponent('create')
const posts = new PostComponent('posts', {loader})
const favorite = new FavoriteComponent('favorite', {loader} )
const arhive = new ArhiveComponent('arhive')

navigation.regiserTabs([
  {name: 'create', component: create},
  {name: 'posts', component: posts},
  {name: 'favorite', component: favorite},
  {name: 'arhive', component: arhive}
])