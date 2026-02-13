const inputText = document.getElementById("input-element")
let urls = []
const urlsFromLocalStorage = JSON.parse(localStorage.getItem("urls") )
const saveBtn = document.getElementById("save-btn") //const --> constant element, cant be reasigned
const result = document.getElementById("result-list")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

if (urlsFromLocalStorage) {
	urls = urlsFromLocalStorage
	renderUrls()
}

console.log(localStorage)

saveBtn.addEventListener("click", function(){
	urls.push(inputText.value)
	localStorage.setItem("urls", JSON.stringify(urls))
	//localStorage is a variable from the browser to save the items through different pages 
	//JSON.stringify() converts arrys and objects into Strings, JASON.parse() does the opposite converting from Strings into objects or arrays
		
	renderUrls()
	//result.innerHTML +=  "<li><a href='" + inputText.value + "' target='_blank'>" + inputText.value + "</a></li>"
	/*result.innerHTML +=  `
		<li>
			<a href="${inputText.value}" target="_blank">${inputText.value}</a>
		</li>`
	*/
	
	inputText.value = ""
})

tabBtn.addEventListener("click", function(){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
	
	urls.push(tabs[0].url)
	localStorage.setItem("urls", JSON.stringify(urls))
	renderUrls()
	
	});
})

deleteBtn.addEventListener("dblclick", function(){
	localStorage.clear()
	urls = []
	renderUrls()
})

/* I dont need to go through the whole list every time an item is being added, in stead I can add an item
to the  list at the time*/

function renderUrls(){
	let listItems = ""

	for (let i = 0; i < urls.length; i++) {
		listItems += `
		<li>
			<a href="${urls[i]}" target="_blank">${urls[i]}</a>
		</li>`
	}
	
	result.innerHTML = listItems
}

/*	Another way to list the items inside the for:

	const li = document.createElement("li")
	li.textContent = urls[i]
	result.append(li)
*/