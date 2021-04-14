//Necessário para recuperar os comentários
$(document).ready(function () {
  (function () {
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
  

  })();

  (function () {
    let pathname = window.location.pathname;
    if (pathname == "/comentarios/") {
      $(".nav .nav-item a:last").addClass("active");
    }
  })();
});