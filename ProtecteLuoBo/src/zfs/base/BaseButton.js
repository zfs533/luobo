/*
 * @zfs  2015/1/4
 */
var BaseButton = ccui.Button.extend(
{
	ctor:function(normal, selected, disabled, type)
	{
		this._super();
		this.normal = normal;
		this.selected = selected;
		this.disabled = disabled;
		this.type = type;
		this.isSelected = false;
		this.loadTextures(normal, selected, disabled, type);
	},
	// set selected state
	setSelected:function(booll)
	{
		if(booll)
		{
			this.isSelected = booll;
			this.loadTextures(this.selected, this.selected, this.disabled, this.type);
		}
		else
		{
			this.isSelected = booll;
			this.loadTextures(this.normal, this.selected, this.disabled, this.type);
		}
	},
	onEnter:function()
	{
		this._super();
	},
	onExit:function()
	{
		this._super();
	}
});
// create button
BaseButton.createe = function(normal, selected, disabled, type)
{
	var btn = new BaseButton(normal, selected, disabled, type);
	return btn;
};


















