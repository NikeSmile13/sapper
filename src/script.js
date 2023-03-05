startGame(16, 16, 40);

function startGame(width, height, bomb_count) {
    const field = document.querySelector('.field');
    const cellsCount = width * height;
    field.innerHTML = '<button id = "submit" oncontextmenu="incrementClick()" class = "fied__button"></button>'.repeat(cellsCount);
    const cells = [...field.children];

    let closedCount = cellsCount;
    var sadSmile = document.getElementById("equal");

    const bombs = [...Array(cellsCount).keys()]
        .sort(() => Math.random() - 0.5)
        .slice(0, bomb_count);

field.addEventListener('click', (event) => {
    if (event.target.tagName !== 'BUTTON') {
        return;    
    }

    const index = cells.indexOf(event.target);
    const column = index % width;
    const row = Math.floor(index / width);
    open(row, column);
});

function isValid(row, column) {
    return row >= 0 && row < height && column >= 0 && column < width;
}

function getCount(row, column) {
    let count = 0;
    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            if (isBomb(row + y, column + x)) {
                count++
            }
        }
    }
    return count;
}

function open(row, column) {
    if(!isValid(row, column)) {
        return;
    }

    const index = row * width + column;
    const cell = cells[index];

    if (cell.disabled === true) return;

    cell.disabled = true;
    
    if (isBomb(row, column)) {
        cell.innerHTML = '<img src="img/mina.png">';
        sadSmile.innerHTML = '<img src="img/sad_smiley_face.png">';
        return;
    }
    
    closedCount--;
    if (closedCount <= bomb_count) {
        alert('Вы выиграли!');
        sadSmile.innerHTML = '<img src="img/smiley_face_with_glasses.png">';
        return;
    } 

    const count = getCount(row, column);
    
    if (count !==0) {
        cell.innerHTML = count;
        return;
    }

    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            (open(row + y, column + x));
        }
    }
}
 
function isBomb(row, column) {
    if (!isValid(row, column)) return false;
    const index = row * width + column;

    return bombs.includes(index);
}


}