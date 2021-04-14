//Necessário para inserir os comentários
$(document).ready(function () {
    $("#add_new_comentario").submit(function (evt) {
        evt.preventDefault();
       
        // Prepara o form pros dados
        let formData = {
            conteudo: $("#conteudo").val()
        }

        $.ajax({
            url: '/api/comentario/create',
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify(formData),
            dataType: 'json',
            async: false,
            cache: false,
            success: function (response) {
                let comentario = response.comentario;
                let comentarioString = "{ conteudo: " + comentario.conteudo + " }"
                let successAlert = '<div class="alert alert-success alert-dismissible">' +
                    '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                    '<strong>' + response.message;
                '</div>'
                $("#response").append(successAlert);
                $("#response").css({ "display": "block" });
                setTimeout(function() {
                    window.location.reload(1);
                  }, 1500);
                resetUploadForm();
            },
            error: function (response) {
                let errorAlert = '<div class="alert alert-danger alert-dismissible">' +
                    '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                    '<strong>' + response.message + '</strong>' + ' ,Error: ' + message.error +
                    '</div>'
                $("#response").append(errorAlert);
                $("#response").css({ "display": "block" });

                resetUploadForm();
            }
        })
        //O trecho abaixo é necessário para os comentários serem atualizados na lista
        //  no momento em que um novo comentário é adicionado
        $.ajax({
            type: "GET",
            url: "/api/comentario/retrieveinfos",
            success: function (response) {
                $("#comentarioTable tr").remove();
                $.each(response.comentarioInfos, (i, comentario) => {
                    var caminhoLer = comentario.conteudo
                    let audioButton ='<audio id="'+comentario.conteudo+'" controls="controls">'+
                    '<source src="'+caminhoLer+'-ler.wav" type="audio/wav" />'+
                    'seu navegador não suporta HTML5'+
                   '</audio>';
        
        

                    let tr_id = 'tr_' + comentario.id;
                    let comentarioRow = '<tr>' +
                        '<td class=\"td_comentario\">' + comentario.conteudo + '</td>' +
                        '<td>' + audioButton + '</td>' +
                        '</tr>';
                    $('#comentarioTable tbody').append(comentarioRow);
                });
            },
            error: function (e) {
                alert("ERROR: ", e);
                console.log("ERROR: ", e);
            }
        });
    });
    

    function resetUploadForm() {
        $("#conteudo").val("");

    }
    
    

    (function () {
        let pathname = window.location.pathname;
        if (pathname === "/") {
            $(".nav .nav-item a:first").addClass("active");
        }
    })();
});
