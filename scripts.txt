Test
```js
var CheckLoreLineSkill=function(data,target,mlc) {
        var loreContent = target.getItemInHand().getItemMeta().getLore()
        if(loreContent.isEmpty()) {
		Bukkit.getServer().broadcastMessage("No lore was found");
                return false;
        }
	else {
                var loreLine = loreContent.get(mlc.getString("testnum"))
		if(loreLine === mlc.getString("testcheck")) {
			Bukkit.getServer().broadcastMessage("Lore was found");
			return true;
                }
                else {
			Bukkit.getServer().broadcastMessage("Jeepers");
                        return false;
             	}
        }
}
```
