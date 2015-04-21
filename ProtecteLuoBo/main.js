cc.game.onStart = function()
{
	var ww = Default.windowWidth();
	var hh = Default.windowHeight();//EXACT_FIT
	cc.view.setDesignResolutionSize(ww, hh, cc.ResolutionPolicy.EXACT_FIT);
//	cc.view.setDesignResolutionSize(ww, hh, cc.ResolutionPolicy.FIXED_WIDTH);
	cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.LoaderScene.preload(g_resources, function () 
    {
        cc.director.runScene(new HelloWorldScene());
    }, this);
};
cc.game.run();