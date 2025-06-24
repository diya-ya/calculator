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
        sendToDisplay(button.textContent);
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
            sendToDisplay(String(ans));
            left=ans;
            right=undefined;
            operator=button.textContent;
        }
        sendToDisplay(button.textContent);
    })
})

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
    sendToDisplay(String(ans));
    left=ans;
    right=undefined;
    operator=undefined;
   }
});

const display = document.querySelector(".display");
function sendToDisplay(text) {
    const displayText=String(text);
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
}