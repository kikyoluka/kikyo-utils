interface FileMap {
	[key: string]: string[]
}

type FileClass = 'IMAGE' | 'DOCUMENT' | 'VIDEO' | 'AUDIO' | 'ARCHIVE'

const fileType: FileMap = {
	PDF: ['.pdf'],
	PPT: ['.ppt', '.pptx'],
	WORD: ['.doc', '.docx'],
	EXCEL: ['.xls', '.xlsx'],
	VIDEO: ['.mp4', '.avi', '.mkv', '.flv', '.wmv'],
	AUDIO: ['.mp3', '.wav', '.wma', '.aac', '.ogg'],
	ARCHIVE: ['.zip', '.rar', '.7z', '.tar', '.gz'],
	IMAGE: ['.jpg', '.png', '.jpeg', '.gif', '.bmp', '.svg'],
}

/**
 * 获取文件后缀名
 * @param name 文件名
 * @returns 文件后缀名
 * @example getSuffix('test.jpg') // => 'jpg'
 */
export function getSuffix(name: string): string {
	const reg = /(?<=\.)[^.]+$/
	const target = name.match(reg)

	return target ? target[0].toLowerCase() : ''
}

/**
 * 获取文件类型
 * @param name 文件名
 * @returns 文件类型
 * @example getType('test.jpg') // => 'IMAGE'
 */
export function getType(name: string): FileClass | undefined {
	const suffix = getSuffix(name)
	const entries = Object.entries(fileType)

	for (const [type, extensions] of entries) {
		if (extensions.includes(suffix)) return type as FileClass
		return undefined
	}
}

/**
 * 获取文件大小
 * @param size 文件大小 单位 B
 * @param fix 保留小数位数 默认保留两位
 * @returns 文件大小 单位 MB
 * @example getFileSize(1024) // => 0.00
 */
export function getFileSize(size: number, fix: number = 2): number {
	return Number((size / 1024 / 1024).toFixed(fix))
}
