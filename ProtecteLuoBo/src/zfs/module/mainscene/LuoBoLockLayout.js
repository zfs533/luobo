/*
 * @zfs luobo modules locked popup layout 2015/1/4
 */
var LuoBoLockLayout = ccui.Layout.extend
({
	/*
	 * @param popupType:string 
	 */
	ctor:function(popupType)
	{
		this.popupType = popupType;
		this._super();
		this.zinit();
		this.handleCurrentPopup();
	},
	zinit:function()
	{
		cc.spriteFrameCache.addSpriteFrames("res/Themes/scene/popuplock-hd.plist");
		cc.spriteFrameCache.addSpriteFrames("res/Themes/scene/thempopuplock-hd.plist");
		this.setSize(Default.windowSize());
		this.addTouchEventListener(this.onTouchFunc, this);
		
		var lockBg = ccui.ImageView.create("popup_bg.png",ccui.Widget.PLIST_TEXTURE);
		lockBg.setPosition(cc.p(this.width/2, this.height/2));
		this.addChild(lockBg, 0);
		
		var knowBtn = BaseButton.createe("popup_btnbg_normal.png", "popup_btnbg_pressed.png", "",	ccui.Widget.PLIST_TEXTURE);
		knowBtn.setPosition(cc.p(this.width/2+30,this.height/2-70));
		this.addChild(knowBtn, 10);
		knowBtn.addTouchEventListener(this.onTouchFunc1, this);
		
		var knowTxt = ccui.ImageView.create("popup_btnbg_CN.png", ccui.Widget.PLIST_TEXTURE);
		knowTxt.setPosition(knowBtn.x, knowBtn.y);
		this.addChild(knowTxt, 10);
		knowTxt.addTouchEventListener(this.onTouchFunc1, this);
	},
	//popup current info
	handleCurrentPopup:function()
	{
		switch (this.popupType) 
		{
			case "monsterHome":
			{
				var monsterHomeInfo = ccui.ImageView.create("nest_locked_CN.png", ccui.Widget.PLIST_TEXTURE);
				monsterHomeInfo.setPosition(cc.p(this.width/2+110, this.height/2+50));
				this.addChild(monsterHomeInfo, 0);
				break;
			}
	
			case "boss":
			{
				var bossInfo = ccui.ImageView.create("boss_locked_CN.png", ccui.Widget.PLIST_TEXTURE);
				bossInfo.setPosition(cc.p(this.width/2+110, this.height/2+50));
				this.addChild(bossInfo, 0);
				break;
			}
			case "jungle":
			{
				var jungle = ccui.ImageView.create("locked_text_theme2.png", ccui.Widget.PLIST_TEXTURE);
				jungle.setPosition(cc.p(this.width/2+110, this.height/2+50));
				this.addChild(jungle, 0);
				break;
			}
			case "desert":
			{
				var desert = ccui.ImageView.create("locked_text_theme3.png", ccui.Widget.PLIST_TEXTURE);
				desert.setPosition(cc.p(this.width/2+110, this.height/2+50));
				this.addChild(desert, 0);
				break; 
			}
			case "themes01":
			{
				var themes01 = ccui.ImageView.create("stagelocked_text2.png", ccui.Widget.PLIST_TEXTURE);
				themes01.setPosition(cc.p(this.width/2, this.height/2));
				this.addChild(themes01, 0);
				break; 
			}
			default:
				break;
		}
	},
	onTouchFunc:function(target,state)
	{
		if(state == ccui.Widget.TOUCH_BEGAN)
		{
			this.removeFromParent();
		}
	},
	onTouchFunc1:function(target,state)
	{
		if(state == ccui.Widget.TOUCH_ENDED)
		{
			this.removeFromParent();
		}
	}
});



