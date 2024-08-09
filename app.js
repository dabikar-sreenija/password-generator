"use strict";

const passwordDisplay = document.querySelector(".password_display");
const passwordPlaceholder = document.querySelector(".password_placeholder");
const passwordCopyText = document.querySelector(".copy_text");
const PasswordCopyBtn = document.querySelector(".copy_btn");

const PasswordForm = document.querySelector(".password_setting");
const CharCount = document.querySelector(".char_count");
const lengthSlider = document.querySelector(".Char_length_slider");
const CheckBoxes = document.querySelectorAll("input[type=checkbox");

const strengthDesc = document.querySelector(".strength_rating_text");
const strengthBars = document.querySelectorAll(".bar");

const Character_sets = {
    uppercase: ["ABCDEFGHIJKLMNOPQRSTUVWXYZ",26],
    lowercase:["abcdefghijklmnopqrstuvwxyz",26],
    number:["1234567890",10],
    symbols:["!@#$%^&\*()",10],
};

let cancopy = false;
const getsliderVal = ()=>{
    CharCount.textContent = lengthSlider.value;
};

const styleRangesliderVal = ()=>{
    const min = lengthSlider.min;
    const max = lengthSlider.max;
    const val =lengthSlider.value;

    lengthSlider.style.backwardSize = 
    ((val- min) * 100)/ (max - min)+ "% 100%";
};

const handSliderInput =() =>{
    getsliderVal();
    styleRangeslider();
};

//=================================================
// Reset Bar Sylte
//=================================================
const resetBarSyltes = ()=>{
    strengthBars.forEach((bar)=>{
        bar.style.backgroundColor="transparenet";
        bar.style.borderColor="hsl(252,11%,91%)";
        });
};

const Stylebars = ([...barElement],color)=>{
    barElement.forEach((bar)=>{
        bar.style.backgroundColor=color;
        bar.style.borderColor=color;
    });
};

const StyleMeter = (rating)=> {
    const text = rating[0];
    const numBars = rating[1];
    const barToFill = Array.from(strengthBars).slice(0, numBars);

    resetBarSyltes();
    strengthDesc.textContent=text;

    switch (numBars) {
        case 1:
            return Stylebars(barToFill,"hsl(0, 91%, 63%");
            case 2:
                return Stylebars(barToFill,"hsl(13, 95%, 66%");
                case 3:
                    return Stylebars(barToFill,"hsl(42, 91%, 68%");
                    case 4:
                        return Stylebars(barToFill,"hsl(127, 100%, 82%");
                        default:
                            throw new console.error("Invalid value from Num Bars");
                            }
};
//=========================================
// Password Generate
//=========================================

const CalcStrength = (passwordlength,charpoolsize) =>{
    const Strength = passwordlength*Math.log2(charpoolsize);
 if(Strength < 25){
   return["Too Week",1]
 }
 else if(Strength >= 25 && Strength < 50){
    return["Week", 2 ]
 }
 else if(Strength >=50 && Strength < 75){
    return["Medium",3]
 }
 else{
    return["Strong",4]
 }
};

const generatePassword = (e) =>{
    e.preventDedault();
    validInput();

  let generatePassword="";
  let includeSets=[];
  let charPool = 0;

  CheckBoxes.forEach((box)=> {
    if(box.checked){
        includeSets.push(Character_sets[box.value][0]);
        charPool += Character_sets[box.value][1];
       // console.log(box.value[0]);
        //console.log(box.value[1]);
    }

  });
  if(includeSets){
    for(let i=0;i< lengthSlider.value;i++){
        const randSetIndex = Math.floor(Math.random()* includeSets.length);
        const randSet = includeSets[randSetIndex];

        const randCharIndex = Math.floor(Math.random()*randSet.length);
        const randChar = randSet[randCharIndex];

        generatePassword += randChar;
    }
  }
  const Strength = CalcStrength(lengthSlider.value,charPool);
  StyleMeter(Strength);
  cancopy=true;
  passwordDisplay.textContent = generatePassword;
};
//valid
const validInput = () => {
    if(Array.from(CheckBoxes).every((box)=> box.checked === false)){
        alert("Make Sure to check at least one check Box");
    }
};

//copy password
const copyPassword = async() => {
    if(!passwordDisplay.textContent || passwordCopyText.textContent) return;
    if(!cancopy) return;

    setTimeout (() => {
        passwordCopyText.style.transition = "all is";
        passwordCopyText.style.opacity = 0;
       
        setInterval(() => {
            passwordCopyText.style.removeProperty("opacity");
            passwordCopyText.style.removeProperty("transition");
            passwordCopyText.textContent="";
        },1000);
        },1000);
     await navigator.clipboard.writeText(passwordDisplay.text);
     passwordCopyText.textContent="Copied!";
    };
CharCount.textContent = lengthSlider.value;
lengthSlider.addEventListener("input",handSliderInput);
PasswordForm.addEventListener("submit",generatePassword);




















