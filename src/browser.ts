interface Browser {
	name: string
	version: string
}

// 获取浏览器及版本信息
export function getBrowser(): Browser | RegExpMatchArray | null {
	const ua = navigator.userAgent.toLowerCase()
	const isEdge = ua.match(/edge\([\d\.]+/)
	const isIe = ua.match(/msie\s([\d\.]+)/) || ua.match(/trident\/[\d](?=[^\?]+).*rv:([0-9.].)/)
	const isFireFox = ua.match(/firefox\/([\d\.]+)/)
	const isOpera = ua.match(/opera.([\d\.]+)/)
	const isChrome = ua.match(/chrome\/([\d\.]+)/) || ua.match(/crios\/([\d\.]+)/)
	const isSafari = ua.match(/version\/([\d\.]+).*safari/)

	const browser = isEdge || isIe || isFireFox || isOpera || isChrome || isSafari

	return browser
}
