import { definePreset } from '@primevue/themes';
import Aura from '@primevue/themes/aura';

const punchlyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#e6fafd',
      100: '#c0f2f7',
      200: '#99e9f1',
      300: '#73e1eb',
      400: '#4dd8e5',
      500: '#14ABB7', // Brand primary
      600: '#129aa5',
      700: '#108893',
      800: '#0d7681',
      900: '#0b646f',
      950: '#084e56'
    }
  }
});

export default {
  preset: punchlyPreset,
  options: {
      darkModeSelector: '.p-dark'
  }
};
