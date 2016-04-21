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
    resetTestVariables(1);
    // Constructor
    var pointVal = 0;
    var p = new Point(pointVal, pointVal);

    if(p.x === pointVal && p.y === pointVal) {
        testsPassed++;
    } else {
        console.error("Point constructor test failed.");
        console.error("Result:", p.x === pointVal, p.y === pointVal);
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
    var pTest = new Point(25, 25);
    var sTest = new Size(50, 50);
    var rTest = new Rectangle(pTest, sTest);
    if(r.collides(rTest) && r.collides(pTest) && r.collides(pTest, sTest)) {
        testsPassed++; 
    } else {
        console.error("Rectangle collides method test failed.");
        console.error("Result:", r.collides(rTest), r.collides(pTest), r.collides(pTest, sTest));
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
    var pTest = new Point(40, 40);
    var pTest2 = new Point(60, 60)
    var rTest = 25;
    if(c.collides(pTest) && c.collides(pTest2, rTest)) {
        testsPassed++;
    } else {
        console.error("Circle collides method test failed.");
        console.error("Result:", c.collides(pTest));
    }

    if(testsPassed === numOfTests) {
        console.log("Circle test passed.");
    } else {
        console.error("Circle test failed.");
    }  
}

/**
* Execute all tests
**/
pointTest();
sizeTest();
rectangleTest();
circleTest();