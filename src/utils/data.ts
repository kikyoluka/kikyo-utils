import { DataItem, SelectOptions } from '../../typings/data'

/**
 * 将业务数组构造为下拉框选项数组
 * @param data 业务数据数组
 * @param label 选项标签字段
 * @param value 选项值字段
 * @returns 下拉框选项数组
 * @example buildOptionsFromData([{ name: '张三', id: 1 }], 'name', 'id') // => [{ label: '张三', value: 1 }]
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
 * @returns 树状数组
 * @example buildTreeFromData([{ id: 1, parentId: 0 }], 'id', 'parentId', 'children') // => [{ id: 1, parentId: 0, children: [] }]
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

/**
 * 从对象中选取指定的键,返回包含选取键值对的新对象
 * @param obj 源对象
 * @param keys 选取的键
 * @returns 包含选取键值对的新对象
 * @example pickFieldFromObject({ name: '张三', id: 1 }, 'name') // => { name: '张三' }
 */
export function pickFieldFromObject<T>(obj: T, ...keys: (keyof T)[]) {
	const res = {} as Pick<T, (typeof keys)[number]>
	keys.forEach((key) => {
		res[key] = obj[key]
	})
	return res
}

/**
 * 从对象中删除指定的键,返回删除后的新对象
 * @param obj 源对象
 * @param keys 删除的键
 * @returns 删除后的新对象
 * @example omitFieldFromObject({ name: '张三', id: 1 }, 'name') // => { id: 1 }
 */
export function omitFieldFromObject<T>(obj: T, ...keys: (keyof T)[]): Omit<T, (typeof keys)[number]> {
	const objCopy = { ...obj }
	keys.forEach((key) => {
		delete objCopy[key]
	})
	return objCopy
}

/**
 * 获取任意数组的交集
 * @param arrays 需要计算交集的数组
 * @returns 所传入数组的交集
 * @example getArraysOverlap([1, 2, 3], [2, 3, 4]) // => [2, 3]
 */
export function getArraysOverlap<T>(...arrays: T[][]): T[] {
	if (!arrays || arrays?.length === 0) return []

	const res: T[] = []
	const firstArr = arrays[0]

	// 使用第一个数组的每个元素迭代
	firstArr.forEach((ele) => {
		// 检查其他每个数组是否也包含这个元素
		let existsInAllArrays = true
		for (let i = 1; i < arrays.length; i++) {
			existsInAllArrays = existsInAllArrays && arrays[i].includes(ele)
		}
		// 如果存在于所有数组,推入交集结果
		if (existsInAllArrays) res.push(ele)
	})

	return res
}

/**
 * 获取任意数组的并集 并去除重复元素
 * @param arrays 需要计算并集的数组
 * @returns 所传入数组的并集
 * @example getArraysUnion([1, 2, 3], [2, 3, 4]) // => [1, 2, 3, 4]
 */
export function getArraysUnion<T>(...arrays: T[][]): T[] {
	const res: Set<T> = new Set()
	arrays.forEach((arr) => {
		arr.forEach((ele) => {
			res.add(ele)
		})
	})

	return Array.from(res)
}

/**
 * 将数组按指定大小切分成多个数组块
 * @param arr 需要切分的数组
 * @param size 每个数组块的大小
 * @returns 切分得到的数组块
 * @example getChunkArray([1, 2, 3, 4, 5], 2) // => [[1, 2], [3, 4], [5]]
 */
export const getChunkArray = <T>(arr: T[], size: number): T[][] => {
	const res: T[][] = []
	for (let i = 0; i < Math.ceil(arr.length / size); i++) {
		res.push(arr.slice(i * size, i * size + size))
	}
	return res
}
