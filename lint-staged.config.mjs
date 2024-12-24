/* eslint-disable import/no-anonymous-default-export */

import { relative } from 'path';

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames.map((f) => relative(process.cwd(), f)).join(' --file ')}`;

export default {
  'src/**/*.{js,jsx,ts,tsx}': [buildEslintCommand],
  'src/**/*.{js,jsx,ts,tsx,css,scss}': ['prettier --write'],
  '**/*.{json,md}': ['prettier --write'],
};
