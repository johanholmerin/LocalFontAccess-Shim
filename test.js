var bs = require('browser-sync').create();

bs.init({
	server: '.'
});

bs.watch(['index.html', 'FontAccess.js']).on('change', bs.reload);
