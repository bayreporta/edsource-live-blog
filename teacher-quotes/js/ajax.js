jQuery(document).ready(function(){
	jQuery.get('http://edsource.org/wp-content/iframe/live-blog/may-revise-15/js/main.js', function(){
		liveBlog.executeBlog(true);
	})
	/*window.setInterval(function(){
		jQuery.ajax({
			url:'http://edsource.org/wp-content/iframe/live-blog/may-revise-15/js/main.js',
			dataType:'script',
			success: function(){
				var oldNumber = 0;
				oldNumber = jQuery('.entry').size();
				liveBlog.executeBlog(false, oldNumber);
			},			
		})
	}, 60000);*/
})