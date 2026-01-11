# Product List with Cart

A responsive dessert ordering app built with React and Vite. Users can browse products, add items to their cart, adjust quantities, and confirm their order with a beautifully animated modal.

![Design preview](./preview.jpg)

## 🌐 Live Demo

**[View Live Site](https://ringlochid.github.io/product-cart-react-fem/)**

## ✨ Features

- **Responsive Design** — Optimized for mobile, tablet, and desktop
- **Dynamic Product List** — Products loaded from JSON data with responsive images
- **Shopping Cart** — Add, remove, and adjust item quantities
- **Order Confirmation Modal** — Slide-up animation on mobile, scale-in on desktop
- **Performance Optimized** — Uses React.memo and useCallback to prevent unnecessary re-renders

## 🛠️ Built With

- [React 18](https://react.dev/) — UI library with hooks
- [Vite](https://vitejs.dev/) — Fast build tool and dev server
- [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS) — Custom properties, Flexbox, Grid, animations
- Context API — Global state management for cart
- GitHub Pages — Deployment

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ringlochid/product-cart-react-fem.git

# Navigate to project directory
cd product-cart-react-fem

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build & Deploy

```bash
# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## 📁 Project Structure

```
├── public/
│   ├── assets/images/    # Product images and icons
│   └── data.json         # Product data
├── src/
│   ├── api/
│   │   └── productAPI.js # Fetch products from JSON
│   ├── App.jsx           # Main React components
│   ├── App.css           # All styles
│   └── main.jsx          # Entry point
├── vite.config.js        # Vite configuration with base path
└── package.json
```

## 🎯 Key Implementation Details

### State Management
- **CartContext** — Manages products, cart items, and modal state
- **LayoutContext** — Tracks viewport size for responsive images

### Performance
- `React.memo` on ProductCard prevents unnecessary re-renders
- `useCallback` ensures stable function references
- Products passed as props, not accessed via context in memoized components

### Responsive Images
Products display different image sizes based on viewport:
- Mobile: `image-*-mobile.jpg`
- Tablet: `image-*-tablet.jpg`
- Desktop: `image-*-desktop.jpg`

## 📝 What I Learned

- Using Context API effectively without breaking memoization
- Configuring Vite for GitHub Pages deployment with `base` path
- Using `import.meta.env.BASE_URL` for dynamic asset paths
- CSS keyframe animations for modal transitions

## 🙏 Acknowledgments

- Challenge by [Frontend Mentor](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d)
- Design files provided by Frontend Mentor

## 📄 License

This project is for learning purposes. Feel free to use it as reference for your own projects.
