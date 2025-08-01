# Design Document

## Overview

This design document outlines the refactoring of the LeetCode card UI styles to create a modern, visually appealing, and maintainable component. The refactoring will improve the visual hierarchy, enhance animations, modernize the color scheme, and reorganize the styling code while maintaining all existing functionality.

The current implementation uses inline SVG styling with basic animations. The refactored version will introduce a modular styling system with enhanced visual effects, better typography, improved spacing, and more sophisticated animations.

## Architecture

### Current Architecture Analysis

The current LeetCode card implementation consists of:
- A main `renderLeetCodeCard` function that orchestrates the card creation
- Helper functions for creating individual UI components (difficulty bars, AC circle, submissions)
- Inline CSS generation with basic animations
- Direct SVG element creation with hardcoded styling

### New Architecture Design

The refactored architecture will introduce:

1. **Modular Style System**: Separate style generation into logical modules
2. **Enhanced Animation Framework**: Sophisticated animation system with configurable timing
3. **Improved Component Structure**: Better separation of concerns between layout and styling
4. **Theme Integration**: Enhanced integration with the existing theme system

```
src/cards/leetcode-card.js
├── Style Modules
│   ├── BaseStyles (typography, spacing, colors)
│   ├── ComponentStyles (difficulty bars, circle, submissions)
│   ├── AnimationStyles (keyframes, transitions, timing)
│   └── ThemeStyles (theme-specific overrides)
├── Layout Components
│   ├── DifficultySection (enhanced progress bars)
│   ├── ACCircleSection (improved circular progress)
│   ├── SubmissionsSection (modernized submission list)
│   └── HeaderSection (title and ranking)
└── Main Renderer (orchestrates components and styles)
```

## Components and Interfaces

### 1. Style Management System

#### BaseStyleManager
```javascript
class BaseStyleManager {
  constructor(colors, options) {
    this.colors = colors;
    this.options = options;
  }
  
  getTypographyStyles() // Returns font definitions
  getSpacingStyles()   // Returns spacing constants
  getColorStyles()     // Returns color variables
}
```

#### AnimationStyleManager
```javascript
class AnimationStyleManager {
  constructor(options) {
    this.disabled = options.disable_animations;
    this.timing = options.animation_timing || 'ease-in-out';
  }
  
  getProgressAnimations()    // Circle and bar animations
  getEntranceAnimations()    // Fade-in, slide-in effects
  getHoverAnimations()       // Interactive feedback
  getStaggeredAnimations()   // Sequential element animations
}
```

#### ComponentStyleManager
```javascript
class ComponentStyleManager {
  constructor(baseStyles, animationStyles) {
    this.base = baseStyles;
    this.animations = animationStyles;
  }
  
  getDifficultyBarStyles()   // Enhanced progress bar styling
  getACCircleStyles()        // Improved circular progress
  getSubmissionStyles()      // Modern submission item styling
  getStatusIconStyles()      // Enhanced status indicators
}
```

### 2. Enhanced UI Components

#### Difficulty Progress Bars
- **Visual Improvements**: Rounded corners, subtle shadows, gradient fills
- **Animation Enhancements**: Smooth progress animation with spring easing
- **Interactive Elements**: Hover effects showing exact numbers
- **Accessibility**: Proper ARIA labels and high contrast support

#### AC Circle Progress
- **Visual Enhancements**: Gradient stroke, subtle glow effect, improved typography
- **Animation Improvements**: Smooth circular progress with bounce effect
- **Responsive Design**: Scales properly with card width
- **Status Indicators**: Visual feedback for different achievement levels

#### Recent Submissions Section
- **Layout Improvements**: Better spacing, improved visual hierarchy
- **Status Visualization**: Enhanced status icons with color coding
- **Time Display**: Improved time formatting and positioning
- **Difficulty Badges**: Modernized difficulty indicators with better contrast

### 3. Enhanced Animation System

#### Animation Categories

1. **Entrance Animations**
   - Staggered fade-in for all elements
   - Slide-up effect for submission items
   - Scale-in effect for circular progress

2. **Progress Animations**
   - Smooth circular progress with easing
   - Bar progress with spring animation
   - Number counting animation

3. **Interactive Animations**
   - Hover effects for interactive elements
   - Focus indicators for accessibility
   - Subtle pulse effects for status indicators

4. **Responsive Animations**
   - Respect `prefers-reduced-motion` media query
   - Configurable animation timing
   - Graceful degradation when disabled

## Data Models

### Enhanced Color System
```javascript
const EnhancedColorScheme = {
  // Base colors from theme
  primary: colors.titleColor,
  secondary: colors.iconColor,
  text: colors.textColor,
  background: colors.bgColor,
  border: colors.borderColor,
  
  // Derived colors for enhanced UI
  success: calculateSuccessColor(colors),
  warning: calculateWarningColor(colors),
  error: calculateErrorColor(colors),
  
  // Gradient definitions
  gradients: {
    primary: generatePrimaryGradient(colors),
    progress: generateProgressGradient(colors),
    background: generateBackgroundGradient(colors)
  },
  
  // Opacity variants
  opacity: {
    subtle: 0.1,
    light: 0.2,
    medium: 0.4,
    strong: 0.8
  }
};
```

### Animation Configuration
```javascript
const AnimationConfig = {
  timing: {
    fast: '0.2s',
    normal: '0.3s',
    slow: '0.6s',
    progress: '1.2s'
  },
  
  easing: {
    standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  },
  
  delays: {
    stagger: 0.1,
    sequence: 0.2
  }
};
```

## Error Handling

### Style Generation Errors
- Fallback to default styles if theme colors are invalid
- Graceful degradation for unsupported CSS features
- Error logging for debugging style issues

### Animation Errors
- Respect user preferences for reduced motion
- Fallback to static display if animations fail
- Progressive enhancement approach

### Theme Compatibility
- Validate color contrast ratios
- Ensure readability across all themes
- Provide fallback colors for accessibility

## Testing Strategy

### Visual Regression Testing
- Screenshot comparison tests for all themes
- Responsive design testing across different card widths
- Animation state testing (start, middle, end states)

### Accessibility Testing
- Color contrast validation
- Screen reader compatibility
- Keyboard navigation testing
- Reduced motion preference testing

### Performance Testing
- CSS generation performance benchmarks
- Animation performance profiling
- Memory usage optimization

### Cross-browser Testing
- SVG rendering consistency
- CSS animation support
- Font rendering differences

## Implementation Phases

### Phase 1: Style System Foundation
1. Create modular style management classes
2. Implement enhanced color system
3. Set up animation configuration framework
4. Establish theme integration patterns

### Phase 2: Component Enhancement
1. Refactor difficulty progress bars with new styling
2. Enhance AC circle with gradient and animations
3. Modernize submissions section layout
4. Improve typography and spacing throughout

### Phase 3: Animation System
1. Implement entrance animations with staggering
2. Add smooth progress animations
3. Create interactive hover effects
4. Ensure accessibility compliance

### Phase 4: Integration and Testing
1. Integrate all components with new style system
2. Comprehensive testing across themes
3. Performance optimization
4. Documentation updates

## Design Decisions and Rationales

### Modular Architecture
**Decision**: Separate styling into distinct, reusable modules
**Rationale**: Improves maintainability, enables easier testing, and allows for future extensions

### Enhanced Animation System
**Decision**: Implement sophisticated animations with proper timing and easing
**Rationale**: Modern user expectations for smooth, engaging interfaces while maintaining accessibility

### Gradient and Visual Effects
**Decision**: Add subtle gradients and visual enhancements
**Rationale**: Creates visual depth and modern appearance without overwhelming the data presentation

### Accessibility-First Approach
**Decision**: Ensure all enhancements maintain or improve accessibility
**Rationale**: Inclusive design principles and compliance with web accessibility standards

### Performance Considerations
**Decision**: Optimize CSS generation and animation performance
**Rationale**: Maintain fast rendering times even with enhanced visual effects