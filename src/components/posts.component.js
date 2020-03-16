import { Component } from '../core/component'
import {apiService} from '../services/api.service'

export class PostComponent extends Component {
  constructor(id) {
    super(id)
  }

  async onShow() {
    const data = await apiService.fetchPosts()
    console.log('DATA', data)
  }
}