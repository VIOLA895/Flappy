// Get DOM elements
const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")
const startButton = document.getElementById("startButton")
const restartButton = document.getElementById("restartButton")
const difficultySelect = document.getElementById("difficulty")
const currentScoreElement = document.getElementById("currentScore")
const highScoreElement = document.getElementById("highScore")
const startScreen = document.getElementById("startScreen")
const gameOverScreen = document.getElementById("gameOverScreen")
const finalScoreElement = document.getElementById("finalScore")
const finalHighScoreElement = document.getElementById("finalHighScore")

// Game state
let gameState = "START" // START, PLAYING, GAME_OVER
let score = 0
let highScore = 0
let animationFrameId

// Define difficulty levels
const levels = {
  easy: { pipeSpeed: 2, pipeDistance: 300, pipeGap: 150 },
  medium: { pipeSpeed: 3, pipeDistance: 250, pipeGap: 130 },
  hard: { pipeSpeed: 4, pipeDistance: 200, pipeGap: 110 },
}

// Game variables
let difficulty = "easy"
let { pipeSpeed, pipeDistance, pipeGap } = levels[difficulty]
let pipes = []
const pipeWidth = 60

// Bird object
const bird = {
  x: 80,
  y: 0, // Will be set when canvas is resized
  width: 40,
  height: 30,
  gravity: 0.4,
  lift: -7,
  velocity: 0,
  rotation: 0,
}

// Load images
const birdImage = new Image()
birdImage.src =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="30" viewBox="0 0 40 30"><rect width="40" height="30" fill="%23FFD700"/><circle cx="30" cy="10" r="5" fill="%23FF0000"/><polygon points="40,15 30,20 40,25" fill="%23FF6600"/></svg>'

const backgroundImage = new Image()
backgroundImage.src =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" fill="%2387CEEB"/><rect width="800" height="100" y="500" fill="%2332CD32"/><circle cx="700" cy="100" r="40" fill="%23FFFF00"/></svg>'

// Load sounds
const jumpSound = new Audio()
jumpSound.src = "data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU..." // Replace with actual base64 audio

const scoreSound = new Audio()
scoreSound.src = "data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU..." // Replace with actual base64 audio

const gameOverSound = new Audio()
gameOverSound.src = "data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU..." // Replace with actual base64 audio

// Function to resize the canvas
function resizeCanvas() {
  canvas.width = Math.min(window.innerWidth - 40, 800)
  canvas.height = Math.min(window.innerHeight - 200, 600)
  bird.y = canvas.height / 2 // Reset bird position when canvas is resized
}

// Initialize canvas size
resizeCanvas()

// Draw functions
function drawBackground() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)
}

function drawBird() {
  ctx.save()
  ctx.translate(bird.x + bird.width / 2, bird.y + bird.height / 2)
  bird.rotation = Math.min(Math.PI / 4, Math.max(-Math.PI / 4, bird.velocity * 0.1))
  ctx.rotate(bird.rotation)
  ctx.drawImage(birdImage, -bird.width / 2, -bird.height / 2, bird.width, bird.height)
  ctx.restore()
}

function drawPipes() {
  ctx.fillStyle = "#2ecc71"
  pipes.forEach((pipe) => {
    // Top pipe
    ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top)
    // Bottom pipe
    ctx.fillRect(pipe.x, canvas.height - pipe.bottom, pipeWidth, pipe.bottom)

    // Pipe caps
    ctx.fillStyle = "#27ae60"
    ctx.fillRect(pipe.x - 3, pipe.top - 15, pipeWidth + 6, 15)
    ctx.fillRect(pipe.x - 3, canvas.height - pipe.bottom, pipeWidth + 6, 15)
    ctx.fillStyle = "#2ecc71"
  })
}

function drawScore() {
  ctx.fillStyle = "white"
  ctx.strokeStyle = "black"
  ctx.lineWidth = 2
  ctx.font = "30px Arial"
  ctx.textAlign = "center"
  ctx.strokeText(`Score: ${score}`, canvas.width / 2, 50)
  ctx.fillText(`Score: ${score}`, canvas.width / 2, 50)
}

// Game logic
function updatePipes() {
  if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - pipeDistance) {
    const topPipeHeight = Math.random() * (canvas.height - pipeGap - 100) + 50
    const bottomPipeHeight = canvas.height - topPipeHeight - pipeGap
    pipes.push({
      x: canvas.width,
      top: topPipeHeight,
      bottom: bottomPipeHeight,
      counted: false,
    })
  }

  pipes.forEach((pipe) => {
    pipe.x -= pipeSpeed

    // Score when passing a pipe
    if (!pipe.counted && pipe.x + pipeWidth < bird.x) {
      pipe.counted = true
      score++
      updateScore()
      scoreSound.play()
    }
  })

  // Remove pipes that are off screen
  if (pipes[0] && pipes[0].x < -pipeWidth) {
    pipes.shift()
  }
}

function checkCollision() {
  // Check if bird hits the ground or ceiling
  if (bird.y + bird.height > canvas.height || bird.y < 0) {
    return true
  }

  // Check if bird hits any pipes
  return pipes.some((pipe) => {
    return (
      bird.x < pipe.x + pipeWidth &&
      bird.x + bird.width > pipe.x &&
      (bird.y < pipe.top || bird.y + bird.height > canvas.height - pipe.bottom)
    )
  })
}

function updateScore() {
  currentScoreElement.textContent = score
  if (score > highScore) {
    highScore = score
    highScoreElement.textContent = highScore
  }
}

function gameLoop() {
  if (gameState !== "PLAYING") return

  bird.velocity += bird.gravity
  bird.y += bird.velocity

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawBackground()
  drawPipes()
  drawBird()
  drawScore()
  updatePipes()

  if (checkCollision()) {
    gameOverSound.play()
    endGame()
  } else {
    animationFrameId = requestAnimationFrame(gameLoop)
  }
}

// Game state functions
function startGame() {
  // Reset game variables
  bird.y = canvas.height / 2
  bird.velocity = 0
  pipes = []
  score = 0
  updateScore()

  // Update difficulty settings
  difficulty = difficultySelect.value
  const selectedLevel = levels[difficulty]
  pipeSpeed = selectedLevel.pipeSpeed
  pipeDistance = selectedLevel.pipeDistance
  pipeGap = selectedLevel.pipeGap

  // Update UI
  startButton.classList.add("hidden")
  restartButton.classList.add("hidden")
  startScreen.classList.add("hidden")
  gameOverScreen.classList.add("hidden")

  // Start game
  gameState = "PLAYING"
  animationFrameId = requestAnimationFrame(gameLoop)
}

function endGame() {
  gameState = "GAME_OVER"
  cancelAnimationFrame(animationFrameId)

  // Update UI
  restartButton.classList.remove("hidden")
  gameOverScreen.classList.remove("hidden")
  finalScoreElement.textContent = `Score: ${score}`
  finalHighScoreElement.textContent = `High Score: ${highScore}`
}

function handleJump() {
  if (gameState === "PLAYING") {
    bird.velocity = bird.lift
    jumpSound.play()
  }
}

// Event listeners
window.addEventListener("resize", resizeCanvas)

startButton.addEventListener("click", startGame)
restartButton.addEventListener("click", () => {
  gameState = "START"
  startScreen.classList.remove("hidden")
  gameOverScreen.classList.add("hidden")
  restartButton.classList.add("hidden")
  startButton.classList.remove("hidden")
})

// Handle keyboard input
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.key === " ") {
    e.preventDefault()
    if (gameState === "START") {
      startGame()
    } else if (gameState === "PLAYING") {
      handleJump()
    } else if (gameState === "GAME_OVER") {
      gameState = "START"
      startScreen.classList.remove("hidden")
      gameOverScreen.classList.add("hidden")
      restartButton.classList.add("hidden")
      startButton.classList.remove("hidden")
    }
  }
})

// Handle mouse and touch input
canvas.addEventListener("click", () => {
  if (gameState === "PLAYING") {
    handleJump()
  }
})

canvas.addEventListener("touchstart", (e) => {
  e.preventDefault()
  if (gameState === "PLAYING") {
    handleJump()
  }
})

// Start screen button
startScreen.querySelector("button").addEventListener("click", startGame)

// Game over screen button
gameOverScreen.querySelector("button").addEventListener("click", () => {
  gameState = "START"
  startScreen.classList.remove("hidden")
  gameOverScreen.classList.add("hidden")
  restartButton.classList.add("hidden")
  startButton.classList.remove("hidden")
})

// Disable difficulty selection during gameplay
difficultySelect.addEventListener("change", () => {
  difficulty = difficultySelect.value
})

// Initial setup
window.onload = () => {
  resizeCanvas()
  drawBackground()
}
