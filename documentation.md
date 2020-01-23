# Introduction
This is a list of all the mechanics and conditions that are currently available. More may be gradually added. The following must be taken into consideration for their correct use:
- The character `&` must be replaced by `§` (for example, if the lore you wish to match is `&fExample`).
- It is important to define all the non-optional properties of a skill, as that will ensure that no errors occur.
- If specified, the text must be quoted. Not quoting it will likely result in unintended behaviour.
- All `#` are meant to be replaced by numbers. You mustn't include the `#`.
## Slot System
I've also added a slot system to allow these mechanics and conditions to apply to any inventory slot. Every time you see a condition or skill that uses `slot=#` you must apply a value, but you can choose from the following values:
- One of the pre-programmed values in text form (no quotation marks), which are **HAND**, **OFFHAND**, **HELMET**, **CHESTPLATE**, **LEGGINGS** and **BOOTS**.
- Any numerical value from 0 to 40 (others will likely return errors). To get the value of your slot, you can look [here](https://proxy.spigotmc.org/8d25a6d299b36fc40bfb9ffd9c2a21ea3ceb1128?url=http%3A%2F%2Fi.imgur.com%2FJDQnGk1.png)

# Conditions
### CheckLoreLine
**Syntax:** `- jscondition{js="CheckLoreLine";lorenum=#;loretext="Content";slot=#}`

**Notes:** 
- You need to include either `loretext` (regular text) or `loretextM` (metadata key). It is not at all recommended to input both at the same time.

**Description:** This condition will check the lore line specified in `lorenum` (0 being the first line) and compare it with `loretext` (or the metadata value within `loretextM`) . It will return true if both strings match.

### CompareLoreDate
**Syntax:** `- jscondition{js="CompareLoreDate";threshold=#;slot=#}`

**Description:** This condition uses the first lore line of an item as a way to check the last time at which the condition was successful. It will then compare the lore time with the current time. If the time elapsed is equal or bigger than the `threshold` (specified in milliseconds), then the skill is successful and the current time is stored. This skill requires the item to already have a valid time in the first lore line. You can employ any time, but `Thu Jan 01 1970 01:00:00 GMT+0100 (CET)` is the best baseline (as it is equal to 0 milliseconds).

### CheckLoreLength
**Syntax:** `- jscondition{js="CheckLoreLength";checktype=>;checkvalue=#;slot=#}`

**Description:** This condition checks the amount of lore lines of the item found in `slot` and compares it to `checkvalue`. This check depends on the chosen `checktype`:
- `>` will check if the amount of lore lines is bigger than `checkvalue`.
- `=` will check if the amount of lore lines matches the `checkvalue`.
- `<` will check if the amount of lore lines is smaller than `checkvalue`.

### BasicAirCondition
**Syntax:** `- jscondition{js="BasicAirCondition";checktype=>;checkvalue=#}`

**Description:** This condition checks the available air and compares it to `checkvalue`. This check depends on the chosen `checktype`:
- `>` will check if your current air value is bigger than `checkvalue`.
- `=` will check if your current air value matches the `checkvalue`.
- `<` will check if your current air value is smaller than `checkvalue`.

The default air value (when not submerged underwater) is 300, and when it goes below 0 you start to drown.

### BasicHungerCondition
**Syntax:** `- jscondition{js="BasicHungerCondition";checktype=>;checkvalue=#}`

**Description:** This condition checks the hunger level and compares it to `checkvalue`. This check depends on the chosen `checktype`:
- `>` will check if your current hunger value is bigger than `checkvalue`.
- `=` will check if your current hunger value matches the `checkvalue`.
- `<` will check if your current hunger value is smaller than `checkvalue`.

The default hunger value is 20.

### BasicXPCondition
**Syntax:** `- jscondition{js="BasicXPCondition";checktype=>;checkvalue=#}`

**Description:** This condition checks the amount of XP levels and compares it to `checkvalue`. This check depends on the chosen `checktype`:
- `>` will check if your current XP level value is bigger than `checkvalue`.
- `=` will check if your current XP level value matches the `checkvalue`.
- `<` will check if your current XP level value is smaller than `checkvalue`.

### GetCraftingInv
**Syntax:** `- jscondition{js="GetCraftingInv";slot=#;material=AIR;name="Name";amount=#}`

**Notes:** 
- `material`, `name` and `amount` are all optional, and you may include any combination of them or you may exclude them all (if you exclude them all, however, it'll always return true).
- `slot` does not have the standard slot syntax as it is the crafting inventory. You can pick any number between 0 to 4, 0 being the resulting item and 1 to 4 being the crafting slots from top to bottom and left to right.

**Description:** This condition checks the crafting inventory slot specified in `slot` for all the conditions provided: `material` check the [Spigot material](https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/Material.html), `name` checks the name of the item (including color codes) and `amount` checks the amount.

### EntityNearNamed
**Syntax:** `- jscondition{js="EntityNearNamed";radius=#;input=Name;inputM=key;type=ZOMBIE}`

**Notes:**
- `type` is optional.
- You need to include either `input` (regular name) or `inputM` (metadata key) for the skill to work. It is not at all recommended to input both at the same time.

**Description:** This condition checks in a radius of `radius` for the presence of at least one entity named `input` (or one whose name matches the metadata value of `inputM`). If provided, it will also check if its type matches the Spigot entity type in `type`.

### CompareEntityMetas
**Syntax:** `- jscondition{js="CompareEntityMetas";key1=Key1;key2=Key2}`

**Description:** This condition compares the values stored in two entity metas (provided in `key1` and `key2`). It will return true if both values match.

### CheckItemNear
**Syntax:** `- jscondition{js="CheckItemNear";radius=#;material=OAK_PLANKS;amount=#}`

**Description:** This condition checks each dropped item in a radius of `radius` and returns true if it finds an item whose amount is `amount` and whose material is `material`. If the provided material is a [Spigot material](https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/Material.html), it'll return true even if the item has additional attributes (like name or lore). If the provided material is an MM material, it requires an exact match.

# Skills
### ReplaceLoreLine
**Syntax:** `- jsmechanic{js="ReplaceLoreLine";lorenum=#;loretext="Content";slot=#}`

**Notes:**
- You need to include either `loretext` (regular text) or `loretextM` (metadata key). It is not at all recommended to input both at the same time.

**Description:** This skill will replace the lore line specified in `lorenum` (0 being the first line) with the content of `loretext` (or the metadata value within `loretextM`). For this skill to work, said lore line must exist (for example, you can't replace the fourth line of lore of an item with two lines of lore).

### AppendLoreLine
**Syntax:** `- jsmechanic{js="AppendLoreLine";lorenum=#;loretext="Content";slot=#}`

**Notes:**
- You need to include either `loretext` (regular text) or `loretextM` (metadata key). It is not at all recommended to input both at the same time.

**Description:** This skill will add the text specified in `loretext` (or the metadata value within `loretextM`) to the lore line specified in `lorenum` (0 being the first line). For this skill to work, said lore line must exist (for example, you can't append the fourth line of lore of an item with two lines of lore).

### SetItemColor
**Syntax:** `- jsmechanic{js="SetItemColor";color=000000;slot=#}`

**Description:** This skill will set the color of any dye-able item to the color specified in `color`. You must provide said color's hexadecimal value.

### SetCraftingInv
**Syntax:** `- jsmechanic{js="SetCraftingInv";material=AIR;amount=#;slot=#}`

**Notes:**
- `slot` does not have the standard slot syntax as it is the crafting inventory. You can pick any number between 0 to 4, 0 being the resulting item and 1 to 4 being the crafting slots from top to bottom and left to right. Number 0, however, will give very erratic behaviours so it is best to just give the resulting item through other methods.
- This function was causing an error message to pop up even if the skill was successful, so I silenced all errors for this skill. Beware of this.

**Description:** This skill will replace the contents of the crafting inventory slot specified in `slot` with the amount specified in `amount` of the item specified in `material`. `material` can be either the name of a MythicMobs item or a Spigot material.

### MetaToVariable
**Syntax:** `- jsmechanic{js="MetaToVariable";key=Key;varname=VarName}`

**Description:** This skill will take the value attached to `key` and declare it as a variable named `varname`. You can later retrieve this value for its use in MM/MME skills and conditions as the placeholder `<skill.var.varname>` (where `varname` is the name provided for the variable).

### TransmuteItem
**Syntax:** `- jsmechanic{js="TransmuteItem";base=OAK_PLANKS;result=SPRUCE_PLANKS;amount=#}`

**Notes:**
- Under normal conditions, an `amount` value greater than the maximum stack amount of the target item will ensure the mechanic never works (usually this number is 64)

**Description:** This skill will remove `amount` items with the [Spigot](https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/Material.html) or MM material specified in `base` from the inventory of the targeted entity and give them `amount` items of `result`. It will not give the items unless it is able to find enough items of the `base` material.

### DeleteItemNear
**Syntax:** `- jsmechanic{js="DeleteItemNear";radius=#;material=OAK_PLANKS;amount=#}`

**Description:** This condition checks each dropped item in a radius of `radius` and deletes the first item whose amount is `amount` and whose material is `material`. If the provided material is a [Spigot material](https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/Material.html), it'll return true even if the item has additional attributes (like name or lore). If the provided material is an MM material, it requires an exact match.

# Hybrid Mechanics
Hydrid Mechanics (or Metadata Mechanics) are a new pseudotype of mechanic I've added: Depending on how you define them, you can use them to retrieve information for either a condition or a skill.
Both conditions and skills flow from top to bottom, which means you can use their value in any of the conditions and skills listed above that support it. For those that support it, simply add `M` behind the specified field (for example, `value` becomes `valueM`). You can declare both variants at the same time but it is not at all recommended.

### SetEntityMetadata
**Syntax:**
- `- jsmechanic{js="SetEntityMetadataS";value="Value";key=Key}`
- `- jscondition{js="SetEntityMetadataC";value="Value";key=Key}`

**Description:** This mechanic stores the value defined in `value` adressed to the value defined in `key`. You can later retrieve it using the same `key`.

### RetrieveEntityMetadata
**Syntax:**
- `- jsmechanic{js="RetrieveEntityMetadataS";key=Key}`
- `- jscondition{js="RetrieveEntityMetadataC";key=Key}`

**Description:** This mechanic broadcasts the value stored in `key`. Note that this condition was made for testing purposes, yet it is left here as a tool to assess the value stored within `key`.

### RemoveLoreLineString
**Syntax:**
- `- jsmechanic{js="RemoveLoreLineStringS";lorenum=#;loretext="Content";key=Key;slot=#}`
- `- jscondition{js="RemoveLoreLineStringC";lorenum=#;loretext="Content";key=Key;slot=#}`

**Description:** This mechanic takes the lore line specified in `lorenum` (0 being the first line) and removes all instances of `loretext` within it. The result is then stored attached to `key`. Keep in mind that color codes will remain if you don't specify them.

### RetrieveAsMeta
**Syntax:**
- `- jsmechanic{js="RetrieveAsMetaS";retrieve=name;key=Key}`
- `- jscondition{js="RetrieveAsMetaC";retrieve=name;key=Key}`

**Description:** This mechanic retrieves a specific value and stores it in `key`. That value depends on the chosen `retrieve`:
- `name` returns the name of the target.
- `type` returns the Spigot type of the target.
- `oxygen` returns the oxygen level of the target.
- `hunger` returns the hunger value of the target.
- `date` returns the server date.
