$(function(){
    loadEstado();
    $("input.regular").live('click', setRegular);
    $("input.final").live('click', setFinal);
    $("input.nota").live('change', setNota);
    
    $("div.anioTitle").live('click', toggleTable);
});

function loadEstado() {
    $.ajax({
        url: 'materia/getestado',
        type: 'post',
        dataType: 'json',
        success: loadClasses
    });
}

function setRegular () {
    // this hace referencia al mismo elemento checkbox
    var id = $(this).attr('id');
    var value = ($(this).is(":checked")) ? 1 : 0;

    $.ajax({
        url: 'materia/setregular',
        type: 'post',
        data: {
            'id' : id,
            'value' : value
        },
        dataType: 'json',
        success: loadClasses
    });
}

function setFinal () {
    // this hace referencia al mismo elemento checkbox
    var id = $(this).attr('id');
    var value = ($(this).is(":checked")) ? 1 : 0;
    
    $.ajax({
        url: 'materia/setfinal',
        type: 'post',
        data: {
            'id' : id,
            'value' : value
        },
        dataType: 'json',
        success: loadClasses
    });
}

function loadClasses (response) {
    if(response.error){
        console.log(response);
    } else {
        $.each(response, function(index, value){
            $("tr#" + value.id).removeClass().addClass(value.class);
        });
    }
}

function setNota () {
    // this hace referencia al mismo elemento checkbox
    var id = $(this).attr('id');
    var value = $(this).val();
    if (value >= 0 && value <= 10) {
        $.ajax({
            url: 'materia/setnota',
            type: 'post',
            data: {
                'id' : id,
                'value' : value
            },
            dataType: 'json',
            success: function (response) {
                console.log(response);
            }
        });
    } else {
        alert("La nota solo puede ser un numero entre 0 y 10.")
        $(this).val("");
    }
}

function toggleTable () {
    var id = $(this).attr('id');
    var selector = "table.anioTable#table-" + id;
    $(selector).slideToggle(0);
}
