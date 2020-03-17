import { Component } from '../core/component'
import {apiService} from '../services/api.service'
import {TransformService} from '../services/transform.service'

export class PostComponent extends Component {
  constructor(id) {
    super(id)
  }

  async onShow() {
    const fbData = await apiService.fetchPosts()
    const posts = TransformService.fbObjectToArray(fbData)
    console.log(posts)
  }
}