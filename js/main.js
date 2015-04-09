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
		$.each( tabletop.sheets("main").all(), function(i, main) {
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
		liveBlog.populateBlog(thisData, liveBlog.items, liveBlog.date, liveBlog.template, liveBlog.elements);
	},
	processDate:function(date, today){
		var nowSec = Date.parse(today);
		var thisTime = Date.parse(date);
		var timeDif = nowSec - thisTime;
		var blogTime;
		console.log(date)
		/* Check time difference */
		if (timeDif < 3600000){
			blogTime = Math.round(timeDif / 60000) + ' minutes ago';
		}
		else if (timeDif < 86400000){
			blogTime = Math.round(timeDif / 3600000) + ' hours ago';
		}
		else if (timeDif >= 86400000){
			var temp = Math.round(timeDif / 86400000);
			if (temp === 1){
				blogTime = temp + ' day ago';
			}
			else {
				blogTime = temp + ' days ago';
			}
		}
		return blogTime;
	},
	populateBlog:function(d, len, today, t, elem){
		//loop through entries
		var total = d.length - 1;
		var entry = 0;
		for (var i = total ; i > -1 ; i--){
			//process date		
			$('#blog-contain').append(t.entry);
			$('.entry:eq('+entry+')').append(t.meta, t.content).attr('id', i);

			//loop through items
			for (var ii=0 ; ii < len ; ii++){
				if (ii == 0){ //date
					$('.entry:eq('+entry+') .meta').append(elem[0]);
					$('.entry:eq('+entry+') .date p').text(d[i][0]);
				}	
				else if (ii == 1){ //author
					$('.entry:eq('+entry+') .meta').append(elem[ii]);
					$('.entry:eq('+entry+') .author p').text(d[i][1]);
				}
				else {
					if (d[i][ii] && ii == 2){ //hed
						$('.entry:eq('+entry+') .content').append(elem[ii]);
						$('.entry:eq('+entry+') .title h2').append(d[i][2]);
					}
					else if (d[i][ii] && ii == 3){ //large img
						$('.entry:eq('+entry+') .content').append(elem[4]);
						$('.entry:eq('+entry+') div[type="image"]').addClass('largeimg');
						$('.entry:eq('+entry+') .largeimg img').attr('src',d[i][ii]);
					}
					else if (d[i][ii] && ii == 4){ //small img
						$('.entry:eq('+entry+') .content').append(elem[4]);
						$('.entry:eq('+entry+') div[type="image"]').addClass('smallimg');
						$('.entry:eq('+entry+') .smallimg img').attr('src',d[i][ii]);
					}
					else if (d[i][ii] && ii == 5){ //text 1
						$('.entry:eq('+entry+') .content').append(elem[3]);
						$('.entry:eq('+entry+') .text:eq(0) p').append(d[i][ii]);
					}
					else if (d[i][ii] && ii == 6){ //quote 1
						$('.entry:eq('+entry+') .content').append(elem[5]);
						$('.entry:eq('+entry+') .quote:eq(0) p').append(d[i][ii]);
						$('.entry:eq('+entry+') .quote:eq(0) p').append('<i class="fa fa-quote-right"></i>');
					}
					else if (d[i][ii] && ii == 7){ //tweet embed 1
						$('.entry:eq('+entry+') .content').append(d[i][ii]);
					}
					else if (d[i][ii] && ii == 8){ //text 2
						$('.entry:eq('+entry+') .content').append(elem[3]);
						$('.entry:eq('+entry+') .text:eq(1) p').append(d[i][ii]);
					}
					else if (d[i][ii] && ii == 9){ //quote 2
						$('.entry:eq('+entry+') .content').append(elem[5]);
						$('.entry:eq('+entry+') .quote:eq(1) p').append(d[i][ii]);
						$('.entry:eq('+entry+') .quote:eq(1) p').append('<i class="fa fa-quote-right"></i>');
					}
					else if (d[i][ii] && ii == 10){ //tweet embed 2
						$('.entry:eq('+entry+') .content').append(d[i][ii]);
					}
					else if (d[i][ii] && ii == 11){ //text 3
						$('.entry:eq('+entry+') .content').append(elem[3]);
						$('.entry:eq('+entry+') .text:eq(2) p').append(d[i][ii]);
					}
					else if (d[i][ii] && ii == 12){ //quote 3
						$('.entry:eq('+entry+') .content').append(elem[5]);
						$('.entry:eq('+entry+') .quote:eq(2) p').append(d[i][ii]);
						$('.entry:eq('+entry+') .quote:eq(2) p').append('<i class="fa fa-quote-right"></i>');
					}
					else if (d[i][ii] && ii == 13){ //text 4
						$('.entry:eq('+entry+') .content').append(elem[3]);
						$('.entry:eq('+entry+') .text:eq(3) p').append(d[i][ii]);
					}
					else if (d[i][ii] && ii == 14){ //quote 4
						$('.entry:eq('+entry+') .content').append(elem[5]);
						$('.entry:eq('+entry+') .quote:eq(3) p').append(d[i][ii]);
						$('.entry:eq('+entry+') .quote:eq(3) p').append('<i class="fa fa-quote-right"></i>');
					}
					else if (d[i][ii] && ii == 15){ //bottom image
						$('.entry:eq('+entry+') .content').append(elem[4]);
						$('.entry:eq('+entry+') div[type="image"]').addClass('largeimg');
						$('.entry:eq('+entry+') .largeimg img').attr('src',d[i][ii]);
					}
					else if (d[i][ii] && ii == 16){ //youtube
						$('.entry:eq('+entry+') .content').append(elem[6]);
						$('.entry:eq('+entry+') div[type="video"]').append(d[i][ii]);
						$('.entry:eq('+entry+') div[type="video"] iframe').addClass('iframe-response');						
					}
					else if (d[i][ii] && ii >= 17 && ii <= 21){ //tweet embeds at bottom
						$('.entry:eq('+entry+') .content').append(d[i][ii]);
						console.log(i)
						console.log(ii)
					}
					else if (d[i][ii] && ii == 22){ //link
						$('.entry:eq('+entry+') .content').append(elem[7]);
						$('.entry:eq('+entry+') .link div[type="content"] a').attr('href', d[i][22]);
						$('.entry:eq('+entry+') .link div[type="content"] h4').append(d[i][23]);
						$('.entry:eq('+entry+') .link div[type="content"] p').text(d[i][24]);
					}
				}
								
			}
			entry++;
		}


	}
}

/* TABLETOP
==================================*/
gsheet = "https://docs.google.com/spreadsheets/d/13pfsRZhfvKZmhtS0fKcSrlsjgNC8rS_eBjoouWv4ubk/pubhtml";
$(document).ready(function(){
	Tabletop.init( { key: gsheet,
	                 callback: liveBlog.processData,
	                 wanted: ["main"],
	                 debug: true } );



});


