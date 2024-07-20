function newBlock(blockType) {
    if(arguments.length < 1){
        console.error("IncrementBlock() expected an array as an argument")
        return
    }
    if(mouseY < 0 || buildN < 1){
        return
    }

    if(!isEmpty(clipNum(mouseX, 60),clipNum(mouseY, 40),water)){
        return 
    }

    for(let i in blockType){
        if(blockType[i].x == clipNum(mouseX,60) && blockType[i].y == clipNum(mouseY,40)){
            return
        }
    }
    buildN --
    blockType.push({
        x: clipNum(mouseX, 60),
        y: clipNum(mouseY, 40),
    })
    noStroke()
    rect(clipNum(mouseX, 60) + 1, clipNum(mouseY, 40) + 1,58,38)
    
}


function getBlock(x, y, blockType){
    if(arguments.length < 3){
        console.error("Too few Arguments in function getBlock()")
        return
    }

    for(let i in blockType){
        if(x == blockType[i].x && y == blockType[i].y){
            return [blockType[i], i, true]
        }

    }
    // console.warn("no block was at " + x + ", " + y + " in the specified array")
    return [null, -1, false]

}



function clipNum(number, interval) {
    
    let a = number % interval
    let b = number - a

    return b

}

function loss(ifVictory){
    mk1.length = 0;
    water.length = 0;

    background(20) // for transparency
    image(bG, 0, 0)

    buildN = (clipNum(width, 60) / 60) 
    buildN -= floor((buildN / 4))

    if(!ifVictory){
        console.log("%c Loss             " + randInvisExitCode(7), "color: #ff0000; font-weight: bold;",   )
    }
}


function cleanBoard(){
    
    background(20) // for transparency
    image(bG, 0, 0)
    noStroke()
    drawMaterials()
}


function clearArrs(){
    for(let i in mk1){
        if(mk1[i].y > height){
            delete mk1[i]
        }
    }

    for(let i in water){
        if(water[i].y > height){
            loss()
            delete water[i]
        }
    }
    

}


function isEmpty(x, y, arr){
    if(arguments.length < 3){
        console.error("Too few Arguments in function isEmpty()")
        return
    }
    for(let i in arr){
        if(arr[i].x == x && arr[i].y == y){
            return false
        }
    }
    return true

}

function moveDown(blockType){
    if(arguments.length < 1){
        console.error("moveDown expected an array as an argument")
        return
    }
    push()
        fill(20); noStroke()
        for(let i in blockType){
            rect(blockType[i].x + 1, blockType[i].y + 1, 58, 38)
        }
    pop()
    push()
        fill(0,0,255, 100); noStroke()
        for(let i in blockType){
            let r = random([0, 40, 40, 80])
            blockType[i].y += r
    
            if(!isEmpty(blockType[i].x, blockType[i].y, mk1)){
                blockType[i].y -= r
            }
    
            rect(blockType[i].x + 1, blockType[i].y + 1, 58, 38)
        }
    pop()
    
    }

    function checkForWin(){
        let blockCount = 0
        for(let x = 0; x <= clipNum(width, 60); x += 60){
            let xBlockCount = 0
            for(let y = 0; y <= clipNum(height, 40); y += 40){
                if(!isEmpty(x,y,mk1)){
                    xBlockCount ++
                }

            }
            if(xBlockCount >= 2){
                blockCount ++
            }
        }
        if(blockCount + 1 >= clipNum(width, 60) / 60){
            setTimeout(loss(true), 10)
            console.log("%c Victory", "color: #ff00ff; font-weight: bold;")
        }




    }


    function randExitCode(ExitLength){
        let o = ""
        for(let i = 0; i < ExitLength; i ++){
            o += char(floor(random(65, 122)))
        }
        return o
    }

    function randInvisExitCode(ExitLength){
        let o = ""
        for(let i = 0; i < ExitLength + floor(random(-ExitLength * 2, ExitLength * 2)); i ++){
           o += " "
        }
        return o
    }

function incrementBuildN(){
    buildN += round(map(mk1.length, clipNum(width, 60) / 480, clipNum(width, 60) / 40, 2, 1))
}