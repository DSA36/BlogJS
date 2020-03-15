import {Component} from '../core/component'
import {Form} from '../core/form'
import {Validators} from '../core/validators'

export class CreateComponent extends Component {
  constructor(id) {
    super(id) 

    //this.form = null
  }

  init() {
    this.$el.addEventListener('submit', submitHandler.bind(this))

    this.form = new Form(this.$el, {
      title: [Validators.required],
      fulltext: [Validators.required, Validators.minLength(10)]
    }) 
  }
}

function submitHandler(event) {
  event.preventDefault()

  if (this.form.isValid()) {
    const formData = {
      date: new Date().toLocaleDateString(),
      //type: this.$el.type.value
      ...this.form.value()
    }

    this.form.clear()
    console.log('submit', formData)
  } 

  
}