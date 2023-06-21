type StrategyAction = [boolean, () => void]

/**
 * 策略模式
 * @param actions 每一种可能执行的操作
 * @example exeStrategyActions([[true, () => console.log('true')], [false, () => console.log('false')]]
 */
export function exeStrategyActions(actions: StrategyAction[]) {
	actions.some((item) => {
		const [flag, action] = item
		if (flag) {
			action()
		}
		return flag
	})
}
