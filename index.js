
let myLeads = [];

const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
const ulEL = document.getElementById('ul-el');

const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'))
const deleteBtn = document.getElementById('delete-btn')
const tabBtn = document.getElementById('tab-btn');

if(leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage
  render(myLeads)
}

// Kerää chromen sivun url osoitteen ja asettaa sen listaan
tabBtn.addEventListener('click', function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
  })

  
})

// Luo listan DOM
function render(leads) {
  let listItems = "";
  for(let i = 0; i < leads.length; i++) {
    listItems += `
                  <li>
                    <a target='_blank' href='${leads[i]}'> 
                      ${leads[i]}
                    </a>
                  </li>
                  `
  } 
  ulEL.innerHTML = listItems
}

// Tyhjentää listan 
deleteBtn.addEventListener('dblclick', function() {
  localStorage.clear();
  myLeads = [];
  render(myLeads)
})

// Ottaa käyttäjän kirjaaman arvon listaan
inputBtn.addEventListener('click', function() {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads) )
  render(myLeads)
})

