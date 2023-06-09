const disp = document.querySelector('.display')

window.addEventListener('click',function(e){
    element = e.srcElement.textContent
    
    if(element == 'x'){
        element = '*'
    }

    if(element== '÷'){
        element = '/'
    }

    if(element == '1' || element == '2' ||element == '3' ||element == '4' ||element == '5' ||element == '6' ||element == '7' ||element == '8' ||element == '9' ||element == '0'){
        addNumToDisplay(element)
    }else if(element == "AC"){
        disp.textContent ='0'
    }else if(element == 'DEL'){
        len = disp.textContent.length
        if(len <= 1){
            disp.textContent = 0
        }else{
            disp.textContent = disp.textContent.substring(0,len-1)
        }
    }else if(element == '+' || element == '-' ||element == '*' ||element == '/' || element == '.'){
        addOperatorToDisplay(element)
    }else if(element == '='){
        doMath()
    }
})

function addNumToDisplay(str){
    if(disp.textContent.length == 1 && disp.textContent == '0'){
        disp.textContent = str
    }else{
        disp.textContent+= str
    }
}

function addOperatorToDisplay(operator){
    if((disp.textContent.length == 1 && disp.textContent != '0') || disp.textContent.length > 1){
        if(disp.textContent[disp.textContent.length-1] != "+" && disp.textContent[disp.textContent.length-1] != "-" && disp.textContent[disp.textContent.length-1] != "*" && disp.textContent[disp.textContent.length-1] != "/"){
            if(element == '.'){
                disp.textContent += '.'
            }else{
                disp.textContent += (" " + element + " ")
            }
        }
    }
}

function doMath(){
    arr = disp.textContent.split(' ')
    if(arr[arr.length-1] == "+" || arr[arr.length-1] == "-" || arr[arr.length-1] == "*" || arr[arr.length-1] == "/"){
        arr.pop()
    }

    let numOfDivide = arr.reduce((total,x) => total+(x=="/"), 0)
    let numOfMultiply = arr.reduce((total,x) => total+(x=="*"), 0)
    let numOfAdd = arr.reduce((total,x) => total+(x=="+"), 0) 
    let numOfSubtract = arr.reduce((total,x) => total+(x=="-"), 0)
    total = numOfDivide+numOfMultiply+numOfAdd+numOfSubtract

    while(total>0){
        if(numOfDivide>0){
            arr = calculate(arr,'/')
            numOfDivide-=1
            total-=1

        }else if(numOfMultiply){
            arr = calculate(arr,'*')
            numOfMultiply-=1
            total-=1

        }else if(numOfAdd){
            arr = calculate(arr,'+')
            numOfAdd-=1
            total-=1

        }else if(numOfSubtract){
            arr = calculate(arr,'-')
            numOfSubtract-=1
            total-=1

        }
    }
    if(arr[0].length >5){
        temps = parseFloat(arr[0]).toFixed(10)
        disp.textContent = temps.substring(0,temps.indexOf('0'))
    }else{
        disp.textContent = parseFloat(arr[0])
    }
}

function calculate(arr, type){
    const operationLoc = arr.indexOf(type)
    switch(type){
        case '/':
            temp = String(parseFloat(arr[operationLoc-1]) / parseFloat(arr[operationLoc+1]))
            break
        case '*':
            temp = String(parseFloat(arr[operationLoc-1]) * parseFloat(arr[operationLoc+1]))
            break
        case '+':
            temp = String(parseFloat(arr[operationLoc-1]) + parseFloat(arr[operationLoc+1]))
            break
        case '-':
            temp = String(parseFloat(arr[operationLoc-1]) - parseFloat(arr[operationLoc+1]))
            break
    }
    beg = arr.splice(0,operationLoc-1)
    beg.push(temp)
    end = arr.splice(operationLoc+2)
    arr = beg.concat(end)
    return arr
}