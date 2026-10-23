let attendance = document.getElementById("attendance");
let credits = document.getElementById("credits");
let subject = document.getElementById("subject");
let grade = document.getElementById("grade");
let calculation = document.getElementById("calculation");
let calc__button = document.getElementById("calc__button");
let calc_form = document.getElementById("calc__form");

console.log("Hello");

calc_form.addEventListener("submit", function(){
    event.preventDefault();
    calculation.innerHTML += `
        <tr> 
            <td>${subject.value}</td> 
            <td>${attendance.value}ч</td> 
            <td>0/${credits.value}</td> 
        </tr>
    `
});