

$(function() {

    //загружаем список файлов
    Filelist.loadList( $("#filelist") );

    $('body').on("click", "#uploadfile", function(target){
        Filelist.showUploadFilePopup();
    });

});