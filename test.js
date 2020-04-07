let draggables = document.querySelectorAll('.draggable');
let containers = document.querySelectorAll('.container');

draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', () => {
        console.log('drag started');
        draggable.classList.add('dragging');
    })

    draggable.addEventListener('dragend', () => {
        console.log('drag ended')
        draggable.classList.remove('dragging');
    })
})

containers.forEach((container) => {
    container.addEventListener('dragover', (e) => {
        e.preventDefault();
        let afterElement = getDragAfterElement(container, e.clientY);
        console.log(afterElement);
        let draggable = document.querySelector('.dragging');
        if (afterElement == null) {
            container.appendChild(draggable);
        } else {
            container.insertBefore(draggable, afterElement);

        }
    })
})

let getDragAfterElement = (container, y) => {
    let draggableElements = [...container.querySelectorAll('.draggable:not(dragging)')];

    return draggableElements.reduce((closest, child) => {
        let box = child.getBoundingClientRect();
        let offset = y - box.top - box.height / 2;
        console.log(offset);
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest
        }


    }, { offset: Number.NEGATIVE_INFINITY }).element;
}