const form = document.getElementById('form');
const input = document.getElementById('input');
const container = document.getElementById('right-container');
const shuffleBtn = document.getElementById('shuffle-btn');
const resetBtn = document.getElementById('reset-btn');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    addLotItem();
});

function addLotItem(item){
        let itemText = input.value;

        if(itemText && container.children.length < 12 ){
            const itemEl = document.createElement('div');
            itemEl.classList.add('item');
            itemEl.innerHTML = itemText;
            container.appendChild(itemEl);
            input.value= '';

            itemEl.addEventListener('dblclick', () => {
                itemEl.remove();
            });
        }
}



shuffleBtn.addEventListener('click', () => {
    shuffleItems();
});

function shuffleItems(){
    const randomIdx = Math.floor(Math.random()*container.children.length);
    const childrenArr = Array.from(container.children);


    childrenArr.forEach( item => {
        item.classList.add('item-shuffle');
    });
    
    setTimeout( () => {
        childrenArr.forEach( (item, idx) => {
            if(idx != randomIdx){
                item.remove();
            }
        });
    }, 3000);
    

    setTimeout( () =>{
        childrenArr[randomIdx].classList.remove('item-shuffle');
        childrenArr[randomIdx].classList.add('item-selected');
    }, 4000);
}

resetBtn.addEventListener('click', () => {
    resetContainer();
    input.value= '';
});

function resetContainer(){
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}