requirejs.config({
    baseUrl: './js',
    paths: {
    	'jquery':'../libs/jquery/dist/jquery'
    }
});


requirejs(['main', 'jquery'], function(main) {
	var temp = new main;
	window.compute = temp.compute;
});
