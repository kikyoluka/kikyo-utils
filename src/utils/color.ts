import { colord, extend } from 'colord'
import mixPlugin from 'colord/plugins/mix'
import namesPlugin from 'colord/plugins/names'

extend([namesPlugin, mixPlugin])

/**
 * 给颜色加透明度
 * @param color - 颜色
 * @param alpha - 透明度 (0 - 1)
 * @returns - 加上透明度的颜色
 * @example addColorAlpha('#fff', 0.5) // => #ffffff80
 */
export function addColorAlpha(color: string, alpha: number) {
	return colord(color).alpha(alpha).toHex()
}

/**
 * 颜色混合
 * @param firstColor - 第一个颜色
 * @param secondColor - 第二个颜色
 * @param ratio - 第二个颜色占比
 * @returns - 混合后的颜色
 * @example mixColor('#fff', '#000', 0.5) // => #808080
 */
export function mixColor(firstColor: string, secondColor: string, ratio: number) {
	return colord(firstColor).mix(secondColor, ratio).toHex()
}

/**
 * 获取颜色的 rgb 值
 * @param color 颜色
 * @returns - rgb 值
 * @example getRgbOfColor('#fff') // => { r: 255, g: 255, b: 255 }
 */
export function getRgbOfColor(color: string) {
	return colord(color).toRgb()
}

/**
 * 获取颜色的 hex 值
 * @param color 颜色
 * @returns - hex 值
 * @example getHexOfColor('#fff') // => ffffff
 */
export function getHexOfColor(color: string) {
	return colord(color).toHex()
}
