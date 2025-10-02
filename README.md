# Leonardo Rufini - Personal Portfolio Website

A modern, responsive personal portfolio website built with vanilla HTML, CSS, and JavaScript. Features a dark theme with red accent colors, smooth animations, and dynamic GitHub project loading.

## 🚀 Live Demo

Visit the website at: [leonardorufini.github.io](https://leonardorufini.github.io)

## 📋 Table of Contents

- [Features](#features)
- [Design System](#design-system)
- [Technical Implementation](#technical-implementation)
- [Responsive Design](#responsive-design)
- [JavaScript Functionality](#javascript-functionality)
- [File Structure](#file-structure)
- [Setup & Usage](#setup--usage)
- [Browser Compatibility](#browser-compatibility)
- [Performance Optimizations](#performance-optimizations)

## ✨ Features

### Core Features
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Theme**: Modern black background with red accent colors
- **Dynamic Content**: GitHub repositories loaded automatically via API
- **Smooth Animations**: Scroll-triggered animations with Intersection Observer
- **Mobile Navigation**: Custom hamburger menu with smooth transitions
- **Sticky Header**: Navigation stays visible while scrolling
- **Download CV**: Direct PDF download functionality
- **SEO Optimized**: Proper meta tags and semantic HTML structure

### Interactive Elements
- **Hover Effects**: Smooth transitions on buttons, links, and cards
- **Scroll Animations**: Elements fade in as they come into view
- **Active Navigation**: Current section highlighted in navigation
- **Mobile Menu**: Full-screen overlay navigation for mobile devices
- **Project Cards**: Hover effects with lift and scale animations

## 🎨 Design System

### Color Palette
```css
:root {
  --primary-bg: rgb(0, 0, 0);           /* Pure black background */
  --secondary-bg: rgb(0, 0, 0);         /* Section backgrounds */
  --card-bg: rgb(0, 0, 0);              /* Project card backgrounds */
  --accent-color: #c1292eff;            /* Primary red accent */
  --accent-dark: rgb(148, 25, 29);      /* Darker red for hover states */
  --accent-deep: rgb(107, 8, 12);       /* Deepest red for emphasis */
  --text-light: #e0e0e0ff;             /* Primary text color */
  --text-muted: #b0b0b0ff;             /* Secondary text color */
  --text-white: #ffffffff;             /* Pure white for emphasis */
  --border-color: rgba(193, 41, 46, 0.699); /* Border color with transparency */
}
```

### Typography
- **Primary Font**: `Poppins` (sans-serif) - Modern, clean readability
- **Monospace Font**: `Roboto Mono` - Used for headings and code-like elements
- **Font Sizes**: Responsive scaling from mobile (1em) to desktop (3.4em for main title)
- **Line Heights**: Optimized for readability (1.8 base, adjusted per context)

### Spacing & Layout
- **Grid System**: CSS Grid with responsive auto-fit columns
- **Margins**: Consistent 2.5em spacing between sections on desktop
- **Padding**: Generous internal padding (4.5em) for comfortable reading
- **Border Radius**: 12px for main elements, 8px for cards

## 🔧 Technical Implementation

### CSS Architecture

#### CSS Variables System
The website uses a comprehensive CSS custom properties system for:
- **Color Management**: Centralized color palette with semantic naming
- **Spacing**: Consistent margins, padding, and gaps
- **Animation**: Unified transition speeds and durations
- **Typography**: Responsive font sizes and line heights

#### Layout Techniques
- **CSS Grid**: Modern grid layout for project cards
- **Flexbox**: Navigation, headers, and internal card layouts
- **Sticky Positioning**: Header remains visible during scroll
- **Fixed Positioning**: Mobile navigation overlay

#### Animation System
```css
/* Smooth transitions for all interactive elements */
transition: all var(--transition-speed) ease;

/* Scroll-triggered animations */
opacity: 0;
transform: translateY(40px);
transition: opacity var(--animation-duration) ease-out, 
           transform var(--animation-duration) ease-out;
```

### JavaScript Features

#### GitHub API Integration
```javascript
const apiURL = "https://api.github.com/users/pennyw1ze/repos";
```
- **Dynamic Loading**: Fetches repositories from GitHub API
- **Error Handling**: Graceful fallback for API failures
- **Data Sorting**: Projects sorted by last updated date
- **Content Generation**: Dynamic HTML creation for project cards

#### Intersection Observer
```javascript
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    } else {
      entry.target.classList.remove('is-visible');
    }
  });
}, observerOptions);
```
- **Performance**: Uses browser-native API for scroll detection
- **Reversible Animations**: Elements animate in and out of view
- **Threshold Control**: Configurable visibility thresholds

#### Mobile Navigation System
- **State Management**: JavaScript controls navigation visibility
- **Body Scroll Lock**: Prevents background scrolling when menu is open
- **Touch-Friendly**: Large tap targets and smooth animations
- **Accessibility**: ARIA labels and keyboard navigation support

## 📱 Responsive Design

### Breakpoints
```css
@media (max-width: 900px) { /* Tablet */ }
@media (max-width: 768px) { /* Mobile */ }
```

### Mobile Optimizations

#### Navigation
- **Hamburger Menu**: Custom animated hamburger to X transformation
- **Full-Screen Overlay**: Navigation covers entire viewport
- **Scroll Prevention**: Body scroll locked when menu is active
- **Header Positioning**: Maintains header visibility with navigation toggle

#### Layout Adjustments
- **Single Column**: Grid becomes single column on mobile
- **Reduced Padding**: Optimized spacing for smaller screens
- **Background Visibility**: Sections sized to show background on mobile
- **Typography Scaling**: Responsive font sizes for readability

#### Touch Interactions
- **Larger Tap Targets**: 1.8em font size for navigation links
- **Hover States**: Adapted for touch devices
- **Smooth Scrolling**: CSS `scroll-behavior: smooth`

## 🚀 JavaScript Functionality

### Core Functions

#### Mobile Navigation Toggle
```javascript
navToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
  navToggle.classList.toggle('active');
  body.classList.toggle('nav-active');
});
```

#### Active Section Detection
```javascript
function updateActiveNavLink() {
  // Prevents update when mobile nav is open
  if (nav.classList.contains('active')) return;
  
  // Detect currently visible section
  let currentActive = '';
  Array.from(animatedSections).reverse().forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - header.clientHeight - 30) {
      currentActive = section.getAttribute('id');
    }
  });
  
  // Update navigation styling
  navLinks.forEach(a => {
    a.classList.remove('active');
    if (a.href.includes(currentActive) && currentActive !== '') {
      a.classList.add('active');
    }
  });
}
```

#### Header Scroll Effect
```javascript
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  updateActiveNavLink();
});
```

#### CV Download Functionality
```javascript
function downloadCV() {
  const link = document.createElement('a');
  link.href = "https://raw.githubusercontent.com/leonardorufini/leonardorufini.github.io/main/CV.pdf";
  link.download = "CV.pdf";
  link.click();
}
```

### Performance Features

#### Lazy Loading
- **Intersection Observer**: Only animate elements when visible
- **Image Optimization**: No unnecessary image preloading
- **API Caching**: GitHub API responses cached by browser

#### Smooth Animations
- **Hardware Acceleration**: CSS transforms trigger GPU acceleration
- **Debounced Scroll**: Scroll events optimized for performance
- **Staggered Animations**: Smooth cascading effects for multiple elements

## 🗂️ File Structure

```
leonardorufini.github.io/
├── index.html          # Main website file
├── CV.pdf             # Downloadable CV document
└── README.md          # This documentation file
```

### Single File Architecture
The website is intentionally built as a single HTML file containing:
- **Inline CSS**: All styles embedded in `<style>` tags
- **Inline JavaScript**: All functionality in `<script>` tags
- **External Resources**: Only Google Fonts and Font Awesome CDN

Benefits:
- ✅ **Fast Loading**: No additional HTTP requests for local assets
- ✅ **Easy Deployment**: Single file deployment to GitHub Pages
- ✅ **Self-Contained**: All code in one place for easy maintenance
- ✅ **Version Control**: Single file changes are easy to track

## 🛠️ Setup & Usage

### Quick Start
1. **Clone Repository**:
   ```bash
   git clone https://github.com/leonardorufini/leonardorufini.github.io.git
   cd leonardorufini.github.io
   ```

2. **Open Locally**:
   - Simply open `index.html` in any modern web browser
   - Or use a local server: `python -m http.server 8000`

3. **Deploy to GitHub Pages**:
   - Push to `main` branch
   - Enable GitHub Pages in repository settings
   - Website automatically available at `username.github.io`

### Customization

#### Personal Information
Update these sections in `index.html`:
- **Header Title**: Change `<h1>Leonardo Rufini</h1>`
- **About Section**: Modify the biography content
- **Contact Info**: Update email and GitHub links
- **GitHub Username**: Change `pennyw1ze` in the API URL

#### Styling
Modify CSS variables in the `:root` selector:
```css
:root {
  --accent-color: #your-color;     /* Change accent color */
  --primary-bg: #your-bg;          /* Change background */
  --text-light: #your-text;        /* Change text color */
}
```

#### Content Sections
- **Add Sections**: Copy existing section structure
- **Modify Navigation**: Update nav links and JavaScript selectors
- **Change Animations**: Adjust CSS transition and animation values

## 🌐 Browser Compatibility

### Supported Browsers
- ✅ **Chrome 60+** (Full support)
- ✅ **Firefox 55+** (Full support)
- ✅ **Safari 12+** (Full support)
- ✅ **Edge 79+** (Full support)
- ⚠️ **Internet Explorer**: Not supported (uses modern CSS features)

### Modern Features Used
- **CSS Grid**: Main layout system
- **CSS Custom Properties**: Color and spacing system
- **Intersection Observer**: Scroll animations
- **Fetch API**: GitHub integration
- **CSS Transforms**: Smooth animations
- **Flexbox**: Navigation and card layouts

## ⚡ Performance Optimizations

### Loading Performance
- **Minimal HTTP Requests**: Single HTML file with inline assets
- **CDN Resources**: Google Fonts and Font Awesome from CDN
- **Compressed Assets**: Minified CSS and optimized code structure
- **Critical CSS**: All styles inline for immediate rendering

### Runtime Performance
- **Hardware Acceleration**: CSS transforms use GPU
- **Efficient Selectors**: Optimized CSS selectors for fast painting
- **Debounced Events**: Scroll events optimized to prevent lag
- **Intersection Observer**: Native browser API for scroll detection

### Mobile Performance
- **Touch Optimization**: Large tap targets and smooth touch responses
- **Reduced Animations**: Simplified animations for mobile devices
- **Efficient Layout**: Mobile-first responsive design
- **Memory Management**: Proper event listener cleanup

## 🔄 Version History

### Latest Updates
- **Mobile Navigation Fix**: Resolved scroll issues with mobile menu
- **Project Card Optimization**: Improved mobile layout and text overflow handling
- **Performance Improvements**: Enhanced scroll animations and API error handling
- **Accessibility Enhancements**: Better ARIA labels and keyboard navigation

### Key Features Added
1. **Dynamic GitHub Integration**: Automatic project loading
2. **Responsive Design**: Complete mobile optimization
3. **Animation System**: Smooth scroll-triggered animations
4. **Dark Theme**: Modern black and red color scheme
5. **Mobile Navigation**: Custom hamburger menu implementation

## 📞 Support & Contact

For questions or issues related to this portfolio website:
- **Email**: leo.rufini.459@gmail.com
- **GitHub**: [@pennyw1ze](https://github.com/pennyw1ze)
- **Repository Issues**: [Create an issue](https://github.com/leonardorufini/leonardorufini.github.io/issues)

---

*This README provides comprehensive documentation for the portfolio website implementation. For technical questions or contributions, please refer to the contact information above.*
