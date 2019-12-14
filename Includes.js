var CheckLoreLine=function(target,mlc) {
        var loreContent = target.getItemInHand().getItemMeta().getLore();
        var loreTextVal = mlc.getString("loretext");
        loreTextVal = loreTextVal.replace(/<&sp>/g, ' ');
        loreTextVal = loreTextVal.replace(/<target.name>/g, target.getName());
        if(loreContent === null || loreContent.size() <= mlc.getString("lorenum")) {
                return false;
        }
	else {
                var loreLine = loreContent.get(mlc.getString("lorenum"))
                var detectedLoreLine = '"' + loreLine + '"'
		if(detectedLoreLine === loreTextVal) {
			return true;
                }
                else {
                        return false;
             	}
        }
        return false;
}

var ReplaceLoreLine=function(data,target,mlc) {
	var metaContent = target.getItemInHand().getItemMeta()
        var loreContent = metaContent.getLore();
	if(loreContent.size() > mlc.getString("lorenum")) {
		loreReplace = mlc.getString("loretext");
		loreReplace = loreReplace.replace(/<&sp>/g, ' ');
		loreReplace = loreReplace.substring(1,loreReplace.length - 1);
		loreContent[mlc.getString("lorenum")] = loreReplace;
		Bukkit.getServer().broadcastMessage(loreContent);
		metaContent.setLore(loreContent);
		target.getItemInHand().setItemMeta(metaContent);
		return true;
	}
}
