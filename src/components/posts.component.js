import { Component } from '../core/component'
import {apiService} from '../services/api.service'
import {TransformService} from '../services/transform.service'
import {renderPost} from '../templates/post.template'

export class PostComponent extends Component {
  constructor(id, {loader}) {
    super(id)
    this.loader = loader
  }

  init( ) {
    this.$el.addEventListener('click', buttonHandler.bind(this) )
  }

  async onShow() {
    this.loader.show()
    const fbData = await apiService.fetchPosts()
    const posts = TransformService.fbObjectToArray(fbData)
    const html = posts.map(post => renderPost(post, {withButton: true}))
    this.loader.hide()
    this.$el.insertAdjacentHTML('afterbegin', html.join(' '))
  }

  onHide() {
    this.$el.innerHTML = ''
  }
}

function buttonHandler(event) {
  const $el = event.target
  const id = $el.dataset.id
  const title = $el.dataset.title
  const arh = $el.dataset.arh
  const fav = $el.dataset.fav
    
  if (fav) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || []
    const candidateFav = favorites.find(p => p.id === id)
    
    if (candidateFav) {
      // удалить
      $el.textContent = 'Сохранить'
      $el.classList.add('button-primary')
      $el.classList.remove('button-danger')
      favorites = favorites.filter(p => p.id !== id)
    } else {
      // добавить
      $el.textContent = 'Удалить'
      $el.classList.add('button-danger')
      $el.classList.remove('button-primary')
      favorites.push({id, title})
    }

    localStorage.setItem('favorites', JSON.stringify(favorites))
  }

  if (arh) {
    let arhives = JSON.parse(localStorage.getItem('arhives')) || []
    const candidateArh = arhives.find(p => p.id === id)
    console.log('candidateArh', candidateArh)
    
    if (candidateArh) {
      // удалить
      $el.textContent = 'В архив'
      $el.classList.add('button-primary')
      $el.classList.remove('button-danger')
      arhives = arhives.filter(p => p.id !== id)
    } else {
      // добавить
      $el.textContent = 'Из архива'
      $el.classList.add('button-danger')
      $el.classList.remove('button-primary')
      arhives.push({id, title})
    }

    localStorage.setItem('arhives', JSON.stringify(arhives))
  }  
   
} 