requirejs.config({
    baseUrl: './js',
    paths: {
    	'jquery':'../libs/jquery/dist/jquery',
    	'tools': '../tools',
    	'app': './'
    }
});


requirejs(['main', 'tools/Class', 'jquery'], function(main) {
	window.compute = main.compute;
});
