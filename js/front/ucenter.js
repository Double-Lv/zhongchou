var zhongchou = {};
zhongchou.ucenter = {
	//初始化项目进展页
	initProcessPage : function(){
		this.uploadImg();
		this.initListeners();
	},
	//初始化问题管理页面
	initQuestion : function(){
		this.replyTextarea($('.limit'));
		this.initListeners();
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
	},
	replyTextarea : function(item){
		item.limitTextarea({
			maxNumber:200
		});
	},
	initListeners : function(){
		var _this = this;
		//删除已上传图片，项目进展页面
		$(document.body).on('click', '.delimg', function(){
			var $this = $(this);
			var input = $this.closest('.uppanel').find('input[type="hidden"]');
			var uppanel = $this.closest('.uppanel');
			//删除元素
			$this.closest('.file-item').remove();
			//为表单重新赋值
			var newval = [];
			uppanel.find('.file-item').each(function(){
				newval.push($(this).data('url'));
			});
			input.val(newval.join(','));
		});

		//问题管理页面,点击回复
		$(document.body).on('click', '.reply', function(){
			$(this).closest('.commentitem').find('.replypanel').slideDown(200);
		});

		//问题管理，取消回复
		$(document.body).on('click', '.cancelreply', function(){
			$(this).closest('.commentitem').find('.replypanel').slideUp(200);
		});

		//问题管理，保存回复
		$(document.body).on('click', '.savereply', function(){
			var item = $(this).closest('.commentitem');
			var text = item.find('.replytext').val();
			if(text==''){
				alert('请输入内容！');
				return;
			}
			if(text.length>200){
				alert('内容不能超过200字');
				return;
			}
			var id = item.data('id');
			//提交成功后的回调函数，传入名字和内容
			var callback = function(name, content){
				item.find('.replycontent').html('<h3 class="ownername">'+name+'</h3><div class="ownerreply">'+content+'</div>');
				item.find('.reply').hide();
				item.find('.deletereply').show();
			}
			//发起请求
			$.ajax({
				url : '',
				data : {},
				success : function(data){
					callback('大樱桃专卖店', text);
				}
			});
		});

		//问题管理，删除回复
		$(document.body).on('click', '.deletereply', function(){
			var item = $(this).closest('.commentitem');
			var id = item.data('id');
			//删除成功的回调函数
			var callback = function(){
				var replycontent = item.find('.replycontent');
				replycontent.html('<textarea class="replytext limit" placeholder="回复内容请在200字以内"></textarea><div class="mt10"><a href="javascript:void(0);" class="savereply bluebtn mr10">保存</a><a href="javascript:void(0);" class="cancelreply cbtn mr10">取消</a></div>');
				_this.replyTextarea(replycontent.find('.limit'));
				item.find('.replypanel').hide();
				item.find('.reply').show();
				item.find('.deletereply').hide();
			}
			//发起请求
			$.ajax({
				url : '',
				data : {},
				success : function(){
					callback();
				}
			});
		});
	}
}