/*
 * @zfs main scene 2015/1/4
 */
var LuoBoMainScene = ccui.Layout.extend(
{
	ctor:function()
	{
		this._super();
		this.zinit();
		this.setHandleBtn();
	},
	//handle button control
	setHandleBtn:function()
	{
		var settingBtn = ccui.Button.create("btn_setting_normal.png", "btn_setting_pressed.png", "", ccui.Widget.PLIST_TEXTURE);
		settingBtn.setPosition(cc.p(200, 225));
		this.addChild(settingBtn, 20);
		settingBtn.addTouchEventListener(this.settingBtnFunc, this);
		
		var helpBtn    = ccui.Button.create("btn_help_normal.png","btn_help_pressed.png","",ccui.Widget.PLIST_TEXTURE);
		helpBtn.setPosition(cc.p(this.getSize().width - 200, 225));
		this.addChild(helpBtn, 20);
		helpBtn.addTouchEventListener(this.helpBtnFunc, this);
		
		var adventureBtn = ccui.Button.create("btn_adventure_normal_CN.png","btn_adventure_pressed_CN.png","",ccui.Widget.PLIST_TEXTURE);
		adventureBtn.setPosition(cc.p(adventureBtn.width/2+30, 80));
		this.addChild(adventureBtn, 20);
		adventureBtn.addTouchEventListener(this.adventureBtnFunc, this);
		
		{
			var bossModuleBtn = ccui.Button.create("btn_boss_normal_CN.png","btn_boss_pressed_CN.png","",ccui.Widget.PLIST_TEXTURE);
			bossModuleBtn.setPosition(cc.p(this.getSize().width/2, 80));
			this.addChild(bossModuleBtn, 20);
			bossModuleBtn.addTouchEventListener(this.bossModuleBtnFunc, this);
			var lockImage = ccui.ImageView.create("locked.png",ccui.Widget.PLIST_TEXTURE);
			lockImage.setPosition(cc.p(bossModuleBtn.x+bossModuleBtn.width/2-20,bossModuleBtn.y-20));
			this.addChild(lockImage, 20);
		}
		
		{
			var monsterBtn = ccui.Button.create("btn_nest_normal_CN.png","btn_nest_pressed_CN.png","",ccui.Widget.PLIST_TEXTURE);
			monsterBtn.setPosition(cc.p(this.getSize().width - monsterBtn.width/2 - 30, 80));
			this.addChild(monsterBtn, 20);
			monsterBtn.addTouchEventListener(this.monsterBtnFunc, this);
			var lockImage = ccui.ImageView.create("locked.png",ccui.Widget.PLIST_TEXTURE);
			lockImage.setPosition(cc.p(monsterBtn.x+monsterBtn.width/2-20,monsterBtn.y-20));
			this.addChild(lockImage, 20);
		
		}
	
	},
	//monster module scene
	monsterBtnFunc:function(target, state)
	{
		if(state == ccui.Widget.TOUCH_ENDED)
		{
			var monsterLock = new LuoBoLockLayout("monsterHome");
			this.addChild(monsterLock, 100);
		}
	},
	//boss module scene
	bossModuleBtnFunc:function(target, state)
	{
		if(state == ccui.Widget.TOUCH_ENDED)
		{
			var bossLock = new LuoBoLockLayout("boss");
			this.addChild(bossLock, 100);
		}
	},
	//adventure scene
	adventureBtnFunc:function(target, state)
	{
		if(state == ccui.Widget.TOUCH_ENDED)
		{
			var themes = LuoBoThemesScene.createScene();
			cc.director.runScene(cc.TransitionFade.create(changeSceneTime, themes));
		}
	},
	//setting scene
	settingBtnFunc:function(target, state)
	{
		if(state == ccui.Widget.TOUCH_ENDED)
		{
			var set = LuoBoSettingScene.createScene();
			cc.director.runScene(cc.TransitionSlideInB.create(changeSceneTime, set));
		}
	},
	//help scene
	helpBtnFunc:function(target, state)
	{
		if(state == ccui.Widget.TOUCH_ENDED)
		{
			var help = LuoBoHelpScene.createScene();
			cc.director.runScene(cc.TransitionSlideInT.create(changeSceneTime, help));
		}
	},
	//init scene
	zinit:function()
	{
		this.setSize(Default.windowSize());
		cc.spriteFrameCache.addSpriteFrames("res/Themes/scene/mainscene1-hd.plist");
		{
			var bird = cc.Sprite.createWithSpriteFrameName("bird.png");
			bird.setPosition(cc.p(200, this.getSize().height - 150));
			this.addChild(bird, 10);
			//top to down effect
			var move = cc.MoveBy.create(1, cc.p(0, 20));
			var move_ease_inout1 = move.clone().easing(cc.easeInOut(2.0));
			var move_ease_inout_back1 = move_ease_inout1.reverse();
			var delay = cc.DelayTime.create(0.1);
			var seq1 = cc.Sequence.create(move_ease_inout1, delay, move_ease_inout_back1, delay.clone());
			bird.runAction(seq1.repeatForever());
		}
		
		var luobo = cc.Sprite.createWithSpriteFrameName("carrot.png");
		luobo.setAnchorPoint(0.5, 0);
		luobo.setPosition(cc.p(this.getSize().width/2, this.getSize().height/2 + luobo.height/4 -luobo.height/2));
		this.addChild(luobo, 10);
		
		var yunduo = cc.Sprite.createWithSpriteFrameName("cloud1.png");
		yunduo.setPosition(cc.p(this.getSize().width -100, this.getSize().height - 50));
		this.addChild(yunduo, 10);
		
		{
			var yezi = cc.Sprite.createWithSpriteFrameName("leaf-1.png");
			yezi.setAnchorPoint(0.5, 0);
			yezi.setPosition(cc.p(400, this.getSize().height - 150 - yezi.height/2));
			this.addChild(yezi, 5);
			var yezi1 = cc.Sprite.createWithSpriteFrameName("leaf-2.png");
			yezi1.setAnchorPoint(0.5, 0);
			yezi1.setPosition(cc.p(470, this.getSize().height - 130 - yezi1.height/2));
			this.addChild(yezi1, 5);
			var yezi2 = cc.Sprite.createWithSpriteFrameName("leaf-3.png");
			yezi2.setAnchorPoint(0.5, 0);
			yezi2.setPosition(cc.p(550, this.getSize().height - 140 - yezi2.height/2));
			this.addChild(yezi2, 4);
			//rotate effect
			this.schedule(function()
			{
				var rotate = cc.RotateBy.create(0.1, 10, 10);
				var rotater = rotate.reverse();
				var sequence = cc.sequence(rotate, rotater);
				yezi1.runAction(sequence.repeat(3));
				this.scheduleOnce(function()
				{
					var rotate = cc.RotateBy.create(0.1, 10, 10);
					var rotater = rotate.reverse();
					var sequence = cc.sequence(rotate, rotater);
					yezi2.runAction(sequence.repeat(3));
				}, 2);
			}, 6);
		}
		
		{
			luobo.scale = yezi.scale = yezi1.scale = yezi2.scale = 0;
			var scaleTo = cc.ScaleTo.create(0.25, 1.2, 1.2);
			var scaleBy = cc.ScaleBy.create(0.1, 1, 1);
			var sequence = cc.sequence(scaleTo, scaleBy);
			luobo.runAction(sequence);
			yezi.runAction(sequence.clone());
			yezi1.runAction(sequence.clone());
			yezi2.runAction(sequence.clone());
		}
		
		var background = cc.Sprite.createWithSpriteFrameName("mainbg.png");
		background.setPosition(cc.p(this.getSize().width/2, this.getSize().height/2));
		this.addChild(background, 0);
		
		var protectedLuobo = cc.Sprite.createWithSpriteFrameName("mainbg_CN.png");
		protectedLuobo.setPosition(cc.p(this.getSize().width/2, this.getSize().height/2));
		this.addChild(protectedLuobo, 10);
		
		cc.log(this.getSize().width+"  "+this.getSize().height);
	}
});

LuoBoMainScene.createScene = function()
{
	var mains = new LuoBoMainScene();
	var scene = new BaseScene();
	scene.addChild(mains);
	return scene;
};









