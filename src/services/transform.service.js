export class TransformService {
  static fbObjectToArray(fbData) {
    // Пробегаем по всем ключам объекта, формируем элемент массива item,  по каждому ключу key(а значит по каждому посту из сервера FB) получается один элемент - в виде объекта  
    // Добавляем в этот объект значение key с соответствующим ключом id
    return Object.keys(fbData).map(key=> {
      const item = fbData[key]
      item.id = key
      return item
    })
  }
}