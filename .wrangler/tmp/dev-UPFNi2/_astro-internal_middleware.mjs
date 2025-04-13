globalThis.process ??= {}; globalThis.process.env ??= {};
import './chunks/astro-designed-error-pages_DrdpAPtW.mjs';
import './chunks/astro/server_Bl5Wa4cQ.mjs';
import { s as sequence } from './chunks/index_DeM9-sB8.mjs';

const onRequest$1 = (context, next) => {
  if (context.isPrerendered) {
    context.locals.runtime ??= {
      env: process.env
    };
  }
  return next();
};

const onRequest = sequence(
	onRequest$1,
	
	
);

export { onRequest };
