export function renderPost(post, options = {}) {
  
  const favorites = (JSON.parse(localStorage.getItem('favorites')) || [])
  const candidateFav = favorites.find(p => p.id ===post.id)
  
  const arhives = (JSON.parse(localStorage.getItem('arhives')) || [])
  const candidateArh = arhives.find(p => p.id ===post.id)
  
  const buttonFav = candidateFav
    ? `<button class ="button-round button-small button-danger" data-id="${post.id}" data-title="${post.title}" data-fav="fav">Удалить</button>`
    : `<button class ="button-round button-small button-primary" data-id="${post.id}" data-title="${post.title}" data-fav="fav">Сохранить</button>`
        
  const buttonArh = candidateArh
    ? `<button class ="button-round button-small button-danger" data-id="${post.id}" data-title="${post.title}" data-arh="arh">Из архива</button>`
    : `<button class ="button-round button-small button-primary" data-id="${post.id}" data-title="${post.title}" data-arh="arh">В архив</button>`
        
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