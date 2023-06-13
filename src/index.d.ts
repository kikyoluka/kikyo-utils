declare namespace kikyoUtils {
	/**
	 * 生成数字范围内的随机数
	 * @param min 最小数字
	 * @param max 最大数字
	 * @returns number类型
	 */
	export function random(min: number, max: number): number

	/**
	 * 加密数据
	 * @param data - 数据
	 */
	export function encrypto(data: any): string

	/**
	 * 解密数据
	 * @param cipherText - 密文
	 */
	export function decrypto(cipherText: string): any
}

declare module 'kikyo-utils' {
	export = kikyoUtils
}
