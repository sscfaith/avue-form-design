export default {
  props: ['data'],
  watch: {
    'data.required'(val) {
      if (val) this.validator.required = { required: true, message: `${this.data.label}必须填写` }
      else this.validator.required = null
      this.generateRule()
    },
    'data.pattern'(val) {
      if (val) this.validator.pattern = { pattern: new RegExp(val), message: `${this.data.label}格式不匹配` }
      else this.validator.pattern = null
      this.generateRule()
    }
  },
  data() {
    return {
      validator: {
        type: null,
        required: null,
        pattern: null,
        length: null
      }
    }
  },
  methods: {
    generateRule() {
      const rules = []
      Object.keys(this.validator).forEach(key => {
        if (this.validator[key]) rules.push(this.validator[key])
      })
      if (rules.length == 0) delete this.data.rules
      else this.data.rules = rules
    },
  },
}