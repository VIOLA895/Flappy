# Flappy
### Flappy Bird Game

A classic Flappy Bird game implementation using pure HTML5, CSS3, and JavaScript. This project recreates the addictive gameplay of the original Flappy Bird with additional features like difficulty levels, score tracking, and responsive design.





## 📝 Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [How to Play](#how-to-play)
- [Game Mechanics](#game-mechanics)
- [Controls](#controls)
- [Customization](#customization)
- [Project Structure](#project-structure)
- [Future Improvements](#future-improvements)
- [License](#license)


## 🎮 Demo

Live Demo: https://flappy-hazel.vercel.app/

## ✨ Features

- **Classic Gameplay**: Navigate the bird through pipes without hitting them
- **Multiple Difficulty Levels**: Easy, Medium, and Hard modes
- **Score Tracking**: Current score and high score display
- **Responsive Design**: Works on desktop and mobile devices
- **Game States**: Start screen, gameplay, and game over screen
- **Visual Effects**: Bird rotation based on velocity, styled pipes
- **Sound Effects**: Jump, score, and game over sounds
- **Touch Support**: Play on mobile with touch controls


## 🛠️ Technologies Used

- HTML5 Canvas
- CSS3
- Vanilla JavaScript
- Responsive Design
- Local Storage (for high scores)


## 📥 Installation

No build tools or dependencies required! Simply clone the repository and open the HTML file in your browser.

```shellscript
# Clone the repository
git clone https://github.com/yourusername/flappy-bird-game.git

# Navigate to the project directory
cd flappy-bird-game

# Open index.html in your browser
# You can use a local server if you prefer
```

## 🎯 How to Play

1. Click the "Start Game" button or press the spacebar to begin
2. Press spacebar, click, or tap the screen to make the bird flap its wings
3. Navigate through the pipes without hitting them
4. Each pipe you pass earns you one point
5. The game ends when you hit a pipe or the ground/ceiling
6. Try to beat your high score!


## 🎲 Game Mechanics

### Bird Physics

The bird is constantly affected by gravity, pulling it downward. Each flap gives the bird an upward velocity, counteracting gravity temporarily.

```javascript
// Bird physics
bird.velocity += bird.gravity;  // Apply gravity
bird.y += bird.velocity;        // Update position

// When flapping
bird.velocity = bird.lift;      // Apply upward force
```

### Difficulty Levels

| Level | Pipe Speed | Pipe Distance | Pipe Gap
|-----|-----|-----|-----
| Easy | 2 | 300px | 150px
| Medium | 3 | 250px | 130px
| Hard | 4 | 200px | 110px


### Scoring

Score increases by 1 each time the bird successfully passes through a pair of pipes.

## 🎛️ Controls

- **Spacebar**: Flap wings / Start game / Restart game
- **Mouse Click**: Flap wings / Start game / Restart game
- **Touch**: Flap wings / Start game / Restart game (mobile devices)


## 🔧 Customization

You can easily customize various aspects of the game:

### Difficulty Settings

Modify the difficulty levels in the `game.js` file:

```javascript
const levels = {
  easy: { pipeSpeed: 2, pipeDistance: 300, pipeGap: 150 },
  medium: { pipeSpeed: 3, pipeDistance: 250, pipeGap: 130 },
  hard: { pipeSpeed: 4, pipeDistance: 200, pipeGap: 110 },
};
```

### Visual Appearance

Change colors and styles in the `styles.css` file. The bird and background images can be replaced by modifying the data URLs in the `game.js` file or by using external image files.

## 📁 Project Structure

```plaintext
flappy-bird-game/
│
├── index.html          # Main HTML file with game structure
├── styles.css          # CSS styles for the game
└── game.js             # JavaScript game logic
```

### Key Components

- **Canvas**: The main game rendering area
- **Game Loop**: Handles updates and rendering
- **Collision Detection**: Checks for collisions with pipes
- **State Management**: Handles different game states
- **Input Handling**: Processes keyboard, mouse, and touch inputs


## 🚀 Future Improvements

- Add power-ups (invincibility, slow motion)
- Implement day/night cycle with changing backgrounds
- Add different bird characters to choose from
- Add obstacles beyond just pipes
- Implement parallax scrolling for background layers
- Add animations for bird flapping
- Implement global leaderboard


## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- Original Flappy Bird game by Dong Nguyen
- Inspired by various HTML5 Canvas tutorials and resources

