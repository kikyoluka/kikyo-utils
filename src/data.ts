import { DataItem, SelectOptions } from '../typings/data'

/**
 * 将业务数组构造为下拉框选项数组
 * @param data 业务数据数组
 * @param label 选项标签字段
 * @param value 选项值字段
 * @returns 下拉框选项数组
 */
export function buildOptionsFromData(data: any[], label: string, value: string): SelectOptions[] {
	const buildOption = (item: DataItem): SelectOptions => ({
		label: item[label],
		value: item[value] as number,
	})

	return data.filter((item: DataItem) => item[label] && item[value]).map(buildOption)
}

/**
 * 将业务数组构造为父子结构的树状数组
 * @param data 业务数据数组
 * @param idField 数据 id 字段
 * @param parentIdField 数据父 id 字段
 * @param childrenField 子节点字段
 */
export function buildTreeFromData(data: any[], idField: string, parentIdField: string, childrenField: string): DataItem[] {
	const obj = {} as { [key: number]: DataItem }
	const result: DataItem[] = []

	data.sort((a, b) => a[idField] - b[idField])

	const buildObject = (item: DataItem) => {
		// 用于判断多数组合并时，数据 ID 重复问题
		if (!obj[item[idField]]) obj[item[idField]] = item as DataItem
	}

	const findParent = (item: DataItem) => {
		const parent = obj[item[parentIdField]]
		if (parent) {
			parent[childrenField] = parent[childrenField] || []
			parent[childrenField].push(item as DataItem)
		} else {
			result.push(item as DataItem)
		}
	}

	data.forEach(buildObject)
	data.forEach(findParent)
	return result
}
