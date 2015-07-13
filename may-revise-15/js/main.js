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
			insertRow[25] = main.quoteonesource;
			insertRow[26] = main.quotetwosource;
			insertRow[27] = main.quotethreesource;
			insertRow[28] = main.quotefoursource;
			insertRow[29] = main.interactivegraphic;
			insertRow[30] = main.interactivegraphicheight;
			thisData.push(insertRow);
		});

		//how many potential items to search for
		liveBlog.items = thisData[0].length;

		// grab original total
		if (liveBlog.version.first != false){
			liveBlog.version.oldTotal = thisData.length;
		}
	
		//process blog items
		liveBlog.populateBlog(thisData, liveBlog.items, liveBlog.today, liveBlog.template, liveBlog.elements,liveBlog.version);
	},
	convertTime: function(date, today){
		var timeToString = date.toString(), realTime;
		
		//take different actions based on which time we are parsing
		if (today == true){
			var refreshTime = timeToString.split(' ');
			var time = refreshTime[4].split(':');
			time[0] = parseInt(time[0])
		}
		else {
			var refreshTime = timeToString.split(' ');
			var time = refreshTime[1].split(':');
			time[0] = parseInt(time[0])

			//get month because google forms hates to have the date string changed for some reason
			var month = refreshTime[0].split('/');

			switch(month[0]){
				case '1':
					month[0] = 'Jan. ';
					break;
				case '2':
					month[0] = 'Feb. ';
					break;
				case "3":
					month[0] = 'Mar. ';
					break;
				case "4":
					month[0] = 'Apr. ';
					break;
				case "5":
					month[0] = 'May ';
					break;
				case "6":
					month[0] = 'June ';
					break;
				case "7":
					month[0] = 'July ';
					break;
				case "8":
					month[0] = 'Aug. ';
					break;
				case "9":
					month[0] = 'Sep. ';
					break;
				case "10":
					month[0] = 'Oct. ';
					break;
				case "11":
					month[0] = 'Nov. ';
					break;
				case "12":
					month[0] = 'Dec. ';
					break;
			}
		}
	
		//Prettify time
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

		//update refresh time or item time
		if (today == true){jQuery('#blog-refresh p:eq(1) span').text(realTime);}
		else {return month[0] + month[1] + ', ' + realTime}
	},
	buildShare: function(entry, url, txt){
		/* TWITTER
		=====================================*/
		//encode text
		txt = txt.replace(/\s/g, '%20'); //whitespace
		txt = txt.replace(/\'/g, '%27'); //quote
		txt = txt.replace(/\,/g, '%2C'); //comma
		txt = txt.replace(/\./g, '%2E'); //period

		// build twitter button
		var button = '<a class="twitter-share" href="https://twitter.com/share?url='+url+'&via=edsource&hashtags=CAbudget&text='+txt+'"><i class="fa fa-twitter-square"></i></a>';



		// append buttons
		jQuery('.entry:eq('+entry+') .meta').append(button);
		//jQuery('.entry:eq('+entry+') .meta').append('<a class="copy-link" onclick="return liveBlog.popup();"><i class="fa fa-share-square"></i></a>');

	},
	populateBlog:function(d, items, today, t, elem, ver){
		//loop through entries
		var total = d.length;
		var diff = total - ver.oldTotal;
		var pos = total - 1;
		var twithed;
		var runLoop = false;
		var w = [null,null,null,null,null,0,0,null,1,1,null,2,2,3,3,null,null,null,null,null,null,null,null,null,null,0,1,2,3,null,null];

		// adjust for loop based on whether we are updating or populating original blog items //
		if (diff == 0 && ver.first == false){
			runLoop = false;
		}
		else if (diff == 0 && ver.first == true){
			var entry = 0;
			end = -1;
			runLoop = true;
		}
		else if (diff != 0 && ver.first == false){
			end = pos - diff;
			var entry = jQuery('.entry').size();
			ver.oldTotal = total;
			jQuery('.entry').css('background','#fff');
			runLoop = true;
		}
		 
		//refresh time update
		this.convertTime(today, true);

		/* ADD BLOG ITEMS
		======================================*/
		if (runLoop == true){
			for (var i = pos; i > end ; i--){
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
								console.log(ii)
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

				/* ADD SHARE BUTTONS
				==============================================*/
				var shareURL = 'http%3A%2F%2Fedsource.org%2F2015%2Flive%2Dblog%2Dcalifornia%2Dmay%2Drevise%2Dbudget%2F79763%23' + hed;

				var shareTxt = jQuery('.entry:eq('+entry+') .title h2').text();
				liveBlog.buildShare(entry, shareURL, shareTxt);

				//if updating, move to the top and color new
				if (end != -1){
					jQuery('.entry:eq('+entry+')').css('background','#fff7cf');
					var detach = jQuery('.entry:eq('+entry+')').detach();
					detach.insertBefore(jQuery('.entry:eq(0)'));
				}

				entry++;
			}
		}
		else {
			return;
		}

		//move to element if coming from outside link
		liveBlog.moveToElem();
	},
	executeBlog:function(ver, old){
		liveBlog.version.first = ver;
		liveBlog.version.oldTotal = old;
		Tabletop.init( { key: liveBlog.gsheet,
	                 callback: liveBlog.processData,
	                 wanted: ["main"],
	                 debug: true } );
	}
}






