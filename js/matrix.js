// Matrix Rain Effect
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Matrix characters - including katakana, numbers, and symbols
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const fontSize = 14;
const columns = Math.floor(canvas.width / fontSize);

// Array to store the y position of each column
const drops = new Array(columns).fill(1);

// Draw function
function draw() {
  // Semi-transparent black to create fade effect
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#0F0'; // Green color
  ctx.font = fontSize + 'px monospace';
  
  // Loop through drops
  for (let i = 0; i < drops.length; i++) {
    // Random character
    const text = characters.charAt(Math.floor(Math.random() * characters.length));
    
    // Draw character
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    
    // Reset drop to top randomly or when it reaches bottom
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    
    // Move drop down
    drops[i]++;
  }
}

// Animation loop - 60fps for slightly slower, smoother performance
setInterval(draw, 60);
