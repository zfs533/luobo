var LuoboMenu = ccui.Layout.extend(
{
	/**
	 * @param level:关卡
	 * @param data
	 * {"isLocked":false,"monsterNum":15,"wave":"ss_waves_15.png","level":1}
	 */
	ctor:function(data, level)
	{
		this._super();
		this.data = data;
		this.level = level;
		this.zinit();
		this.addUI();
		this.setInformation();
		this.bottomUI();
	},
	//初始化
	zinit:function()
	{
		cc.spriteFrameCache.addSpriteFrames("res/Themes/scene/darkbg-hd.plist");
		cc.spriteFrameCache.addSpriteFrames("res/Themes/scene/gamemenu-hd.plist");
		this.setSize(Default.windowSize());
	},
	//加载控件
	addUI:function()
	{
		var bg = cc.Sprite.createWithSpriteFrameName("darkbg.png");
		bg.ignoreAnchorPointForPosition(true);
		this.addChild(bg);
		
		var menuBg = cc.Sprite.createWithSpriteFrameName("menu_bg.png");
		menuBg.setPosition(this.width/2, this.height/2);
		this.addChild(menuBg);
		
		//continue game
		var resumeBtn = BaseButton.createe("menu_resume_normal_CN.png","menu_resume_pressed_CN.png","",ccui.Widget.PLIST_TEXTURE);
		resumeBtn.setPosition(menuBg.width/2, menuBg.height - resumeBtn.height - 5);
		resumeBtn.addTouchEventListener(this.resumeBtnEvent, this);
		menuBg.addChild(resumeBtn);
		
		//replay game
		var restartBtn = BaseButton.createe("menu_restart_normal_CN.png","menu_restart_pressed_CN.png","",ccui.Widget.PLIST_TEXTURE);
		restartBtn.setPosition(menuBg.width/2, menuBg.height/2);
		restartBtn.addTouchEventListener(this.restartBtnEvent, this);
		menuBg.addChild(restartBtn);
		
		//select level of game
		var selectBtn = BaseButton.createe("menu_quit_normal_CN.png","menu_quit_pressed_CN.png","",ccui.Widget.PLIST_TEXTURE);
		selectBtn.setPosition(menuBg.width/2, selectBtn.height + 5);
		selectBtn.addTouchEventListener(this.selectBtnEvent, this);
		menuBg.addChild(selectBtn);
	},
	//add bottom ui
	bottomUI:function()
	{
		var btm = new LuoboBottomWeibo();
		this.addChild(btm, 10);
	},
	//continue game
	resumeBtnEvent:function(target, state)
	{
		if ( state === ccui.Widget.TOUCH_ENDED )
		{
			this.removeFromParent();
		}
	},
	//replay game
	restartBtnEvent:function(target, state)//TODO
	{
		if ( state === ccui.Widget.TOUCH_ENDED )
		{
			switch ( this.level ) 
			{
			case 1:
				Themes01LevelManager.playLevel01(this.data);
				break;

			case 2:
				Themes01LevelManager.playLevel02(this.data);
				break;
				
			case 3:
				Themes01LevelManager.playLevel03(this.data);
				break;
				
			case 4:
				break;
				
			case 5:
				break;
				
			case 6:
				break;
				
			default:
				break;
			}
		}
	},
	//select level of game
	selectBtnEvent:function(target, state)
	{
		if ( state === ccui.Widget.TOUCH_ENDED )
		{
			var scene = LuoboThemesScene01.createScene();
			cc.director.runScene(cc.TransitionFade.create(changeSceneTime, scene));
		}
	},
	//设置信息
	setInformation:function()
	{
	},
	//进入结点
	onEnter:function()
	{
		this._super();
	},
	//进入结点完成
	onEnterTransitionDidFinish:function()
	{
		this._super();
	},
	//预备离开
	onExitTransitionDidStart:function()
	{
		this._super();
	},
	//离开完成
	onExit:function()
	{
		this._super();
		cc.spriteFrameCache.removeSpriteFramesFromFile("res/Themes/scene/darkbg-hd.plist");
		cc.spriteFrameCache.removeSpriteFramesFromFile("res/Themes/scene/gamemenu-hd.plist");
	}
});