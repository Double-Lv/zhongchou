var zhongchou = {};
zhongchou.ucenter = {
	//初始化项目进展页
	initProcessPage : function(){
		this.uploadImg();
	},
	uploadImg : function(){
		var conf = {
		    auto: true,
		    swf: 'module/webuploader-0.1.5/Uploader.swf',
		    // 文件接收服务端。
		    server: 'php/upload.php',
		    pick: {
		    	id : '#pickimg',
		    	multiple : true
		    },
		    accept: {
		        title: 'Images',
		        extensions: 'gif,jpg,jpeg,png',
		        mimeTypes: 'image/*'
		    },
		    formData : {
		    	token : $('#token').val()
		    },
		    fileNumLimit : 9
		};

		var uploader = WebUploader.create(conf);
		uploader.on( 'fileQueued', function( file ) {
			$list = $('.uploader-list');
		    var $li = $(
		            '<div id="' + file.id + '" class="file-item thumbnail">' +
		            	'<div class="imgoptbar"><a href="javascript:void(0);" class="delimg"></a></div>' +
		                '<img>' +
		            '</div>'
		            );
		    $list.find('#pickimg').before($li);

		});

		// 文件上传成功，给item添加成功class, 用样式标记上传成功。
		uploader.on( 'uploadSuccess', function( file, obj ) {
			var $li = $( '#'+file.id ),
				$img = $li.find('img');
		    $li.data('url', obj._raw); //记录返回数据
		    var processImg = $('#processimg');
	        var val = processImg.val();
	        if(val==''){
	          processImg.val(obj._raw);
	        }
	        else{
	          processImg.val(val+','+obj._raw);
	        }
		    // 创建缩略图
        	uploader.makeThumb( file, function( error, src ) {
		        if ( error ) {
		            $img.replaceWith('<span>不能预览</span>');
		            return;
		        }
		        $img.attr( 'src', src );
		    }, 120, 78 );
	        
		});

		// 文件上传失败，显示上传出错。
		uploader.on( 'uploadError', function( file ) {
		    $('#'+file.id).remove();
		    alert('上传失败请重试！');
		});
	}
}