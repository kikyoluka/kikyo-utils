/**
 * 去除字符串中的 html标签
 * @param str 字符串
 * @returns 去除后的字符串
 */
export function removeHTML(str: string) {
	const htmlReg = /(<.*?>)/g
	return str.replace(htmlReg, '')
}

/**
 * 验证手机号或固定电话格式
 * @param phone 手机号或固定电话
 */
export function validatePhone(phone: string): boolean {
	const phoneReg = /^((0\d{2,3}-)\d{7,8})|(1[3|4|5|6|7|8|9]\d{9})$/
	return phoneReg.test(phone)
}

/**
 * 验证邮箱格式
 * @param email 邮箱
 */
export function validateEmail(email: string): boolean {
	const emailReg = /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/
	return emailReg.test(email)
}
