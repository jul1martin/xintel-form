let tab = document.getElementsByClassName("tab");
let prevBtn = document.getElementById("prevBtn");
let nextBtn = document.getElementById("nextBtn");
let saveCompanyBtn = document.getElementById('saveCompany');
let dinamicSelectIntegration = document.getElementById("dinamicSelect");
let dinamicHiddenIntegration = document.getElementById("dinamicHidden");
let dinamicSelectAlquileres = document.getElementById("dinamicSelectAlquileres");
let dinamicHiddenAlquileres = document.getElementById("dinamicHiddenAlquileres");
let dinamicInputIntegration = document.getElementById("dinamicInputIntegration");
let dinamicInputAlquileres = document.getElementById("dinamicInputAlquileres");
let inputCheckbox = document.getElementById("checkbox");
let cancelSubmit = document.getElementById('cancelSubmit');
let advSave = document.getElementById('advSave');
let responseImg = document.getElementById('resultadoImg');
let responseTxt = document.getElementById('resultadoTxt');
let migrations = document.getElementById('migraciones');
let validate = advState = false;
let checkboxFalse = currentTab = 0;
let inputsArray, inputs, selectsArray, selects, validInput, validSelect, checkbox, checkboxArray, previousSelect,form,formIsValid;
let modalSave = new bootstrap.Modal(document.getElementById('modalSave'),{});

nextBtn.addEventListener("click",function(){nextPrev(1)});
prevBtn.addEventListener("click",function(){previusPrev(-1)});
saveCompanyBtn.addEventListener('click',saveForm);
migrations.addEventListener('change',function() {updateSelect(migrations)});
cancelSubmit.addEventListener('click', function() {
    advSave.hidden = false;
    responseTxt.hidden = true;
});
// $('window').on('load',isFormValid());
$('window').on('load',showTab(currentTab));

// Limit events

$('input[name=cuit]').on('input', function(e) {
    if (this.value.length > 13) this.value = this.value.slice(0,13);

});

$('input[name=cuit]').on('keydown', function(e) {
    if(e.keyCode === 8) {
        if(this.value.length === 3) this.value = this.value.replace(' -','')
        if(this.value.length === 11) this.value = this.value.replace('- ','')
    } else {
        if(this.value.length === 2) this.value += '-';
        if(this.value.length === 11) this.value += '-'; 
    }
});

$("input[name=cuit]").bind("paste", function(e){
    let pastedData = e.originalEvent.clipboardData.getData('text');
    let value;
    if(pastedData.length === 8) {
        value = `   ${pastedData}  `;
        console.log(value)
    } else  value = `${pastedData.slice(0,2)}-${pastedData.slice(2,10)}-${pastedData.slice(10,11)}`;
    
    $(this).val(value);
});

$('input[data-type=dni]').on('input', function() {
    if (this.value.length > 8) this.value = this.value.slice(0,8);
});

$('input[name=cp]').on('input',function() {
    if (this.value.length > 4) this.value = this.value.slice(0,4);
})


// async function isFormValid() {
//     let url = `http://127.0.0.1:8000/api/formularios/${token}`;
//     let form = await fetch(url).then(response => ( response.json() )).then(data => ( formIsValid = data )).catch(error => (console.log(error)));
//     if(formIsValid) {
//         showTab(currentTab);
//     } else return location.replace('http://127.0.0.1:8000/formularios/creacion/error');
// }

function showTab(n) {
    tab[n].style.display = "block";
    tab[n].className += " initial";
    prevBtn.style.display = "inline";
    nextBtn.innerHTML = "Siguiente";

    if (n === 0) prevBtn.style.display = "none";
    if (n === (tab.length - 1)) nextBtn.innerHTML = "Cargar empresa";

    selects = tab[currentTab].getElementsByTagName("select");
    selectsArray = Array.from(selects);
    inputs = tab[currentTab].getElementsByTagName("input");
    inputsArray = Array.from(inputs);
    checkboxs = tab[currentTab].getElementsByClassName("inputCheckbox");
    checkboxArray = Array.from(checkboxs);

    if(!selectsArray.length) validSelect = true;

    inputsArray.forEach(input => { input.addEventListener("input",inputValidate) });
    selectsArray.forEach(select => { select.addEventListener("click",selectValidate) });
    checkboxArray.forEach(checkbox => { checkbox.addEventListener("change",updateCheckbox) });

    stepIndicator(n);
}

function inputValidate() {
    if(!inputsArray.length) inputsArray = true;
    if (validate) {
        validInput = true;

        inputsArray.forEach(inputArr => {
            inputArr.style.backgroundColor = "var(--main-input-opacity)";
            if (inputArr.type === "file" || inputArr.disabled) return;
            if(inputArr.name === "piso" || inputArr.name === "oficina") return;
            if (dinamicInputIntegration === inputArr && dinamicHiddenIntegration.hidden) return;
            if(dinamicHiddenAlquileres === inputArr && dinamicHiddenAlquileres.hidden) return;
            if (inputArr.type === "checkbox") checkboxesCheck(inputArr);
            if(validateCuit(inputArr) === false || validateEmail(inputArr) === false || validateUrl(inputArr) === false || isEmpty(inputArr)) validInput = false;
        });

        if (validInput && validSelect) {
            $('#personalizedAdv').css('display','none');
            $('#personalizedAdv').empty();
            setOrRemoveError(advState, validInput);
        }
        checkboxFalse = 0;
    }
}

function selectValidate(select) {
    validSelect = true;
    if (validate) {
        selects.forEach(select => {
            select.style.backgroundColor = "var(--main-error)";
            if (isEmpty(selects[i])) validSelect = false; 
        });

        if (validInput && validSelect) setOrRemoveError(advState, validSelect);
    }
}

function formValidate() {
    let isValid = true;
    validate = true;
    inputs = Array.from(tab[currentTab].getElementsByTagName("input"));
    selects = Array.from(tab[currentTab].getElementsByTagName("select"));
    inputs.forEach(input => {
        if (input.type === "file" || input.disabled || input.hidden ||  dinamicInputAlquileres === input && dinamicHiddenAlquileres.hidden || dinamicInputIntegration === input && dinamicHiddenIntegration.hidden || input.name === "piso" || input.name === "oficina") return;
        if (isEmpty(input)) isValid = false;
        if (input.type === "checkbox") {
            // if (input.checked === false) checkboxFalse ++;
            // if (checkboxFalse === 7) {
            //     inputCheckbox.style.backgroundColor = "var(--main-error)";
            //     isValid = false;
            // } else inputCheckbox.style.backgroundColor = "var(--main-input-opacity)";
            // return;
            checkboxesCheck(input)
        }
        if(validateCuit(input) === false || validateEmail(input) === false || validateUrl(input) === false) isValid = false;
    });

    selects.forEach(select => {
        select.style.backgroundColor = "var(--main-input-opacity)";
        if (isEmpty(select)) isValid = false;
    });

    checkboxFalse = 0
    if (isValid) {
        document.getElementsByClassName("step")[currentTab].style.backgroundColor = "#04AA6D";
        $('#personalizedAdv').css('display','none');
        $('#personalizedAdv').empty();
        return isValid;
    }

    document.getElementsByClassName("step")[currentTab].style.backgroundColor = "red";
    setOrRemoveError(advState,isValid);
    $('#personalizedAdv').css('display','block');
    return isValid;
}

function nextPrev(n) {
    if (n === 1 && !formValidate()) return false;
    validate = false;
    if (currentTab >= tab.length - 1) {
        modalSave.show();
        return;
    }
    tab[currentTab].style.display = "none";
    currentTab += n;

    showTab(currentTab);
}

function previusPrev(n) {
    if (n === 1 && !formValidate()) return false;
    tab[currentTab].style.display = "none";
    validate = false;
    currentTab += n;
    
    showTab(currentTab);
}

function stepIndicator(n) {
    let step = document.getElementsByClassName("step");
    for (let i = 0; i < step.length; i++) step[i].className = step[i].className.replace(" active", " ");
    
    step[n].className += " active";
}

dinamicSelectIntegration.addEventListener("change", function(){
    if (dinamicSelectIntegration.value === "integracion") {
        hiden = false; 
        return dinamicHiddenIntegration.removeAttribute("hidden");
    }
    if (!dinamicHiddenIntegration.getAttribute("hidden")) {
        hiden = true; 
        return dinamicHiddenIntegration.setAttribute("hidden","");
    }
})

dinamicSelectAlquileres.addEventListener("change", function(){
    if (dinamicSelectAlquileres.value === "Administracion de alquileres" || dinamicSelectAlquileres.value === "ambos_servicios") {
        hiden = false; 
        return dinamicHiddenAlquileres.removeAttribute("hidden");
    }
    if (!dinamicHiddenAlquileres.getAttribute("hidden")) {
        hiden = true; 
        return dinamicHiddenAlquileres.setAttribute("hidden","");
    }
})

function updateCheckbox(checkbox) {
    if (!checkbox.target.checked && inputCheckbox.value) {
        inputCheckbox.value = inputCheckbox.value.replace(`${checkbox.target.value} , `,"");
        inputCheckbox.value = inputCheckbox.value.replace(`, ${checkbox.target.value}`,"");
        inputCheckbox.value = inputCheckbox.value.replace(checkbox.target.value,"");
    }

    if (!checkbox.target.checked) return $(`#${checkbox.target.name}`).remove()
    if (!inputCheckbox.value) return inputCheckbox.value = checkbox.target.value;

    return inputCheckbox.value = `${inputCheckbox.value}, ${checkbox.target.value}`;
}

function updateSelect(select) {
    let integrations = document.getElementById('integrations');
    
    $(`#${previousSelect}`).remove();

    if(select.value === "no") return;

    previousSelect = select.value;
    let divSend = document.createElement("div");
    divSend.id = select.value;

    divSend.innerHTML = `
    <div class="mb-2 input-form form-block mono-line-responsive-420 mono-line-responsive-1366 ">
        <input type="text" name="user${select.value}" required>
        <label class="label-input" alt="Label" data-placeholder="Usuario de ${select.value}"></label>
    </div>
    <div class="mb-2 input-form form-block mono-line-responsive-420 mono-line-responsive-1366">
    <span style="display:flex; align-items:center"><input type="password" name="pass${select.value}" class="inputEye" value="" required>
        <label class="label-input" alt="Label" data-placeholder="Contraseña de ${select.value}"></label><i class="fas fa-solid fa-eye-slash ${select.value}"></i></span>
    </div>`;

    integrations.appendChild(divSend);

    let passwordEye = document.getElementsByClassName(select.value);
    let passwordEyeArray = Array.from(passwordEye);
    passwordEyeArray.forEach(eye => {
        eye.addEventListener('click',function() {showPassword('pass'+select.value, eye)});
    });
}

function showPassword(name,eye) {
    let inputEye = document.getElementsByName(name);
    inputEyeArray = Array.from(inputEye);

    if(inputEyeArray[0].type === 'text') {
        inputEyeArray[0].type = 'password';
        eye.className = eye.className.replace(' fa-eye',' fa-eye-slash')
    } else {
        inputEyeArray[0].type = 'text';
        eye.className = eye.className.replace(' fa-eye-slash',' fa-eye')
    }
}

function saveForm(e) {
    let checkboxes = document.getElementsByClassName('inputCheckbox');
    checkboxes = Array.from(checkboxes);
    checkboxes.forEach(checkbox => {
        if(checkbox.checked) return checkbox.value = true;
    });

    // $.ajax({
    //     url: 'http://127.0.0.1:8000/api/formularios/verificacion',
    //     method: 'post',
    //     data: {
    //         token: token,
    //         name: $('input[name=nombreImb]').val(),
    //         sended_email: $('input[name=emailPersonal]').val(),
    //         company_email: $('input[name=emailEmpresa]').val(),
    //         adress: $('input[name=direccion]').val(),
    //         postal_code: $('input[name=cp]').val(),
    //         country: $('select[name=pais]').val(),
    //         province: $('input[name=provincia]').val(),
    //         city: $('input[name=ciudad]').val(),
    //         locality: $('input[name=localidad]').val(),
    //         floor: $('input[name=piso]').val(),
    //         ofice: $('input[name=oficina]').val(),
    //         social_reason: $('input[name=razonSoc]').val(),
    //         cuit: $('input[name=cuit]').val(),
    //         company_img: $('input[name=companyImg]').val(),
    //         owner_name: $('input[name=nomTitular]').val(),
    //         owner_email: $('input[name=emailPersonalTit]').val(),
    //         owner_dni: $('input[name=dniPersonalTit]').val(),
    //         props: $('input[name=cuantasPropiedades]').val(),
    //         services: $('select[name=servicios]').val(),
    //         contracts: $('input[name=cuantosContratos]').val(),
    //         web_site: $('input[name=urlIntegracion]').val(),
    //         migrations: $('select[name=migraciones]').val(),
    //         user_zonaprop: $('input[name=userZonaprop]').val(),
    //         pass_zonaprop: $('input[name=passZonaprop]').val(),
    //         user_mercadoL: $('input[name=userMercadolibre]').val(),
    //         pass_mercadoL: $('input[name=passMercadolibre]').val(),
    //         portals: $('input[name=portales]').val(),
    //         portalZonaprop: $('input[name=portales]').val(),
    //         portalMercadoL: $('input[type="checkbox"][name="mercadolibre"]:checked').val(),
    //     },
    //     beforeSend: function(){
    //         advSave.hidden = true;
    //         responseImg.src = "assets/loading.gif";
    //     },
    //     success: function(response) {
    //         location.replace('http://127.0.0.1:8000/formularios/creacion/registered');
    //         console.log(response)
    //     },
    //     error: function(response) {
    //         responseImg.src = "";
    //         responseTxt.hidden = false;
    //     }
    // });
    e.preventDefault();
}

function setOrRemoveError(state, valid) {
    let adv = $('#adv');
    let home = $('#home');

    if(!valid) {
        if (!state) {
            adv.css('display',"block");
            home.css('color',"#e74a3b"); 
            advState = true;
        } 
    } else {
        adv.css('display',"none");
        home.css('color',"black");
        document.getElementsByClassName("step")[currentTab].style.backgroundColor = "#04AA6D";
        advState = false;
    }
}

function checkboxesCheck(input) {
    if (!input.checked) checkboxFalse ++;
    if (checkboxFalse  === 7) {
        input.style.backgroundColor = "var(--main-error)";
        validInput = false; 
        setOrRemoveError(advState,validInput)
    } else input.style.backgroundColor = "var(--main-input-opacity)"; 
    checkboxFalse = 0;
}

function validateEmail(input) {
    if(input.dataset.type === 'email') {
        let validateEmail =  String(input.value)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        
        if(validateEmail === null) {
            input.style.backgroundColor = "var(--main-error)";

            if($('#personalizedAdv').text().indexOf('Coloque correctamente los E-Mail. ') < 0) {
                $('#personalizedAdv').text($('#personalizedAdv').text() + 'Coloque correctamente los E-Mail. ');
            }
            return false;
        } else $('#personalizedAdv').text($('#personalizedAdv').text().replace('Coloque correctamente los E-Mail.' ,' '));
    }
}

function validateUrl(input) {
    if(input.dataset.type === 'url') {
        let urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
        '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator

        if(!(!!urlPattern.test(input.value))) {
            input.style.backgroundColor = "var(--main-error)";
            if($('#personalizedAdv').text().indexOf('Coloque correctamente los URL. ') < 0) {
                $('#personalizedAdv').text($('#personalizedAdv').text() + 'Coloque correctamente los URL. ');
            }
            return false;
        } else $('#personalizedAdv').text($('#personalizedAdv').text().replace('Coloque correctamente los URL.' ,' '));
    }
}

function validateCuit(input) {
    if(input.name === 'cuit') {
        if(input.value.length < 13) {
            input.style.backgroundColor = "var(--main-error)";
            validate = true;
            return false;
        }
    }
}

function isEmpty(element) {
    if(!element.value) {
        element.style.backgroundColor = "var(--main-error)";
        return true;
    }
}