const table = document.querySelector('table')
const button1 = document.querySelector('#table1')
const button2 = document.querySelector('#table2')
const button3 = document.querySelector('#table3')
const newgame = document.querySelector('#newgamefield')
const firstpage = document.querySelector('.playerpage')
const secondpage = document.querySelector('.secondpage')
const form = document.querySelector("#form")
const namepart = document.querySelector('.secondpage .header h2')
const check = document.querySelector('#check')
const answer = document.querySelector('.answerfield h2')
const mytimer = document.querySelector('.timer h1')
const restart = document.querySelector('#restart')
const savebutton = document.querySelector('#save')
const continuegame = document.querySelector('#continue')

let blacktiles = []
let min = 00;
let sec = 00;
let msec = 00;
let timer;
let player = ""

let number = 0;
let blacktilesarray = []
function generatetable(numberrowcol, blacktilesarr) {
    table.innerHTML = " "
    number = numberrowcol
    blacktilesarray = blacktilesarr
    for (i = 0; i < number; i++) {
        const newTR = document.createElement('tr')
        for (j = 0; j < number; j++) {
            const newTD = document.createElement('td')
            newTD.innerText = ''
            newTD.dataset.row = i
            newTD.dataset.col = j
            newTR.appendChild(newTD)
        }
        table.appendChild(newTR)

    }

    for (const el of blacktilesarr) {
        table.rows[el.row].cells[el.column].classList.add('blacktiles')
        if (el.innertext == 0) {
            table.rows[el.row].cells[el.column].innerText = ''
        } else {
            table.rows[el.row].cells[el.column].innerText = el.innertext
        }
        blacktiles.push(table.rows[el.row].cells[el.column])

    }

}
function findbulbsaround(element, row, column) {
    nearbytiles = findnearby(element, row, column)
    numberofbulbs = []
    nearbyblacktiles = nearbytiles.filter(a => a.classList.contains('blacktiles'))
    for (const tile of nearbyblacktiles) {
        nearbyofblacktile = findnearby(tile, parseInt(tile.dataset.row), parseInt(tile.dataset.col))
        numberofbulbs.push(nearbyofblacktile.filter(a => a.innerText == '💡').length)
    }
    return [nearbyblacktiles, numberofbulbs]
}

function colorgreen(element, row, column) {
    nearbyblacktiles = findbulbsaround(element, row, column)[0]
    numberofbulbs = findbulbsaround(element, row, column)[1]

    for (i = 0; i < nearbyblacktiles.length; i++) {
        if (nearbyblacktiles[i].innerText != '') {
            if (nearbyblacktiles[i].innerText == numberofbulbs[i]) {

                nearbyblacktiles[i].style.color = 'green'
            } else {
                nearbyblacktiles[i].style.color = 'white'
            }
        }
    }
}

function switchcolor(event, element) {
    startrowind = checkforblacktileintherow(element)[0]
    endrowind = checkforblacktileintherow(element)[1]

    startcolind = checkforblacktileinthecolumn(element)[0]
    endcolind = checkforblacktileinthecolumn(element)[1]



    column = parseInt(element.dataset.col)
    row = parseInt(element.dataset.row)


    if (element.innerText == '💡') {
        element.innerText = ''


        for (i = startrowind; i < endrowind; i++) {
            cantremove = false
            for (j = column - 1; j >= 0; j--) {
                if (table.rows[i].cells[j].classList.contains('blacktiles')) {
                    break
                }
                if (table.rows[i].cells[j].innerText == '💡') {
                    cantremove = true
                    break
                }
            }
            for (j = column + 1; j <= number - 1; j++) {
                if (table.rows[i].cells[j].classList.contains('blacktiles')) {
                    break
                }
                if (table.rows[i].cells[j].innerText == '💡') {
                    cantremove = true
                    break
                }
            }
            if (cantremove) {
                continue
            } else {
                table.rows[i].cells[column].classList.remove('color')
                table.rows[i].cells[column].classList.remove('button')
                table.rows[i].cells[column].classList.remove('buttoncol')

            }
        }
        for (i = startcolind; i < endcolind; i++) {
            cantremove = false
            for (j = row - 1; j >= 0; j--) {
                if (table.rows[j].cells[i].classList.contains('blacktiles')) {
                    break
                }
                if (table.rows[j].cells[i].innerText == '💡') {
                    cantremove = true
                    break
                }
            }
            for (j = row + 1; j <= number - 1; j++) {
                if (table.rows[j].cells[i].classList.contains('blacktiles')) {
                    break
                }
                if (table.rows[j].cells[i].innerText == '💡') {
                    cantremove = true
                    break
                }
            }
            if (cantremove) {
                continue
            } else {
                table.rows[row].cells[i].classList.remove('color')
                table.rows[i].cells[column].classList.remove('button')
                table.rows[i].cells[column].classList.remove('buttoncol')
            }
        }
        colorgreen(element, row, column)

    } else {
        if (canput(element, row, column)) {
            if (element.classList.contains('color')) {
                element.classList.toggle('button')
                element.classList.toggle('buttoncol')
            }
            if (!element.classList.contains('blacktiles') && !element.classList.contains('color')) {
                element.innerText = '💡'
                for (i = startrowind; i < endrowind; i++) {

                    table.rows[i].cells[column].classList.add('color')
                }
                for (i = startcolind; i < endcolind; i++) {

                    table.rows[row].cells[i].classList.add('color')


                }

                colorgreen(element, row, column)
            }

        }
    }
}

function permaSave(name, value) {
    window.localStorage.setItem(name, JSON.stringify(value))
}
function permaLoad(name) {
    return JSON.parse(window.localStorage.getItem(name))
}

function savedata() {

    const tabledata = [number, blacktilesarray]
    console.log(tabledata[1])
    let celldata = []
    for (i = 0; i < number; i++) {
        for (j = 0; j < number; j++) {
            celldata.push({
                color: table.rows[i].cells[j].classList.contains('color') ? true : false,
                redtiles: table.rows[i].cells[j].classList.contains('buttoncol') ? true : false,
                innerText: table.rows[i].cells[j].innerText
            })
        }
    }


    let minpassed = min;
    let secpassed = sec;
    let msecpassed = msec;
    let nameplayer = player;

    const gamedata = [minpassed, secpassed, msecpassed, nameplayer]

    permaSave('tabledata', tabledata);
    permaSave('celldata', celldata);
    permaSave('gamedata', gamedata)

    stoptimer();
    secondpage.style.display = "none"

}

function loadgame() {
    tabledata = permaLoad('tabledata');
    celldata = permaLoad('celldata');
    gamedata = permaLoad('gamedata');
    generatetable(tabledata[0], tabledata[1])
    let cnt = 0
    for (i = 0; i < number; i++) {
        for (j = 0; j < number; j++) {
            table.rows[i].cells[j].innerText = celldata[cnt].innerText;

            if (celldata[cnt].color == true) {
                table.rows[i].cells[j].classList.add('color')
            }
            if (celldata[cnt].redtiles == true) {
                table.rows[i].cells[j].classList.add('buttoncol')
                table.rows[i].cells[j].classList.add('button')
            }

            cnt++;
        }
        min = gamedata[0]
        sec = gamedata[1]
        msec = gamedata[2]
        player = gamedata[3]

        namepart.innerText = "Player : " + player
        secondpage.style.display = "block"
        stoptimer();
        starttimer();

    }

}

function canput(element, row, column) {
    nearbyblacktiles = findbulbsaround(element, row, column)[0]
    numberofbulbs = findbulbsaround(element, row, column)[1]
    for (i = 0; i < nearbyblacktiles.length; i++) {
        if (nearbyblacktiles[i].innerText == 0) {
            continue
        }

        if (nearbyblacktiles[i].innerText <= numberofbulbs[i]) {
            return false
        } else {
            continue
        }
    }
    return true

}


function findnearby(element, row, column) {

    nearbytiles = []

    if (column > 0 && column < number - 1) {
        nearbytiles.push(table.rows[row].cells[column - 1])
        nearbytiles.push(table.rows[row].cells[column + 1])
    } else if (column == 0) {
        nearbytiles.push(table.rows[row].cells[column + 1])
    } else {
        nearbytiles.push(table.rows[row].cells[column - 1])
    }

    if (row > 0 && row < number - 1) {
        nearbytiles.push(table.rows[row - 1].cells[column])
        nearbytiles.push(table.rows[row + 1].cells[column])
    } else if (row == 0) {
        nearbytiles.push(table.rows[row + 1].cells[column])
    } else {
        nearbytiles.push(table.rows[row - 1].cells[column])
    }

    return nearbytiles
}



function checkforblacktileintherow(element) {
    startingindex = 0
    endingindex = number
    for (i = 0; i < number; i++) {
        if (table.rows[i].cells[element.dataset.col].classList.contains('blacktiles')) {
            if (i < element.dataset.row) {
                startingindex = i + 1;
            } else if (i > element.dataset.row) {
                endingindex = i
                break
            }
        }
    }
    return [startingindex, endingindex]
}

function checkforblacktileinthecolumn(element) {
    startingindex = 0
    endingindex = number
    for (i = 0; i < number; i++) {
        if (table.rows[element.dataset.row].cells[i].classList.contains('blacktiles')) {
            if (i < element.dataset.col) {
                startingindex = i + 1;
            } else if (i > element.dataset.col) {
                endingindex = i
                break
            }
        }
    }
    return [startingindex, endingindex]
}





//Game Logic
function solution() {
    blacktileswithnum = []
    let alllightened = true
    let redtiles = true

    blacktileswithnum = blacktiles.filter(a => a.innerText != 0)
    for (i = 0; i < number; i++) {

        for (j = 0; j < number; j++) {
            if (!table.rows[i].cells[j].classList.contains('blacktiles')) {
                redtiles = redtiles && (!table.rows[i].cells[j].classList.contains('buttoncol'))
                alllightened = alllightened && (table.rows[i].cells[j].classList.contains('color'))
            }
        }
    }


    let alltrue = true
    for (const tile of blacktileswithnum) {

        alltrue = alltrue && (tile.style.color == 'green')
    }

    if (alltrue && alllightened && redtiles) {
        stoptimer();
        
        answer.innerText = "Congratulations! \nYou won."
    } else {
        answer.innerText = "The solution is incorrect."
    }

}


function generatetablefrominp(tableid) {
    number = 0
    if (tableid == "table1" || tableid == "table2") {
        number = 7
    } else {
        number = 10
    }

    blacktilesarr = []

    blacktilesarr = number == 10 ? blacktilesforten : tableid == "table2" ? blacktilesforadvancedseven : blacktilesforseven;
    generatetable(parseInt(number), blacktilesarr)
}


function createnewtable(event, element) {
    generatetablefrominp(event.target.value)
    stoptimer();
    min = 0;
    sec = 0;
    msec = 0;
    starttimer();
}

function clock() {
    msec += 1;
    if (msec == 9) {
        sec += 1;
        msec = 00;
        if (sec == 59) {
            sec = 00;
            min += 1;

        }
    }
    document.getElementById("timer").innerHTML = min + ":" + sec + ":" + msec;

}

function stoptimer() {
    clearInterval(timer);
}
function starttimer(interval) {
    timer = setInterval(clock, 100);
}
delegate(table, 'td', 'click', switchcolor)

continuegame.addEventListener('click', function onclick() {
    firstpage.style.display = "none"
    loadgame();
})
savebutton.addEventListener('click', function onclick() {
    firstpage.style.display = "block"
    savedata();
    min = 0;
    sec = 0;
    msec = 0;

})

check.addEventListener('click', function onclick() {
    solution();
})
restart.addEventListener('click', function onclick() {
    min = 00;
    sec = 00;
    msec = 00;
    generatetable(number, blacktilesarray)
    stoptimer();
    starttimer();
})

form.addEventListener("submit", (event) => {
    inputs = form.elements
    let checked = " "
    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            checked = inputs[i].value
        }
    }
    player = inputs[0].value

    secondpage.style.display = 'block'
    firstpage.style.display = 'none'
    generatetablefrominp(checked)
    namepart.innerText = "Player : " + player

    starttimer();

    event.preventDefault();
});

newgame.addEventListener('change', createnewtable)


