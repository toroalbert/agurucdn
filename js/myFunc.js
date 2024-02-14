function templateExists(templatePath) {
    return result = new Promise(function (resolve, reject) {
        $.ajax({
            url: templatePath,
            type: 'HTML',
            success: function (data) {

                // La plantilla existe
                resolve(templatePath);
            },
            error: function () {
                // La plantilla no existe
                resolve('./views/template/404.html');
            }
        });
    }).then(function (result) {
        // Esta parte se ejecuta después de que la promesa se resuelve
        return result;
    });
}

function startAnimation() {
    anime({
        targets: '#anime div',
        translateX: function () { return anime.random(10, 14) + 'rem'; },
        scale: function () { return anime.random(10, 20) / 10; },
        rotate: function () { return anime.random(-360, 360); },
        duration: function () { return anime.random(1000, 2000); },
        direction: 'alternate',
        loop: true
    });
}

function generateFalseData(cantidad = 400) {
    let eventsArray = [];
    const paddedLength = cantidad.toString().length;

    for (let i = 1; i <= cantidad; i++) {
        let paddedNumber = i.toString().padStart(paddedLength, '0');
        let startDate = `2023-01-${paddedNumber}`;

        eventsArray.push({
            name: `Event ${paddedNumber}`,
            position: `Position ${paddedNumber}`,
            office: `Office ${paddedNumber}`,
            create_at: {
                $date: {
                    $numberLong: new Date(),
                }
            },
            age: i,
            startDate,
            salary: `$${i * 1000}`
        });
    }

    return eventsArray;
}

function activeHref(href) {
    $('.nav-item, .collapse-item').each(function () {
        var link = $(this).is('.collapse-item') ? $(this).attr('href') : $(this).find('a').attr('href');
        // Comprueba si el href coincide con la URL actual y agrega o elimina la clase 'active'
        $(this).toggleClass('active', link === href);
    });
}
function addSpin(selector) {
    const content = `<i id="spinner" class="fa fa-spin fa-spinner ml-2 text-primary"></i>`;
    $(selector).append(content);
}

function delSpin(success) {
    const $this = $("#spinner");
    $this.removeClass("fa-spin fa-spinner text-primary")
    if (success) {
        $this.addClass("fa-check text-success");
    } else {
        $this.addClass("fa-times text-danger");
    }
    setTimeout(() => {
        $this.remove();
    }, 1000);
    $(".text-hidden").removeClass("text-hidden");
}

$(document).on("click", '[data-toggle="tooltip"]', function () {
    $('.tooltip.show').remove();
});

function showAlert(type, message) {
    let errorMessagePrefix = message.split(':')[0];
    let content = `
    <div class="alert bg-${type} text-white alert-dismissible fade show " role="alert">
        <strong>${errorMessagePrefix}</strong>:${message.substring(errorMessagePrefix.length + 1)}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">×</span>
        </button>
    </div>
    `;
    $('.alert-content').html(content);
    setTimeout(() => {
        $('.alert-content .close').click();
    }, 2000);
}

function getTypePerson() {
    return fetch('./api/typePerson?token=' + encodeURIComponent(token))
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => data.answer)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return [];
        });
}

function getTypeSport() {
    return fetch('./api/typeSport?token=' + encodeURIComponent(token))
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => data.answer)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return [];
        });
}

function getDelegations() {
    return fetch('./api/user?token=' + encodeURIComponent(token) + '&delegation=true')
        // return fetch('./api/user?token=' + encodeURIComponent(token))
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => data.answer)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return [];
        });
}

function getPersons() {
    return fetch('./api/person?token=' + encodeURIComponent(token))
        // return fetch('./api/user?token=' + encodeURIComponent(token))
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => data.answer)
        .catch(error => {
            console.error('Error en la solicitud:', error);
            return [];
        });
}

function generateFieldHTML(field, forcalias) {
    // console.log("forcalias", forcalias);
    var labelText = "";
    if (!forcalias) {
        forcalias = "";
    } else {

        labelText = $("option[value='" + forcalias + "']").text();
    }

    var html = '';
    html += '<label for="fl-' + field.alias + forcalias + '">' + (labelText) ? labelText + ' ' + field.name + '</label>' : (forcalias != "") ? forcalias + ' ' + field.name + '</label>' : '' + field.name + '</label>';

    switch (field.type) {
        case 'dni':
        case 'file':
            html += `
            <div class="input-group mb-3">
                <div class="input-group-prepend" ng-if="datos.${field.alias}${forcalias}">
                    <a href="./img/{{segment}}/{{datos.${field.alias}${forcalias}}}" target="_blank" data-toggle="modal"
                        data-target="#imageModal" class="input-group-text" id="inputGroupFileAddon01">
                        <i class="fa fa-images" data-toggle="tooltip" data-placement="top" title="Logo Actual">
                        </i>
                    </a>
                </div>
                <div class="custom-file">
                    <input type="file" class="custom-file-input" id="fl-new${field.alias}${forcalias}"
                        aria-describedby="inputGroupFileAddon01" accept="image/*" name="new${field.alias}${forcalias}" ngf-select
                        ng-model="datos.new${field.alias}${forcalias}" ngf-accept="'image/*'">
                    <label class="custom-file-label" for="new${field.alias}${forcalias}">{{datos.new${field.alias}${forcalias}.name || "Select
                        File"}}</label>
                </div>
            </div>
            `;
            break;
        case 'select':
            // <select class="form-control" ui-select2="datos.${field.alias}${forcalias}" id="fl-${field.alias}${forcalias}" name="${field.alias}${forcalias}" ng-model="datos.${field.alias}${forcalias}">
            html += `
            <select class="form-control" id="fl-${field.alias}${forcalias}" name="${field.alias}${forcalias}" ng-model="datos.${field.alias}${forcalias}">
                <option value="">Seleccione ${field.name}</option>
                `;
            field.options.forEach(function (option) {
                html += `
                    <option value="${option.value}">${option.name}</option>
                `;
            });
            html += `
            </select>
            `;
            break;
        case 'textarea':
            html += `<textarea class="form-control" id="fl-${field.alias}${forcalias}" name="${field.alias}${forcalias}" placeholder="${field.name}"
                          ng-model="datos.${field.alias}${forcalias}"></textarea>`;
            break;
        default:
            html += `<input type="${field.type}" class="form-control" id="fl-${field.alias}${forcalias}" name="${field.alias}${forcalias}" placeholder="${field.name}"
            ng-model="datos.${field.alias}${forcalias}">`;
            break;
    }

    return html;
}


function setTheme($theme) {
    $("html").attr("data-bs-theme", $theme);
    if ($theme == "dark") {
        $("#theme-active").attr("class", "fa-thin fa-moon-stars");
    } else {
        $("#theme-active").attr("class", "fa-thin fa-sun");
    }
    localStorage.setItem("theme", $theme);
}