jQuery.get('main.js', function(){
	liveBlog.updateBlog();
})
window.setInterval(function(){
	jQuery.ajax({
		url:'main.js',
		dataType:'script',
		success: function(){
			jQuery('#blog-contain').empty();
			liveBlog.updateBlog();
		},
		
	})
}, 60000);