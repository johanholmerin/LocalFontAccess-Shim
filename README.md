# Local Font Access shim

Uses Google Fonts to shim the Local Font Access API, https://goo.gl/nJuKro

## Usage

Because this shim uses the Google Fonts Developer API, you need to
acquire an API key from Google. Instructions are available at
https://developers.google.com/fonts/docs/developer_api#APIKey.

After you have loaded the shim you need to set the key:

    FontAccess.key = <API_KEY>;

## Example


		FontAccess.getFonts().then(function (fontDescriptionArray) {
			fontDescriptionArray.forEach(function (fontDescription) {
				console.log(fontDescription.family, fontDescription.style);
			});
		}, function (err) {
			console.error(err);
		});

		FontAccess.getFontBlob('Roboto', 'regular').then(function (file) {
			var reader = new FileReader();
			reader.onload = function (event) {
				console.log(reader.result.byteLength);
			};
			reader.readAsArrayBuffer(file);
		}, function (err) {
			console.error(err);
		});

## Notes

The shim uses fetch and promises.
