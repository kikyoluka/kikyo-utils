import { DateOptions, DateType } from '../typings/date'

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

	/**
	 * 格式化日期
	 * @param options - 选项
	 */
	export function formatDate(options: DateOptions): string

	/**
	 * 获取指定格式的日期
	 * @param type - 日期类型
	 */
	export function getCurrentDate(type: DateType): string

	/**
	 * 获取之前的日期
	 * @param options - 选项
	 */
	export function getBeforeDate(options: DateOptions): string

	/**
	 * 获取之后的日期
	 * @param options - 选项
	 */
	export function getAfterDate(options: DateOptions): string

	/**
	 * 判断两个时间段大小
	 * @param date1 - 日期一
	 * @param date2 - 日期二
	 */
	export function compareDate(date1: string, date2: string): boolean

	/**
	 * 计算两个日期之差
	 * @param date1 - 日期一
	 * @param date2 - 日期二
	 * @param options - 选项
	 */
	export function diffDate(date1: string, date2: string, options: Partial<DateOptions>): number

	/**
	 * 时间段排序
	 * @param date - 日期数组
	 * @param type - 排序类型
	 */
	export function sortDate(date: string[], type: string): string[]
}

declare module 'kikyo-utils' {
	export = kikyoUtils
}
