var Dialog = {
	alert : function(msg) {
		$('#dialog_model').addClass('bs-example-modal-sm');
		$('#dialog_model_inner').addClass('modal-sm');
		$('#dialog_info').css({'text-align':'center'});
		$('#myModalLabel').html('提示');
		$('#dialog_info').html(msg);
		$('#dialog_model').modal("show");
//		$('#dialog_model').modal({backdrop: 'static', keyboard: false});
	},
	
	msg : function (title,msg){
		$('#dialog_model').removeClass('bs-example-modal-sm');
		$('#dialog_model_inner').removeClass('modal-sm');
		$('#myModalLabel').html(title);
		$('#dialog_info').css({'text-align':'left'});
		$('#dialog_info').html(msg);
		$('#dialog_model').modal("show");
//		$('#dialog_model').modal({backdrop: 'static', keyboard: false});
	}
};