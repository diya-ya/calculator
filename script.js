function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

function operate(operator,left,right){
    let ans;
    if(operator=='+') ans=add(left,right);
    else if(operator=='-') ans=subtract(left,right);
    else if(operator=='*') ans=multiply(left,right);
    else{
        if(right!=0){
            ans=divide(left,right);
        }
        else{
            alert("Division by 0 is not defined!");
            clearDisplay();
            return;
        }
    }
    return ans;
}

let left,right,operator;
const numbers=document.querySelectorAll(".number")
numbers.forEach(button=>{
    button.addEventListener("click",()=>{
        if(equalled){
            clearDisplay();
            equalled=false;
        }
        if(left==undefined){ 
            left=button.textContent;
        }
        else if(operator==undefined){
            left+=button.textContent;
        }

        else if(right==undefined){
            right=button.textContent;
        }
        else{
            right+=button.textContent;
        }
        sendToDisplay(button.textContent);
    })
})

const operators=document.querySelectorAll(".operator")
operators.forEach(button=>{
    button.addEventListener("click",()=>{
        if(operator==undefined && left!=undefined){
            operator=button.textContent;
        }
        else if(operator==undefined){
            left=button.textContent;
        }
        else if(right==undefined){
            display.textContent = display.textContent.slice(0, -1);
            operator=button.textContent;
        }
        else{
            const ans=operate(operator,Number(left),Number(right));
            if (ans === undefined) return;
            display.textContent='';
            sendToDisplay(ans);
            left=ans;
            right=undefined;
            operator=button.textContent;
            pointRight=false;
        }
        equalled=false;
        sendToDisplay(button.textContent);
    })
})

let equalled=false;
const equalsKey = document.querySelector("#equals");
equalsKey.addEventListener("click", () => {
   if(right==undefined){
    display.textContent='';
    sendToDisplay(left);
    operator=undefined;
   }
   else{
    const ans=operate(operator,Number(left),Number(right));
    if (ans === undefined) return;
    display.textContent='';
    sendToDisplay(ans);
    left=ans;
    right=undefined;
    operator=undefined;
    pointRight=false;
   }
   equalled=true;
});

const display = document.querySelector(".display");
function sendToDisplay(text) {
    let displayStr=(typeof text==="number")?Number(text.toFixed(10)):String(text);
    const displayText=String(displayStr);
    if (displayText.length <= 13) {
        display.textContent += displayText;
    } else {
        display.textContent = Number.parseFloat(displayText).toExponential(3);
    }
}

function clearDisplay(){
    display.textContent='';
    left=undefined;
    right=undefined;
    operator=undefined;
    pointLeft=false;
    pointRight=false;
}

let pointLeft=false,pointRight=false;
const pointKey = document.querySelector("#point");
pointKey.addEventListener("click", () => {
   if(equalled){
        clearDisplay();
        equalled=false;
   }
   if(left==undefined && pointLeft==false && operator==undefined){
    left='0.';
    sendToDisplay('.');
    pointLeft=true;
   }
   else if(pointLeft==false && operator==undefined){
    left+='.';
    sendToDisplay('.');
    pointLeft=true;
   }
   else if(pointRight==false && right==undefined && operator!=undefined){
    right='0.';
    sendToDisplay('.');
    pointRight=true;
   }
   else if(pointRight==false && operator!=undefined){
    right+='.';
    sendToDisplay('.');
    pointRight=true;
   }
});

const backspaceKey = document.querySelector("#backspace");
backspaceKey.addEventListener("click", () => {
    if (display.textContent.length === 0) return;

    const lastChar = display.textContent.slice(-1);
    display.textContent = display.textContent.slice(0, -1);

    if (right !== undefined) {
        if (right.length === 1) {
            right = undefined;
            pointRight = false;
        } else {
            if (lastChar === '.') pointRight = false;
            right = right.slice(0, -1);
        }
    } else if (operator !== undefined) {
        operator = undefined;
    } else if (left !== undefined) {
        if (left.length === 1) {
            left = undefined;
            pointLeft = false;
        } else {
            if (lastChar === '.') pointLeft = false;
            left = left.slice(0, -1);
        }
    }
});

document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (key >= '0' && key <= '9') {
        document.querySelectorAll(".number").forEach(button => {
            if (button.textContent === key) button.click();
        });
    } 
    else if (["+", "-", "*", "/"].includes(key)) {
        const opId = {
            "+": "add",
            "-": "subtract",
            "*": "multiply",
            "/": "divide"
        }[key];
        document.querySelector(`.operator#${opId}`)?.click();
    } 
    else if (key === "Enter" || key === "=") {
        event.preventDefault(); 
        document.querySelector("#equals")?.click();
    } 
    else if (key === ".") {
        document.querySelector("#point")?.click();
    } 
    else if (key === "Backspace") {
        document.querySelector("#backspace")?.click();
    }
    else if (key === "Escape") {
        clearDisplay();
    }
});
