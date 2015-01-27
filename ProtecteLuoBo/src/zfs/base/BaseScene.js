/*
 * @zfs  2015/1/4
 */
var BaseScene = cc.Scene.extend(
{
	ctor:function()
	{
		this._super();
		this.ignoreAnchorPointForPosition(false);
		this.setAnchorPoint(cc.p(0, 0));
		return true;
	},
	// enter scene
	onEnter:function()
	{
		this._super();
	},
	// onexit scene
	onExit:function()
	{
		this._super();
	}
});