(function prepareDocument() {
	var store, isbn, a, img, href, mhref;
	store = $('input[name="storeId.att"]').val();
	if (store !== 'books' && store !== 'digital-text') return;
	
	isbn = $('input[name="asin.att"]').val();
	if (!isbn) return;
	
	href = 'http://www.shelfari.com/booksearch.aspx?keywords=' + isbn;
	mhref = 'http://m.shelfari.com/search.aspx?k=' + isbn;
		
	a = $('<a></a>').attr('href', href).css({
	   display: 'block',
	   padding: 4,
	   textAlign: 'center'
    });
	img = $('<img />').attr('src', chrome.extension.getURL('button.png'));
	img.appendTo(a);
	
	$('.GFTButtonCondo').append(a);
	
	$.ajax({
	   url: mhref,
	   type: 'GET',
	   success: function(data) {
	       var href = $('#SearchButton ~ b a', data).attr('href');
	       if (href) a.attr('href', href.replace('/m.', '/www.'));
	   }
	})
})();
