(function () {
	var webfonts;
	var fetchPromise;

	function mapFonts(fonts) {
		return Object.keys(fonts).map(function (font) {
			var index = font.lastIndexOf('-');

			return {
				family: font.slice(0, index),
				style: font.slice(index +1)
			};
		});
	}

	function getFonts() {
		if (webfonts) {
			return Promise.resolve(mapFonts(webfonts));
		}

		fetchPromise = fetch(
			'https://www.googleapis.com/webfonts/v1/webfonts?key=' +
			FontAccess.key
		).then(function (res) {
			if (!res.ok) {
				throw new Error('Failed to get fonts');
			}

			return res.json();
		}).then(function (res) {
			webfonts = {};

			res.items.forEach(function (item) {
				item.variants.forEach(function (variant) {
					webfonts[item.family + '-' + variant] = item.files[variant];
				});
			});

			return mapFonts(webfonts);
		});

		return fetchPromise;
	}

	function getFontBlob(name, style) {
		var fileName = name + '-' + style;

		return (fetchPromise || getFonts()).then(function () {
			var url = webfonts[fileName];

			if (!url) {
				throw new Error('Font not available');
			}

			return fetch(url);
		}).then(function (res) {
			if (!res.ok) {
				throw new Error('Failed to get font blob');
			}

			return res.blob();
		}).then(function (blob) {
			try {
				return new File([blob], fileName);
			} catch (e) {
				// Safari and IE/Edge doesn't support the File constructor
				// http://caniuse.com/#feat=fileapi
				blob.lastModifiedDate = new Date();
				blob.name = fileName;

				return blob;
			}
		});
	}

	window.FontAccess = {
		getFonts: getFonts,
		getFontBlob: getFontBlob
	};
})();
