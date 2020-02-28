import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from 'rollup-plugin-node-resolve'
import { sizeSnapshot } from 'rollup-plugin-size-snapshot'
import { uglify } from 'rollup-plugin-uglify'
import size from 'rollup-plugin-size'
import pkg from './package.json'

const globals = {
  react: 'React',
}
export default [
  {
    input: 'src/index.js',
    output: {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [
      external(),
      babel(),
      resolve(),
      commonjs(),
      size({
        publish: true,
        exclude: pkg.module,
        filename: 'sizes-cjs.json',
        writeFile: process.env.CI ? true : false,
      }),
      sizeSnapshot(),
    ],
  },
  {
    input: 'src/index.js',
    output: {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
    plugins: [
      external(),
      babel(),
      size({
        publish: true,
        exclude: pkg.main,
        filename: 'sizes-es.json',
        writeFile: process.env.CI ? true : false,
      }),
      sizeSnapshot(),
    ],
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/react-table.min.js',
      name: 'ReactTable',
      format: 'umd',
      sourcemap: true,
      globals,
      exports: 'named',
    },
    plugins: [external(), babel(), sizeSnapshot(), uglify()],
  },
]
