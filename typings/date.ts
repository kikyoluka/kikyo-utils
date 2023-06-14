import { ManipulateType } from 'dayjs'

/**
 * 格式化参数项
 * @param {String | Date} date 日期
 * @param {Boolean} hms 是否显示时分秒
 * @param {Number} gap 间隔值
 * @param {String} unit 日期类型
 * @param {Boolean} abs 是否取绝对值
 * @param {Boolean} int 是否取整
 */
export interface DateOptions {
	date: string | Date
	hms?: boolean
	gap?: number
	unit?: ManipulateType
	abs?: boolean
	int?: boolean
}

/**
 * 格式化类型
 * @param {String} date 日期
 * @param {String} time 时间
 * @param {String} datetime 日期时间
 * @param {String} year 年
 * @param {String} month 月
 * @param {String} day 日
 */
export interface FormatType {
	date: 'YYYY-MM-DD'
	time: 'HH:mm:ss'
	datetime: 'YYYY-MM-DD HH:mm:ss'
	year: 'YYYY'
	month: 'MM'
	day: 'DD'
	week: 'dddd'
}

// 星期类型映射
export interface WeekDayMap {
	Monday: string
	Tuesday: string
	Wednesday: string
	Thursday: string
	Friday: string
	Saturday: string
	Sunday: string
}

// 格式化类型
export type Format = 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm:ss'

// 日期类型
export type DateType = 'date' | 'time' | 'datetime' | 'year' | 'month' | 'day' | 'week'

// 星期类型
export type WeekDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
