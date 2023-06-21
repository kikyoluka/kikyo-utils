import dayjs from 'dayjs'
import { DateOptions, DateType, Format, FormatType, WeekDay, WeekDayMap } from '../typings/date'

const weekDay: WeekDayMap = {
	Monday: '星期一',
	Tuesday: '星期二',
	Wednesday: '星期三',
	Thursday: '星期四',
	Friday: '星期五',
	Saturday: '星期六',
	Sunday: '星期日',
}

// 格式化日期
export function formatDate(options: DateOptions): string {
	const { date } = options
	const format: Format = options.hms ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'

	if (!date) throw new Error('date is required')

	return dayjs(date).format(format)
}

// 获取指定格式的日期
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

// 获取之前的日期
export function getBeforeDate(options: DateOptions): string {
	const { date, gap, unit } = options

	if (!date) throw new Error('date is required')
	if (!gap) throw new Error('gap is required')

	return dayjs(date).subtract(gap, unit).format('YYYY-MM-DD')
}

// 获取之后的日期
export function getAfterDate(options: DateOptions): string {
	const { date, gap, unit } = options

	if (!date) throw new Error('date is required')
	if (!gap) throw new Error('gap is required')

	return dayjs(date).add(gap, unit).format('YYYY-MM-DD')
}

// 判断两个时间段大小 date1 > date2 ? true : false
export function compareDate(date1: string, date2: string): boolean {
	if (!date1) throw new Error('date1 is required')
	if (!date2) throw new Error('date2 is required')

	return dayjs(date1).isAfter(date2)
}

// 计算两个日期之差
export function diffDate(date1: string, date2: string, options: Partial<DateOptions>) {
	const { unit = 'month', abs = true, int = true } = options

	if (!date1) throw new Error('date1 is required')
	if (!date2) throw new Error('date2 is required')

	const diff = dayjs(date1).diff(date2, unit, !int)
	// 修正差值
	const cycle = diff > 0 ? diff : diff + 1

	return abs ? Math.ceil(Math.abs(cycle)) : cycle
}

// 时间排序 min 从小到大 max 从大到小
export function sortDate(date: string[], type: string = 'min'): string[] {
	if (!date || date.length == 0) throw new Error('date is required')

	const method = type === 'min' ? 'isAfter' : 'isBefore'

	return date.sort((a, b) => {
		return dayjs(a)[method](b) ? 1 : -1
	})
}
