let bG // backgroundGraphics

function setupBackground(){
    
    bG = createGraphics(clipNum(innerWidth, 60), innerHeight);
    bG.stroke(100)
    for(let x = 0; x <= width; x += 60){
        for(let y = 0; y <= height; y += 40){
            bG.stroke(map(y,  0, height, 100, 255), 100,100)
            bG.line(x,y,x,y + 40)
        }
    }
    for(let y = 0; y <= height; y += 40){
        bG.stroke(map(y,  0, height, 100, 255), 100,100)
        bG.line(0, y, width, y)
    }
}


function drawMaterials(material){
    push()
        if(material == "mk1" || material == "ALL" || typeof material == "undefined"){
            noStroke()
            for(let i in mk1){
                rect(mk1[i].x + 1, mk1[i].y + 1, 58, 38)
            }
        }
        if(material == "water" || material == "ALL" || typeof material == "undefined"){
            noStroke();
            fill(0, 0, 255, 100)
            for(let i in water){
                rect(water[i].x + 1, water[i].y + 1, 58, 38)
            }
    }
    pop()

}
