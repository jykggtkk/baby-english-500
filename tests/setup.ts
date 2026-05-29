// Jest setup file
// Native module mocks are handled via moduleNameMapper in package.json

// Set up requestAnimationFrame polyfill
global.requestAnimationFrame = (callback: any) => setTimeout(callback, 0);
global.cancelAnimationFrame = (id: any) => clearTimeout(id);
