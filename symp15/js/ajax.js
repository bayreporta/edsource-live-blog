jQuery(document).ready(function(){
	jQuery.get('js/main.js', function(){
		console.log('test')
		liveBlog.updateBlog();
	})
	window.setInterval(function(){
		jQuery.ajax({
			url:'js/main.js',
			dataType:'script',
			success: function(){
				jQuery('#blog-contain').empty();
				liveBlog.updateBlog();
			},
			
		})
	}, 60000);
})