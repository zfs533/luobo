/**
 * zfs@end ui for current level		2015/04/16pm
 */
var LuoboOverLevel = ccui.Layout.extend(
{
	/**
	 * 
	 * @param data
	 * {id:1001,wave:15, passWave:15, isWin:true, level:1, live:10, clear:false}
	 */
	ctor:function(data, that)
	{
		this._super();
		this.data = data;
		this.that = that;
		this.zinit();
		this.addUI();
		this.setInformation();
		this.bottomUI();
	},
	//初始化
	zinit:function()
	{
		this.setSize(cc.size(Default.windowWidth(),Default.windowHeight()));
		cc.spriteFrameCache.addSpriteFrames("res/Themes/scene/darkbg-hd.plist");
		cc.spriteFrameCache.addSpriteFrames("res/Themes/scene/gameover-hd.plist");
		cc.spriteFrameCache.addSpriteFrames("res/Themes/scene/gameover0-hd.plist");
	},
	//加载控件
	addUI:function()
	{
		var bg = cc.Sprite.createWithSpriteFrameName("darkbg.png");
		bg.ignoreAnchorPointForPosition(true);
		this.addChild(bg);
		if ( this.data.isWin )
		{
			this.levelWin();
		}
		else
		{
			this.levelLose();
		}
	},
	//通关成功
	levelWin:function()
	{
		cc.log(this.data.id+" nextLevelID="+(this.data.id+1));
		var lvData = checkThemes01DataById(this.data.id), nextLvData = checkThemes01DataById(this.data.id +1 );
		nextLvData.locked = 0;//开启下一个关卡
		lvData.isOver = true;
		lvData.clearAll = this.data.clear;
		
		var winBg = cc.Sprite.createWithSpriteFrameName("win_bg.png");
		winBg.setPosition(this.width/2, this.height/2);
		this.addChild(winBg);

		var winBg_cn = cc.Sprite.createWithSpriteFrameName("win_bg_CN.png");
		winBg_cn.setPosition(this.width/2, this.height/2);
		this.addChild(winBg_cn, 1);
		
		var honorA = ["gainhonor_1.png", "gainhonor_2.png", "gainhonor_3.png"], honor_1;
		if ( this.data.live === 10 )//荣誉//三颗星
		{
			honor_1 = cc.Sprite.createWithSpriteFrameName(honorA[2]);
			lvData.honor = 3;
		}
		else if ( this.data.live >= 5 && this.data.live < 10 )
		{
			honor_1 = cc.Sprite.createWithSpriteFrameName(honorA[1]);
			lvData.honor = 2;
		}
		else
		{
			honor_1 = cc.Sprite.createWithSpriteFrameName(honorA[0]);
			lvData.honor = 1;
		}
		honor_1.setPosition(this.width/2, this.height/2+winBg.height/2 - honor_1.height/2);
		this.addChild(honor_1, 1);

		var selectLevel = BaseButton.createe("select_normal_CN.png", "select_pressed_CN.png", "", ccui.Widget.PLIST_TEXTURE);
		selectLevel.setPosition(winBg.x - selectLevel.width/2, winBg.y -selectLevel.height-10);
		selectLevel.addTouchEventListener(this.selectLevelEvent, this);
		this.addChild(selectLevel, 1);
		
		var continueLevel = BaseButton.createe("continue_normal_CN.png", "continue_pressed_CN.png", "", ccui.Widget.PLIST_TEXTURE);
		continueLevel.setPosition(winBg.x + continueLevel.width/2, winBg.y -continueLevel.height - 10);
		continueLevel.addTouchEventListener(this.continueLevelEvent, this);
		this.addChild(continueLevel, 1);
		
		this.showPassLevel(winBg);
	},
	//show this time passed level
	showPassLevel:function(winBg)
	{
		var wave = ccui.TextAtlas.create(this.data.wave, "res/Themes/Items/labelatlas.png", 17, 22, "0");
		wave.setAnchorPoint(0, 0);
		wave.setPosition(winBg.x+75, winBg.y+wave.height/2+5);
		this.addChild(wave, 2);
		
		var currentWave1 = ccui.TextAtlas.create(0, "res/Themes/Items/labelatlas.png", 17, 22, "0");
		currentWave1.setAnchorPoint(0, 0);
		currentWave1.setPosition(winBg.x-25, wave.y);
		this.addChild(currentWave1, 2);

		var currentWave2 = ccui.TextAtlas.create(0, "res/Themes/Items/labelatlas.png", 17, 22, "0");
		currentWave2.setAnchorPoint(0, 0);
		currentWave2.setPosition(winBg.x+15, wave.y);
		this.addChild(currentWave2, 2);

		var level = ccui.TextAtlas.create(this.data.level, "res/Themes/Items/labelatlas.png", 17, 22, "0");
		level.setAnchorPoint(0.5, 0);
		level.setPosition(winBg.x-50, wave.y - 55);
		this.addChild(level, 2);
		if ( this.data.level < 10 )
		{
			level.setString("0"+this.data.level);
		}
		
		if ( this.data.passWave > 9 && this.data.passWave < 20 )
		{
			currentWave1.setString(1);
			currentWave2.setString(this.data.passWave - 10);
		}
		else if ( this.data.passWave > 19 && this.data.passWave < 30 )
		{
			currentWave1.setString(2);
			currentWave2.setString(this.data.passWave - 20);
		}
		else
		{
			currentWave2.setString(this.data.passWave);
		}
	},
	//lose level
	levelLose:function()
	{
		var loseBg = cc.Sprite.createWithSpriteFrameName("lose_bg.png");
		loseBg.setPosition(this.width/2, this.height/2);
		this.addChild(loseBg);
		
		var loseBg_cn = cc.Sprite.createWithSpriteFrameName("lose_bg_CN.png");
		loseBg_cn.setPosition(this.width/2, this.height/2);
		this.addChild(loseBg_cn);
		
		var selectLevel = BaseButton.createe("select_normal_CN.png", "select_pressed_CN.png", "", ccui.Widget.PLIST_TEXTURE);
		selectLevel.setPosition(loseBg.x - selectLevel.width/2, loseBg.y -selectLevel.height-10);
		selectLevel.addTouchEventListener(this.selectLevelEvent, this);
		this.addChild(selectLevel, 1);

		var retryLevel = BaseButton.createe("retry_normal_CN.png", "retry_pressed_CN.png", "", ccui.Widget.PLIST_TEXTURE);
		retryLevel.setPosition(loseBg.x + retryLevel.width/2, loseBg.y -retryLevel.height - 10);
		retryLevel.addTouchEventListener(this.retryLevelEvent, this);
		this.addChild(retryLevel, 1);
		
		this.showPassLevel(loseBg);
	},
	//add bottom ui
	bottomUI:function()
	{
		var btm = new LuoboBottomWeibo();
		this.addChild(btm, 10);
	},
	//select level
	selectLevelEvent:function(target, state)
	{
		if ( state === ccui.Widget.TOUCH_ENDED )
		{
			var scene = LuoboThemesScene01.createScene();
			cc.director.runScene(cc.TransitionFade.create(changeSceneTime, scene));
		}
	},
	//continue to next level
	continueLevelEvent:function(target, state)//TODO
	{
		if ( state === ccui.Widget.TOUCH_ENDED )
		{
			var scene = LuoboThemesScene01.createScene();
			cc.director.runScene(cc.TransitionFade.create(changeSceneTime, scene));
			/*var data = checkThemes01DataById(this.data.id+1);
			this.changeScene(data);
			this.removeFromParent();*/
		}
	},
	//retry current level
	retryLevelEvent:function(target, state)//TODO
	{
		if ( state === ccui.Widget.TOUCH_ENDED )
		{
			this.changeScene(this.that.data);
		}
	},
	changeScene:function(data)
	{
		print(data);
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
	//设置信息
	setInformation:function()
	{
	},
	//进入结点
	onEnter:function()
	{
		this._super();
	},
	//离开完成
	onExit:function()
	{
		this._super();
		cc.spriteFrameCache.removeSpriteFramesFromFile("res/Themes/scene/darkbg-hd.plist");
		cc.spriteFrameCache.removeSpriteFramesFromFile("res/Themes/scene/gameover0-hd.plist");
		cc.spriteFrameCache.removeSpriteFramesFromFile("res/Themes/scene/gameover-hd.plist");
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
	}
});