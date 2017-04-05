fis.hook('commonjs');
fis.match('::packager', {
	spriter: fis.plugin('csssprites'),
	postpackager: fis.plugin('loader', {})
});
fis.match('*.{js,css,png}', {
	useHash: true
});
//fis3-hook-module
fis.hook('module', {
  mode: 'amd' // 模块化支持 amd 规范，适应 require.js
});
fis.match('*.{js,es,es6,jsx,ts,tsx}', {
  preprocessor: [
    fis.plugin('js-require-file'),
    fis.plugin('js-require-css')
  ]
})

fis.match('*.js', {
	optimizer: fis.plugin('uglify-js')
});

fis.match('*.css', {
	useSprite: true,
	optimizer: fis.plugin('clean-css')
});

fis.match('*.png', {
	optimizer: fis.plugin('png-compressor')
});

fis.media('debug').match('*.{js,css,png}', {
	useHash: false,
	useSprite: false,
	optimizer: null
})