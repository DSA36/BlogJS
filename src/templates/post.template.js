export function renderPost(post, options = {}) {
  
  // передаем в переменную из localStorage массив... если его нет - то пустой
  const favorites = (JSON.parse(localStorage.getItem('favorites')) || [])
  // Ищем в полученном массиве id текущего поста и передаем в переменную его значение как объект. Если нет - то в переменную null
  const candidateFav = favorites.find(p => p.id ===post.id)
  
  const arhives = (JSON.parse(localStorage.getItem('arhives')) || [])
    const candidateArh = arhives.find(p => p.id ===post.id)
  
  const buttonFav = candidateFav
    // если есть в localStorage - то формируем кнопку "Удалить"
    // если нет в localStorage - то формируем кнопку "Сохранить"
    // при этом в любом случае передаем кнопке значения текущего поста как соответствующих ключей объекта
    ? `<button class ="button-round button-small button-danger" data-id="${post.id}" data-title="${post.title}" data-fav="fav">Удалить</button>`
    : `<button class ="button-round button-small button-primary" data-id="${post.id}" data-title="${post.title}" data-fav="fav">Сохранить</button>`
        
  const buttonArh = candidateArh
    ? `<button class ="button-round button-small button-danger" data-id="${post.id}" data-title="${post.title}" data-arh="arh">Из архива</button>`
    : `<button class ="button-round button-small button-primary" data-id="${post.id}" data-title="${post.title}" data-arh="arh">В архив</button>`
        
  // возвращаем код поста с вставленными значениями текущего поста
  // при этом при флаге withButton = true (для вкладки постов) - кнопки выводятся, для false (для вкладок избранное и архив) - кнопки не выводятся
   return `
    <div class="panel">
          <div class="panel-head">
            <p class="panel-title">${post.title}</p>
            ${options.withButton ? buttonArh : ''}
            <ul class="tags hide">
              <li class="tag tag-blue tag-rounded">Новость</li>
            </ul>
          </div>
          <div class="panel-body">
            <p class="multi-line">${post.fulltext}</p>
          </div>
          <div class="panel-footer w-panel-footer">
            <small>${post.date}</small>
            ${options.withButton ? buttonFav : ''}
          </div>
        </div>
  `
}