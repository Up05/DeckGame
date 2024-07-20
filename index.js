mk1 = []
water = []
let buildN
let fc

let background_music

function preload(){
background_music = loadSound("background-music_deckgame.wav")

}


function setup(){
    createCanvas(clipNum(innerWidth, 60), innerHeight)
    background(20)
    stroke(0); fill(160)

    setupBackground()
    image(bG, 0, 0)

    fc = 0; intervalProgress = 1
    buildN = (clipNum(width, 60) / 60) 
    buildN -= floor((buildN / 2))

    setInterval(newTick, 2500)


    background_music.setVolume(0.02)
    background_music.loop()
    background_music.play()

}

function draw(){
    if(mouseIsPressed){
        newBlock(mk1)
    }
    document.getElementById("buildN").innerText = "Blocks left: " + buildN
}

function newTick() {
    moveDown(water)
    createWater()
    incrementBuildN()
    fc ++
    clearArrs()
    if(fc % 4 == 0){
        cleanBoard()
    }
    if(mk1.length - 2 > clipNum(width, 60) / 30){
        checkForWin()
    }
}

function skipTicks(number){
    for(let i = 0; i < number; i++){
        newTick()
    }
}

function createWater(){
    for(let i = 0; i < 5; i ++){
        let x = clipNum(random(width), 60)
        if(!isEmpty(x, 0, mk1) && random([0,1,2,3]) == 0){
            delete mk1[getBlock(x, 0, mk1)[1]]
            buildN += 2
            cleanBoard();
        } else if (isEmpty(x, 0, water) && isEmpty(x, 0, mk1)){
            water.push({
                x: x,
                y: 0

            })
            push()
            fill(0,0,255, 100); noStroke()
            rect(water[water.length -1].x + 1, 0 + 1, 58, 38)
            pop()
        }

    }
    

}