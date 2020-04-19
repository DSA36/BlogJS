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
    // инициализируем через клик на текущем элементе и связываем локальную функцию с контекстом
  }

  async onShow() {
    // показ лоадера (индикатор загрузки)
    this.loader.show()
    // фетчим посты в виде объектов с сервера
    const fbData = await apiService.fetchPosts()
    // переводим вид постов к массиву 
    const posts = TransformService.fbObjectToArray(fbData)
    // формируем код html как массив кодов постов, вызывая импортируемую функцию рендеринга постов (возврат кода поста) для каждого поста
    // флаг withButton - для видимости кнопки "Сохранить - Удалить" для вкладки постов
    const html = posts.map(post => renderPost(post, {withButton: true, withArhButton: true}))
    // скрытие лоадера
    this.loader.hide()
    // выполняем полученный код html, склеивая массив через пробел
    this.$el.insertAdjacentHTML('afterbegin', html.join(' '))
  }

  onHide() {
    // очищаем текущий элемент
    this.$el.innerHTML = ''
  }
}

function buttonHandler(event) {
  // устанавливаем кликнутый объект как текущий элемент и присваиваем значения (data) этого объекта текущим переменным для дальнейшей логики
  const $el = event.target
  const id = $el.dataset.id
  const title = $el.dataset.title
  const arh = $el.dataset.arh
  const fav = $el.dataset.fav
    
  if (fav) {
    // если клик по кнопке "избранного"
    // получаем массив 'favorites' из localStorage или пустой массив
    let favorites = JSON.parse(localStorage.getItem('favorites')) || []
    // получаем в переменную значение из массива, если id кликнутого поста присутствует в массиве и null, если его там нет 
    const candidateFav = favorites.find(p => p.id === id)
    
    if (candidateFav) {
      // значит id поста присутствует в localStorage в массиве 'favorites'
      // и необходимо удалить пост из избранного и из массива
      
      // при этом меняем вид и содержание кнопки:
      $el.textContent = 'Сохранить'
      $el.classList.add('button-primary')
      $el.classList.remove('button-danger')

      // получаем новый массив, исключая из него id текущего поста
      favorites = favorites.filter(p => p.id !== id)
    } else {
      // добавить
      $el.textContent = 'Удалить'
      $el.classList.add('button-danger')
      $el.classList.remove('button-primary')
      // добавляем в массив объект с данными кликнутого поста
      favorites.push({id, title})
    }

    // передаем в localStorage полученный массив 'favorites'
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }

  if (arh) {
    // если клик по кнопке "архив"
    // получаем массив 'arhives' из localStorage или пустой массив
    let arhives = JSON.parse(localStorage.getItem('arhives')) || []
    // получаем в переменную значение из массива, если id кликнутого поста присутствует в массиве и null, если его там нет
    const candidateArh = arhives.find(p => p.id === id)
        
    if (candidateArh) {
      // значит id поста присутствует в localStorage в массиве 'arhives'
      // и необходимо удалить пост из архива и из массива
      
      // при этом меняем вид и содержание кнопки
      $el.textContent = 'В архив'
      $el.classList.add('button-primary')
      $el.classList.remove('button-danger')
      
      // получаем новый массив, исключая из него id текущего поста
      arhives = arhives.filter(p => p.id !== id)
    } else {
      // добавить
      $el.textContent = 'Из архива'
      $el.classList.add('button-danger')
      $el.classList.remove('button-primary')
      
      // добавляем в массив объект с данными кликнутого поста
      arhives.push({id, title})
    }

    // передаем в localStorage полученный массив 'arhives'
    localStorage.setItem('arhives', JSON.stringify(arhives))
  }  
   
} 