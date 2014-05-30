$(function()
{
    //DIESE KLEINE JAVASCRIPT DATEI BESTIMMT ,WELCHE ANSICHT (GRID ODER LISTE) angezeit werden soll 
    //
    //wir verstecken zuerst die List-View 
      $("#list").hide();
  
  
    //Wenn der Knopf für die Grid-ansicht geklickt wird
    $('#buttonGrid').click(function()
         {
           $(this).removeClass('btn-default');
           $(this).addClass('btn-primary');
           $('#buttonList').removeClass('btn-primary');
           $('#buttonList').addClass('btn-default');
           $("#list").hide();
           $("#grid").show();
         });
      //Wenn der Knopf für die Liste-ansicht geklickt wird
        $('#buttonList').click(function()
         {
            //wir entfernen die Klasse default
           $(this).removeClass('btn-default');
           //und die klasse Primary wird hier hinzugefuegt
           $(this).addClass('btn-primary');
           $('#buttonGrid').removeClass('btn-primary');
           $('#buttonGrid').addClass('btn-default');
           $("#grid").hide();
           $("#list").show();
         });
    });
