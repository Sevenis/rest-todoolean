$(document).ready(function(){
    getData();

    $(document).on('click', '.delete', function(){
        var elemento = $(this);
        var idToDo = elemento.parent().attr('data-id');
        deleteElement(idToDo);
    });

    $('button').click(function(){
        var nuovoToDo = $('input').val();
        createElement(nuovoToDo);
    });

});

//** FUNZIONI

function createElement(elemento){
    $.ajax({
        url: 'http://157.230.17.132:3000/todos/',
        method: 'POST',
        data: {
            text: elemento
        },
        success: function(risposta){
            getData();
        },
        error: function(errore){
            alert('Errore!');
        }
    });
}

function deleteElement(id){
    $.ajax(
        {
            url: 'http://157.230.17.132:3000/todos/' + id,
            method: 'DELETE',
            success: function(risposta){
                    //svuotiamo la lista
                    $('.todos').html('');
                    getData();
                },
            error: function(errore){
                alert('Errore!');
            }
        });
}

function getData(){
    $.ajax(
        {
            url: 'http://157.230.17.132:3000/todos',
            method: 'GET',
            success: function(risposta){
                    getElement(risposta);
                },
            error: function(errore){
                alert('Errore!');
            }
        });
}

function getElement(data){
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);

    for (var i = 0; i < data.length; i++) {
        var context = data[i];
        var html = template(context);
        $('.todos').append(html);
    }
}
