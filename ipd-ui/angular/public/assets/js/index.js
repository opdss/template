$(function(){
    //菜单点击
    //J_iframe
    $(".J_menuItem").on('click',function(){
        var url = $(this).attr('href');alert(url);
        parent.document.$("#J_iframe1").attr('src',url);
        return false;
    });
});