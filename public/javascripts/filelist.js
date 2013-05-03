
var Filelist = {

    loadList : function($toElem){
        $.post('/list-files', function(data){
            $toElem.html(data);
        })
            .fail(function(e) { $toElem.html("Не удалось загрузить список файлов"); console.log(e.responseText, e); })
    },

    showUploadFilePopup : function(target){
        $.get('/htmls/fileupload.html', function(data){
            $('body').append(data);
            $('#modalfileupload').modal({show:true});

            $('#fileupload').fileupload({
                url: 'uploadfile',
                done:function(e, data){
                    console.log(data.result);

                    //скрываем модальное окно
                    $('#modalfileupload').modal('hide')
                    setTimeout(function(){
                        $('#modalfileupload').remove();
                    }, 1000);

                }
            });

        })
            .fail(function(e) { console.log(e.responseText, e); })
    }
}
