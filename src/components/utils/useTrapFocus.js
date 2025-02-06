import { ref } from 'vue'

const firstFocusableElement = ref()
const lastFocusableElement = ref()

const focusableElementList =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

const handleTabKey = (e) => {
  if (e.key === 'Tab') {
    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstFocusableElement.value) {
        e.preventDefault()
        lastFocusableElement.value.focus()
      }
    } else {
      // Tab
      if (document.activeElement === lastFocusableElement.value) {
        e.preventDefault()
        firstFocusableElement.value.focus()
      }
    }
  }
}

const handleEscapeKey = (e, closeModalFn) => {
  if (e.key === 'Escape') {
    closeModalFn()
  }
}

const trapFocus = async (modalRef) => {
  const focusableElements = await modalRef.value.querySelectorAll(focusableElementList)
  firstFocusableElement.value = focusableElements[0]
  lastFocusableElement.value = focusableElements[focusableElements.length - 1]

  if (focusableElementList) {
    firstFocusableElement.value.focus()
  } else {
    modalRef.value.focus()
  }
}

export const useTrapFocus = () => {
  return {
    handleTabKey,
    handleEscapeKey,
    trapFocus,
  }
}
