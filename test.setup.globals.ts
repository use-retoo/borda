import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8')) as {
	name: string;
	version: string;
};

Object.assign(globalThis, {
	__NAME__: pkg.name,
	__VERSION__: pkg.version
});
