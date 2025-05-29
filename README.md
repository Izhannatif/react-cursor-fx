# `React Cursor FX`
## A lightweight, customizable cursor library for React applications.
Features
•	🎨 Fully customizable cursor appearance (shape, size, color)
•	🔄 Smooth animations with Framer Motion
•	🎯 Easy element targeting
•	📱 Mobile fallback options
•	🔠 Customizable text labels
•	🖼️ Support for custom shapes and inner elements
•	⚡ Server-side rendering compatible (Next.js)
<br>

## Installation

```bash
npm install react-cursor-fx framer-motion
# or
yarn add react-cursor-fx framer-motion
```


## Basic Usage

```jsx
import { CursorProvider, Cursor, CursorTarget } from 'react-cursor-fx';

function App() {
  return (
    <CursorProvider>
      <Cursor />
      <div>
        <h1>My Website</h1>
        
        <CursorTarget variant="link">
          <a href="#">This link has a custom cursor</a>
        </CursorTarget>
        
        <CursorTarget variant="button">
          <button>This button has a different cursor</button>
        </CursorTarget>
      </div>
    </CursorProvider>
  );
}
```
## Custom Configuration

### You can customize the cursor appearance and behavior by passing a config object to the CursorProvider:

```jsx
import { CursorProvider, Cursor, CursorTarget } from 'react-cursor-fx';

const customConfig = {
  default: {
    width: 24,
    height: 24,
    shape: "circle",
    color: '#ffffff',
    borderColor: '#000000',
    borderWidth: 1,
    fontSize: "12px",
  },
  link: {
    width: 36,
    height: 36,
    shape: "circle",
    label: 'CLICK',
    color: '#0066ff',
    fontSize: "12px",
  },
  button: {
    width: 30,
    height: 30,
    shape: "square",
    borderRadius: 8,
    color: '#ff3366',
  },
  // Add your own custom variants
};

function App() {
  return (
    <CursorProvider config={customConfig}>
      <Cursor />
      {/* Your app content */}
    </CursorProvider>
  );
}
```
## Custom Shapes
### You can create custom cursor shapes:

```jsx
const customShapesConfig = {
  default: {
    width: 30,
    height: 30,
    shape: "circle",
    color: "rgba(0, 0, 0, 0.5)",
  },
  square: {
    width: 40,
    height: 40,
    shape: "square",
    borderRadius: 8,
    color: "#ff6b6b",
  },
  custom: {
    shape: "custom",
    customElement: (
      <svg width="40" height="40" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="18" stroke="white" strokeWidth="2" fill="rgba(0, 0, 0, 0.5)" />
        <circle cx="20" cy="20" r="5" fill="white" />
      </svg>
    ),
  },
  innerDot: {
    width: 50,
    height: 50,
    shape: "circle",
    color: "rgba(100, 100, 255, 0.5)",
    innerElements: [
      {
        element: (
          <div
            style={{
              width: 8,
              height: 8,
              backgroundColor: "white",
              borderRadius: "50%",
            }}
          />
        ),
        transition: {
          stiffness: 400,
          damping: 20,
          mass: 0.8,
        },
      },
    ],
  },
};
```
## API Reference
<CursorProvider>
Provides cursor context to your application.

Props:
 -	config (optional): Custom cursor configuration
 -	hideNativeCursor (optional): Whether to hide the native cursor (default: true)


<Cursor>
Renders the custom cursor.

Props:
-	size (optional): Base size of the cursor in pixels (default: 24)
-	zIndex (optional): z-index of the cursor (default: 9999)
-	showOnTouch (optional): Whether to show the cursor on touch devices (default: false)


<CursorTarget>
Wraps elements to apply cursor effects when hovering.

Props:
-	variant: The cursor variant to use when hovering
-	onEnter (optional): Callback function when cursor enters the element
-	onLeave (optional): Callback function when cursor leaves the element

useCursor Hook
For advanced use cases, you can use the hook directly:

```jsx
import { useCursor } from 'react-cursor-fx';

function MyComponent() {
  const cursorHandlers = useCursor({
    variant: 'myVariant',
    onEnter: () => console.log('Cursor entered'),
    onLeave: () => console.log('Cursor left'),
  });

  return (
    <div {...cursorHandlers}>
      Hover over me
    </div>
  );
}
```
## Configuration Options
### Cursor Variant Properties

Each cursor variant can have the following properties:

Size and Shape
-	width: Width of the cursor in pixels
-	height: Height of the cursor in pixels
-	scale: Scale factor for the cursor (useful for hover effects)
-	shape: "circle", "square", or "custom"
-	borderRadius: Border radius for square shapes

### Appearance
-	color: Background color of the cursor
-	opacity: Opacity of the cursor (0-1)
-	borderColor: Border color
-	borderWidth: Border width in pixels
-	borderStyle: Border style (solid, dashed, etc.)

### Label
-	label: Text or React node to display inside the cursor
-	fontSize: Font size for the label
-	fontWeight: Font weight for the label
-	labelColor: Text color for the label

### Custom Elements
-	customElement: React node for custom shapes
-	innerElements: Array of objects with inner elements and their transitions
### Animation
-	transition: Object with animation properties
-	stiffness: Spring stiffness (higher = more responsive)
-	damping: Spring damping (higher = less oscillation)
-	mass: Spring mass (higher = more inertia)


License
MIT

