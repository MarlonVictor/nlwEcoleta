const buttonSearch = document.querySelector('#page-home main a')
const closeModal = document.querySelector('#back')
const modal = document.querySelector('#modal')

buttonSearch.addEventListener('click', () => {
    modal.classList.remove('hide')
})

closeModal.addEventListener('click', () => {
    modal.classList.add('hide')
})

function populateUfs() {
    const searchUf = document.querySelector('[name=searchUf]')

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {
        for( const state of states) {
            searchUf.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}
populateUfs()