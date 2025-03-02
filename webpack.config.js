// webpack.config.js
import { resolve as _resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import { mkdir, rmSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

rmSync('./dist', { recursive: true, force: true });
mkdir('./dist', () => { });
const pkg=JSON.parse(await readFile('./package.json',{encoding:'utf-8'}));
delete pkg.scripts;
delete pkg.devDependencies;
delete pkg.browserslist;
await writeFile('./dist/package.json', JSON.stringify(pkg, null, 2));
export const mode = 'production';
export const entry = './src/index.ts';
export const output = {
    path: _resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: {
        type: 'module',
    },
    // libraryExport: 'default'
};
export const module = {
    rules: [
        {
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }
    ]
};
export const resolve = {
    extensions: ['.ts', '.js']
};
export const optimization = {
    minimize: true,
    minimizer: [
        new TerserPlugin({
            terserOptions: {
                compress: { inline: true, passes: 100 },
                mangle: { keep_classnames: true, module: true, properties: false },
                format: { comments: false, beautify: true },
            }
        })
    ]
};
export default {
    mode,
    entry,
    output,
    module,
    resolve,
    optimization,
    experiments: {
        outputModule: true
    }
};