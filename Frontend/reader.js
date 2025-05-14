document.addEventListener("DOMContentLoaded", () => {
  // Canvas for ambient animations
  setupAmbientAnimations()

  // Carousel functionality
  setupCarousel()

  // Poem card interactions
  setupPoemCards()

  // Quote of the day rotation
  setupQuoteRotation()

  // Menu dropdowns
  setupMenuDropdowns()
})

// Ambient Animations
function setupAmbientAnimations() {
  const canvas = document.getElementById("ambient-canvas")
  const ctx = canvas.getContext("2d")

  // Set canvas to full window size
  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  window.addEventListener("resize", resizeCanvas)
  resizeCanvas()

  // Create particles
  const particles = []
  const particleCount = Math.min(window.innerWidth / 20, 30) // Responsive particle count

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 5 + 2,
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.5 - 0.25,
      opacity: Math.random() * 0.5 + 0.1,
      type: Math.random() > 0.5 ? "feather" : "ink",
    })
  }

  // Draw feather
  function drawFeather(x, y, size, opacity) {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(Math.PI / 4)
    ctx.globalAlpha = opacity

    // Feather stem
    ctx.beginPath()
    ctx.moveTo(0, -size)
    ctx.lineTo(0, size)
    ctx.strokeStyle = "#d4a76a"
    ctx.lineWidth = size / 10
    ctx.stroke()

    // Feather barbs
    for (let i = -size; i < size; i += size / 5) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(size / 2, i + size / 4)
      ctx.strokeStyle = "#d4a76a"
      ctx.lineWidth = size / 15
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(-size / 2, i + size / 4)
      ctx.stroke()
    }

    ctx.restore()
  }

  // Draw ink splatter
  function drawInk(x, y, size, opacity) {
    ctx.save()
    ctx.globalAlpha = opacity

    // Main drop
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fillStyle = "#5c4a36"
    ctx.fill()

    // Smaller splatters
    const splatterCount = Math.floor(Math.random() * 3) + 2
    for (let i = 0; i < splatterCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const distance = Math.random() * size * 2 + size
      const splatterX = x + Math.cos(angle) * distance
      const splatterY = y + Math.sin(angle) * distance
      const splatterSize = size * (Math.random() * 0.5 + 0.1)

      ctx.beginPath()
      ctx.arc(splatterX, splatterY, splatterSize, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.restore()
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Update and draw particles
    particles.forEach((particle) => {
      // Update position
      particle.x += particle.speedX
      particle.y += particle.speedY

      // Wrap around screen
      if (particle.x < -20) particle.x = canvas.width + 20
      if (particle.x > canvas.width + 20) particle.x = -20
      if (particle.y < -20) particle.y = canvas.height + 20
      if (particle.y > canvas.height + 20) particle.y = -20

      // Draw particle
      if (particle.type === "feather") {
        drawFeather(particle.x, particle.y, particle.size * 3, particle.opacity * 0.7)
      } else {
        drawInk(particle.x, particle.y, particle.size, particle.opacity * 0.3)
      }
    })

    requestAnimationFrame(animate)
  }

  animate()
}

// Carousel functionality
function setupCarousel() {
  const slides = document.querySelectorAll(".carousel-slide")
  const indicators = document.querySelectorAll(".indicator")
  const prevBtn = document.querySelector(".carousel-btn.prev")
  const nextBtn = document.querySelector(".carousel-btn.next")
  let currentIndex = 0
  let isAnimating = false

  function showSlide(index) {
    if (isAnimating) return
    isAnimating = true

    // Hide current slide
    slides[currentIndex].classList.remove("active")
    indicators[currentIndex].classList.remove("active")

    // Show new slide
    currentIndex = index
    slides[currentIndex].classList.add("active")
    indicators[currentIndex].classList.add("active")

    setTimeout(() => {
      isAnimating = false
    }, 500)
  }

  function nextSlide() {
    showSlide((currentIndex + 1) % slides.length)
  }

  function prevSlide() {
    showSlide((currentIndex - 1 + slides.length) % slides.length)
  }

  // Event listeners
  nextBtn.addEventListener("click", nextSlide)
  prevBtn.addEventListener("click", prevSlide)

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      showSlide(index)
    })
  })

  // Auto rotation
  setInterval(nextSlide, 8000)
}

// Poem card interactions
function setupPoemCards() {
  const expandableContents = document.querySelectorAll(".poem-content.expandable")
  const readMoreButtons = document.querySelectorAll(".read-more")
  const likeButtons = document.querySelectorAll(".like-btn")
  const bookmarkButtons = document.querySelectorAll(".bookmark-btn")

  // Expand/collapse poem content
  readMoreButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const content = expandableContents[index]

      if (content.classList.contains("expanded")) {
        content.classList.remove("expanded")
        button.textContent = "Read More"
      } else {
        content.classList.add("expanded")
        button.textContent = "Show Less"

        // Add emotion button if expanded
        if (!content.querySelector(".emotion-btn")) {
          const emotionBtn = document.createElement("button")
          emotionBtn.className = "emotion-btn"
          emotionBtn.textContent = "React with Emotion"
          content.appendChild(emotionBtn)
        }
      }
    })
  })

  // Like button functionality
  likeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("active")

      const countSpan = button.querySelector("span")
      const count = Number.parseInt(countSpan.textContent)

      if (button.classList.contains("active")) {
        countSpan.textContent = count + 1
      } else {
        countSpan.textContent = count - 1
      }
    })
  })

  // Bookmark button functionality
  bookmarkButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("active")
    })
  })
}

// Quote of the day rotation
function setupQuoteRotation() {
  const quotes = [
    {
      text: "Poetry is the spontaneous overflow of powerful feelings: it takes its origin from emotion recollected in tranquility.",
      author: "William Wordsworth",
    },
    {
      text: "Poetry is not a turning loose of emotion, but an escape from emotion; it is not the expression of personality, but an escape from personality.",
      author: "T.S. Eliot",
    },
    {
      text: "Poetry is the revelation of a feeling that the poet believes to be interior and personal which the reader recognizes as his own.",
      author: "Salvatore Quasimodo",
    },
    {
      text: "Poetry is eternal graffiti written in the heart of everyone.",
      author: "Lawrence Ferlinghetti",
    },
    {
      text: "Poetry is what gets lost in translation.",
      author: "Robert Frost",
    },
  ]

  const quoteContent = document.querySelector(".quote-content")
  const quoteText = document.querySelector(".quote")
  const quoteAuthor = document.querySelector(".quote-author")
  let currentQuoteIndex = 0

  function rotateQuote() {
    // Fade out
    quoteContent.style.opacity = "0"

    setTimeout(() => {
      // Get next quote
      currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length
      const newQuote = quotes[currentQuoteIndex]

      // Update content
      quoteText.textContent = `"${newQuote.text}"`
      quoteAuthor.textContent = `— ${newQuote.author}`

      // Fade in
      quoteContent.style.opacity = "1"
    }, 500)
  }

  // Rotate quote every 15 seconds
  setInterval(rotateQuote, 15000)
}

// Menu dropdowns
function setupMenuDropdowns() {
  const menuButtons = document.querySelectorAll(".menu-btn")

  menuButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation()
      const dropdown = button.nextElementSibling

      // Close all other dropdowns
      document.querySelectorAll(".dropdown-menu").forEach((menu) => {
        if (menu !== dropdown) {
          menu.style.display = "none"
        }
      })

      // Toggle current dropdown
      dropdown.style.display = dropdown.style.display === "block" ? "none" : "block"
    })
  })

  // Close dropdowns when clicking outside
  document.addEventListener("click", () => {
    document.querySelectorAll(".dropdown-menu").forEach((menu) => {
      menu.style.display = "none"
    })
  })
}
