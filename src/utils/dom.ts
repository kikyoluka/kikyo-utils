interface HTMLScriptEle extends HTMLScriptElement {
	readyState?: string
	onreadystatechange?: (() => void) | null
}

/**
 * 动态加载 js 脚本文件
 * @param url js 文件地址
 * @returns Promise 对象
 * @example loadJs('https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js').then(() => {}).catch(() => {})
 */
export const loadJs = (url: string): Promise<void> => {
	return new Promise((resolve, reject) => {
		const script: HTMLScriptEle = document.createElement('script')
		script.type = 'text/javascript'

		// 监听 script 加载状态改变的事件
		if (script.readyState) {
			script.onreadystatechange = () => {
				if (script.readyState === 'loaded' || script.readyState === 'complete') {
					handleLoad()
				}
			}
		} else {
			script.onload = handleLoad
		}

		// 处理加载成功的回调
		function handleLoad() {
			script.onreadystatechange = null
			resolve()
		}

		// 监听 script 加载失败事件
		script.onerror = () => {
			reject()
		}

		// 指定 js 文件地址并添加到 document 中
		script.src = url
		document.body.appendChild(script)
	})
}
