/*
 * @zfs protected luobo themes scene 2015/1/5
 */
var LuoBoThemesScene = ccui.Layout.extend(
{
	ctor:function()
	{
		this._super();
		this.zinit();
		this.setBothSideButton();
		this.setBottomPosition();
		this.updateBothSideButtonVisible();
	},
	zinit:function()
	{
		this.setSize(Default.windowSize());
		
		var background = ccui.ImageView.create("theme_bg.png", ccui.Widget.PLIST_TEXTURE);
		background.setPosition(this.width/2, this.height/2);
		this.addChild(background, 0);
		
		var title = ccui.ImageView.create("theme_bg_CN.png",ccui.Widget.PLIST_TEXTURE);
		title.setPosition(cc.p(this.width/2, this.height-title.height/2));
		this.addChild(title, 0);
		
		var homeBtn = BaseButton.createe("theme_home_normal.png", "theme_home_pressed.png", "", ccui.Widget.PLIST_TEXTURE);
		homeBtn.setPosition(homeBtn.width/2+5, this.height-homeBtn.height/2);
		this.addChild(homeBtn, 1);
		homeBtn.addTouchEventListener(this.homeBtnFunc, this);
		
		var helpBtn = BaseButton.createe("ss_help_normal.png", "ss_help_pressed.png", "", ccui.Widget.PLIST_TEXTURE);
		helpBtn.setPosition(this.width-helpBtn.width/2-5, this.height-helpBtn.height/2);
		this.addChild(helpBtn, 1);
		helpBtn.addTouchEventListener(this.helpBtnFunc, this);
		
		this.themePacks = [
		                   {name:"sky" ,texture:"theme_pack01.png" ,state:"bookmark_1-9.png" ,pa:"theme_pack01_CN.png"},
		                   {name:"jungle" ,texture:"theme_pack02.png" ,state:"theme_locked.png" ,pa:"theme_pack02_CN.png"},
		                   {name:"desert" ,texture:"theme_pack03.png" ,state:"theme_locked.png" ,pa:"theme_pack03_CN.png"},
		                   {name:"sky" ,texture:"theme_pack04.png" ,state:"theme_locked.png" ,pa:"theme_pack03_CN.png"},
		                   {name:"sky" ,texture:"theme_pack05.png" ,state:"theme_locked.png" ,pa:"theme_pack03_CN.png"},
		                   {name:"sky" ,texture:"theme_pack06.png" ,state:"theme_locked.png" ,pa:"theme_pack03_CN.png"}
		                   ];
		
		this.page = ccui.PageView.create();
		this.page.setTouchEnabled(true);
		this.page.setSize(cc.size(this.width, 530));
		this.page.setPosition(0, 30);
		this.addChild(this.page, 10);
		
		for(var i = 0; i < this.themePacks.length-3; i++)
		{
			var page = this.addPageChild(this.themePacks[i]);
			this.page.addPage(page);
		}
		this.page.addEventListenerPageView(this.pageViewEventFunc, this);
	},
	//pageview eventlistener
	pageViewEventFunc:function(target, state)
	{
		switch (state) 
		{
			case ccui.Widget.TOUCH_BEGAN:
				this.updateBothSideButtonVisible();
				break;
	
			case ccui.Widget.TOUCH_MOVED:
				this.leftBtn.setLocalZOrder(5);
				this.rightBtn.setLocalZOrder(5);
				break;
				
			case ccui.Widget.TOUCH_ENDED:
				this.selectPageScene(target.name);
				break;
				
			case ccui.Widget.TOUCH_CANCELED:
				this.leftBtn.setLocalZOrder(20);
				this.rightBtn.setLocalZOrder(20);
				break;
				
			default:
				break;
		}
	},
	//select book and enter current page level
	selectPageScene:function(namee)
	{
		switch (namee) 
		{
			case "sky":
				var theme01 = LuoboThemesScene01.createScene();
				cc.director.runScene(cc.TransitionFade.create(changeSceneTime, theme01));
				break;
	
			case "jungle":
				var jungleLock = new LuoBoLockLayout("jungle");
				this.addChild(jungleLock, 100);
				break;
				
			case "desert":
				var desertLock = new LuoBoLockLayout("desert");
				this.addChild(desertLock, 100);
				break;
				
			default:
				break;
		}
	},
	/*
	 * @param content:object
	 */
	addPageChild:function(content)
	{
		var layout = ccui.Layout.create();
		layout.setSize(cc.size(this.width, 530));
		
		var themPack = ccui.ImageView.create(content.texture,ccui.Widget.PLIST_TEXTURE);
		themPack.setPosition(layout.width/2,layout.height/2);
		layout.addChild(themPack, 0);
		
		var pageNumber = ccui.ImageView.create(content.state,ccui.Widget.PLIST_TEXTURE);
		content.state=="theme_locked.png"?
				pageNumber.setPosition(layout.width/2+273, 107):
					pageNumber.setPosition(layout.width/2+200, 45);
		layout.addChild(pageNumber, 1);
		
		var themeInfo = ccui.ImageView.create(content.pa,ccui.Widget.PLIST_TEXTURE);
		themeInfo.name = content.name;
		themeInfo.setPosition(layout.width/2,layout.height/2);
		layout.addChild(themeInfo, 1);

		themeInfo.addTouchEventListener(this.pageViewEventFunc, this);

		return layout;
	},
	//set left and right button
	setBothSideButton:function()
	{
		this.leftBtn = BaseButton.createe("theme_pointleft_normal.png", "theme_pointleft_pressed.png", "", ccui.Widget.PLIST_TEXTURE);
		this.leftBtn.name = "leftBtn";
		this.leftBtn.setPosition(this.leftBtn.width/2+20, this.height/2);
		this.addChild(this.leftBtn, 20);
		
		this.rightBtn = BaseButton.createe("theme_pointright_normal.png", "theme_pointright_pressed.png", "", ccui.Widget.PLIST_TEXTURE);
		this.rightBtn.name = "rightBtn";
		this.rightBtn.setPosition(this.width-this.rightBtn.width/2-20, this.height/2);
		this.addChild(this.rightBtn, 20);
		
		this.leftBtn.addTouchEventListener(this.bothButtonEventFunc, this);
		this.rightBtn.addTouchEventListener(this.bothButtonEventFunc, this);
	},
	bothButtonEventFunc:function(target, state)
	{
		if(state == ccui.Widget.TOUCH_ENDED)
		{
			switch (target.name) 
			{
				case "leftBtn":
					this.page.scrollToPage(this.page.getCurPageIndex()-1);
					break;
	
				case "rightBtn":
					this.page.scrollToPage(this.page.getCurPageIndex()+1);
					break;
					
				default:
					break;
			}
		}
	},
	//updata left and right button visible
	updateBothSideButtonVisible:function()
	{
		if(this.page.getCurPageIndex() === 0)
		{
			this.leftBtn.scale = 0.01;
			this.rightBtn.scale = 1;
		}
		else if(this.page.getCurPageIndex() === this.page.getPages().length-1)
		{
			this.rightBtn.scale = 0.01;
			this.leftBtn.scale = 1;
		}
		else
		{
			this.rightBtn.scale = 1;
			this.leftBtn.scale  = 1;
		}
		//update bottom position
		for(var i = 0; i < this.pageBottomArr.length; i++)
		{
			if(this.page.getCurPageIndex() === i)
			{
				this.pageBottomArr[i].selected.visible = true;
			}
			else
			{
				this.pageBottomArr[i].selected.visible = false;
			}
		}
	},
	setBottomPosition:function()
	{
		var pages = this.page.getPages().length;
		this.pageBottomArr =[];
		for(var i = 0; i < pages; i++)
		{
			this.instanceBottomPos(i, pages);
		}
	},
	instanceBottomPos:function(i,pages)
	{
		this.pageNomal = ccui.ImageView.create("theme_pos_normal.png",ccui.Widget.PLIST_TEXTURE);
		this.pageNomal.setPosition(this.width/2 -this.pageNomal.width*pages/2+this.pageNomal.width*i, 30);
		this.addChild(this.pageNomal, 10);
		this.pageActive = ccui.ImageView.create("theme_pos_active.png",ccui.Widget.PLIST_TEXTURE);
		this.pageActive.setPosition(this.width/2 -this.pageActive.width*pages/2+this.pageActive.width*i, 30);
		this.addChild(this.pageActive, 100);
		this.pageBottomArr.push({nomal:this.pageNomal,selected:this.pageActive});
	},
	homeBtnFunc:function(target, state)
	{
		if(state == ccui.Widget.TOUCH_ENDED)
		{
			var lbms = LuoBoMainScene.createScene();
			cc.director.runScene(cc.TransitionFade.create(changeSceneTime, lbms));
		}
	},
	helpBtnFunc:function(target,state)
	{
		if(state == ccui.Widget.TOUCH_ENDED)
		{
			var help = LuoBoHelpScene.createScene();
			cc.director.runScene(cc.TransitionFade.create(changeSceneTime, help));
		}
	}
});

LuoBoThemesScene.createScene = function()
{
	var theLayer = new LuoBoThemesScene();
	var scene = cc.Scene.create();
	scene.addChild(theLayer);
	return scene
};