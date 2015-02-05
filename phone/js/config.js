
var client_http="http://php.xlanlab.com/sxzy/index.php?g=agro&m=client";
var uploadHttp =  "http://php.xlanlab.com/sxzy/upload/index.php";
var img_path="http://php.xlanlab.com/sxzy/upload/img/";

var form_setting=getStorJson("form_setting");
if(isDefine(form_setting.server_http)){
     client_http=form_setting.server_http+"/index.php?g=agro&m=client";
     uploadHttp = form_setting.server_http+"/upload/index.php";
     img_path= form_setting.server_http+"/upload/img/";
}

