/**
 * zfs@数据查询库		2015/05/06
 */
/**
 * 通过Id查找主题1中的关卡数据
 * @param id
 */
function checkThemes01DataById(id)
{
	var theme = Themes01LevelData;
	for ( var i = 0; i < theme.length; i++ )
	{
		if ( id === theme[i].id )
		{
			return theme[i];
		}
	}
	AlertView.show("没找到"+id+"对应的数据信息");
	return theme[i];
};



