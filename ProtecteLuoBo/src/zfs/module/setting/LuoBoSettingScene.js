/*
 * @zfs luobo setting scene 2015/1/4
 */
var LuoBoSettingScene = ccui.Layout.extend(
{
	ctor:function()
	{
		this._super();
		this.zinit();
	},
	//init scene 
	zinit:function()
	{
		this.setSize(Default.windowSize());
		cc.spriteFrameCache.addSpriteFrames("res/Themes/scene/setting01-hd.plist");
		cc.spriteFrameCache.addSpriteFrames("res/Themes/scene/setting02-hd.plist");
		this.setSelectedItem();//select item
		this.setCountData();//conut data
		this.setAuthor();//create author
		this.setTopMenu();
		this.gohomeMenu();
	},
	setTopMenu:function()
	{
		var countDataBtn = BaseButton.createe("statistics_normal_CN.png", "statistics_selected_CN.png", "", ccui.Widget.PLIST_TEXTURE);
		countDataBtn.name = "countDataBtn";
		countDataBtn.setPosition(cc.p(this.getSize().width/2, this.getSize().height - 50));
		this.addChild(countDataBtn, 20);
		
		var authorBtn 	 = BaseButton.createe("credits_normal_CN.png", "credits_selected_CN.png", "", ccui.Widget.PLIST_TEXTURE);
		authorBtn.name = "authorBtn";
		authorBtn.setPosition(cc.p(countDataBtn.x + authorBtn.width, countDataBtn.y));
		this.addChild(authorBtn, 20);

		var selectBtn 	 = BaseButton.createe("options_normal_CN.png", "options_selected_CN.png", "", ccui.Widget.PLIST_TEXTURE);
		selectBtn.name = "selectBtn";
		selectBtn.setPosition(cc.p(countDataBtn.x - selectBtn.width, countDataBtn.y));
		this.addChild(selectBtn, 20);
		
		this.tempMenu = selectBtn;
		selectBtn.setSelected(true);
		countDataBtn.addTouchEventListener(this.topMenuBtnFunc, this);
		authorBtn.addTouchEventListener(this.topMenuBtnFunc, this);
		selectBtn.addTouchEventListener(this.topMenuBtnFunc, this);
	},
	//top menu eventlistener function
	topMenuBtnFunc:function(target, state)
	{
		if(state == ccui.Widget.TOUCH_ENDED)
		{
			this.tempMenu.setSelected(false);
			this.tempMenu = target;
			switch (target.name) 
			{
				case "selectBtn":
				{
					target.setSelected(true);
					this.selectLayout.scale = 1;
					this.countLayout.scale = 0.01;
					this.authorLayou.scale = 0.01;
					break;
				}
					
				case "countDataBtn":
				{
					target.setSelected(true);
					this.selectLayout.scale = 0.01;
					this.countLayout.scale = 1;
					this.authorLayou.scale = 0.01;
					break;
				}
					
				case "authorBtn":
				{
					target.setSelected(true);
					this.selectLayout.scale = 0.01;
					this.countLayout.scale = 0.01;
					this.authorLayou.scale = 1;
					break;
				}
					
				default:
					break;
			}
		}
	},
	//select item
	setSelectedItem:function()
	{
		this.selectLayout = ccui.Layout.create();
		this.selectLayout.setSize(Default.windowSize());
		this.addChild(this.selectLayout, 10);
		var selectBg = ccui.ImageView.create("setting_bg.png",ccui.Widget.PLIST_TEXTURE);
		selectBg.setPosition(cc.p(this.getSize().width/2, this.getSize().height/2));
		this.selectLayout.addChild(selectBg, 0);
		
		var settingBg = ccui.ImageView.create("setting_bg_CN.png",ccui.Widget.PLIST_TEXTURE);
		settingBg.setPosition(cc.p(this.getSize().width/2, this.getSize().height/2));
		this.selectLayout.addChild(settingBg, 10);
		
		var soundBtn = BaseButton.createe("soundfx_off_CN.png", "soundfx_on_CN.png", "", ccui.Widget.PLIST_TEXTURE);
		soundBtn.name = "soundBtn";
		soundBtn.setPosition(cc.p(this.getSize().width/2-soundBtn.width/2-10, this.height-240));
		this.selectLayout.addChild(soundBtn, 10);
		
		var musicBg = BaseButton.createe("bgmusic_off_CN.png","bgmusic_on_CN.png","",ccui.Widget.PLIST_TEXTURE);
		musicBg.name = "musicBg";
		musicBg.setPosition(cc.p(this.width/2+musicBg.width/2+10, soundBtn.y));
		this.selectLayout.addChild(musicBg, 10);
	
		var resetGameBtn = BaseButton.createe("resetgame_normal_CN.png","resetgame_pressed_CN.png","",ccui.Widget.PLIST_TEXTURE);
		resetGameBtn.name = "resetGameBtn";
		resetGameBtn.setPosition(cc.p(this.width/2, 100));
		this.selectLayout.addChild(resetGameBtn, 10);
		
		soundBtn.addTouchEventListener(this.selectLayoutBtnFunc, this);
		musicBg.addTouchEventListener(this.selectLayoutBtnFunc, this);
		resetGameBtn.addTouchEventListener(this.selectLayoutBtnFunc, this);
	},
	// the button eventlistener for select layer
	selectLayoutBtnFunc:function(target, state)
	{
		if(state == ccui.Widget.TOUCH_ENDED)
		{
			switch (target.name) 
			{
				case "soundBtn":
				{
					target.isSelected?target.setSelected(false):target.setSelected(true);
					break;
				}
	
				case "musicBg":
				{
					target.isSelected?target.setSelected(false):target.setSelected(true);
					break;
				}
					
				case "resetGameBtn":
					break;
					
				default:
					break;
			}
		}
	},
	//conut data
	setCountData:function()
	{
		this.countLayout = ccui.Layout.create();
		this.countLayout.setSize(Default.windowSize());
		this.addChild(this.countLayout, 10);
		
		var dataBg = ccui.ImageView.create("statistics_bg.png",ccui.Widget.PLIST_TEXTURE);
		dataBg.setPosition(cc.p(this.width/2, this.height/2));
		this.countLayout.addChild(dataBg, 0);
		
		var dataInfo = ccui.ImageView.create("statistics_bg_CN.png", ccui.Widget.PLIST_TEXTURE);
		dataInfo.setPosition(cc.p(this.width/2, this.height/2));
		this.countLayout.addChild(dataInfo, 10);
		
		this.countLayout.scale = 0.01;
	},
	//create author
	setAuthor:function()
	{
		this.authorLayou = ccui.Layout.create();
		this.authorLayou.setSize(Default.windowSize());
		this.addChild(this.authorLayou, 10);
		
		var authorBg = ccui.ImageView.create("credits_bg.png",ccui.Widget.PLIST_TEXTURE);
		authorBg.setPosition(cc.p(this.width/2, this.height/2));
		this.authorLayou.addChild(authorBg, 0);
		
		this.authorLayou.scale = 0.01;
	},
	//go home
	gohomeMenu:function()
	{
		var gohomeBtn = BaseButton.createe("setting_home_normal.png", "setting_home_pressed.png", "", ccui.Widget.PLIST_TEXTURE);
		gohomeBtn.setPosition(cc.p(60, this.height-60));
		this.addChild(gohomeBtn, 20);
		gohomeBtn.addTouchEventListener(this.gohomeBtnFunc, this);
	},
	gohomeBtnFunc:function(target, state)
	{
		if(state == ccui.Widget.TOUCH_ENDED)
		{
			var lbms = LuoBoMainScene.createScene();
			cc.director.runScene(cc.TransitionSlideInT.create(changeSceneTime, lbms));
		}
	}
});

LuoBoSettingScene.createScene = function()
{
	var layout = new LuoBoSettingScene();
	var scene = new BaseScene();
	scene.addChild(layout);
	return scene;
};














