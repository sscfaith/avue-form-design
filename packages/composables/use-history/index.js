import beautifier from '../../utils/json-beautifier'
import { reactive, watch, getCurrentInstance } from "vue"

export default function () {
  const { proxy } = getCurrentInstance()
  const { deepClone } = proxy

  const historySteps = reactive({
    index: 0,
    maxStep: 20,
    steps: [],
    storage: false
  })

  watch(historySteps, (val) => {
    if (val.storage) localStorage.setItem("avue-form-history", beautifier(val))
    else localStorage.removeItem("avue-form-history")
  }, { deep: true })

  const initHistory = (data) => {
    if (data.storage) {
      const history = localStorage.getItem("avue-form-history")
      if (history) {
        Object.assign(historySteps, eval("(" + history + ")"))
        const { index, steps } = historySteps
        return reactive(deepClone(steps[index]))
      }
    }

    Object.assign(historySteps, data)
    const { index, steps } = historySteps
    return reactive(deepClone(steps[index]))
  }

  const handleHistoryChange = (data) => {
    if (historySteps.index == historySteps.maxStep - 1) historySteps.steps.shift()
    else historySteps.index++
    historySteps.steps[historySteps.index] = deepClone(data)

    if (historySteps.index < historySteps.steps.length - 1) {
      historySteps.steps = historySteps.steps.slice(0, historySteps.index + 1)
    }
  }

  const handleUndo = () => {
    if (historySteps.index != 0) historySteps.index--
    return deepClone(historySteps.steps[historySteps.index])
  }

  const handleRedo = () => {
    if (historySteps.index != (historySteps.steps.length - 1)) historySteps.index++
    return deepClone(historySteps.steps[historySteps.index])
  }

  return {
    historySteps,
    initHistory,
    handleHistoryChange,
    handleUndo,
    handleRedo
  }
}