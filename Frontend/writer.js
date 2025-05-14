const themeToggle = document.querySelector(".theme-toggle")
const body = document.body

if (localStorage.getItem("theme") === "dark") {
body.classList.add("dark-theme")
}

themeToggle.addEventListener("click", () => {
body.classList.toggle("dark-theme")

if (body.classList.contains("dark-theme")) {
localStorage.setItem("theme", "dark")
} else {
localStorage.setItem("theme", "light")
}
})

// Mobile Menu
const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
const navLinks = document.querySelector(".nav-links")

mobileMenuBtn.addEventListener("click", () => {
mobileMenuBtn.classList.toggle("active")

if (mobileMenuBtn.classList.contains("active")) {
navLinks.style.display = "flex"
navLinks.style.flexDirection = "column"
navLinks.style.position = "absolute"
navLinks.style.top = "70px"
navLinks.style.left = "0"
navLinks.style.width = "100%"
navLinks.style.backgroundColor = "var(--bg-color)"
navLinks.style.padding = "20px"
navLinks.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)"
navLinks.style.zIndex = "99"
} else {
navLinks.style.display = "none"
}
})

// Resize mobile menu
window.addEventListener("resize", () => {
if (window.innerWidth > 768) {
navLinks.style = ""
}
})

const booksCarousel = document.querySelector(".books-carousel")
const prevBtn = document.querySelector(".prev-btn")
const nextBtn = document.querySelector(".next-btn")

let scrollAmount = 0
const scrollStep = 300

nextBtn.addEventListener("click", () => {
scrollAmount += scrollStep
if (scrollAmount > booksCarousel.scrollWidth - booksCarousel.clientWidth) {
scrollAmount = booksCarousel.scrollWidth - booksCarousel.clientWidth
}
booksCarousel.scrollTo({
left: scrollAmount,
behavior: "smooth",
})
})

prevBtn.addEventListener("click", () => {
scrollAmount -= scrollStep
if (scrollAmount < 0) {
scrollAmount = 0
}
booksCarousel.scrollTo({
left: scrollAmount,
behavior: "smooth",
})
})

function initBookshelf() {
const canvas = document.getElementById("bookshelf-canvas")

if (!canvas) return

const THREE = window.THREE

if (typeof THREE === "undefined") {
console.error("Three.js library not found. Make sure it is included in your HTML.")
return
}

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xf9f7fd)

const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
camera.position.z = 5

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
renderer.setSize(canvas.clientWidth, canvas.clientHeight)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
directionalLight.position.set(1, 1, 1)
scene.add(directionalLight)

const shelfGeometry = new THREE.BoxGeometry(4, 0.1, 1)
const shelfMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 })
const shelf = new THREE.Mesh(shelfGeometry, shelfMaterial)
scene.add(shelf)

const bookColors = [0xff6b6b, 0x48dbfb, 0x1dd1a1, 0xfeca57, 0xf368e0]
const books = []

for (let i = 0; i < 5; i++) {
const bookGeometry = new THREE.BoxGeometry(0.5, 0.8, 0.8)
const bookMaterial = new THREE.MeshStandardMaterial({ color: bookColors[i] })
const book = new THREE.Mesh(bookGeometry, bookMaterial)
book.position.x = -1.5 + i * 0.7
book.position.y = 0.45
scene.add(book)
books.push(book)
}

// Animation
function animate() {
requestAnimationFrame(animate)

books.forEach((book, index) => {
book.rotation.y = Math.sin(Date.now() * 0.001 + index) * 0.1
book.position.y = 0.45 + Math.sin(Date.now() * 0.002 + index) * 0.05
})

renderer.render(scene, camera)
}

// windows_resize
window.addEventListener("resize", () => {
camera.aspect = canvas.clientWidth / canvas.clientHeight
camera.updateProjectionMatrix()
renderer.setSize(canvas.clientWidth, canvas.clientHeight)
})

animate()
}

window.addEventListener("load", initBookshelf)

const animatedText = document.querySelector(".animated-text")
if (animatedText) {
const text = animatedText.textContent
animatedText.innerHTML = ""

for (let i = 0; i < text.length; i++) {
const span = document.createElement("span")
span.textContent = text[i]
span.style.animationDelay = `${i * 0.1}s`
animatedText.appendChild(span)
}
}

const observerOptions = {
threshold: 0.1,
rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
entries.forEach((entry) => {
if (entry.isIntersecting) {
entry.target.classList.add("animate")
observer.unobserve(entry.target)
}
})
}, observerOptions)

document.querySelectorAll(".feature-card, .community-card, .book-card, .quote-card").forEach((el) => {
observer.observe(el)
})

document.querySelectorAll(".feature-card, .community-card, .book-card, .quote-card").forEach((el, index) => {
el.style.opacity = "0"
el.style.transform = "translateY(30px)"
el.style.transition = "opacity 0.5s ease, transform 0.5s ease"
el.style.transitionDelay = `${index * 0.1}s`
})

document.addEventListener("DOMContentLoaded", () => {
document.head.insertAdjacentHTML(
"beforeend",
`
  <style>
      .animate {
          opacity: 1 !important;
          transform: translateY(0) !important;
      }
  </style>
`,
)
})

document.addEventListener("DOMContentLoaded", () => {
const poemCards = document.querySelectorAll(".poem-card")
const textWaves = document.querySelectorAll(".text-wave")
const rouletteBtn = document.querySelector(".roulette-btn")
const floatingQuill = document.querySelector(".floating-quill")
const mobileCompose = document.querySelector(".mobile-compose")
const feedFilters = document.querySelectorAll(".feed-filters button")
const followBtns = document.querySelectorAll(".follow-btn")
const poemActions = document.querySelectorAll(".poem-actions button")

textWaves.forEach((wave) => {
const randomSpeed = Math.random() * 5 + 15 
wave.style.animationDuration = `${randomSpeed}s`
})

poemCards.forEach((card) => {
const poemContent = card.querySelector(".poem-content")
if (poemContent.offsetHeight > 200) {
const readMoreBtn = document.createElement("button")
readMoreBtn.classList.add("read-more")
readMoreBtn.innerHTML = 'Read more <i class="fas fa-chevron-down"></i>'
readMoreBtn.style.display = "block"
readMoreBtn.style.margin = "0 auto 1rem"
readMoreBtn.style.padding = "0.5rem 1rem"
readMoreBtn.style.borderRadius = "20px"
readMoreBtn.style.backgroundColor = "rgba(212, 165, 165, 0.1)"
readMoreBtn.style.color = "var(--dusty-rose)"
readMoreBtn.style.fontSize = "0.9rem"

poemContent.style.maxHeight = "200px"
poemContent.style.overflow = "hidden"
poemContent.style.transition = "max-height 0.5s ease"

card.querySelector(".poem-actions").before(readMoreBtn)

readMoreBtn.addEventListener("click", () => {
  if (poemContent.style.maxHeight === "200px") {
    poemContent.style.maxHeight = poemContent.scrollHeight + "px"
    readMoreBtn.innerHTML = 'Read less <i class="fas fa-chevron-up"></i>'
  } else {
    poemContent.style.maxHeight = "200px"
    readMoreBtn.innerHTML = 'Read more <i class="fas fa-chevron-down"></i>'
  }
})
}
})

poemCards.forEach((card) => {
const poemText = card.querySelectorAll(".poem-content p")

card.addEventListener("mouseenter", () => {
const randomParagraph = poemText[Math.floor(Math.random() * poemText.length)]
if (randomParagraph) {
  randomParagraph.classList.add("typing-cursor")
}
})

card.addEventListener("mouseleave", () => {
poemText.forEach((p) => p.classList.remove("typing-cursor"))
})
})

// Feed filter button
feedFilters.forEach((button) => {
button.addEventListener("click", () => {
feedFilters.forEach((btn) => btn.classList.remove("active"))
button.classList.add("active")
})
})

// Follow button
followBtns.forEach((button) => {
button.addEventListener("click", () => {
if (button.textContent === "Follow") {
  button.textContent = "Following"
  button.style.backgroundColor = "var(--dusty-rose)"
  button.style.color = "white"
} else {
  button.textContent = "Follow"
  button.style.backgroundColor = "transparent"
  button.style.color = "var(--dusty-rose)"
}
})
})

poemActions.forEach((button) => {
button.addEventListener("click", () => {
const icon = button.querySelector("i")

if (icon.classList.contains("far")) {
  icon.classList.remove("far")
  icon.classList.add("fas")

  if (icon.classList.contains("fa-heart")) {
    const countSpan = button.querySelector("span")
    if (countSpan) {
      countSpan.textContent = (Number.parseInt(countSpan.textContent) + 1).toString()
    }
  }
} else {
  icon.classList.remove("fas")
  icon.classList.add("far")

  if (icon.classList.contains("fa-heart")) {
    const countSpan = button.querySelector("span")
    if (countSpan) {
      countSpan.textContent = (Number.parseInt(countSpan.textContent) - 1).toString()
    }
  }
}
})
})

if (rouletteBtn) {
rouletteBtn.addEventListener("click", () => {
rouletteBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Finding poem...'

setTimeout(() => {
  const randomIndex = Math.floor(Math.random() * poemCards.length)
  const randomCard = poemCards[randomIndex]

  randomCard.scrollIntoView({ behavior: "smooth", block: "center" })
  randomCard.classList.add("highlight-card")

  setTimeout(() => {
    randomCard.classList.remove("highlight-card")
    rouletteBtn.innerHTML = '<i class="fas fa-random"></i> Poem Roulette'
  }, 2000)
}, 1000)
})
}

const composeActions = [floatingQuill, mobileCompose]
composeActions.forEach((button) => {
if (button) {
button.addEventListener("click", () => {
  // Simulate opening a compose modal
  const modal = document.createElement("div")
  modal.classList.add("compose-modal")

  modal.innerHTML = `
    <div class="compose-container">
      <div class="compose-header">
        <h3>Create New Poem</h3>
        <button class="close-modal"><i class="fas fa-times"></i></button>
      </div>
      <div class="compose-body">
        <input type="text" placeholder="Title of your poem" class="poem-title-input">
        <textarea placeholder="Write your verse here..." class="poem-content-input"></textarea>
        <div class="compose-options">
          <select class="theme-select">
            <option value="default">Default Theme</option>
            <option value="dark">Dark Theme</option>
            <option value="vintage">Vintage Theme</option>
            <option value="minimal">Minimal Theme</option>
            <option value="ink-blot">Ink Blot Theme</option>
          </select>
          <button class="add-tags-btn"><i class="fas fa-hashtag"></i> Add Tags</button>
        </div>
      </div>
      <div class="compose-footer">
        <button class="save-draft-btn">Save Draft</button>
        <button class="publish-btn">Publish</button>
      </div>
    </div>
  `

  document.body.appendChild(modal)

  const style = document.createElement("style")
  style.textContent = `
    .compose-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: fadeIn 0.3s ease;
    }
    
    .compose-container {
      width: 90%;
      max-width: 600px;
      background-color: white;
      border-radius: var(--border-radius-md);
      overflow: hidden;
      box-shadow: var(--shadow-strong);
      animation: slideUp 0.3s ease;
    }
    
    .compose-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid rgba(166, 138, 108, 0.2);
    }
    
    .compose-header h3 {
      font-family: var(--font-poetry);
      font-size: 1.3rem;
      color: var(--dark-text);
    }
    
    .close-modal {
      background: none;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
      color: var(--light-text);
    }
    
    .compose-body {
      padding: 1rem;
    }
    
    .poem-title-input {
      width: 100%;
      padding: 0.8rem;
      margin-bottom: 1rem;
      border: 1px solid rgba(166, 138, 108, 0.2);
      border-radius: var(--border-radius-sm);
      font-family: var(--font-poetry);
      font-size: 1.2rem;
      color: var(--dark-text);
    }
    
    .poem-content-input {
      width: 100%;
      height: 200px;
      padding: 0.8rem;
      margin-bottom: 1rem;
      border: 1px solid rgba(166, 138, 108, 0.2);
      border-radius: var(--border-radius-sm);
      font-family: var(--font-poetry);
      font-size: 1.1rem;
      resize: vertical;
      color: var(--dark-text);
    }
    
    .compose-options {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    
    .theme-select {
      padding: 0.5rem;
      border: 1px solid rgba(166, 138, 108, 0.2);
      border-radius: var(--border-radius-sm);
      color: var(--dark-text);
      background-color: white;
    }
    
    .add-tags-btn {
      padding: 0.5rem 1rem;
      background-color: rgba(212, 165, 165, 0.1);
      border-radius: var(--border-radius-sm);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--dusty-rose);
    }
    
    .compose-footer {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      padding: 1rem;
      border-top: 1px solid rgba(166, 138, 108, 0.2);
    }
    
    .save-draft-btn {
      padding: 0.7rem 1.5rem;
      background-color: rgba(212, 165, 165, 0.1);
      border-radius: var(--border-radius-sm);
      color: var(--dusty-rose);
    }
    
    .publish-btn {
      padding: 0.7rem 1.5rem;
      background: linear-gradient(135deg, var(--dusty-rose), var(--dusty-rose-dark));
      color: white;
      border-radius: var(--border-radius-sm);
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideUp {
      from { transform: translateY(50px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `

  document.head.appendChild(style)
  const closeBtn = modal.querySelector(".close-modal")
  closeBtn.addEventListener("click", () => {
    modal.style.animation = "fadeOut 0.3s ease forwards"

    setTimeout(() => {
      document.body.removeChild(modal)
    }, 300)
  })

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeBtn.click()
    }
  })
})
}
})

const cursorStyle = document.createElement("style")
cursorStyle.textContent = `
.typing-cursor {
position: relative;
}

.typing-cursor::after {
content: '|';
position: absolute;
right: -10px;
top: 0;
color: var(--dusty-rose);
animation: blink 1s step-end infinite;
}

@keyframes blink {
from, to { opacity: 1; }
50% { opacity: 0; }
}

.highlight-card {
animation: highlight 2s ease;
}

@keyframes highlight {
0%, 100% { box-shadow: var(--shadow-medium); }
50% { box-shadow: 0 0 30px var(--dusty-rose); }
}
`

document.head.appendChild(cursorStyle)

// feather animation 
const addFeatherEffects = () => {
// floating feather
const createFeather = () => {
const feather = document.createElement("div")
feather.classList.add("floating-feather")

const size = Math.random() * 20 + 10
feather.style.width = `${size}px`
feather.style.height = `${size * 3}px`

feather.style.left = `${Math.random() * 100}vw`
feather.style.top = `-${size}px`

// feather icon
feather.innerHTML = '<i class="fas fa-feather"></i>'

const hue = Math.random() * 30 + 20 
feather.style.color = `hsla(${hue}, 70%, 80%, 0.2)`
feather.style.transform = `rotate(${Math.random() * 360}deg)`

document.body.appendChild(feather)

const animationDuration = Math.random() * 10 + 10
feather.style.animation = `featherFall ${animationDuration}s linear forwards`

setTimeout(() => {
  document.body.removeChild(feather)
}, animationDuration * 1000)
}

const featherStyle = document.createElement("style")
featherStyle.textContent = `
.floating-feather {
  position: fixed;
  z-index: -1;
  opacity: 0.5;
  pointer-events: none;
}

@keyframes featherFall {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.2;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}
`

document.head.appendChild(featherStyle)

setInterval(createFeather, 3000)
}

addFeatherEffects()

const handleResponsiveNav = () => {
const width = window.innerWidth

if (width <= 768) {
document.body.classList.add("mobile-view")
} else {
document.body.classList.remove("mobile-view")
}
}
handleResponsiveNav()
window.addEventListener("resize", handleResponsiveNav)
})

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
anchor.addEventListener("click", function (e) {
e.preventDefault()

const target = document.querySelector(this.getAttribute("href"))
if (target) {
target.scrollIntoView({
  behavior: "smooth",
  block: "start",
})
}
})
})

const addFeatherEffects = () => {
const createFeather = () => {
const feather = document.createElement("div")
feather.classList.add("floating-feather")

const size = Math.random() * 20 + 10
feather.style.width = `${size}px`
feather.style.height = `${size * 3}px`

feather.style.left = `${Math.random() * 100}vw`
feather.style.top = `-${size}px`

feather.innerHTML = '<i class="fas fa-feather"></i>'

const hue = Math.random() * 60 + 240 // Purple-ish hues
feather.style.color = `hsla(${hue}, 70%, 80%, 0.2)`
feather.style.transform = `rotate(${Math.random() * 360}deg)`

document.body.appendChild(feather)

const animationDuration = Math.random() * 10 + 10
feather.style.animation = `featherFall ${animationDuration}s linear forwards`

setTimeout(() => {
document.body.removeChild(feather)
}, animationDuration * 1000)
}

const featherStyle = document.createElement("style")
featherStyle.textContent = `
  .floating-feather {
      position: fixed;
      z-index: -1;
      opacity: 0.5;
      pointer-events: none;
  }
  
  @keyframes featherFall {
      0% {
          transform: translateY(0) rotate(0deg);
          opacity: 0;
      }
      10% {
          opacity: 0.2;
      }
      100% {
          transform: translateY(100vh) rotate(360deg);
          opacity: 0;
      }
  }
`

document.head.appendChild(featherStyle)
setInterval(createFeather, 3000)
}
addFeatherEffects()


