let myLeads = []
const inputEl = document.querySelector('#input-el')
const inputBtn = document.querySelector('#input-btn')
const deleteBtn = document.querySelector('#delete-btn')
const tabBtn = document.querySelector('#tab-btn')
const ulEl = document.querySelector('#ul-el')

const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'))

if(leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage
  render(myLeads)
}

tabBtn.addEventListener("click", function(){    
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){4
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
  })
})

function render(items) {
  let listItems = ''
  for(let i = 0; i < items.length; i += 1) {
    listItems += `
      <li>
        <a href="${items[i]}"target="_blank">${items[i]}</a>
      </li>
    `
  }
  ulEl.innerHTML = listItems
}

deleteBtn.addEventListener('click', function(){
  localStorage.clear()
  myLeads = []
  render(myLeads)
})

inputBtn.addEventListener('click', function() {
  myLeads.push(inputEl.value)
  inputEl.value = ''
  localStorage.setItem("myLeads", JSON.stringify(myLeads))
  render(myLeads)
})

