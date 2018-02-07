import { TweenLite } from 'gsap'
var width, height, canvas, foreground, ctx, points, target
var animateHeader = true

// Main
window.addEventListener('load', function() {
  initialize()
  drawPoints()
  positionForeground()
  initAnimation()
  addListeners()
})

function initialize() {
  canvas = document.getElementById('nodes-animation')
  foreground = document.getElementById(canvas.getAttribute('data-target'))
  ctx = canvas.getContext('2d')
}

function positionForeground() {
  // Assumes the background is placed immediately adjacent to, and before the foreground in the DOM.
  canvas.width = width
  canvas.height = height
  foreground.setAttribute('style', 'margin-top: -' + foreground.offsetHeight + 'px')
}

// Event handling
function addListeners() {
  if (!('ontouchstart' in window)) {
    window.addEventListener('mousemove', mouseMove)
  }

  window.addEventListener('scroll', toggleAnimation)

  var resizeTimeout
  var resizeThrottler = function () {
    if (resizeTimeout) return
    resizeTimeout = setTimeout(function() {
      resizeTimeout = null
      drawPoints()
      positionForeground()
      initAnimation()
    }, 66) // 15fps
  }.bind(this)

  window.addEventListener("resize", resizeThrottler, false)
}

function mouseMove(e) {
  var rect = canvas.getBoundingClientRect();
  target.x = Math.floor( ( e.clientX - rect.left ) / ( rect.right - rect.left ) * canvas.width )
  target.y = Math.floor( ( e.clientY - rect.top ) / ( rect.bottom - rect.top ) * canvas.height )
}

function toggleAnimation() {
  animateHeader = isCanvasInViewport()
}

function isCanvasInViewport () {
  var rect = canvas.getBoundingClientRect()
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  )
}

// animation
function drawPoints() {
  width = foreground.clientWidth
  height = foreground.clientHeight
  target = { x: width / 2, y: height / 2 }

  var density = 10

  // Create points
  var xIncrement = width / density
  var yIncrement = height / density

  points = []
  for (var x = 0; x < width; x = x + xIncrement) {
    for (var y = 0; y < height; y = y + height/density) {
      var px = x + Math.random() * xIncrement
      var py = y + Math.random() * yIncrement
      points.push({ x: px, originX: px, y: py, originY: py })
    }
  }

  // For each point find the 5 closest points
  for (var i = 0; i < points.length; i++) {
    var closest = []
    var p1 = points[i]
    for (var j = 0; j < points.length; j++) {
      var p2 = points[j]

      if (p1 == p2) continue

      var placed = false
      for (var k = 0; k < 5; k++) {
        if (placed || closest[k] !== undefined) continue
        closest[k] = p2
        placed = true
      }

      for (var k = 0; k < 5; k++) {
        if (placed || getDistance(p1, p2) >= getDistance(p1, closest[k])) continue
        closest[k] = p2
        placed = true
      }
    }
    p1.closest = closest
  }

  // Assign a circle to each point
  var circleSize = 2 + (Math.random() * 2)
  for (var i in points) {
    var c = new Circle(points[i], circleSize, 'rgba(161, 170, 181, 1)')
    points[i].circle = c
  }
}

function initAnimation() {
  animate()
  for (var i in points) {
    shiftPoint(points[i])
  }
}

function animate() {
  if (animateHeader) {
    ctx.clearRect(0, 0, width,height)
    for (var i in points) {
      var distanceToPoint = Math.abs(getDistance(target, points[i]))
      // detect points in range
      if (distanceToPoint < 4000) {
        points[i].active = 0.3
        points[i].circle.active = 0.6
      } else if (distanceToPoint < 20000) {
        points[i].active = 0.1
        points[i].circle.active = 0.3
      } else if (distanceToPoint < 40000) {
        points[i].active = 0.02
        points[i].circle.active = 0.1
      } else {
        points[i].active = 0
        points[i].circle.active = 0
      }

      drawLines(points[i])
      points[i].circle.draw()
    }
  }
  requestAnimationFrame(animate)
}

function shiftPoint(p) {
  TweenLite.to(p, 1+1*Math.random(), {
    x: p.originX - 50 + Math.random() * 100,
    y: p.originY - 50 + Math.random() * 100,
    ease: Circ.easeInOut,
    onComplete: function() {
      shiftPoint(p)
    }
  })
}

// Canvas manipulation
function drawLines(p) {
  if (!p.active) return

  for(var i in p.closest) {
    ctx.beginPath()
    ctx.moveTo(p.x, p.y)
    ctx.lineTo(p.closest[i].x, p.closest[i].y)
    ctx.strokeStyle = 'rgba(161, 170, 181,'+ p.active+')'
    ctx.stroke()
  }
}

function Circle(pos, rad, color) {
  var _this = this;

  // constructor
  (function() {
    _this.pos = pos || null
    _this.radius = rad || null
    _this.color = color || null
  })()

  this.draw = function() {
    if (!_this.active) return

    ctx.beginPath()
    ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false)
    ctx.fillStyle = 'rgba(161, 170, 181,'+ _this.active+')'
    ctx.fill()
  }
}

function getDistance(p1, p2) {
  return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
}