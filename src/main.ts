import '@angular/compiler';

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import Lenis from 'lenis';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));

const lenis = new Lenis({
  duration: 1.2,
  wheelMultiplier: 0.8,
  touchMultiplier: 1.5,
});

function raf(time: number) {
  lenis.raf(time);

  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
