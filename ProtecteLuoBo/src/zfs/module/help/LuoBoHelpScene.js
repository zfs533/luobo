/*
 * @zfs luobo help scene 2015/1/4
 */
var LuoBoHelpScene = ccui.Layout.extend(
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
		cc.spriteFrameCache.addSpriteFrames("res/Themes/scene/help_1-hd.plist");
		cc.spriteFrameCache.addSpriteFrames("res/Themes/scene/help_2-hd.plist");
		cc.spriteFrameCache.addSpriteFrames("res/Themes/scene/help_3-hd.plist");
		this.setBackground();
		this.setTopMenu();
		this.setCurrentPage();
		this.setBottemPageIndex();
		this.setMonsterHelp();
		this.setHomeBtn();
		this.pageViewEvent(null, 0);
	},
	//change menu change page
	setCurrentPage:function()
	{
		this.page = ccui.PageView.create();
		this.page.setSize(cc.size(this.getSize().width, 490));
		this.page.setTouchEnabled(true);
		this.page.setPosition(cc.p(0, 70));
		this.page.addEventListenerPageView(this.pageViewEvent, this);
		this.addChild(this.page, 20);
		
		this.towerArr = [
		                {texture:"tower_01.png" ,discription:"tower_01_CN.png"},
		                {texture:"tower_02.png" ,discription:"tower_02_CN.png"},
		                {texture:"tower_03.png" ,discription:"tower_03_CN.png"},
		                {texture:"tower_04.png" ,discription:"tower_04_CN.png"},
		                {texture:"tower_05.png" ,discription:"tower_05_CN.png"},
		                {texture:"tower_06.png" ,discription:"tower_06_CN.png"},
		                {texture:"tower_07.png" ,discription:"tower_07_CN.png"},
		                {texture:"tower_08.png" ,discription:"tower_08_CN.png"},
		                {texture:"tower_09.png" ,discription:"tower_09_CN.png"},
		                {texture:"tower_10.png" ,discription:"tower_10_CN.png"},
		                {texture:"tower_11.png" ,discription:"tower_11_CN.png"},
		                {texture:"tower_12.png" ,discription:"tower_12_CN.png"},
		                {texture:"tower_13.png" ,discription:"tower_13_CN.png"}
		                ];
		
		this.helpTips = [
		                {texture:"tips_1.png" ,discription:"tips_text_1_CN.png"},
		                {texture:"tips_2.png" ,discription:"tips_text_2_CN.png"},
		                {texture:"tips_3.png" ,discription:"tips_text_3_CN.png"},
		                {texture:"tips_4.png" ,discription:"tips_text_4_CN.png"}
		                ];
		
		for(var i = 0; i < this.helpTips.length; i++)
		{
			var layout = this.pageChild(this.helpTips[i], cc.p(this.getSize().width/2, 60));
			this.page.addPage(layout);
		}
	},
	pageChild:function(contents, point)
	{
		{
			var layout = ccui.Layout.create();
			layout.setSize(cc.size(this.getSize().width, 490));
			point = point||cc.p(layout.width/2, layout.height/2);
			var img = ccui.ImageView.create(contents.texture,ccui.Widget.PLIST_TEXTURE);
			img.setPosition(cc.p(layout.width/2, layout.height/2));
			layout.addChild(img, 0);
		}
		
		{
			if(contents.discription)
			{
				var imgd = ccui.ImageView.create(contents.discription,ccui.Widget.PLIST_TEXTURE);
				imgd.setPosition(cc.p(point.x, point.y));
				layout.addChild(imgd,1);
			}
		}
		return layout;
	},
	//set monster help view
	setMonsterHelp:function()
	{
		this.monsterHelpLayout = ccui.Layout.create();
		this.monsterHelpLayout.setSize(Default.windowSize());
		this.addChild(this.monsterHelpLayout, 10);
		var helpImageBg = ccui.ImageView.create("help_monster.png", ccui.Widget.PLIST_TEXTURE);
		helpImageBg.setPosition(cc.p(this.getSize().width/2,this.getSize().height/2 - 50));
		this.monsterHelpLayout.addChild(helpImageBg, 10);
		
		var monsterInfo = ccui.ImageView.create("help_monster_CN.png", ccui.Widget.PLIST_TEXTURE);
		monsterInfo.setPosition(helpImageBg.x,helpImageBg.y);
		this.monsterHelpLayout.addChild(monsterInfo, 10);
		
		this.monsterHelpLayout.scale = 0.01;
	},
	setBottemPageIndex:function()
	{
		this.bottomLayout = ccui.Layout.create();
		this.bottomLayout.setSize(Default.windowSize());
		this.addChild(this.bottomLayout, 10);
		var bottom = ccui.ImageView.create("bottom.png", ccui.Widget.PLIST_TEXTURE);
		bottom.setPosition(this.getSize().width/2, 40);
		this.bottomLayout.addChild(bottom, 10);
		this.pagTxteNum = ccui.TextAtlas.create("2024", "res/Themes/scene/bottom_num_hd.png", 16, 30, "/");
		this.pageNumTxt.setPosition(cc.p(this.getSize().width/2, 40));
		this.bottomLayout.addChild(this.pageNumTxt, 10);
	},
	pageViewEvent: function (target, type) 
	{
		switch (type) 
		{
			case ccui.PageView.EVENT_TURNING://0
				var pageView = this.page;
				var index = pageView.getCurPageIndex()+2;
				var allPage = pageView.getPages().length +1;
				allPage = allPage>9?("2"+(Number(allPage.toString().substr(1,1))+1)):allPage;
				if(index >9)
				{
					this.pageNumTxt.setString("2"+(Number(index.toString().substr(1,1))+1)+"0"+allPage);
				}
				else
				{
					this.pageNumTxt.setString(index+"0"+allPage);
				}	
				break;
			default:
				break;
		}
	},
	// set top menu button
	setTopMenu:function()
	{
		var helpBtn = BaseButton.createe("tips_normal_CN.png","tips_selected_CN.png","",ccui.Widget.PLIST_TEXTURE);
		helpBtn.name = "helpBtn";
		helpBtn.setPosition(cc.p(this.getSize().width/2 - helpBtn.width, this.getSize().height-helpBtn.height/2-15));
		this.addChild(helpBtn, 20);
		helpBtn.setSelected(true);
		this.tempBtn = helpBtn;
		
		var monsterBtn = BaseButton.createe("monster_normal_CN.png","monster_selected_CN.png","",ccui.Widget.PLIST_TEXTURE);
		monsterBtn.name = "monsterBtn";
		monsterBtn.setPosition(cc.p(this.getSize().width/2, this.getSize().height-monsterBtn.height/2 - 15));
		this.addChild(monsterBtn, 20);
	
		var towerBtn = BaseButton.createe("tower_normal_CN.png","tower_selected_CN.png","",ccui.Widget.PLIST_TEXTURE);
		towerBtn.name = "towerBtn";
		towerBtn.setPosition(cc.p(this.getSize().width/2 + towerBtn.width, this.getSize().height-towerBtn.height/2 - 15));
		this.addChild(towerBtn, 20);
		
		helpBtn.addTouchEventListener(this.helpTopMenuFunc, this);
		monsterBtn.addTouchEventListener(this.helpTopMenuFunc, this);
		towerBtn.addTouchEventListener(this.helpTopMenuFunc, this);
	},
	//top menu logic
	helpTopMenuFunc:function(target, state)
	{
		if(state == ccui.Widget.TOUCH_ENDED)
		{
			this.tempBtn.setSelected(false);
			this.tempBtn = target;
			this.page.removeAllPages();
			switch (target.name) 
			{
				case "helpBtn":
					target.setSelected(true);
					
					{
						for(var i = 0; i < this.helpTips.length; i++)
						{
							var layout = this.pageChild(this.helpTips[i], cc.p(this.getSize().width/2, 60));
							this.page.addPage(layout);
						}
						this.bottomLayout.scale = 1;
						this.monsterHelpLayout.scale = 0.01;
						this.pageViewEvent(null, 0);
					}

					break;
	
				case "monsterBtn":
					target.setSelected(true);
					this.monsterHelpLayout.scale = 1;
					this.bottomLayout.scale = 0.01;
					break;
					
				case "towerBtn":
					target.setSelected(true);
					
					{
						for(var i = 0; i < this.towerArr.length; i++)
						{
							var layout = this.pageChild(this.towerArr[i]);
							this.page.addPage(layout);
						}
						this.bottomLayout.scale = 1;
						this.monsterHelpLayout.scale = 0.01;
						this.pageViewEvent(null, 0);
					}

					break;
					
				default:
					break;
			}
		}
	},
	// go home
	setHomeBtn:function()
	{
		var homeBtn = BaseButton.createe("help_home_normal.png", "help_home_pressed.png", "", ccui.Widget.PLIST_TEXTURE);
		homeBtn.setPosition(cc.p(50, this.getSize().height - 50));
		this.addChild(homeBtn, 20);
		homeBtn.addTouchEventListener(this.homeBtnFunc, this);
	},
	homeBtnFunc:function(target, state)
	{
		if(state == ccui.Widget.TOUCH_ENDED)
		{
			var lbms = LuoBoMainScene.createScene();
			cc.director.runScene(cc.TransitionSlideInB.create(changeSceneTime, lbms));
		}
	},
	// set scene background
	setBackground:function()
	{
		var background = cc.Sprite.createWithSpriteFrameName("help_bg.png");
		background.setPosition(cc.p(this.getSize().width/2, this.getSize().height/2));
		this.addChild(background, 0);
	}
});

LuoBoHelpScene.createScene = function()
{
	var theLayer = new LuoBoHelpScene();
	var scene = cc.Scene.create();
	scene.addChild(theLayer);
	return scene
};