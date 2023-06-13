import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
export default {
	input: './src/index.ts', // 入口文件
	output: [
		{
			format: 'cjs', // 打包为 commonjs 格式
			file: 'dist/kikyo-utils.cjs.js', // 打包后的文件路径名称
			name: 'kikyoUtils', // 打包后的默认导出文件名称
		},
		{
			format: 'esm', // 打包为 esm 格式
			file: 'dist/kikyo-utils.esm.js',
			name: 'kikyoUtils',
		},
		{
			format: 'umd', // 打包为 umd 通用格式
			file: 'dist/kikyo-utils.umd.js',
			name: 'kikyoUtils',
			minifyInternalExports: true,
		},
	],
	plugins: [typescript({ tsconfig: './tsconfig.json' }), resolve()],
}
