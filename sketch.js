var epicball;
var database, position;

function setup(){
    database = firebase.database();
    console.log(database);
    createCanvas(500,500);
    epicball = createSprite(250,250,10,10);
    epicball.shapeColor = "red";

    var epicballposition = database.ref('ball/position');
    epicballposition.on("value", readPosition, showError);
}

function draw(){
    background("white");
    if(position !== undefined){
        if(keyDown(LEFT_ARROW)){
            writePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+1);
        }
        drawSprites();
    }
}

function readPosition(data){
    position = data.val();
    epicball.x = position.x;
    epicball.y = position.y;
}

function writePosition(x, y){
    database.ref('ball/position').set({
        'x': position.x + x,
        'y': position.y + y
    })
}

function showError(){
    console.log("Error in connecting with the database");
}