/*上传图片*/
var ulopid = 2000;
var ulObj = null;
var disUpload = function(ulUrl, actCb, susCb){
    this.url = ulUrl;
    this.actCb = actCb;
    this.susCb = susCb;
    ulObj = this;
    return this;
}

disUpload.prototype = {
    upSelect:function(){
        var self = this;
        uexWindow.cbActionSheet = function(opId, dataType, data){

            if(data<2) self.upMethod(data);
        }
        
        var value = ["拍照上传","本地上传"];
        uexWindow.actionSheet('', '取消', value);
    },
    upMethod:function(cmd){
        var self = this;
        if(cmd==1){
            uexImageBrowser.cbPick = function(opCode, dataType, data) {
                self.uploadImg(data);
            }
            uexImageBrowser.pick();
        }
        else{
            uexCamera.cbOpen = function(opCode, dataType, data) {
                self.uploadImg(data);
            }
            uexCamera.open();
        }
    },
    uploadImg:function(src){
        var self = this;
        var opid = ulopid + '';
        self.src = src;
        if(self.actCb) self.actCb(false);
        uexWindow.toast('1', '5', '正在上传...', "");
        uexUploaderMgr.cbCreateUploader = cbCreateUploader;
        uexUploaderMgr.createUploader(opid, self.url);
        ulopid++;
    },
}

function cbCreateUploader(opCode, dataType, data) {
    var self = ulObj;
    if (data == 0) {
        var flag = 'filename';

        uexUploaderMgr.onStatus = onUploadStatus;
        
        var inCompress = '2';
        var icp = getLocVal('picupcompr');
        if(icp) inCompress=icp;

        uexUploaderMgr.uploadFile(opCode, self.src, flag, inCompress);
    } else {
        uexWindow.toast('0', '5', "上传失败", 2000);
        if(self.actCb) self.actCb(true);
        uexUploaderMgr.closeUploader(opCode);
    }
}

function onUploadStatus(opCode, fileSize, percent, serverPath, status) {
    var str = '';
    var self = ulObj;
    switch (status) {
    case 0:
        break;
    case 1:
        uexWindow.closeToast();
        uexUploaderMgr.closeUploader(opCode);
        str='上传成功';
        //alert(serverPath);
        if(self.susCb) self.susCb(serverPath);  
        if(self.actCb) self.actCb(true);

        break;
    default:
        uexWindow.closeToast();
        str = '上传失败';
        uexUploaderMgr.closeUploader(opCode);
        if(self.actCb) self.actCb(false);
        break;
    }
    if(str) uexWindow.toast('0', '5', str, 2000);
}