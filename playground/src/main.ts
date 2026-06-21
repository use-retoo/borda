import { mount } from 'svelte';

import { App } from './app';

import '@/shared/styles/index.scss';

const app = mount(App, {
	target: document.getElementById('app')!
});

export default app;
