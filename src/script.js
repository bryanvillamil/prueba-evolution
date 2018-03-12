var
navButton = $('.navButton'),
    panel = $('.panel'),
topLine = $('.topLine'),
    midLine = $('.midLine'),
    botLine = $('.botLine'),
    roof = $('.roof'),
    arrowBody = $('.arrowBody'),
    arrowPoint = $('.arrowPoint'),
    hoverTL, homeTL, slideTween,
    state = "closed"
;
var arrowValues = {x1: 42, y1: 25, x2: 48, y2: 25, x3: 42, y3: 25};
var roofValues = {x1: 5, y1: 11, x2: 21, y2: 2, x3: 37, y3: 11};
var valuesString, roofValuesString;

TweenMax.set([roof, arrowBody, arrowPoint], {autoAlpha: 0});
TweenMax.set(navButton, {x: 315, y: 10});
TweenMax.set(panel, {x: 375});
//TweenMax.set(arrowPoint, {drawSVG: "50% 50%"});

hoverTL = new TimelineMax({paused: true, repeat: 0});
hoverTL
    //.set(arrowPoint, {autoAlpha: 0, drawSVG: "50% 50%"})
    .set(arrowPoint, {autoAlpha: 0, attr: {points: "42,25 48,25 42,25"}})
    .to(midLine, .2, {attr: {x2: 48}, ease: Circ.easeInOut})
    .to([topLine,botLine], .2, {attr: {x2: 29}, ease: Circ.easeInOut}, "-=.25")
    .set(arrowPoint, {autoAlpha: 1})
    //.to(arrowPoint, .25, {drawSVG: "0 100%", ease: Circ.easeOut}, "-=.25")
    .to(arrowValues, .2, {y1: 32, y3: 18, ease: Circ.easeOut, onUpdate: function(e) {
        valuesString = arrowValues.x1 + "," + arrowValues.y1 + " " + arrowValues.x2 + "," + arrowValues.y2 + " " + arrowValues.x3 + "," + arrowValues.y3;
        //console.log("valuesString: " + valuesString);
        TweenMax.set(arrowPoint, {attr: {points: valuesString}});
    }})
;
//hoverTL.play();

homeTL = new TimelineMax({paused: true, repeat: 0});
homeTL
    .set([topLine,midLine], {y: 0, attr: {x2: 34}})
    .set(roof, {attr: {points: "5,11 21,2 37,11"}})
    .set(roof, {autoAlpha: 1, drawSVG: "50% 50%"})
    .to(roof, .25, {drawSVG: "0 100%", ease: Circ.easeInOut})
    .to(topLine, .25, {rotation: 90, transformOrigin: "top left", attr: {x2: 23}}, "-=.25")
    .to(midLine, .25, {rotation: -90, transformOrigin: "top right", y: -19, attr: {x2: 23}}, "-=.25")
;

navButton.on("mouseover", function(e) {
    hoverTL.play();
});
navButton.on("mouseout", function(e) {
    hoverTL.reverse();
});
navButton.on("click", function(e) {
    if(state === "open") {
        navButton.mouseout();
        navButton.off("mouseover");
        navButton.off("mouseout");
        navButton.on("mouseover", function(e) {
            hoverTL.play();
        });
        navButton.on("mouseout", function(e) {
            hoverTL.reverse();
        });

        homeTL.reverse();
        slideTween = TweenMax.to(panel, .5, {x: 375, ease: Power3.easeOut});
        TweenMax.to(navButton, .5, {x: 315, ease: Power3.easeOut});
        state = "closed";
    } else if(state === "closed") {
        navButton.mouseout();
        navButton.off("mouseover");
        navButton.off("mouseout");
        TweenMax.delayedCall(.5, function(e) {
            homeTL.play();
        });
        slideTween = TweenMax.to(panel, .5, {x: 50, ease: Power3.easeOut});
        TweenMax.to(navButton, .5, {x: 75, ease: Power3.easeOut});
        hoverTL.reverse();
        state = "open";
    }
});
