function searchText(element) {
	
	if (element.hasChildNodes()) {
		
		element.childNodes.forEach(searchText)
		
	} else if (element.nodeType === Text.TEXT_NODE) {
		
		const regex = /\bthe\b/gi
		
		if (!element.textContent.match(regex)) return;
		
		
		const range = document.createRange();
		range.selectNodeContents(element);
		const rects = range.getClientRects();
		
		if (rects.length > 0) {
			
			const body = document.body
			
			/*
			const span = document.createElement('span')
			span.innerHTML = element.textContent.replace(regex,
				'<span class="parent"><span class="highlightText">THE</span><div class="contextButton">open</div></span>')
			element.replaceWith(span)*/
			
			const span = document.createElement('span')
			span.innerHTML = element.textContent.replace(regex,
				'<a href="http://localhost:3000/?q=test.com" target="_blank" class="highlightText">the</a>')
			element.replaceWith(span)
			
			/*console.log('Text node rect: ', rects[0]);
			const div = document.createElement('div')
			div.innerText = 'open'
			div.setAttribute('class', 'contextButton')
			
			div.style.left = `${rects[0].x}px`
			div.style.top = `${rects[0].y + 10}px`
			
			body.append(div)*/
		}
	}
}


function receiveMessage(msg, sender, sendResponse) {
	
	if (msg.command === 'run') {
		searchText(document.body)
		
		/*const body = document.body
		const div = document.createElement('div')
		div.innerText = 'open'
		div.setAttribute('class', 'contextButton')
		body.append(div)*/
	}
}


chrome.runtime.onMessage.addListener(receiveMessage)