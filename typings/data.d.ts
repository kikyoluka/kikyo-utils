export interface SelectOptions {
	label: string
	value: number
}

export interface DataItem {
	id: number
	parentId?: number
	children?: DataItem[]
	[propName: string]: any
}
