var PlayerData = 
{
	weaponType:1,
	gold:1000
};
/**
 * according to level search bottle
 * @param lv:number
 * @returns
 */
function getBottleData(lv)
{
	for ( var i = 0;  i < RangeData.length; i++ )
	{
		if ( RangeData[i].type === lv )
		{
			return RangeData[i];
		}
	}
};