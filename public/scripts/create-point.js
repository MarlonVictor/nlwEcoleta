function populateUfs() {
    const ufSelect = document.querySelector('[name=uf]')

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {
        for( const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}
populateUfs()

function getCities(e) {
    const citySelect = document.querySelector('[name=city]')
    const stateInput = document.querySelector('[name=state]')
    const ufValue = e.target.value

    const indexOfSelectState = e.target.selectedIndex
    stateInput.value = e.target.options[indexOfSelectState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`


    citySelect.innerHTML = '<option value>Selecione a Cidade</option>'
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {    
        for( const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}

document.querySelector("select[name=uf]").addEventListener('change', getCities)


// Itens de coleta

const itemsToCollect = document.querySelectorAll('.items-grid li')

for(const item of itemsToCollect) {
    item.addEventListener('click', handleSelectedItem)
}

const collectedItems = document.querySelector('[name=items]') // Atribuindo o valor para o input hidden

let selectedItems = []

function handleSelectedItem(e) {
    const itemLi = e.target
    itemLi.classList.toggle('selected')

    const itemId = itemLi.dataset.id

    const alreadySelected =selectedItems.findIndex( i => { // Pegar os itens selecionados
        const itemFound = i == itemId
        return itemFound
    })

    if(alreadySelected >= 0) {
        const filteredItems = selectedItems.filter ( i => { // Tirar da seleção
            const itemIsDifferent = i != itemId 
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        selectedItems.push(itemId) // Adicionar à seleção
    }

    collectedItems.value = selectedItems
}