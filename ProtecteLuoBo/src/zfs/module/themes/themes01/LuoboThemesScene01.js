/*
 * @zfs luobo themes scene01 2015/1/6
 */
var LuoboThemesScene01 = ccui.Layout.extend
({
	ctor:function()
	{
		this._super();
		this.zinit();
		this.jugementLevelState(true);
		this.handleMapLevel();
	},
	// init scene
	zinit:function()
	{
		cc.spriteFrameCache.addSpriteFrames("res/Themes/scene/stages_bg-hd.plist");
		cc.spriteFrameCache.addSpriteFrames("res/Themes/scene/stages_theme1-hd.plist");
		cc.spriteFrameCache.addSpriteFrames("res/Themes/scene/gameover-hd.plist");
		cc.spriteFrameCache.addSpriteFrames("res/Themes/scene/gameover0-hd.plist");
		this.setSize(Default.windowSize());
		
		var background = cc.Sprite.createWithSpriteFrameName("ss_bg.png");
		background.setPosition(this.width/2, this.height/2);
		this.addChild(background, 0);
		
		var backgroundc = cc.Sprite.createWithSpriteFrameName("ss_bg_CN.png");
		backgroundc.setPosition(this.width/2, this.height/2);
		this.addChild(backgroundc, 0);
		
		var backgroundcl = cc.Sprite.createWithSpriteFrameName("ss_cloud.png");
		backgroundcl.setPosition(this.width/2, this.height/2);
		this.addChild(backgroundcl, 0);
	
		var homeBtn = BaseButton.createe("ss_back_normal.png", "ss_back_pressed.png", "", ccui.Widget.PLIST_TEXTURE);
		homeBtn.name = "homeBtn";
		homeBtn.setPosition(homeBtn.width/2+4,this.height-homeBtn.height/2);
		this.addChild(homeBtn, 100);
	
		var helpBtn = BaseButton.createe("ss_help_normal.png", "ss_help_pressed.png", "", ccui.Widget.PLIST_TEXTURE);
		helpBtn.name = "helpBtn";
		helpBtn.setPosition(this.width-helpBtn.width/2-4,this.height-helpBtn.height/2);
		this.addChild(helpBtn, 100);
		
		homeBtn.addTouchEventListener(this.helpAndHomeBtnEvent, this);
		helpBtn.addTouchEventListener(this.helpAndHomeBtnEvent, this);
		
		this.waveNum = ccui.ImageView.create("ss_waves_15.png", ccui.Widget.PLIST_TEXTURE);
		this.waveNum.setPosition(this.width/2, this.height - this.waveNum.height*3);
		this.addChild(this.waveNum, 10);
		
		this.startBtn = BaseButton.createe("ss_play_normal_CN.png", "ss_play_pressed_CN.png", "", ccui.Widget.PLIST_TEXTURE);
		this.startBtn.setPosition(this.width/2, 60);
		this.addChild(this.startBtn, 20);
		this.startBtn.addTouchEventListener(this.startBtnEvent, this);
		
		this.lockedTxt = ccui.ImageView.create("ss_locked_CN.png", ccui.Widget.PLIST_TEXTURE);
		this.lockedTxt.setPosition(this.startBtn.x, this.startBtn.y);
		this.addChild(this.lockedTxt, 20);
		this.lockedTxt.visible = false;
		
	},
	//handle map pages
	handleMapLevel:function()
	{
		this.maps = Themes01LevelData;
		this.page = ccui.PageView.create();
		this.page.setSize(cc.size(this.width , 440));
		this.page.setPosition(this.width-this.page.width>>1, this.height-this.page.height>>1);
		this.addChild(this.page, 5);
		this.page.addEventListenerPageView(this.pageViewEventFunc, this);
		
		for( var i = 0; i < this.maps.length; i++ )
		{
			var page = new LuoboThemesPage(this.maps[i], this);
			this.page.addPage(page);
		}
	},
	//start select level
	startBtnEvent:function(target, state)
	{
		if ( state === ccui.Widget.TOUCH_ENDED )
		{
			var data = Themes01LevelData[this.page.getCurPageIndex()];
			this.gotoCurrentLevel(data);
		}
	},
	gotoCurrentLevel:function(data)
	{
		switch ( data.level ) 
		{
		case 1:
			Themes01LevelManager.playLevel01(data);
			break;

		case 2:
			Themes01LevelManager.playLevel02(data);
			break;
			
		case 3:
			Themes01LevelManager.playLevel03(data);
			break;
			
		case 4:
			break;
			
		case 5:
			break;
			
		case 6:
			break;
			
		case 7:
			break;
			
		case 8:
			break;
			
		case 9:
			break;
			
		case 10:
			break;
			
		case 11:
			break;
			
		case 12:
			break;
			
		default:
			break;
		}
	},
	//jugement current level is or not locked
	jugementLevelState:function(state)
	{
		if( state )
		{
			this.startBtn.visible = true;
			this.lockedTxt.visible = false;
		}
		else
		{
			this.startBtn.visible = false;
			this.lockedTxt.visible = true;
			
		}
	},
	//help and go home api
	helpAndHomeBtnEvent:function(target, state)
	{
		if( state == ccui.Widget.TOUCH_ENDED )
		{
			switch (target.name) 
			{
				case "homeBtn":
					var themes = LuoBoThemesScene.createScene();
					cc.director.runScene(cc.TransitionFade.create(changeSceneTime, themes));
					break;
	
				case "helpBtn":
					var help = LuoBoHelpScene.createScene();
					cc.director.runScene(cc.TransitionFade.create(changeSceneTime, help));
					break;
					
				default:
					break;
			}
		}
	},
	onExit:function()
	{
		this._super();
//		cc.spriteFrameCache.removeSpriteFramesFromFile("res/Themes/scene/gameover0-hd.plist");
//		cc.spriteFrameCache.removeSpriteFramesFromFile("res/Themes/scene/gameover-hd.plist");
	}
});

LuoboThemesScene01.createScene = function()
{
	var themes01 = new LuoboThemesScene01();
	var scene = new BaseScene();
	scene.addChild(themes01);
	return scene;
};



