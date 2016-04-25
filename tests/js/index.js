var numOfTests = 0;
var testsPassed = 0;

function resetTestVariables(amount) {
    numOfTests = amount;
    testsPassed = 0;
}

/**
* Point class test
**/
function pointTest() {
    resetTestVariables(2);
    // Constructor
    var pointVal = 0;
    var p = new Point(pointVal, pointVal);

    if(p.x === pointVal && p.y === pointVal) {
        testsPassed++;
    } else {
        console.error("Point constructor test failed.");
        console.error("Result:", p.x === pointVal, p.y === pointVal);
    }

    // add() method test
    var xVal = 5;
    var yVal = 5;
    p.add(new Point(xVal, yVal));
    var p1 = new Point(p.x, p.y);
    p.add(new Size(xVal, yVal));
    var p2 = new Point(p.x, p.y);
    p.add(xVal, yVal);
    var p3 = new Point(p.x, p.y);
    if(p1.x === xVal && p1.y === yVal &&
       p2.x === xVal * 2 && p2.y === yVal * 2 &&
       p3.x === xVal * 3 && p3.y === yVal * 3) {
        testsPassed++;
    } else {
        console.error("Point add() method test failed.");
        console.error(
            "Result:",
            p1.x === xVal,
            p1.y === yVal,
            p2.x === xVal * 2,
            p2.y === yVal * 2,
            p3.x === xVal * 3,
            p3.y === yVal * 3
        ); 
    }

    if(testsPassed === numOfTests) {
        console.log("Point test passed.");
    } else {
        console.error("Point test failed.");
    } 
}

/**
* Size class test
**/
function sizeTest() {
    resetTestVariables(1);
    // Constructor
    var sizeVal = 50;
    var s = new Size(sizeVal,sizeVal);

    if(s.width === sizeVal && s.height === sizeVal) {
        testsPassed++;
    } else {
        console.error("Size constructor test failed.");
        console.error("Result:", s.width === sizeVal, s.height === sizeVal);
    }

    if(testsPassed === numOfTests) {
        console.log("Size test passed.");
    } else {
        console.error("Size test failed.");
    }   
}

/**
* Rectangle class test
**/
function rectangleTest() {
    resetTestVariables(3);
    // Constructor
    var pointVal = 0;
    var p = new Point(pointVal, pointVal);
    var sizeVal = 50;
    var s = new Size(sizeVal,sizeVal);
    var r = new Rectangle(p, s);
    var r2 = new Rectangle(p.x, p.y, s.width, s.height);

    if(r.pos === p && r.size === s && 
        r2.pos.x === p.x && r2.pos.y === p.y && 
        r2.size.width === s.width && r2.size.height === s.height) {
        testsPassed++;
    } else {
        console.error("Rectangle constructor test failed.");
        console.error(
            "Result:", 
            r.pos === p,
            r.size === s,                    
            r2.pos.x === p.x,
            r2.pos.y === p.y,
            r2.size.width === s.width,
            r2.size.height === s.height
        );
    }

    // center() method test
    var pc = new Point(p.x + s.width / 2, p.y + s.height / 2);
    if(r.center().x === pc.x && r.center().y === pc.y) {
        testsPassed++;
    } else {
        console.error("Rectangle center() method test failed.");
        console.error("Result:", r.center().x === pc.x, r.center().y === pc.y);
    }

    // collides() method test
    var cTest = new Circle(new Point(30, 30), 50);
    var pTest = new Point(25, 25);
    var sTest = new Size(50, 50);
    var rTest = new Rectangle(pTest, sTest);
    if(r.collides(cTest) && r.collides(rTest) && r.collides(pTest) && r.collides(pTest, sTest)) {
        testsPassed++; 
    } else {
        console.error("Rectangle collides method test failed.");
        console.error(
            "Result:", 
            r.collides(cTest),
            r.collides(rTest),
            r.collides(pTest),
            r.collides(pTest, sTest)
        );
    }

    if(testsPassed === numOfTests) {
        console.log("Rectangle test passed.");
    } else {
        console.error("Rectangle test failed.");
    }  
}

/**
* Circle class test
**/
function circleTest() {
    resetTestVariables(3);
    // Constructor
    var pointVal = 0;
    var p = new Point(pointVal, pointVal);
    var r = 25;
    var c =  new Circle(p, r);
    if(c.pos === p && c.radius === r) {
        testsPassed++;
    } else {
        console.error("Circle constructor test failed.");
        console.error("Result:", c.pos === p, c.radius === r);
    }

    // center() method test
    var pc = new Point(p.x + r, p.y + r);
    if(c.center().x === pc.x && c.center().y === pc.y) {
        testsPassed++;
    } else {
        console.error("Circle center() method test failed.");
        console.error("Result:", c.center().x === pc.x, c.center().y === pc.y);
    }

    // collides() method test
    var pTest = new Point(35, 35);
    var rTest = 25;
    var cTest = new Circle(pTest, rTest);
    if(c.collides(cTest) && c.collides(pTest) && c.collides(pTest, rTest)) {
        testsPassed++;
    } else {
        console.error("Circle collides method test failed.");
        console.error("Result:", c.collides(cTest), c.collides(pTest), c.collides(pTest, rTest));
    }

    if(testsPassed === numOfTests) {
        console.log("Circle test passed.");
    } else {
        console.error("Circle test failed.");
    }  
}

function soundeffectTest() {
    // To do
    var t = new Soundtrack("");
}

// Example level data exported from future C# app
/*var LEVEL_DATA = {
    tileSize: {
        width: 16,
        height: 16
    },
    mapSize: {
        width: 20,
        height: 7
    },
    tileData: [
        { x: 2, y: 0 }
    ],
    mapData: [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ]
}

var theImage = new Image();
theImage.src = "tiles.png"

var map = new Map(
    theImage,
    LEVEL_DATA.tileSize,
    LEVEL_DATA.mapSize,
    LEVEL_DATA.tileData,
    LEVEL_DATA.mapData
);

var ctx = document.getElementById('canvas').getContext('2d');
var x = 0;
function render() {
    ctx.fillStyle="#000";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    map.render(ctx, x++, 0);
    ctx.drawImage(
        theImage,
        48,
        48,
        16,
        16,
        0,
        0,
        16,
        16
    );
    requestAnimationFrame(render);
}

theImage.onload = function() {
    render(); 
}*/

/* Menu test code */
var ctx = document.getElementById('canvas').getContext('2d');
var mo = new MenuOptions(
    // Font properties
    'Verdana',
    23,
    '#fff',
    'center', 
    // Menu options
    ['Option 1', 'Option 2', 'Option 3'],
    // Menu actions
    [
        function(menuManager) {
            menuManager.changeMenu(0);
            console.log('Option 1');
        }, 
        function(menuManager) {
            menuManager.changeMenu(1);
            console.log('Option 2');
        },
        function(menuManager) {
            menuManager.changeMenu(2);
            console.log('Option 3');
        }
    ]
);
var m = new Menu(new MenuTitle('Verdana', 32,'#fff', 'center', 'Game Title'), mo);
var m2 = new Menu(new MenuTitle('Verdana', 32,'#fff', 'center', 'Menu 2'), mo);
var m3 = new Menu(new MenuTitle('Verdana', 32,'#fff', 'center', 'Menu 3'), mo);
var mm = new MenuManager([m, m2, m3], { keyType: 'wasd'});

function render() {
    ctx.fillStyle="#000";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    mm.render(ctx);
    requestAnimationFrame(render);  
}

window.addEventListener('keydown', function(e){
    mm.onKeyPress(e);
});

render();

/**
* Execute all tests
**/
pointTest();
sizeTest();
rectangleTest();
circleTest();
soundeffectTest();