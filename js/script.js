$(document).ready(function(){
    getData();

//cliccando sulla X si cancella la voce dalla lista
    $(document).on('click', '.delete', function(){
        var elemento = $(this);
        var idToDo = elemento.parent().attr('data-id');
        deleteElement(idToDo);
    });

//facendo push sul bottone si salva l'elemento nella lista
    $('button').click(function(){
        var nuovoToDo = $('input').val();
        $('input').val('');
        createElement(nuovoToDo);
    });

//sul doppioclick si modifica la voce della lista
    $(document).on('dblclick', '.todos li', function(){
        var elemento = $(this);
        var idToDo = elemento.attr('data-id');
        var testo = prompt('Inserisci il testo da modificare...');
        editElement(idToDo, testo);
    });

});

//** FUNZIONI
//funzione che edita il valore nell'API in base all'// ID

function editElement(id, testo) {
    $.ajax({
        url: 'http://157.230.17.132:3030/todos/' + id,
        method: 'PUT',
        data: {
            text: testo
        },
        success: function(risposta){
            console.log(risposta);
            $('.todos').empty();
            getData();
        },
        error: function(errore){
            alert('Errore!');
        }
    });
}

//funzione che aggiunge l'input inserito nell'API
function createElement(elemento){
    $.ajax({
        url: 'http://157.230.17.132:3030/todos/',
        method: 'POST',
        data: {
            text: elemento
        },
        success: function(risposta){
            $('.todos').empty();
            getData();
        },
        error: function(errore){
            alert('Errore!');
        }
    });
}

//Funzione che cancella il dato selezionato
function deleteElement(id){
    $.ajax(
        {
            url: 'http://157.230.17.132:3030/todos/' + id,
            method: 'DELETE',
            success: function(risposta){
                    //svuotiamo la lista + refresh
                    $('.todos').html('');
                    getData();
                },
            error: function(errore){
                alert('Errore!');
            }
        });
}

//chiamata AJAX per recuperare i dati dall'API
function getData(){
    $.ajax(
        {
            url: 'http://157.230.17.132:3030/todos',
            method: 'GET',
            success: function(risposta){
                    getElement(risposta);
                },
            error: function(errore){
                alert('Errore!');
            }
        });
}

//funzione che stampa a video i dati estrapolati dall'API
function getElement(data){
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);

    for (var i = 0; i < data.length; i++) {
        var context = data[i];
        var html = template(context);
        $('.todos').append(html);
    }
}
