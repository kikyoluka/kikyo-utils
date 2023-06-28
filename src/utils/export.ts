import { utils, writeFile } from 'xlsx'

interface DataItem {
	[key: string]: any
}

interface ColInfo {
	wch: number
}

/**
 * 导出 Excel文件
 * @param data 导出数据
 * @param name 文件名
 */
export function getJsonToExcel(data: DataItem[], name: string) {
	const sheet = utils.json_to_sheet(data)
	const colWidths: number[][] = []
	const colNames = Object.keys(data[0])

	data.forEach((row) => {
		let index = 0
		for (const key in row) {
			if (colWidths[index] == null) colWidths[index] = []
			switch (typeof row[key]) {
				case 'string':
				case 'number':
				case 'boolean':
					colWidths[index].push(getCellWidth(row[key]))
					break
				case 'object':
				case 'function':
					colWidths[index].push(0)
					break
			}
			index++
		}
	})

	sheet['!cols'] = [] as ColInfo[]

	colWidths.forEach((widths, index) => {
		widths.push(getCellWidth(colNames[index]))
		sheet['!cols']?.push({ wch: Math.max(...widths) })
	})

	const workBook = utils.book_new()

	utils.book_append_sheet(workBook, sheet)
	writeFile(workBook, `${name}.xlsx`)
}

// excel表格宽度计算
function getCellWidth(value: any): number {
	if (value == null) return 10
	if (/.*[\u4e00-\u9fa5]+.*$/.test(value)) return value.toString().length * 2.1
	return value.toString().length * 1.1
}
