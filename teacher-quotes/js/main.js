/* MASTER FUNCTIONS
==================================*/
var liveBlog = {
	gsheet: "https://docs.google.com/spreadsheets/d/13pfsRZhfvKZmhtS0fKcSrlsjgNC8rS_eBjoouWv4ubk/pubhtml",
	today:new Date(),
	items:null,
	version:{
		first: null,
		oldTotal:null
	},
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
		'<div class="quote"><i class="fa fa-quote-left"></i><p></p><p></p></div>',					// quote
		'<div type="video" class="contain-response"></div>',										// video
		'<div class="link"><div type="content"><a href=""><h4></h4></a><p></p></div></div>',		// link
		'<div type="graph" class="contain-response"></div>'											// interactive graphic
	],
	moveToElem: function(){
		var getURL = window.location.href, willScroll;

		getURL = getURL.split('#');
		willScroll = getURL[1].match(/\./);

		if (willScroll == null){
			location.href = '#' + getURL[1];
		}	
	},
	processData:function(d){
		var data = [];
	
		for (var i = 0 ; i < d.length; i++){
			var thisData = []; 
			thisData[0] = d[i][0];
			thisData[1] = d[i][1];
			thisData[2] = d[i][2];
			thisData[3] = d[i][3];
			thisData[4] = d[i][4];
			thisData[5] = d[i][5];
			thisData[6] = d[i][6];
			thisData[7] = d[i][7];
			thisData[8] = d[i][8];
			thisData[9] = d[i][9];
			thisData[10] = d[i][10];
			thisData[11] = d[i][11];
			thisData[12] = d[i][12];
			thisData[13] = d[i][13];
			thisData[14] = d[i][14];
			thisData[15] = d[i][15];
			thisData[16] = d[i][16];
			thisData[17] = d[i][17];
			thisData[18] = d[i][18];
			thisData[19] = d[i][19];
			thisData[20] = d[i][20];
			thisData[21] = d[i][21];
			thisData[22] = d[i][22];
			thisData[23] = d[i][23];
			thisData[24] = d[i][24];
			thisData[25] = d[i][25];
			thisData[26] = d[i][26];
			thisData[27] = d[i][27];
			thisData[28] = d[i][28];
			thisData[29] = d[i][29];
			thisData[30] = d[i][30];
			data.push(thisData);
		}		

		//how many potential items to search for
		liveBlog.items = data[0].length;

		// grab original total
		if (liveBlog.version.first != false){
			liveBlog.version.oldTotal = data.length;
		}
	
		//process blog items
		liveBlog.populateBlog(data, liveBlog.items, liveBlog.today, liveBlog.template, liveBlog.elements,liveBlog.version);
	},
	populateBlog:function(d, items, today, t, elem, ver){
		//loop through entries
		var w = [null,null,null,null,null,0,0,null,1,1,null,2,2,3,3,null,null,null,null,null,null,null,null,null,null,0,1,2,3,null,null];

		 
		 console.log(d)

		/* ADD BLOG ITEMS
		======================================*/
		var entry = 0;
		for (var i = 1; i < d.length ; i++){
			//process date		
			jQuery('#blog-contain').append(t.entry);
			jQuery('.entry:eq('+entry+')').append(t.meta, t.content).attr('id', i);

			//loop through items
			for (var ii=0 ; ii < items ; ii++){
				if (d[i][ii]){
					switch(ii){
						case 0: //DATE
							jQuery('.entry:eq('+entry+') .meta').append(elem[0]);				
							var itemTime = liveBlog.convertTime(d[i][0], false);	
							jQuery('.entry:eq('+entry+') .date p').text(itemTime);
							break;
						case 1: //AUTHOR
							jQuery('.entry:eq('+entry+') .meta').append(elem[ii]);
							jQuery('.entry:eq('+entry+') .author p').text('By ' + d[i][1]);
							break;
						case 2: //HEADLINE
							//transform double quote to single quote
							var hed = d[i][2];
							hed = hed.replace(/"/g,'\'');				

							jQuery('.entry:eq('+entry+') .content').append(elem[ii]);
							jQuery('.entry:eq('+entry+') .title h2').append(hed);

							//set up URL tag using headline name and add to entry
							hed = hed.replace(/\s/g,'-');	
							jQuery('.entry:eq('+entry+')').attr('id', hed);

							break;
						case 3: //LARGE IMAGE
							jQuery('.entry:eq('+entry+') .content').append(elem[4]);
							jQuery('.entry:eq('+entry+') div[type="image"]').addClass('largeimg');
							jQuery('.entry:eq('+entry+') .largeimg img').attr('src',d[i][ii]);
							break;
						case 4: //SMALL IMAGE
							jQuery('.entry:eq('+entry+') .content').append(elem[4]);
							jQuery('.entry:eq('+entry+') div[type="image"]').addClass('smallimg');
							jQuery('.entry:eq('+entry+') .smallimg img').attr('src',d[i][ii]);
							break;
						case 5: //TEXT
						case 8:
						case 11:
						case 13:	
							jQuery('.entry:eq('+entry+') .content').append(elem[3]);
							jQuery('.entry:eq('+entry+') .text:eq('+w[ii]+') p').append(d[i][ii]);
							break;
						case 6: //QUOTE
						case 9:
						case 12:
						case 14:
							jQuery('.entry:eq('+entry+') .content').append(elem[5]);
							jQuery('.entry:eq('+entry+') .quote:eq('+w[ii]+') p:eq(0)').append(d[i][ii]);
							jQuery('.entry:eq('+entry+') .quote:eq('+w[ii]+') p:eq(0)').append('<i class="fa fa-quote-right"></i>');
							break;
						case 25: //QUOTE SOURCE
						case 26:
						case 27:
						case 28:
							jQuery('.entry:eq('+entry+') .quote:eq('+w[ii]+') p:eq(1)').append('- ' + d[i][ii]);
							break;
						case 7: //TWEETS
						case 10:
						case 17:
						case 18:
						case 19:
						case 20:
						case 21:	
							jQuery('.entry:eq('+entry+') .content').append(d[i][ii]);
							break;
						case 15: //BOTTOM IMAGE
							jQuery('.entry:eq('+entry+') .content').append(elem[4]);
							jQuery('.entry:eq('+entry+') div[type="image"]').addClass('largeimg');
							jQuery('.entry:eq('+entry+') .largeimg img').attr('src',d[i][ii]);
							break;
						case 16: // YOUTUBE
							jQuery('.entry:eq('+entry+') .content').append(elem[6]);
							jQuery('.entry:eq('+entry+') div[type="video"]').append(d[i][ii]);
							jQuery('.entry:eq('+entry+') div[type="video"] iframe').addClass('iframe-response');	
							break;
						case 29: // INTERACTIVE GRAPHIC
							jQuery('.entry:eq('+entry+') .content').append(elem[8]);
							jQuery('.entry:eq('+entry+') div[type="graph"]').append(d[i][ii]);
							jQuery('.entry:eq('+entry+') div[type="graph"] iframe').addClass('iframe-response').attr({frameborder:0});	

							//custom height?
							if (d[i][30]){
								jQuery('.entry:eq('+entry+') .contain-response').css('height', d[i][30] + 'px');	
							}

							//detach and go to above first text
							var detach = jQuery('.entry:eq('+entry+') div[type="graph"]').detach();
							detach.insertBefore('.entry:eq('+entry+') .text:eq(0)');
							break;
						case 22: //EMBED LINK
							jQuery('.entry:eq('+entry+') .content').append(elem[7]);
							jQuery('.entry:eq('+entry+') .link div[type="content"] a').attr('href', d[i][22]);
							jQuery('.entry:eq('+entry+') .link div[type="content"] h4').append(d[i][23]);
							jQuery('.entry:eq('+entry+') .link div[type="content"] p').text(d[i][24]);
							break;				
					}
				}
				else {
					continue;
				}
			}

			entry++;
		}
		
	},
	executeBlog:function(){
		jQuery.getJSON('http://edsource.org/wp-content/iframe/live-blog/teacher-quotes/data.json', function(d){
			liveBlog.processData(d);
			console.log("sss")
		})
	}
}








