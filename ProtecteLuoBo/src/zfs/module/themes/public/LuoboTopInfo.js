/**
 * zfs@ the level top information	2015/04/24
 */
var LuoboTopInfo = cc.Layer.extend(
{
	/**
	 * @param data
	 * @param that
	 * {"isLocked":false,"monsterNum":15,"wave":"ss_waves_15.png","level":1}
	 */
	ctor:function(data, that)
	{
		this._super();
		this.variable(data, that);
		this.zinit();
	},
	variable:function(data, that)
	{
		this.data = data;
		this.that = that;
		this.isAddSpeed = false;
		this.isPause = false;
	},
	//initaible
	zinit:function()
	{
		this.setContentSize(Default.windowSize());
		this.setAnchorPoint(0, 0);
		
		var menuBG = cc.Sprite.createWithSpriteFrameName("MenuBG.png");
		menuBG.setPosition(this.width/2, this.height-menuBG.height/2);
		this.addChild(menuBG, 60);
		
		this.pageNumTxt = ccui.TextAtlas.create(PlayerData.gold, "res/Themes/Items/labelatlas.png", 17, 22, "0");
		this.pageNumTxt.setAnchorPoint(0, 0.5);
		this.pageNumTxt.setPosition(cc.p(110, Default.windowHeight() - 30));
		this.addChild(this.pageNumTxt, 60);

		//monster wave nuber background
		this.menuCenter = cc.Sprite.createWithSpriteFrameName("MenuCenter_01_CN.png");
		this.menuCenter.setPosition(this.width/2, this.height-this.menuCenter.height/2);
		this.addChild(this.menuCenter, 60);

		//monster wave
		var monsterWaveAll = ccui.TextAtlas.create(0, "res/Themes/Items/labelatlas.png", 17, 22, "0");
		monsterWaveAll.setAnchorPoint(0, 0);
		monsterWaveAll.setString(this.data.monsterNum);
		monsterWaveAll.setPosition(this.menuCenter.x - 10, this.menuCenter.y - 5);
		this.monsterWaveAll = monsterWaveAll;
		this.addChild(monsterWaveAll, 61);

		this.currentMonsterWave1 = ccui.TextAtlas.create(0, "res/Themes/Items/labelatlas.png", 17, 22, "0");
		this.currentMonsterWave1.setAnchorPoint(0.5, 0);
		this.currentMonsterWave1.setPosition(this.menuCenter.x - 100, monsterWaveAll.y);
		this.addChild(this.currentMonsterWave1, 61);

		this.currentMonsterWave2 = ccui.TextAtlas.create(0, "res/Themes/Items/labelatlas.png", 17, 22, "0");
		this.currentMonsterWave2.setAnchorPoint(0.5, 0);
		this.currentMonsterWave2.setPosition(this.menuCenter.x - 60, monsterWaveAll.y);
		this.addChild(this.currentMonsterWave2, 61);

		//pause background
		this.menuCenterBg = cc.Sprite.createWithSpriteFrameName("MenuCenter_02_CN.png");
		this.menuCenterBg.setPosition(this.width/2, this.height-this.menuCenterBg.height/2);
		this.addChild(this.menuCenterBg, 60);
		this.menuCenterBg.setOpacity(0);

		//control move speed rate
		this.speedBtn = BaseButton.createe("speed11.png", "speed12.png", "", ccui.Widget.PLIST_TEXTURE);
		this.speedBtn.setPosition(this.width/2+200, this.height-this.speedBtn.height/2);
		this.isAddSpeed = false;
		this.speedBtn.addTouchEventListener(this.speedBtnTouchEvent, this);
		this.addChild(this.speedBtn, 60);

		//control pause or play
		this.pauseBtn = BaseButton.createe("pause01.png", "pause02.png", "", ccui.Widget.PLIST_TEXTURE);
		this.pauseBtn.setPosition(this.width/2+320, this.height-this.pauseBtn.height/2);
		this.isPause = false;
		this.pauseBtn.addTouchEventListener(this.pauseBtnTouchEvent, this);
		this.addChild(this.pauseBtn, 60);

		//control continue or change level game
		this.menuBtn = BaseButton.createe("menu01.png", "menu02.png", "", ccui.Widget.PLIST_TEXTURE);
		this.menuBtn.setPosition(this.pauseBtn.x + 100, this.pauseBtn.y);
		this.menuBtn.addTouchEventListener(this.menuBtnTouchEvent, this);
		this.addChild(this.menuBtn, 60);
	},
	speedBtnTouchEvent:function(target, state)
	{
		if(state == ccui.Widget.TOUCH_ENDED)
		{
			if(this.isAddSpeed)
			{
				this.isAddSpeed = false;
				target.loadTextures("speed11.png","speed12.png","",ccui.Widget.PLIST_TEXTURE);
			}
			else
			{
				this.isAddSpeed = true;
				target.loadTextures("speed21.png","speed22.png","",ccui.Widget.PLIST_TEXTURE);
			} 
		}
		this.that.speedBtnTouchEvent(target, state);
	},
	//control pause or play
	pauseBtnTouchEvent:function(target, state)
	{
		if(state == ccui.Widget.TOUCH_ENDED)
		{
			if(this.isPause)
			{
				this.monsterWaveAll.visible = true;
				this.currentMonsterWave1.visible = true;
				this.currentMonsterWave2.visible = true;
				this.isPause = false;
				target.loadTextures("pause01.png","pause01.png","",ccui.Widget.PLIST_TEXTURE);
				this.menuCenter.setOpacity(250);
				this.menuCenterBg.setOpacity(0);
			}
			else
			{
				this.monsterWaveAll.visible = false;
				this.currentMonsterWave1.visible = false;
				this.currentMonsterWave2.visible = false;
				this.menuCenter.setOpacity(0);
				this.menuCenterBg.setOpacity(250);
				this.isPause = true;
				target.loadTextures("pause11.png","pause12.png","",ccui.Widget.PLIST_TEXTURE);
			} 
		}
		this.that.pauseBtnTouchEvent(target, state);
	},
	//control coutinue or change level of game
	menuBtnTouchEvent:function(target, state)
	{
		if(state == ccui.Widget.TOUCH_ENDED)
		{
			var me = new LuoboMenu(this.data);
			this.addChild(me, 100);
		}
		this.that.menuBtnTouchEvent(target, state);
	},
});