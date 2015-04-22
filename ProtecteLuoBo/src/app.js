
var HelloWorldLayer = cc.Layer.extend(
{
    ctor:function () 
    {
        this._super();
        this.zinit();
        return true;
    },
    // init scene
    zinit:function()
    {
//    	cc.audioEngine.playMusic("res/music/feng.mp3",true);
    	
    	this.setContentSize(Default.windowSize());
    	var layerColor = cc.LayerColor.create(cc.color.RED);
    	this.addChild(layerColor, 0);
//    	this.gotoLuoBoMainScene();
//    	this.gotoLuoBoHelpScene();
//    	this.gotoLuoBoSettingScene();
//    	this.gotoLuoBoThemesScene();
    	this.gotoLuoBoThemesScene01();
//    	this.gotoLuoBoThemesScene01level01();
    },
    //luobo themes scene level01 api
    gotoLuoBoThemesScene01level01:function()
    {
    	var themes01 = LuoboLevel01.createScene();
    	cc.director.runScene(cc.TransitionFade.create(0.5, themes01));
    },
    //luobo themes scene api
    gotoLuoBoThemesScene01:function()
    {
//    	var mm = new LuoboGuidance();
//    	this.addChild(mm, 100);
    	var themes01 = LuoboThemesScene01.createScene();
    	cc.director.runScene(cc.TransitionFade.create(0.5, themes01));
    },
    //luobo themes scene api
    gotoLuoBoThemesScene:function()
    {
    	var themes = LuoBoThemesScene.createScene();
    	cc.director.runScene(cc.TransitionFade.create(0.5, themes));
    },
    //luobo setting scene api
    gotoLuoBoSettingScene:function()
    {
    	var set = LuoBoSettingScene.createScene();
    	cc.director.runScene(cc.TransitionSlideInB.create(0.5, set));
    },
    //luobo help scene api
    gotoLuoBoHelpScene:function()
    {
    	var help = LuoBoHelpScene.createScene();
    	cc.director.runScene(cc.TransitionSlideInL.create(0.5, help));
    },
    //luobo main scene api
    gotoLuoBoMainScene:function()
    {
    	var lbms = LuoBoMainScene.createScene();
    	cc.director.runScene(cc.TransitionSlideInB.create(0.5, lbms));
    }
});

var HelloWorldScene = cc.Scene.extend(
{
    onEnter:function () 
    {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});














