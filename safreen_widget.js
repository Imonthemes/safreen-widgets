 jQuery(document).on( 'ready widget-updated widget-added', function() { 
  jQuery('.safreen_accordion h4').toggle(function() {
	 jQuery(this).parent().addClass('warp_active');
						jQuery(this).next().slideDown();
					},function(){
						jQuery(this).parent().removeClass('warp_active');
						jQuery(this).next().slideUp();
					});
				
			});



jQuery(document).ready( function($) {

    function media_upload(button_class) {

        var _custom_media = true,

        _orig_send_attachment = wp.media.editor.send.attachment;



        $('body').on('click', button_class, function(e) {

            var button_id ='#'+$(this).attr('id');

            var self = $(button_id);

            var send_attachment_bkp = wp.media.editor.send.attachment;

            var button = $(button_id);

            var id = button.attr('id').replace('_button', '');

            _custom_media = true;

            wp.media.editor.send.attachment = function(props, attachment){

                if ( _custom_media  ) {

                    $('.custom_media_id').val(attachment.id);

                    $('.custom_media_url').val(attachment.url);

                    $('.custom_media_image').attr('src',attachment.url).css('display','block');

                } else {

                    return _orig_send_attachment.apply( button_id, [props, attachment] );

                }

            }

            wp.media.editor.open(button);

                return false;

        });

    }

    media_upload('.custom_media_button.button');

});


//Widget MEDIAPICKER PLUGIN
	 //MEDIA PICKER FUNCTION
	 function mediaPicker(pickerid){
		var custom_uploader;
		var row_id 
        //e.preventDefault();
		row_id = jQuery('#'+pickerid).prev().attr('id');

        //If the uploader object has already been created, reopen the dialog
        if (custom_uploader) {
        	custom_uploader.open();
        	return;
        }

        //CREATE THE MEDIA WINDOW
        custom_uploader = wp.media.frames.file_frame = wp.media({
            title: 'Insert Images',
            button: {
                text: 'Insert Images'
            },
			type: 'image',
            multiple: false
        });

        //"INSERT MEDIA" ACTION. PREVIEW IMAGE AND INSERT VALUE TO INPUT FIELD
		custom_uploader.on('select', function(){
		var selection = custom_uploader.state().get('selection');
			selection.map( function( attachment ) {
				attachment = attachment.toJSON();
				//INSERT THE SRC IN INPUT FIELD
				jQuery('#' + row_id).val(""+attachment.url+"").trigger('change');
					//APPEND THE PREVIEW IMAGE
					jQuery('#' + row_id).parent().find('.media-picker-preview, .media-picker-remove').remove();
					if(attachment.sizes.medium){
						jQuery('#' + row_id).parent().prepend('<img class="media-picker-preview" src="'+attachment.sizes.medium.url+'" /><i class="fa fa-times media-picker-remove"></i>');
					}else{
						jQuery('#' + row_id).parent().prepend('<img class="media-picker-preview" src="'+attachment.url+'" /><i class="fa fa-times media-picker-remove"></i>');
					}

			});
			jQuery(".media-picker-remove").on('click',function(e) {
				jQuery(this).parent().find('.media-picker').val('').trigger('change');
				jQuery(this).parent().find('.media-picker-preview, .media-picker-remove').remove();
			});
		});
        //OPEN THE MEDIA WINDOW
        custom_uploader.open();

    }


jQuery(document).on( 'ready widget-updated widget-added', function() {
	
	//jQuery(".media-picker-remove").unbind( "click" );
	jQuery(".media-picker-remove").on('click',function(e) {
		jQuery(this).parent().find('.media-picker').val('').trigger('change');
		jQuery(this).parent().find('.media-picker-preview, .media-picker-remove').remove();
	});
	
	//jQuery( ".media-picker-button").unbind( "click" );
	 

});






