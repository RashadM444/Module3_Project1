let theList = document.querySelector('#list')

//* This function will add a new item to the list
let addListItem = (e) => {
    let inputText = document.querySelector('#input'); //html 24 takes the input value
    let outputText = document.createTextNode(`${inputText.value}`); // creates a text node of input value
    let textArea = document.createElement('textarea'); //creates a new text area
    let newFourdots = document.createElement('img'); //creates a new dots icon for dragging
    newFourdots.src = "images/fourdots.png";
    newFourdots.classList.add('movable');
    newFourdots.classList.add('fourdots');
    let newRemover = document.createElement('button'); //creates a bew x button to delete
    newRemover.innerHTML = '&#10005;';
    newRemover.classList.add('remove');
    // newRemover.classList.add('remover')
    textArea.appendChild(outputText); //adds text ti textarea
    textArea.classList.add('activity');
    let newLi = document.createElement('li'); //!creates a new list item
    newLi.appendChild(newFourdots);
    newLi.appendChild(textArea);
    newLi.appendChild(newRemover);
    newLi.classList.add('listItem');
    newLi.classList.add('newLi');
    newLi.draggable = 'true';
    theList.appendChild(newLi);
    inputText.value = '';
    newRemover.addEventListener('click', removeListItem);
    dragListItems();
}

//* This Function will remove the item from the list
let removeListItem = (e) => {
    e.target.parentNode.remove();
}


//* These two functions will change the color of the sort icon upon mouseover and out
//once the sort button is clicked, the class 'arrowUp' appears for sort, using the same class as if condition
// we can change the icon image accordingly. I am not comfortable with svg yet, so had to go with png
let changeSortColor = (e) => {
    if (sortButton.classList.contains('arrowUp')) {
        e.target.src = 'images/sortupblack.png'
    } else {
        e.target.src = 'images/sortdownblack.png'
    }

}

let changeSortColorBack = (e) => {
    if (sortButton.classList.contains('arrowUp')) {
        e.target.src = 'images/sortupgrey.png'
    } else {
        e.target.src = 'images/sortdowngrey1.png'

    }

}

//* This Function will sort the list in increasing and decreasing order
let sortList = () => {
    let newLis = document.querySelectorAll('.newLi'); //collection of new list items
    sortButton.classList.toggle('arrowUp')
    let ul = document.querySelector('#list'); //defines the whole element of ul tag within html
    let array = Array.from(newLis); // creates array of new list items

    let sortedArray;


    if (sortButton.classList.contains('arrowUp')) {
        sortButton.src = 'images/sortupblack.png';
        sortedArray = array.sort((a, b) => a.childNodes[1].value > b.childNodes[1].value ? 1 : -1);

    } else {
        sortButton.src = 'images/sortdownblack.png';
        sortedArray = array.sort((a, b) => b.childNodes[1].value < a.childNodes[1].value ? -1 : 1);
    }

    ul.innerHTML = '';
    for (let i = 0; i < sortedArray.length; i++) {
        ul.appendChild(sortedArray[i])
    }

}

//* This function helps to drag an item and drop within the list area
let dragListItems = () => {
        let draggables = document.querySelectorAll('.movable');
        draggables.forEach((draggable) => {
            draggable.parentElement.addEventListener('dragstart', () => {
                console.log('drag started');
                draggable.parentElement.classList.add('dragging');
            })
        })
        draggables.forEach((draggable) => {
            draggable.parentElement.addEventListener('dragend', () => {
                console.log('drag ended');
                draggable.parentElement.classList.remove('dragging');
            })
        })
        let listArea = document.querySelector('#list');
        listArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (!e.target.matches('.fourdots')) return
            let afterElement = getDragAfterElement(listArea, e.clientY);
            console.log(afterElement);
            let draggable = document.querySelector('.dragging');
            if (afterElement == null) {
                listArea.appendChild(draggable);
            } else {
                listArea.insertBefore(draggable, afterElement);
            }
        })
    }
    // This functions helps to determine the object that our mouse is closest to, so the object is placed above it
let getDragAfterElement = (container, y) => {
    let draggableElements = [...container.querySelectorAll('.newLi:not(dragging)')];

    return draggableElements.reduce((closest, child) => {
        let box = child.getBoundingClientRect();
        let offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest
        }


    }, { offset: Number.NEGATIVE_INFINITY }).element;
}



let sortButton = document.querySelector('#sort');
sortButton.addEventListener('mouseover', changeSortColor);
sortButton.addEventListener('mouseout', changeSortColorBack);
sortButton.addEventListener('click', sortList);
let button = document.querySelector('#for-adding');
button.addEventListener('click', addListItem);