/// <reference path="../TSDef/p5.global-mode.d.ts" />

"use strict";

//Initializes the L-System with an axiom, a rule-set and an angle
const axiom = "F";
const ruleSet = "FF-[-F+F+F]+[+F-F-F]";
const theta = 22.5;
let lindenSysArr = axiom.split("");

//initial and minimal length of the segments
const initSegmLength = 85;
const minimalSegmentLength = 10;
const segmentLengthModifier = 0.5;
let segmentLength = initSegmLength;

function setup() {
  createCanvas(650, 650, P2D);
  background(0);
  stroke(0, 255, 0);
  strokeWeight(2);
  angleMode(DEGREES);
}

//Calculates and draws one iteration of the L-System every interval
let createLSystem = setInterval(() => {
  if (segmentLength > minimalSegmentLength) {
    background(0);
    calculateLindenSysArr();
    drawLindenSysArr(segmentLength);
  }
  else {
    segmentLength = initSegmLength;
    lindenSysArr = axiom.split("");
  }
}, 2000);

//Calculates the iterations and puts the result in an array
function calculateLindenSysArr() {

  //Temporary array to do all the calculations in
  let lindenSysArrTemp = [];

  //Applies the rule-set for each element of the array
  lindenSysArr.forEach((element) => {

    //If it matches an "F"....
    if (element === "F") {
      //...create a temporary array, filled with the elements
      //returned by the string.split method
      let tempRuleArray = ruleSet.split("");
      tempRuleArray.forEach((element1) => {
        //Append the contents of tempRuleArray to lindenSysArrTemp
        lindenSysArrTemp.push(element1);
      });
    }
    //If current element is "+" or "-", append it
    else if (element === "+" || element === "-") lindenSysArrTemp.push(element);
    //If current element is "[" or "]" also append it
    else if (element === "[" || element === "]") lindenSysArrTemp.push(element);
    //Replace all content of lindenSysArr with the content of lindenSysArrTemp
    lindenSysArr = lindenSysArrTemp.slice(0);
    console.log(lindenSysArr);
  });
}

//Displays the L-System Array "lindenSysArr"
function drawLindenSysArr(length) {

  translate(width / 2, height - 30);
  rotate(-90);

  if (length > minimalSegmentLength) {

    push();

    //Draws the actual shape
    for (let i = 0; i < lindenSysArr.length; i++) {
      const element = lindenSysArr[i];

      //"F" draw a line
      if (element === "F") {
        line(0, 0, length, 0);
        translate(length, 0);
      }
      //"+" turn positive theta, "-" turn negative theta
      else if (element === "+") rotate(theta);
      else if (element === "-") rotate(-theta);
      //"[" push() to the Matrix, "]" pop() the Matrix
      else if (element === "[") push();
      else if (element === "]") pop();
    }
    pop();
  }
  segmentLength *= segmentLengthModifier;
}

function draw() {
}