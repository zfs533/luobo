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
		this.maps = [
		             {map:"ss_map01.png", locked:false, tower:"ss_towers_01.png", level:1, wave:"ss_waves_15.png", num:15},
		             {map:"ss_map02.png", locked:false, tower:"ss_towers_02.png", level:2, wave:"ss_waves_15.png", num:15},
		             {map:"ss_map03.png", locked:true, tower:"ss_towers_03.png", level:3, wave:"ss_waves_20.png", num:20},
		             {map:"ss_map04.png", locked:true, tower:"ss_towers_04.png", level:4, wave:"ss_waves_20.png", num:20},
		             {map:"ss_map05.png", locked:true, tower:"ss_towers_05.png", level:5, wave:"ss_waves_20.png", num:20},
		             {map:"ss_map06.png", locked:true, tower:"ss_towers_06.png", level:6, wave:"ss_waves_25.png", num:25},
		             {map:"ss_map07.png", locked:true, tower:"ss_towers_07.png", level:7, wave:"ss_waves_20.png", num:20},
		             {map:"ss_map08.png", locked:true, tower:"ss_towers_08.png", level:8, wave:"ss_waves_25.png", num:25},
		             {map:"ss_map09.png", locked:true, tower:"ss_towers_09.png", level:9, wave:"ss_waves_20.png", num:20},
		             {map:"ss_map10.png", locked:true, tower:"ss_towers_10.png", level:10, wave:"ss_waves_25.png", num:25},
		             {map:"ss_map11.png", locked:true, tower:"ss_towers_11.png", level:11, wave:"ss_waves_25.png", num:25},
		             {map:"ss_map12.png", locked:true, tower:"ss_towers_12.png", level:12, wave:"ss_waves_25.png", num:25}
		             ];
		
		this.page = ccui.PageView.create();
		this.page.setSize(cc.size(this.width , 440));
		this.page.setPosition(this.width-this.page.width>>1, this.height-this.page.height>>1);
		this.addChild(this.page, 5);
		this.page.addEventListenerPageView(this.pageViewEventFunc, this);
		
		for(var i = 0; i < this.maps.length; i++)
		{
			var page = this.getPageInstance(this.maps[i]);
			this.page.addPage(page);
		}
		
	},
	// get map page instance
	getPageInstance:function(maps)
	{
		var layout = ccui.Layout.create();
		layout.setSize(cc.size(this.width , 440));
		var map = ccui.ImageView.create(maps.map,ccui.Widget.PLIST_TEXTURE);
		layout.isLocked = maps.locked;
		layout.monsterNum = maps.num;
		layout.wave = maps.wave;
		layout.level = maps.level;
		map.setPosition(layout.width/2, layout.height/2);
		layout.addChild(map, 5);

		var tower = ccui.ImageView.create(maps.tower,ccui.Widget.PLIST_TEXTURE);
		tower.setPosition(layout.width/2, map.y - map.height/2-tower.height/2+10);
		layout.addChild(tower, 5);
		
		if(layout.isLocked)
		{
			lockedIco = ccui.ImageView.create("ss_locked_icon.png", ccui.Widget.PLIST_TEXTURE);
			lockedIco.setPosition(map.x+130, lockedIco.height-30);
			lockedIco.addTouchEventListener(this.pageViewEventFunc, this);
			layout.addChild(lockedIco, 5);
		}
		map.addTouchEventListener(this.pageViewEventFunc, this);
		tower.addTouchEventListener(this.pageViewEventFunc, this);
		return layout;
	},
	pageViewEventFunc:function(target,state)
	{
		switch (state) 
		{
			case ccui.Widget.TOUCH_BEGAN:
				cc.log("began")
				var lock = this.page.getPage((this.page.getCurPageIndex())).isLocked;
				this.waveNum.loadTexture(this.page.getPage((this.page.getCurPageIndex())).wave, ccui.Widget.PLIST_TEXTURE);
				this.jugementLevelState(!lock);
				break;
				
			case ccui.Widget.TOUCH_ENDED:
				var lock = this.page.getPage((this.page.getCurPageIndex()));
				if(lock.isLocked)
				{
					var theme01 = new LuoBoLockLayout("themes01");
					theme01.setPosition(this.width-theme01.width>>1,this.height-theme01.height>>1);
					this.addChild(theme01, 100);
				}
				else
				{
					this.gotoCurrentLevel(lock);
				}
				break;
				
			case ccui.Widget.TOUCH_CANCELED:
				break;
				
			default:
				break;
		}
	},
	//start select level
	startBtnEvent:function(target, state)
	{
		if ( state === ccui.Widget.TOUCH_ENDED )
		{
			var lock = this.page.getPage((this.page.getCurPageIndex()));
			this.gotoCurrentLevel(lock);
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
		if(state)
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
		if(state == ccui.Widget.TOUCH_ENDED)
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
});

LuoboThemesScene01.createScene = function()
{
	var themes01 = new LuoboThemesScene01();
	var scene = new BaseScene();
	scene.addChild(themes01);
	return scene;
};



