/**
 * zfs@ the themes pages component 	  2015/05/05
 */
var LuoboThemesPage = ccui.Layout.extend(
{
	/**
	 * 
	 * @param data
	 * {"id":1001,"map":"ss_map01.png","locked":0,"tower":"ss_towers_01.png","level":1,"wave":"ss_waves_15.png","num":15,
	 * "isOver":0,"clearAll":0,"honor":0}
	 */
	ctor:function(data, that)
	{
		this._super();
		this.that = that;
		this.data = data;
		this.setSize(cc.size(Default.windowWidth(), 440));
		this.getPageInstance(data);
		if ( !data.locked )
		{
			this.addOverLevelHonor(data);
		}
	},
	getPageInstance:function(maps)
	{
		var map = ccui.ImageView.create(maps.map,ccui.Widget.PLIST_TEXTURE);
		this.isLocked = maps.locked;
		this.monsterNum = maps.num;
		this.wave = maps.wave;
		this.level = maps.level;
		map.setPosition(this.width/2, this.height/2);
		this.addChild(map, 5);

		var tower = ccui.ImageView.create(maps.tower,ccui.Widget.PLIST_TEXTURE);
		tower.setPosition(this.width/2, map.y - map.height/2-tower.height/2+10);
		this.addChild(tower, 5);

		if(this.isLocked)
		{
			var lockedIco = ccui.ImageView.create("ss_locked_icon.png", ccui.Widget.PLIST_TEXTURE);
			lockedIco.setPosition(map.x+130, lockedIco.height-30);
			lockedIco.addTouchEventListener(this.pageViewEventFunc, this);
			this.addChild(lockedIco, 5);
		}
		map.addTouchEventListener(this.pageViewEventFunc, this);
		tower.addTouchEventListener(this.pageViewEventFunc, this);
		this.addTouchEventListener(this.pageViewEventFunc, this);
	},
	pageViewEventFunc:function(target,state)
	{
		var lock = this.that.page.getPage((this.that.page.getCurPageIndex())).isLocked;
		this.that.jugementLevelState(!lock);
		switch (state) 
		{
		case ccui.Widget.TOUCH_BEGAN:
			cc.log("began")
			var lock = this.that.page.getPage((this.that.page.getCurPageIndex())).isLocked;
			this.that.jugementLevelState(!lock);
			this.that.waveNum.loadTexture(this.that.page.getPage((this.that.page.getCurPageIndex())).wave, ccui.Widget.PLIST_TEXTURE);
			break;

		case ccui.Widget.TOUCH_ENDED:
			var lock = this.that.page.getPage((this.that.page.getCurPageIndex()));
			if(lock.isLocked)
			{
				var theme01 = new LuoBoLockLayout("themes01");
				theme01.setPosition(this.that.width-theme01.width>>1,this.that.height-theme01.height>>1);
				this.that.addChild(theme01, 100);
			}
			else
			{
				
				this.that.gotoCurrentLevel(this.data);
			}
			break;

		case ccui.Widget.TOUCH_CANCELED:
			break;

		default:
			break;
		}

	},
	addOverLevelHonor:function(data)
	{
		var honor = ["gainhonor_1.png","gainhonor_2.png","gainhonor_3.png","gainhonor_4.png"];
		var honor_1 = null
		if ( data.honor > 0 )
		{
			honor_1 = cc.Sprite.createWithSpriteFrameName(honor[data.honor-1]);//荣誉
			honor_1.setPosition(this.width/2 + honor_1.width - 20, this.height/2 - honor_1.height/2);
			this.addChild(honor_1, 10);
		}
		if ( data.clearAll )
		{
			var clearHonor = cc.Sprite.createWithSpriteFrameName(honor[3]);//荣誉//清除全部道具
			clearHonor.setPosition(honor_1.x - clearHonor.width - 20, honor_1.y);
			this.addChild(clearHonor, 10);
		}
	}
});


















