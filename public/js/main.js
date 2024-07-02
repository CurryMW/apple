let equaption = []



const keyboardList = [
    {type: 'command', value: 'clear', label: 'C'},
    {type: 'command', value: 'toggle-minus', label: '+/-'},
    {type: 'command', value: 'percentage', label: '%'},
    {type: 'operation', value: 'division', label: '/'},
    {type: 'number', value: '7', label: '7'},
    {type: 'number', value: '8', label: '8'},
    {type: 'number', value: '9', label: '9'},
    {type: 'operation', value: 'multiple', label: '*'},
    {type: 'number', value: '4', label: '4'},
    {type: 'number', value: '5', label: '5'},
    {type: 'number', value: '6', label: '6'},
    {type: 'operation', value: 'minus', label: '-'},
    {type: 'number', value: '1', label: '1'},
    {type: 'number', value: '2', label: '2'},
    {type: 'number', value: '3', label: '3'},
    {type: 'operation', value: 'plus', label: '+'},
    {type: 'number', value: '0', label: '0'},
    {type: 'number', value: '.', label: '.'},
    {type: 'command', value: 'equal', label: '='},
]

const keyboardArea = document.querySelector('#keyboard-area')
const input = document.querySelector('.input')
let isLastKeyOperation = false
const clear = () => {
    equaption = []
    input.textContent = '0'
}


const calculate = (number1, operation, number2) => {
    let result = ''
    switch(operation) {
        case 'plus': result = parseFloat(number1) + parseFloat(number2);break;
        case 'minus': result = parseFloat(number1) - parseFloat(number2);break;
        case 'multiple': result = parseFloat(number1) * parseFloat(number2);break;
        case 'division': result = parseFloat(number1) / parseFloat(number2);break;
        default: throw new Error('操作错误');
    }
    return result;
}

const clickKey = (e) => {
    const {dataset} = e.target

    if(dataset.type === 'command' && dataset.value === 'clear') {
        clear()
        return
    }


    if(dataset.type === 'number') {
        if(input.textContent === '0' || isLastKeyOperation) {
            input.textContent = dataset.value
            isLastKeyOperation = false
        } else {
            input.textContent = input.textContent + dataset.value
        }
    }

    if(dataset.type === 'operation') {
        equaption.push({
            type: 'number',
            value: Number.parseFloat(input.textContent)
        })
        equaption.push({
            type: dataset.type,
            value: dataset.value
        })
        isLastKeyOperation = true
    }

    if(dataset.type === 'command' && dataset.value === 'equal') {
        result = calculate(equaption[0].value, equaption[1].value, input.textContent)
        input.textContent = result
    }
}

const buildKeyboards = () => {
    keyboardList.forEach(item=>{
        const element = document.createElement('div')
        element.dataset.type = item.type
        element.dataset.value = item.value
        element.classList.add('key')
        element.classList.add(item.value)
        element.innerText = item.label
        element.addEventListener('click', clickKey)
        keyboardArea.appendChild(element)
    })
}




buildKeyboards()












