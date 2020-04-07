let button = document.querySelector('#for-adding');
let theList = document.querySelector('#list')



let addListItem = (e) => {
    let inputText = document.querySelector('#input');
    let outputText = document.createTextNode(`${inputText.value}`);
    let textArea = document.createElement('textarea');
    let newFourdots = document.createElement('img');
    newFourdots.src = "images/fourdots.png";
    let newRemover = document.createElement('button');
    newRemover.innerHTML = '&#10005;';
    newRemover.classList.add('remove');
    newRemover.classList.add('remover')
    textArea.appendChild(outputText);
    textArea.classList.add('activity');
    let newLi = document.createElement('li');
    newLi.appendChild(newFourdots);
    newLi.appendChild(textArea);
    newLi.appendChild(newRemover);
    newLi.classList.add('listItem');
    theList.appendChild(newLi);
    inputText.value = '';
    newRemover.addEventListener('click', removeListItem);
}

let removeListItem = (e) => {
    e.target.parentNode.remove();
}

button.addEventListener('click', addListItem);