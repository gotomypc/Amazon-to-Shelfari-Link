var Const = {
	URL      : 'http://www.shelfari.com/booksearch.aspx?keywords={isbn}',
	QUERY    : '.book_results li:first h3 a',
	TAG      : '{isbn}',
	LOCATION : '.GFTButtonCondo'
};

(function prepareDocument() {
	var store, isbn, a, img, href, mhref;
	
	store = $('input[name="storeId.att"]').val();
	if (store !== 'books' && store !== 'digital-text') return;
	
	isbn = $('input[name="asin.att"]').val();
	if (!isbn) return;
	
	href  = Const.URL.replace(Const.TAG, isbn);
		
	a = $('<a></a>').attr({
		href     : href,
		target   : '_blank'
	}).css({
	   display   : 'block',
	   padding   : 4,
	   textAlign : 'center'
    });
    
	img = $('<img />').attr('src', chrome.extension.getURL('button.png'));
	img.appendTo(a);
	
	$(Const.LOCATION).append(a);
	
	$.ajax({
	   url: href,
	   type: 'GET',
	   context: this,
	   success: function(data) {
	       var link = $(Const.QUERY, data).attr('href');
	       if (link) a.attr('href', link);
	   }
	})
})();
