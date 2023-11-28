

let string = "";
let buttonss = document.querySelectorAll('.btn');
Array.from(buttonss).forEach((btn)=>{
  btn.addEventListener('click', (e)=>{
    if(e.target.innerHTML == '='){
      string = eval(string);
      document.querySelector('input').value = string;
    }
    else{ 
    console.log(e.target)
    string = string + e.target.innerHTML;
    document.querySelector('screen').value = string;
      }
  })
})

// Selection and initialization

const buttons=document.querySelectorAll('.btn');
const ip_result=document.querySelector('.display .input');
const op_result=document.querySelector('.display .result');
let input="";

for (let btn of buttons) {
    const val=btn.dataset.key;
    btn.addEventListener('click',()=>{
        if(val== "clear"){
            input="";
            ip_result.innerHTML="";
            op_result.innerHTML="";
}else if(val == "backspace"){
        input=input.slice(0,-1);
        ip_result.innerHTML=remove_ip(input);
}
else if(val == "="){
    let output=eval(prep_ip(input));
        op_result.innerHTML=remove_op(output);
        if (op_result.scrollWidth > op_result.clientWidth) {
            op_result.classList.add("overflow");
        }
}
else if (val == "brackets") {
    if (input.indexOf("(") == -1 || (input.indexOf("(") != -1 && input.indexOf(")") != -1 && input.lastIndexOf("(") < input.lastIndexOf(")"))) {
        input += "(";
    } else if (input.indexOf("(") != -1 && input.indexOf(")") == -1 || (input.indexOf("(") != -1 && input.indexOf(")") != -1 && input.lastIndexOf("(") > input.lastIndexOf(")"))) {
        input += ")";
    }
    ip_result.innerHTML = remove_ip(input);
}
else{
    if (ip_correct(val)) {
        
        input+=val;
        ip_result.innerHTML=remove_ip(input);
    }
}


}

    )

    
}

// takes an input string and processes each character, replacing specific characters with  HTML elements

function remove_ip(input) {
    let input_arr=input.split("");
    let input_arr_len=input_arr.length;
    for (let i = 0; i < input_arr.length; i++) {
        if (input_arr[i] == "*") {
            input_arr[i]=`<span class="symbol">x</span>`;
        }
        else if(input_arr[i] == "/") {
            input_arr[i]=`<span class="symbol">÷</span>`;
        }
        else if(input_arr[i] == "+") {
            input_arr[i]=`<span class="symbol">+</span>`;
        }
        else if(input_arr[i] == "-") {
            input_arr[i]=`<span class="symbol">-</span>`;
        }
        else if(input_arr[i] == "(") {
            input_arr[i]=`<span class="brackets">(</span>`;
        }
        else if(input_arr[i] == ")") {
            input_arr[i]=`<span class="brackets">)</span>`;
        }
        else if(input_arr[i] == "%") {
            input_arr[i]=`<span class="percent">%</span>`;
        }
    }
    return input_arr.join(""); // Join the array into a string

    
}

// takes an input string and processes each character, replacing "%" with "/100"

function prep_ip(input) {
    let ip_arr=input.split("");
    for (let i = 0; i < ip_arr.length; i++) {
       if (ip_arr[i] == "%") {
        ip_arr[i]="/100";
        
       }
        
    }
    return ip_arr.join("");
}

// takes a numerical output, formats the whole number part with thousands separators, and appends the decimal part 
function remove_op(output) {
    let op_string=output.toString();
    let num=op_string.split(".")[1];
    op_string=op_string.split(".")[0];

    let op_arr=op_string.split("");
    if (op_arr.length>3) {
        for (let i = op_arr.length-3; i >0; i-=3) {
            op_arr.splice(i,0,",");
            
        }

    }

    if (num) {
        op_arr.push(".");
        op_arr.push(num);
        
    }
    return op_arr.join("");

    
}

// validate whether a specific value (digit, decimal point, or operator) can be added to the current input context

function ip_correct(val) {
    let last_ip=input.slice(-1);
    let sym=["+","-","*","/"];
    if (val == "." && last_ip == ".") {
        return false;
    }
    if(sym.includes(val)){
        if (sym.includes(last_ip)) {
            return false;
        }
        else{
            return true;
        }
    }
   return true; 
}
