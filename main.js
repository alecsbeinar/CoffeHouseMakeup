btnElement = document.querySelector(".btn"); //получаем элемент с классом btn
resultElement = document.querySelector(".result"); //получаем элемент с классом result
radioButtons = document.querySelectorAll('[name="product"]'); //получаем список всех checkbox элементов
countInput = document.querySelectorAll('input[name="count"]');
newRadio = document.querySelectorAll(".checkmark");

resultElement.textContent = "0";

let sum = 0;
let additions = [];
for(let i=0; i<radioButtons.length; i++) {
    let element = radioButtons[i];
    let count = countInput[i];
    additions.push(0);

    count.addEventListener('change', function () {
        let value = parseInt(count.value);
        if(isNaN(value) || value < 0){
            value = 0;
            count.value = 0;
        }
        if(radioButtons[i].checked){
            sum = sum - parseInt(element.value) * additions[i];
            additions[i] = value;
            sum = sum + parseInt(element.value) * additions[i];
            resultElement.textContent = `${sum}`; //записываем значения в result
        }
        else{
            additions[i] = value;
        }
    });

    element.addEventListener("change", function () {
        if(element.checked){                  //если checkbox-кнопка выбрана
            newRadio[i].style.backgroundColor = 'saddlebrown';

            if(additions[i] === 0){
                additions[i] = 1;
                countInput[i].value = 1;
            }
            sum = sum + parseInt(element.value) * additions[i];   //добавляем значение в список выбранных
        } else {
            newRadio[i].style.backgroundColor = '#817070';

            sum = sum - parseInt(element.value) * additions[i];
            countInput[i].value = 0;
            additions[i] = 0;
        }
        resultElement.textContent = `${sum}`; //записываем значения в result
    });   //для каждой checkbox-кнопки из списка checkbox-кнопок
}

btnElement.addEventListener("click", function () {
    let name = document.querySelector(".name").value;
    let surname = document.querySelector(".surname").value;

    let line = `Сумма заказа: ${sum}.\nВключая:\n`;
    for(let i = 0; i < additions.length; i++){
        if(additions[i] !== 0){
            let labelElement = document.querySelector(`label[for="cofe${i+1}"]`);
            line += '- ' + labelElement.textContent + ' * ' + additions[i] + '\n';
        }
    }
    line += '\n' + name + ' ' + surname + ', благодарим вас за то, что выбрали нас!\n';
    alert(line);
})