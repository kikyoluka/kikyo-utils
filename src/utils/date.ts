import dayjs from 'dayjs'
import { DateOptions, DateType, Format, FormatType, WeekDay, WeekDayMap } from '../../typings/date'

const weekDay: WeekDayMap = {
	Monday: '星期一',
	Tuesday: '星期二',
	Wednesday: '星期三',
	Thursday: '星期四',
	Friday: '星期五',
	Saturday: '星期六',
	Sunday: '星期日',
}

/**
 * 格式化日期
 * @param options 选项
 * @returns 格式化后的日期
 * @example formatDate({ date: '2020-01-01' }) // => '2020-01-01'
 */
export function formatDate(options: DateOptions): string {
	const { date } = options
	const format: Format = options.hms ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'

	if (!date) throw new Error('date is required')

	return dayjs(date).format(format)
}

/**
 * 获取指定格式的日期
 * @param type 日期类型
 * @returns 指定格式的日期
 * @example
 * getCurrentDate('date') // => '2020-01-01'
 * getCurrentDate('time') // => '00:00:00'
 * getCurrentDate('datetime') // => '2020-01-01 00:00:00'
 * getCurrentDate('year') // => '2020'
 * getCurrentDate('month') // => '01'
 * getCurrentDate('day') // => '01'
 * getCurrentDate('week') // => '星期一'
 */
export function getCurrentDate(type: DateType): string {
	if (!type) throw new Error('type is required')

	const format: FormatType = {
		date: 'YYYY-MM-DD',
		time: 'HH:mm:ss',
		datetime: 'YYYY-MM-DD HH:mm:ss',
		year: 'YYYY',
		month: 'MM',
		day: 'DD',
		week: 'dddd',
	}

	const date = dayjs().format(format[type])

	return type === 'week' ? weekDay[date as WeekDay] : date
}

/**
 * 获取之前的日期
 * @param options 选项
 * @returns 之前的日期
 * @example
 * getBeforeDate({ date: '2020-01-01', gap: 1, unit: 'day' }) // => '2019-12-31'
 * getBeforeDate({ date: '2020-01-01', gap: 1, unit: 'month' }) // => '2019-12-01'
 * getBeforeDate({ date: '2020-01-01', gap: 1, unit: 'year' }) // => '2019-01-01'
 */
export function getBeforeDate(options: DateOptions): string {
	const { date, gap, unit } = options

	if (!date) throw new Error('date is required')
	if (!gap) throw new Error('gap is required')

	return dayjs(date).subtract(gap, unit).format('YYYY-MM-DD')
}

/**
 * 获取之后的日期
 * @param options 选项
 * @returns 之后的日期
 * @example
 * getAfterDate({ date: '2020-01-01', gap: 1, unit: 'day' }) // => '2020-01-02'
 * getAfterDate({ date: '2020-01-01', gap: 1, unit: 'month' }) // => '2020-02-01'
 * getAfterDate({ date: '2020-01-01', gap: 1, unit: 'year' }) // => '2021-01-01'
 */
export function getAfterDate(options: DateOptions): string {
	const { date, gap, unit } = options

	if (!date) throw new Error('date is required')
	if (!gap) throw new Error('gap is required')

	return dayjs(date).add(gap, unit).format('YYYY-MM-DD')
}

/**
 * 判断两个时间段大小
 * @param date1 日期 1
 * @param date2 日期 2
 * @returns 日期 1 是否大于日期 2
 * @example compareDate('2020-01-01', '2020-01-02') // => false
 */
export function compareDate(date1: string, date2: string): boolean {
	if (!date1) throw new Error('date1 is required')
	if (!date2) throw new Error('date2 is required')

	return dayjs(date1).isAfter(date2)
}

/**
 * 计算两个日期之差
 * @param date1 日期 1
 * @param date2 日期 2
 * @param options 选项
 * @returns 两个日期之差
 * @example diffDate('2020-01-01', '2020-01-02', { unit: 'day' }) // => 1
 */
export function diffDate(date1: string, date2: string, options: Partial<DateOptions>) {
	const { unit = 'month', abs = true, int = true } = options

	if (!date1) throw new Error('date1 is required')
	if (!date2) throw new Error('date2 is required')

	const diff = dayjs(date1).diff(date2, unit, !int)
	// 修正差值
	const cycle = diff > 0 ? diff : diff + 1

	return abs ? Math.ceil(Math.abs(cycle)) : cycle
}

/**
 * 时间排序
 * @param date 日期数组
 * @param type 排序类型 min 从小到大 max 从大到小
 * @returns 排序后的日期数组
 * @example sortDate(['2020-01-01', '2020-01-02', '2020-01-03']) // => ['2020-01-01', '2020-01-02', '2020-01-03']
 */
export function sortDate(date: string[], type: string = 'min'): string[] {
	if (!date || date.length == 0) throw new Error('date is required')

	const method = type === 'min' ? 'isAfter' : 'isBefore'

	return date.sort((a, b) => {
		return dayjs(a)[method](b) ? 1 : -1
	})
}
