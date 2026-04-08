const expressionInput = document.getElementById("expression");
const resultInput = document.getElementById("result");
const calculator = document.getElementById("calculator");

// Append value
function appendValue(value){
    expressionInput.value += value;
    displayLiveResult();
}

// Clear screen
function clearResult(){
    expressionInput.value = "";
    resultInput.value = "";
}

// Delete last
function deleteLast(){
    expressionInput.value = expressionInput.value.slice(0,-1);
    displayLiveResult();
}

// Calculate result
function calculate(){
    try{
        let expr = expressionInput.value.replace(/×/g,'*').replace(/÷/g,'/');
        resultInput.value = eval(expr);
        // Animate result change
        resultInput.style.opacity = 0;
        setTimeout(()=>{ resultInput.style.opacity=1; }, 100);
    }
    catch{
        resultInput.value = "Error";
    }
}

// Real-time display
function displayLiveResult(){
    try{
        let expr = expressionInput.value.replace(/×/g,'*').replace(/÷/g,'/');
        if(expr) resultInput.value = eval(expr);
        else resultInput.value = "";
    } catch {}
}

// Keyboard support
document.addEventListener("keydown", function(e){
    if((e.key >= '0' && e.key <= '9') || ['+','-','*','/','%','.'].includes(e.key)){
        appendValue(e.key);
    }
    else if(e.key === "Enter") calculate();
    else if(e.key === "Backspace") deleteLast();
    else if(e.key === "Escape") clearResult();
});

// Theme switcher
function setTheme(theme){
    if(theme==="neon") document.body.classList.add("neon");
    else document.body.classList.remove("neon");
}

// Swipe gestures (mobile)
let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

calculator.addEventListener('touchstart', function(e){
    touchstartX = e.changedTouches[0].screenX;
    touchstartY = e.changedTouches[0].screenY;
}, false);

calculator.addEventListener('touchend', function(e){
    touchendX = e.changedTouches[0].screenX;
    touchendY = e.changedTouches[0].screenY;
    handleGesture();
}, false);

function handleGesture(){
    let xDiff = touchendX - touchstartX;
    let yDiff = touchendY - touchstartY;

    if(Math.abs(xDiff) > Math.abs(yDiff)){
        if(xDiff < -50) deleteLast(); // Swipe left → delete
    } else {
        if(yDiff > 50) clearResult(); // Swipe down → clear
    }
}q
