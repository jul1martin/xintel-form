var tab = document.getElementsByClassName("tab");
var bntNewUser = document.getElementById('newUser');
var prevBtn = document.getElementById("prevBtn");
var nextBtn = document.getElementById("nextBtn");
var dinamicSelect = document.getElementById("dinamicSelect");
var dinamicHidden = document.getElementById("dinamicHidden");
var dinamicInput = document.getElementById("dinamicInput");
var checkboxPortales = document.getElementsByClassName("inputCheckbox");
var validate = false;
var advState = false;
var validCheckbox = false;
var currentTab = 0;
var step = document.getElementsByClassName("step")[currentTab];
var completeStep = document.getElementById("complete-step");
var inputsArray, inputs, selectsArray, selects, validInput, validSelect;
var modalSave = new bootstrap.Modal(document.getElementById('modalSave'),{})
nextBtn.addEventListener("click",function(){nextPrev(1)})
prevBtn.addEventListener("click",function(){nextPrev(-1)})
bntNewUser.addEventListener('click', newUser);


showTab(currentTab);


function showTab(n) {
    tab[n].style.display = "block";
    prevBtn.style.display = "inline";
    nextBtn.innerHTML = "Siguiente";
    
    var inputFile = document.getElementById("formFile");
    var labelFile = document.getElementById("labelFile");
    if (n == 0) prevBtn.style.display = "none";
    if (n == (tab.length - 2)) nextBtn.innerHTML = "Cargar empresa"; // tab.length-1 
    if (n == (tab.length - 1)) {
        completeStep.style.display = "none";
        nextBtn.style.display = "none";
        prevBtn.style.display = "none";
    }
    selects = tab[currentTab].getElementsByTagName("select");
    selectsArray = Array.from(selects);
    inputs = tab[currentTab].getElementsByTagName("input");
    inputsArray = Array.from(inputs);

    if(!selectsArray.length) validSelect = true;

    inputsArray.forEach(input => { input.addEventListener("input",inputValidate) });
    inputsArray.forEach(input => { input.addEventListener("input",function() {limitLength(input)})});
    selectsArray.forEach(select => { select.addEventListener("click",selectValidate) });

    inputFile.addEventListener("input",function(){ if (inputFile.value) labelFile.style.borderBottom = "2px solid var(--main-color)"; })
    stepIndicator(n);
}

function inputValidate(input) {
    if(!inputsArray.length) inputsArray = true;
console.log(input.target.type)
    validInput = true;
    if (validate) {
        input.target.style.backgroundColor = "white";
        if (!input.target.value) input.target.style.backgroundColor = "#ffdddd";

        for (i = 0; i < inputs.length; i++) {
            if (inputs[i].disabled) continue;
            if (inputs[i].type == "file") continue;
            if (dinamicInput == inputs[i] && dinamicHidden.hidden) continue;
            if (!inputs[i].value) validInput = false; 
        }

        if (validInput && validSelect) {
            home.style.color = "black"; 
            adv.style.display = "none";
            // step.className += " finish";
            step.style.backgroundColor = "#04AA6D";

            advState = false;
        }
    }
}

function selectValidate(select) {
    var step = document.getElementsByClassName("step")[currentTab];
    validSelect = true;

    if (validate) {
        if (!select.target.value) {
            select.target.style.backgroundColor = "#ffdddd";
        } else {
            select.target.style.backgroundColor = "white";
        }

        for (i = 0; i < selects.length; i++) {
            if (!selects[i].value) validSelect = false; 
        }

        if (validInput && validSelect) {
            home.style.color = "black"; 
            adv.style.display = "none";
            // step.className += " finish";
            step.style.backgroundColor = "#04AA6D";
            advState = false;
        }
    }
}

function formValidate() {
    var i, isValid = true;
    var adv = document.getElementById("adv");
    var home = document.getElementById("home");

    inputs = tab[currentTab].getElementsByTagName("input");
    selects = tab[currentTab].getElementsByTagName("select");

    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].disabled) continue;
        if (inputs[i].type == "file") continue;
        // if (inputs[i].disabled) continue;
        if (dinamicInput == inputs[i] && dinamicHidden.hidden) continue;
        if (!inputs[i].value) {
            inputs[i].style.backgroundColor = "#ffdddd";
            isValid = false;
            validate = true;
            if (advState == false) {
                adv.style.display = "block";
                home.style.color = "#e74a3b"; 
                advState = true;
            } 
        } else {
                inputs[i].style.backgroundColor = "white";
                home.style.color = "black"; 
                adv.style.display = "none"; 
                advState = false;
            } 
    }

    for (i = 0; i < selects.length; i++) {
        if (!selects[i].value) {
            selects[i].style.backgroundColor = "#ffdddd";
            isValid = false;
            validate = true;
            if (advState == false) {
                adv.style.display = "block";
                home.style.color = "#e74a3b"; 
                advState = true;
            } 
        } else {
            selects[i].style.backgroundColor = "white";
                home.style.color = "black"; 
                adv.style.display = "none"; 
                advState = false;
            } 
    }

    if (isValid) {
        document.getElementsByClassName("step")[currentTab].style.backgroundColor = "#04AA6D"; // document.getElementsByClassName("step")[currentTab].className += " finish";
        return isValid;
    } 
        document.getElementsByClassName("step")[currentTab].style.backgroundColor = "red"; // document.getElementsByClassName("step")[currentTab].className += " incomplete";
        return isValid;


}

function nextPrev(n) {
    if (n == 1 && !formValidate()) return false;
    tab[currentTab].style.display = "none";
    validate = false;
    currentTab = currentTab + n;

    if (currentTab >= tab.length - 2) {
        modalSave.show();
    }

    showTab(currentTab);
}

function newUser(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    
    var numSelectsName = 0;
    var send = document.getElementById('send');
    var divSend = document.createElement("div");
    numSelectsName++;

    divSend.innerHTML =
    `<div class="divisor"></div>
    <div class="mb-2 input-form form-block">
    <input type="text" name="nom_user`+numSelectsName+`" autocomplete="name" required>
    <label class="label-input" alt="Label" data-placeholder="Nombre completo"></label>
    </div>
    <div class="mb-2 input-form form-block">
    <input type="text" name="email_personal_user`+numSelectsName+`" autocomplete="email" required>
    <label class="label-input" alt="Label" data-placeholder="Correo electronico personal"></label>
    </div>
    <div class="mb-2 input-form form-block">
    <input type="number" name="dni_user`+numSelectsName+`" autocomplete="off" required>
    <label class="label-input" alt="Label" data-placeholder="Documento Nacional de Identidad"></label>
    </div>`;
    send.appendChild(divSend);

    return showTab(currentTab);
}

function stepIndicator(n) {
    var i, step = document.getElementsByClassName("step");
    for (i = 0; i < step.length; i++) step[i].className = step[i].className.replace(" active", " ");
    
    step[n].className += " active";
}

function limitLength(input) {
    switch (input.name) {
        case "cp":
            if (input.value.length > 4) input.value = input.value.slice(0,4);
            break;
        case "dni_tit":
            if (input.value.length > 9) input.value = input.value.slice(0,9);
            break;
        case "dni_user":
            if (input.value.length > 9) input.value = input.value.slice(0,9);
            break;
    }
    return;
}

dinamicSelect.addEventListener("click", function(){
    if (dinamicSelect.value == "integracion") {
        hiden = false; 
        return dinamicHidden.removeAttribute("hidden");
    }
    if (!dinamicHidden.getAttribute("hidden")) {
        hiden = true; 
        return dinamicHidden.setAttribute("hidden","");
    }
})