console.log('back!')

const func = (tab) => {
	
	const msg = {
		command: 'run'
	}
	
	chrome.tabs.sendMessage(tab.id, msg)
}


chrome.browserAction.onClicked.addListener(func)