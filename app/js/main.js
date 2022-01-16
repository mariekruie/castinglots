//  switching between the screens 
const screens = document.querySelectorAll('.screen');
let heroBack = document.getElementById('heroBack');
let heroFront = document.getElementById('heroFront');
const closeBtnLots = document.getElementById('closeBtnLots');
const closeBtnDices = document.getElementById('closeBtnDices');

heroBack.addEventListener('click', ()=> screens[0].classList.remove('up'));

heroFront.addEventListener('click', () => {
    screens[1].classList.add('up')
})

closeBtnLots.addEventListener('click', ()=>{
    if (window.confirm("Вы действитльно хотите вернуться на главный экран?")) {
        screens[0].classList.add('up');
        resetLotsBox();
        input.value= '';
      }
})

closeBtnDices.addEventListener('click', ()=>{
    if (window.confirm("Вы действитльно хотите вернуться на главный экран?")) {
        screens[1].classList.remove('up');
      }
})

// Hero screen clip-path functionality

let winHeight = window.innerHeight;
let winWidth = window.innerWidth;
let mousePos = {x:winWidth/2, y:winHeight/2};


window.addEventListener('resize', () => {
    winHeight = window.innerHeight;
    winWidth = window.innerWidth;
})

clip(mousePos);

document.addEventListener('mousemove', (e) => {
    mousePos = {x:e.pageX, y:e.pageY};
    clip(mousePos);
})

function clip(mousePos) {
  let pourcPos = {x:mousePos.x * 100 / winWidth * 2,
                  y:mousePos.y * 100 / winHeight};
  let gapX = pourcPos.x * 30 / 200 - 15;
  let gapY = (15 *(pourcPos.y * 30 / 100 - 15)) / 100;
  let pointTop;
  let pointBottom;

  if (pourcPos.y<50) {
    pointTop = 150 - pourcPos.x + gapY * gapX;
    pointBottom = 150 - pourcPos.x;
  } else {
    pointTop = 150 - pourcPos.x;
    pointBottom = 150 - pourcPos.x - gapY * gapX;
  }

  if (pourcPos.x<100) {
    heroBack.classList.add('on');
    heroFront.classList.remove('on');
  }else if (pourcPos.x>100) {
    heroBack.classList.remove('on');
    heroFront.classList.add('on');
  } 

    heroFront.style.clipPath = `polygon(${pointTop}% 0%, 100% 0%, 100% 100%, ${pointBottom}% 100%)`;
}

// lots screen functionality 
const form = document.getElementById('form');
const input = document.getElementById('input');
const lotsBox = document.getElementById('lotsBox');
const shuffleBtn = document.getElementById('shuffleBtn');
const resetBtn = document.getElementById('resetBtn');
const addBtn = document.getElementById('addBtn');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addLotItem();
});

addBtn.addEventListener('click', addLotItem)

function addLotItem(){
        let itemText = input.value;

        if(!itemText){
            alert('Введите ваш жребий')
        }
        else if(lotsBox.children[0] && lotsBox.children[0].classList.contains('lots__item-selected')){
            resetLotsBox();
            console.log('deleting selected el')
        }
    

        else if(itemText && lotsBox.children.length < 12 ){
            const itemEl = document.createElement('div');
            itemEl.classList.add('lots__item');
            itemEl.innerHTML = itemText;
            lotsBox.appendChild(itemEl);
            input.value= '';

            itemEl.addEventListener('dblclick', () => {
                itemEl.remove();
            });
        } else{
            alert('Возможное число жребиев равно 12')
        }
}



shuffleBtn.addEventListener('click', () => {
    shuffleItems();
});

function shuffleItems(){
    const randomIdx = Math.floor(Math.random()*lotsBox.children.length);
    const childrenArr = Array.from(lotsBox.children);


    childrenArr.forEach( item => {
        item.classList.add('lots__item-shuffle');
    });
    
    setTimeout( () => {
        childrenArr.forEach( (item, idx) => {
            if(idx != randomIdx){
                item.remove();
            }
        });
    }, 3000);
    

    setTimeout( () =>{
        childrenArr[randomIdx].classList.remove('lots__item-shuffle');
        childrenArr[randomIdx].classList.add('lots__item-selected');
    }, 4000);
}

resetBtn.addEventListener('click', () => {
    resetLotsBox();
    input.value= '';
});

function resetLotsBox(){
    while (lotsBox.firstChild) {
        lotsBox.removeChild(lotsBox.firstChild);
    }
}

// dice screen functionality 

const dice = document.getElementById('dice');
const cube1 = document.getElementById('cube1');
const cube2 = document.getElementById('cube2');
const rollBtn = document.getElementById('rollBtn');

let min = 1;
let max = 24;


rollBtn.onclick = function() {

  let xRand = getRandom(max, min);
  let yRand = getRandom(max, min);

  console.log(getRandom(max, min))
    
  cube1.style.transform = `rotateX(${xRand}deg) rotateY(${yRand}deg)`;

  xRand = getRandom(max, min);
  yRand = getRandom(max, min);
  
  cube2.style.transform = `rotateX(${xRand}deg) rotateY(${yRand}deg)`;
}

function getRandom(max, min) {
  return (Math.floor(Math.random() * (max-min)) + min) * 90;
}
