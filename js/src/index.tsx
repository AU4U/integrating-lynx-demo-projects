import '@lynx-js/react/debug';
import { root } from '@lynx-js/react';

import { App } from './App.jsx';

const originalConsoleError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('This is an issue of lynx-core.')
  ) {
    return;
  }
  originalConsoleError(...args);
};
root.render(<App />);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
