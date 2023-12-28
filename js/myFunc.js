function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));

    if (match) {
        // Obtener el valor de la cookie
        var cookieValue = match[2];

        // Comprobar si la cookie tiene fecha de caducidad
        if (match[1].indexOf(';') === 0) {
            // Obtener la fecha de caducidad de la cookie
            var expirationDate = new Date(match[1].slice(1));

            // Comprobar si la cookie ha caducado
            var currentDate = new Date();

            if (expirationDate > currentDate) {
                // La cookie no ha caducado, devolver el valor
                return cookieValue;
            } else {
                // La cookie ha caducado, eliminarla
                document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                return null;
            }
        } else {
            // La cookie no tiene fecha de caducidad, devolver el valor
            return cookieValue;
        }
    } else {
        // No se encontró la cookie
        return null;
    }
}

// Función para Crear una cookie
function setCookie(name, value, minutes) {
    var expires = "";
    if (minutes) {
        var date = new Date();
        date.setTime(date.getTime() + (minutes * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

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
}

$(document).on("click", '[data-toggle="tooltip"]', function () {
    $('.tooltip.show').remove();
});