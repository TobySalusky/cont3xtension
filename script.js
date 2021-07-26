function searchText(element) {

	if (element.hasChildNodes()) {
		
		element.childNodes.forEach(searchText)
		
	} else if (element.nodeType === Text.TEXT_NODE) {

		const typeValidation = {
			phone: /\b(\d{3})[-. ]?(\d{3})[-. ]?(\d{4})\b/g,
			domain: /\b[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+\b/g, //TODO: don't accept hyphen as first or last
			email: /\b[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-](\.?[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-])+@([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+)\b/g,
			//ip: /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/,
			MD5: /\b[A-Fa-f0-9]{32}\b/g,
			SHA1: /\b[A-Fa-f0-9]{40}\b/g,
			SHA256: /\b[A-Fa-f0-9]{64}\b/g,
		}

		/*if (!element.textContent.match(regex)) return;
		
		const range = document.createRange();
		range.selectNodeContents(element);
		const rects = range.getClientRects();
		
		if (rects.length > 0) {
			
			const body = document.body*/
			
			/*
			const span = document.createElement('span')
			span.innerHTML = element.textContent.replace(regex,
				'<span class="parent"><span class="highlightText">THE</span><div class="contextButton">open</div></span>')
			element.replaceWith(span)*/

		let tableIndex = 0;
		const table = {};

		const span = document.createElement('span')

		const genHtml = (indicator) => {
			const html = `<a href="http://localhost:3000/?q=${indicator}" target="_blank" class="highlightText">${indicator}</a>`
			const key = `__cont3xt_value_${tableIndex}__`;
			table[key] = html;
			tableIndex++;
			return key;
		}

		let newText = element.textContent.
			replaceAll(typeValidation.email, genHtml).
			replaceAll(typeValidation.domain, genHtml).
			replaceAll(typeValidation.phone, genHtml).
			replaceAll(typeValidation.MD5, genHtml).
			replaceAll(typeValidation.SHA1, genHtml).
			replaceAll(typeValidation.SHA256, genHtml);

		for (const key of Object.keys(table)) {
			newText = newText.replace(key, table[key]);
		}

		span.innerHTML = newText;

		element.replaceWith(span)
			
			/*console.log('Text node rect: ', rects[0]);
			const div = document.createElement('div')
			div.innerText = 'open'
			div.setAttribute('class', 'contextButton')
			
			div.style.left = `${rects[0].x}px`
			div.style.top = `${rects[0].y + 10}px`
			
			body.append(div)*/
		//}
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