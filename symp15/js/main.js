/* MASTER FUNCTIONS
==================================*/
var liveBlog = {
	today:new Date(),
	items:25,
	template: {
		entry: '<div class="entry"></div>',
		meta:'<div class="meta"></div>',
		content: '<div class="content"></div>'
	},
	elements: [
		'<div class="date"><p></p></div>', 															// date
		'<div class="author"><p></p></div>', 														// author
		'<div class="title"><h2></h2></div>',														// headline
		'<div class="text"><p></p></div>',															// text
		'<div type="image"><img src=""></div>',														// image
		'<div class="quote"><i class="fa fa-quote-left"></i><p></p></div>',							// quote
		'<div type="video" class="contain-response"></div>',										// video
		'<div class="link"><div type="content"><a href=""><h4></h4></a><p></p></div></div>'			// link
	],
	processData:function(data, tabletop){
		var thisData = [];
		jQuery.each( tabletop.sheets("main").all(), function(i, main) {
			var insertRow = [];
			insertRow[0] = main.timestamp;
			insertRow[1] = main.author;
			insertRow[2] = main.headline;
			insertRow[3] = main.largeimage;
			insertRow[4] = main.smallimage;
			insertRow[5] = main.textone;
			insertRow[6] = main.quoteone;
			insertRow[7] = main.tweetcontentone;
			insertRow[8] = main.texttwo;
			insertRow[9] = main.quotetwo;
			insertRow[10] = main.tweetcontenttwo;
			insertRow[11] = main.textthree;
			insertRow[12] = main.quotethree;
			insertRow[13] = main.textfour;
			insertRow[14] = main.quotefour;
			insertRow[15] = main.bottomimage;
			insertRow[16] = main.youtube;
			insertRow[17] = main.tweetone;
			insertRow[18] = main.tweettwo;
			insertRow[19] = main.tweetthree;
			insertRow[20] = main.tweetfour;
			insertRow[21] = main.tweetfive;
			insertRow[22] = main.link;
			insertRow[23] = main.linkhed;
			insertRow[24] = main.linkex;
			thisData.push(insertRow);
		});

		//process blog items
		liveBlog.populateBlog(thisData, liveBlog.items, liveBlog.today, liveBlog.template, liveBlog.elements);
	},
	convertTime: function(t){
		var timeToString = t.toString()
		var refreshTime = timeToString.split(' ');
		var time = refreshTime[4].split(':');
		time[0] = parseInt(time[0])
		var realTime;

		if (time[0] >= 1 && time[0] <= 11){
			realTime = time[0] + ':' + time[1] + ' AM';
		}
		else if (time[0] == 12){
			realTime = time[0] + ':' + time[1] + ' PM';
		}
		else {
			switch(time[0]){
				case 13:
					realTime = '1:' + time[1] + ' PM';
					break;
				case 14:
					realTime = '2:' + time[1] + ' PM';
					break;
				case 15:
					realTime = '3:' + time[1] + ' PM';
					break;
				case 16:
					realTime = '4:' + time[1] + ' PM';
					break;
				case 17:
					realTime = '5:' + time[1] + ' PM';
					break;
				case 18:
					realTime = '6:' + time[1] + ' PM';
					break;
				case 19:
					realTime = '7:'+  time[1] + ' PM';
					break;
				case 20:
					realTime = '8:'+  time[1] + ' PM';
					break;
				case 21:
					realTime = '9:'+  time[1] + ' PM';
					break;
				case 22:
					realTime = '10:' + time[1] + ' PM';
					break;
				case 23:
					realTime = '11:'+  time[1] + ' PM';
					break;
				case 0:
					realTime = '12:'+  time[1] + ' AM';
					break;
			}
		}

		//update refresh time
		jQuery('#blog-refresh p:eq(1) span').text(refreshTime[1] + ' ' + refreshTime[2] + ', ' + realTime);
		
	},
	populateBlog:function(d, len, today, t, elem){
		//loop through entries
		var total = d.length - 1;
		var entry = 0;

		//refresh time
		this.convertTime(today);

		for (var i = total ; i > -1 ; i--){
			//process date		
			jQuery('#blog-contain').append(t.entry);
			jQuery('.entry:eq('+entry+')').append(t.meta, t.content).attr('id', i);

			

			//loop through items
			for (var ii=0 ; ii < len ; ii++){
				if (ii == 0){ //date
					jQuery('.entry:eq('+entry+') .meta').append(elem[0]);
					jQuery('.entry:eq('+entry+') .date p').text(d[i][0]);
				}	
				else if (ii == 1){ //author
					jQuery('.entry:eq('+entry+') .meta').append(elem[ii]);
					jQuery('.entry:eq('+entry+') .author p').text(d[i][1]);
				}
				else {
					if (d[i][ii] && ii == 2){ //hed
						jQuery('.entry:eq('+entry+') .content').append(elem[ii]);
						jQuery('.entry:eq('+entry+') .title h2').append(d[i][2]);
					}
					else if (d[i][ii] && ii == 3){ //large img
						jQuery('.entry:eq('+entry+') .content').append(elem[4]);
						jQuery('.entry:eq('+entry+') div[type="image"]').addClass('largeimg');
						jQuery('.entry:eq('+entry+') .largeimg img').attr('src',d[i][ii]);
					}
					else if (d[i][ii] && ii == 4){ //small img
						jQuery('.entry:eq('+entry+') .content').append(elem[4]);
						jQuery('.entry:eq('+entry+') div[type="image"]').addClass('smallimg');
						jQuery('.entry:eq('+entry+') .smallimg img').attr('src',d[i][ii]);
					}
					else if (d[i][ii] && ii == 5){ //text 1
						jQuery('.entry:eq('+entry+') .content').append(elem[3]);
						jQuery('.entry:eq('+entry+') .text:eq(0) p').append(d[i][ii]);
					}
					else if (d[i][ii] && ii == 6){ //quote 1
						jQuery('.entry:eq('+entry+') .content').append(elem[5]);
						jQuery('.entry:eq('+entry+') .quote:eq(0) p').append(d[i][ii]);
						jQuery('.entry:eq('+entry+') .quote:eq(0) p').append('<i class="fa fa-quote-right"></i>');
					}
					else if (d[i][ii] && ii == 7){ //tweet embed 1
						jQuery('.entry:eq('+entry+') .content').append(d[i][ii]);
					}
					else if (d[i][ii] && ii == 8){ //text 2
						jQuery('.entry:eq('+entry+') .content').append(elem[3]);
						jQuery('.entry:eq('+entry+') .text:eq(1) p').append(d[i][ii]);
					}
					else if (d[i][ii] && ii == 9){ //quote 2
						jQuery('.entry:eq('+entry+') .content').append(elem[5]);
						jQuery('.entry:eq('+entry+') .quote:eq(1) p').append(d[i][ii]);
						jQuery('.entry:eq('+entry+') .quote:eq(1) p').append('<i class="fa fa-quote-right"></i>');
					}
					else if (d[i][ii] && ii == 10){ //tweet embed 2
						jQuery('.entry:eq('+entry+') .content').append(d[i][ii]);
					}
					else if (d[i][ii] && ii == 11){ //text 3
						jQuery('.entry:eq('+entry+') .content').append(elem[3]);
						jQuery('.entry:eq('+entry+') .text:eq(2) p').append(d[i][ii]);
					}
					else if (d[i][ii] && ii == 12){ //quote 3
						jQuery('.entry:eq('+entry+') .content').append(elem[5]);
						jQuery('.entry:eq('+entry+') .quote:eq(2) p').append(d[i][ii]);
						jQuery('.entry:eq('+entry+') .quote:eq(2) p').append('<i class="fa fa-quote-right"></i>');
					}
					else if (d[i][ii] && ii == 13){ //text 4
						jQuery('.entry:eq('+entry+') .content').append(elem[3]);
						jQuery('.entry:eq('+entry+') .text:eq(3) p').append(d[i][ii]);
					}
					else if (d[i][ii] && ii == 14){ //quote 4
						jQuery('.entry:eq('+entry+') .content').append(elem[5]);
						jQuery('.entry:eq('+entry+') .quote:eq(3) p').append(d[i][ii]);
						jQuery('.entry:eq('+entry+') .quote:eq(3) p').append('<i class="fa fa-quote-right"></i>');
					}
					else if (d[i][ii] && ii == 15){ //bottom image
						jQuery('.entry:eq('+entry+') .content').append(elem[4]);
						jQuery('.entry:eq('+entry+') div[type="image"]').addClass('largeimg');
						jQuery('.entry:eq('+entry+') .largeimg img').attr('src',d[i][ii]);
					}
					else if (d[i][ii] && ii == 16){ //youtube
						jQuery('.entry:eq('+entry+') .content').append(elem[6]);
						jQuery('.entry:eq('+entry+') div[type="video"]').append(d[i][ii]);
						jQuery('.entry:eq('+entry+') div[type="video"] iframe').addClass('iframe-response');						
					}
					else if (d[i][ii] && ii >= 17 && ii <= 21){ //tweet embeds at bottom
						jQuery('.entry:eq('+entry+') .content').append(d[i][ii]);	
					}
					else if (d[i][ii] && ii == 22){ //link
						jQuery('.entry:eq('+entry+') .content').append(elem[7]);
						jQuery('.entry:eq('+entry+') .link div[type="content"] a').attr('href', d[i][22]);
						jQuery('.entry:eq('+entry+') .link div[type="content"] h4').append(d[i][23]);
						jQuery('.entry:eq('+entry+') .link div[type="content"] p').text(d[i][24]);
					}
				}
								
			}
			entry++;
		}


	},
	updateBlog:function(){
		Tabletop.init( { key: gsheet,
	                 callback: liveBlog.processData,
	                 wanted: ["main"],
	                 debug: true } );
	}
}

/* TABLETOP
==================================*/
gsheet = "https://docs.google.com/spreadsheets/d/13pfsRZhfvKZmhtS0fKcSrlsjgNC8rS_eBjoouWv4ubk/pubhtml";


