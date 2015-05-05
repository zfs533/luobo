/**
 * @zfs theme01 level2 2015/05/05
 */
var LuoboLevel03 = ccui.Layout.extend(
{
	/**
	 * 
	 * @param data
	 * {"isLocked":false,"monsterNum":15,"wave":"ss_waves_15.png","level":2}
	 */
	ctor:function(data)
	{
		this._super();
		this.variable(data);
		this.initLayer();
		this.zinit();
		this.getTopInfoInstance();
		this.shwoCanInstallSpace();
		this.addTools();
		this.addDoor();
		this.playArrowAnimate();
	},
	//初始化变量
	variable:function(data)
	{
		this.data = data;
		this.topInfo = null;//顶部菜单栏
		this.tmxObjectGroups = null;//地图对象//对象层
		this.tmxOGArr = [];//地图对象组合
		this.tmxObArr = [];//摆放物品空间
		this.tmxObjArr = [];//安放炮台空间
		this.tmxPtArr = [];//怪物路径
		this.tmxTArr = [];//初始炮台摆放空间
		this.toolArr = [];//物品数组
		this.pageNumTxt = null;//图片文本
		this.monsterWaveAll = null;//怪物总波数
		this.currentMonsterWave1 = null;//怪物当前波数
		this.currentMonsterWave2 = null;
		this.speedBtn = null;//速度按钮
		this.pauseBtn = null;//暂停播放按钮
		this.menuBtn = null;//菜单按钮
		cc.spriteFrameCache.addSpriteFrames("res/Themes/Theme1/BG3/BG-hd.plist");
		cc.spriteFrameCache.addSpriteFrames("res/Themes/Theme1/Items/Object02-hd.plist");
	},
	//初始化层
	initLayer:function()
	{
		this.backgroundLayer = cc.Layer.create();
		this.addChild(this.backgroundLayer, 0);

		this.toolLayer = cc.Layer.create();
		this.addChild(this.toolLayer, 1);
		
		this.collisionLayer = cc.Layer.create();
		this.addChild(this.collisionLayer,15);
		
		this.topInfoLayer	= cc.Layer.create();
		this.addChild(this.topInfoLayer, 20);
	},
	//initialize初始化(背景、顶部信息栏、管道、TMXTiledMap数据)
	zinit:function()
	{
		this.setSize(cc.size(Default.windowWidth(),Default.windowHeight()));
		var background = cc.Sprite.createWithSpriteFrameName('BG2.png');
		background.ignoreAnchorPointForPosition(true);
		this.backgroundLayer.addChild(background, 0);
		
		var patch = cc.Sprite.createWithSpriteFrameName('Path.png');
		patch.ignoreAnchorPointForPosition(true);
		this.backgroundLayer.addChild(patch, 1);
		
		this.topInfo = new LuoboTopInfo(this.data, this);
		this.topInfoLayer.addChild(this.topInfo, 0);
		
		var tmxTiled = cc.TMXTiledMap.create("res/Themes/Theme1/BG3/BGPath.tmx");
		this.backgroundLayer.addChild(tmxTiled, 2);
		this.tmxObjectGroups = tmxTiled.getObjectGroup("PATH");//cc.TMXObjectGorup//对象层
		var tmxOGarr = this.tmxObjectGroups.getObjects();//对象层上的对象组合
		this.tmxOGArr = tmxOGarr;
		for ( var i = 0; i < tmxOGarr.length; i++ )
		{
			//1Ob1//摆放物品空间
			var reg01 = /\dOb\d/;
			if ( tmxOGarr[i].name.match(reg01) )
			{
				this.tmxObArr.push(tmxOGarr[i]);
			}
			//Obj1//安放炮台空间
			var reg02 = /Obj\d/g;
			if ( tmxOGarr[i].name.match(reg02) )
			{
				this.tmxObjArr.push(tmxOGarr[i]);
			}
			//Pt1//怪物路径
			var reg03 = /PT\d/g;
			if ( tmxOGarr[i].name.match(reg03) )
			{
				this.tmxPtArr.push(tmxOGarr[i]);
			}
			//3T1//初始炮台摆放空间
			var reg04 = /\dT\d/g;
			if ( tmxOGarr[i].name.match(reg04) )
			{
				this.tmxTArr.push(tmxOGarr[i]);
			}
		}
	},
	//显示可以安放炮台的位置
	shwoCanInstallSpace:function()
	{
		var install = new LuoboInstallSpace(this.tmxObjArr);
		this.addChild(install, 1);
	},
	//物品血量条
	getToolBlood:function(monster)
	{
		var bloodBar = ccui.Slider.create();
		bloodBar.loadProgressBarTexture("MonsterHP01.png", ccui.Widget.PLIST_TEXTURE);
		bloodBar.loadBarTexture("MonsterHP02.png", ccui.Widget.PLIST_TEXTURE);
		bloodBar.setPercent(100);
		bloodBar.setPosition(monster.width/2, monster.height-10);
//		bloodBar.visible = false;
		monster.blood = bloodBar;
		monster.addChild(bloodBar, 10);
	},
	//添加物品
	addTools:function()
	{
		for ( var i = 0; i < this.tmxObArr.length; i++ )
		{
			//白色宇宙
			var reg01 = /3Ob\d/;
			if ( this.tmxObArr[i].name.match(reg01) )
			{
				var cloud01 = ccui.ImageView.create("cloud03.png", ccui.Widget.PLIST_TEXTURE);
				cloud01.x = this.tmxObArr[i].x + this.tmxObArr[i].width/2;
				cloud01.y = this.tmxObArr[i].y + this.tmxObArr[i].height/2;
				this.toolLayer.addChild(cloud01, 0);
				this.getToolBlood(cloud01);
			}
			//气球
			var reg02 = /7Ob\d/;
			if ( this.tmxObArr[i].name.match(reg02) )
			{
				var cloud01 = ccui.ImageView.create("cloud07.png", ccui.Widget.PLIST_TEXTURE);
				cloud01.x = this.tmxObArr[i].x + this.tmxObArr[i].width/2;
				cloud01.y = this.tmxObArr[i].y + this.tmxObArr[i].height/2;
				this.toolLayer.addChild(cloud01, 0);
				this.getToolBlood(cloud01);
			}
			//彩虹
			var reg03 = /4Ob\d/;
			if ( this.tmxObArr[i].name.match(reg03) )
			{
				var cloud01 = ccui.ImageView.create("cloud04.png", ccui.Widget.PLIST_TEXTURE);
				cloud01.x = this.tmxObArr[i].x + this.tmxObArr[i].width/2;
				cloud01.y = this.tmxObArr[i].y + this.tmxObArr[i].height/2;
				this.toolLayer.addChild(cloud01, 0);
				this.getToolBlood(cloud01);
			}
			//小云朵
			var reg04 = /1Ob\d/;
			if ( this.tmxObArr[i].name.match(reg04) )
			{
				var cloud01 = ccui.ImageView.create("cloud01.png", ccui.Widget.PLIST_TEXTURE);
				cloud01.x = this.tmxObArr[i].x + this.tmxObArr[i].width/2;
				cloud01.y = this.tmxObArr[i].y + this.tmxObArr[i].height/2;
				this.toolLayer.addChild(cloud01, 0);
				this.getToolBlood(cloud01);
			}
			//红色宇宙
			var reg05 = /2Ob\d/;
			if ( this.tmxObArr[i].name.match(reg05) )
			{
				var cloud01 = ccui.ImageView.create("cloud02.png", ccui.Widget.PLIST_TEXTURE);
				cloud01.x = this.tmxObArr[i].x + this.tmxObArr[i].width/2;
				cloud01.y = this.tmxObArr[i].y + this.tmxObArr[i].height/2;
				this.toolLayer.addChild(cloud01, 0);
				this.getToolBlood(cloud01);
			}
			//松树
			var reg06 = /6Ob\d/;
			if ( this.tmxObArr[i].name.match(reg06) )
			{
				var cloud01 = ccui.ImageView.create("cloud06.png", ccui.Widget.PLIST_TEXTURE);
				cloud01.x = this.tmxObArr[i].x + this.tmxObArr[i].width/2;
				cloud01.y = this.tmxObArr[i].y + this.tmxObArr[i].height/2;
				this.toolLayer.addChild(cloud01, 0);
				this.getToolBlood(cloud01);
			}
			//大块云朵
			var reg07 = /5Ob\d/;
			if ( this.tmxObArr[i].name.match(reg07) )
			{
				var cloud01 = ccui.ImageView.create("cloud05.png", ccui.Widget.PLIST_TEXTURE);
				cloud01.x = this.tmxObArr[i].x + this.tmxObArr[i].width/2;
				cloud01.y = this.tmxObArr[i].y + this.tmxObArr[i].height/2;
				this.toolLayer.addChild(cloud01, 0);
				this.getToolBlood(cloud01);
			}
		}
		this.toolArr = this.toolLayer.getChildren();

		for ( var i = 0; i < this.toolArr.length; i++ )
		{
			this.toolArr[i].addTouchEventListener(this.toolLayerChildTouchFunc, this);
		}
	},
	//物品触摸监听回调函数
	toolLayerChildTouchFunc:function(target, state)
	{
		if ( state === ccui.Widget.TOUCH_ENDED )
		{
		}
	},
	//实例化怪物门
	addDoor:function()
	{
		var obj = this.tmxObjectGroups.getObject("PT1");
		var door = ccui.ImageView.create("start01.png", ccui.Widget.PLIST_TEXTURE);
		door.x = obj.x + door.width/2 - 5;
		door.y = obj.y + obj.height*2;
		this.backgroundLayer.addChild(door, 1);
	},
	//怪物出现箭头动画
	playArrowAnimate:function()
	{
		var obj = this.tmxObjectGroups.getObject("PT1");
		var arrow = new LuoboArrow(obj, this);
		arrow.type03();
		this.backgroundLayer.addChild(arrow, 10);
	},
	//获取顶部信息栏实例//必须这样写
	getTopInfoInstance:function()
	{
		this.pageNumTxt = this.topInfo.pageNumTxt
		//怪物总数
		this.monsterWaveAll = this.topInfo.monsterWaveAll;
		this.currentMonsterWave1 = this.topInfo.currentMonsterWave1;
		this.currentMonsterWave2 = this.topInfo.currentMonsterWave2;
		//怪物移动速度控制按钮
		this.speedBtn = this.topInfo.speedBtn
		//暂停播放
		this.pauseBtn = this.topInfo.pauseBtn;
		//菜单按钮
		this.menuBtn = this.topInfo.menuBtn;

		this.menuBtn.setTouchEnabled(false);
		this.pauseBtn.setTouchEnabled(false);
		this.speedBtn.setTouchEnabled(false);
	},
	/*
	 * 顶部信息栏速度回调函数
	 */
	speedBtnTouchEvent:function(target, state)
	{
		if(state == ccui.Widget.TOUCH_ENDED)
		{
			cc.log("speed");
		}
	},
	/*
	 * 顶部信息栏暂停回调函数
	 */
	pauseBtnTouchEvent:function(target, state)
	{
		if(state == ccui.Widget.TOUCH_ENDED)
		{
			cc.log("pause");
		}
	},
	/*
	 * 顶部信息栏菜单回调函数
	 */
	menuBtnTouchEvent:function(target, state)
	{
		if(state == ccui.Widget.TOUCH_ENDED)
		{
			cc.log("menubtn");
		}
	},
	/*
	 * 隐藏炮台栏回调函数
	 */
	hideWeaponLayout:function()
	{
		
	},
	/*
	 * 选择安放炮台回调函数
	 */
	weaponLayoutEventFunc:function(target, state)
	{
	},
	/*
	 * 选择炮台回调函数(炮台范围)
	 */
	bottleWeaponfunc:function(target, state, weaponType)
	{
	},
	/*
	 * 注册计时器回调函数(倒计时结束回调)
	 */
	registerScheduel:function()
	{
		this.scheduleUpdate();
	},
	update:function()
	{
		cc.log("游戏开始哒");
	},
	onEnter:function()
	{
		this._super();
		var countDown = new LuoboCountDown(this);
		this.addChild(countDown, 100);
		this.playArrowAnimate();
	},
	onExit:function()
	{
		this._super();
		cc.spriteFrameCache.removeSpriteFramesFromFile("res/Themes/Theme1/BG3/BG-hd.plist");
		cc.spriteFrameCache.removeSpriteFramesFromFile("res/Themes/Theme1/Items/Object02-hd.plist");
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

LuoboLevel03.createScene = function(data)
{
	var theLayer = new LuoboLevel03(data);
	var scene = cc.Scene.create();
	scene.addChild(theLayer);
	return scene
};