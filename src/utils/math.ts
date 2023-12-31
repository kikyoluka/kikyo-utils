/**
 * 生成数字范围内的随机数
 * @param min 最小数字
 * @param max 最大数字
 * @returns number类型
 * @example random(1, 10) // => 5
 */
export function random(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min
}
