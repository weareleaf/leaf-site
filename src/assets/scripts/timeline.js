import Barba from 'barba.js'

class Timeline {
  constructor(el) {
    this.component = el
    this.timelineItems = el.querySelectorAll('.timeline__item--expandable')
    this.expandedText = el.dataset.expandedText
    this.contractedText = el.dataset.contractedText
    this.expanded = !el.querySelectorAll('.timeline__item--hidden').length
  }

  renderButton() {
    const button = document.createElement('button')
    button.classList.add('timeline__button')
    button.innerHTML = this.expanded ? this.expandedText : this.contractedText
    this.component.appendChild(button)
    return button
  }

  toggleTimeline() {
    const expanded = this.expanded
    for (var i = 0; i < this.timelineItems.length; i++) {
      this.timelineItems[i].classList[expanded ? 'add' : 'remove'](
        'timeline__item--hidden'
      )
    }
    this.expanded = !expanded
  }

  handleButtonClick(button) {
    button.innerHTML = this.expanded ? this.contractedText : this.expandedText
    this.toggleTimeline()
  }

  addTimelineToggleListener() {
    if (!this.timelineItems.length) {
      return
    }

    // Hide items once we know JS is working in case JS is disabled the browser:
    this.toggleTimeline()

    const button = this.renderButton()
    button.addEventListener('click', () => this.handleButtonClick(button))
  }
}

const setup = function () {
  const component = document.querySelector('.timeline')
  if (component) {
    const timeline = new Timeline(component)
    timeline.addTimelineToggleListener()
  }
}

window.addEventListener('load', setup)
Barba.Dispatcher.on('transitionCompleted', setup)
