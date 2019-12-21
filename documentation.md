# Introduction
This is a list of all the mechanics and conditions that are currently available. More may be gradually added. The following must be taken into consideration for their correct use:
- The character `&` must be replaced by `§` (for example, if the lore you wish to match is `&fExample`).
- It is important to define all the properties of a skill, as that will ensure that no errors occur.
- If specified, the text must be quoted. Not quoting it will likely result in unintended behaviour.
- All `#` are meant to be replaced by numbers. You mustn't include the `#`.
## Slot System
I've also added a slot system to allow these mechanics and conditions to apply to any inventory slot. Every time you see a condition or skill that uses `slot=#` you must apply a value, but you can choose from the following values:
- One of the pre-programmed values in text form (no quotation marks), which are **HAND**, **OFFHAND**, **HELMET**, **CHESTPLATE**, **LEGGINGS** and **BOOTS**.
- Any numerical value from 0 to 40 (others will likely return errors). To get the value of your slot, you can look [here](https://proxy.spigotmc.org/8d25a6d299b36fc40bfb9ffd9c2a21ea3ceb1128?url=http%3A%2F%2Fi.imgur.com%2FJDQnGk1.png)

# Conditions
### CheckLoreLine
**Syntax:** `- jscondition{js="CheckLoreLine";lorenum=#;loretext="Content";slot=#}`

**Description:** This condition will check the lore line specified in `lorenum` (0 being the first line) and compare it with `loretext`. It will return true if both strings match.

### CompareLoreDate
**Syntax:** `- jscondition{js="CompareLoreDate";threshold=#;slot=#}`

**Description:** This condition uses the first lore line of an item as a way to check the last time at which the condition was successful. It will then compare the lore time with the current time. If the time elapsed is equal or bigger than the `threshold` (specified in milliseconds), then the skill is successful and the current time is stored. This skill requires the item to already have a valid time in the first lore line. You can employ any time, but `Thu Jan 01 1970 01:00:00 GMT+0100 (CET)` is the best baseline (as it is equal to 0 milliseconds).

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

### GetCraftingInv
**Syntax:** `- jscondition{js="GetCraftingInv";slot=#;material=AIR;name="Name";amount=#}`

**Notes:** 
- `material`, `name` and `amount` are all optional, and you may include any combination of them or you may exclude them all (if you exclude them all, however, it'll always return true).
- `slot` does not have the standard slot syntax as it is the crafting inventory. You can pick any number between 0 to 5, 0 being the resulting item and 1 to 4 being the crafting slots from top to bottom and left to right.

**Description:** This condition checks the crafting inventory slot specified in `slot` for all the conditions provided: `material` check the [Spigot material](https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/Material.html), `name` checks the name of the item (including color codes) and `amount` checks the amount.

# Skills
### ReplaceLoreLine
**Syntax:** `- jsmechanic{js="ReplaceLoreLine";lorenum=#;loretext="Content";slot=#}`

**Description:** This skill will replace the lore line specified in `lorenum` (0 being the first line) with the content of `loretext`. For this skill to work, said lore line must exist (for example, you can't replace the fourth line of lore of an item with two lines of lore).

### SetItemColor
**Syntax:** `- jsmechanic{js="SetItemColor";color=000000;slot=#}`

**Description:** This skill will set the color of any dye-able item to the color specified in `color`. You must provide said color's hexadecimal value.

### SetCraftingInv
**Syntax:** `- jsmechanic{js="SetCraftingInv";material=AIR;amount=#;slot=#}`

**Notes:**
- `slot` does not have the standard slot syntax as it is the crafting inventory. You can pick any number between 0 to 5, 0 being the resulting item and 1 to 4 being the crafting slots from top to bottom and left to right. Number 0, however, will give very erratic behaviours so it is best to just give the resulting item through other methods.
- This function was causing an error message to pop up even if the skill was successful, so I silenced all errors for this skill. Beware of this.

**Description:** This skill will replace the contents of the crafting inventory slot specified in `slot` with the amount specified in `amount` of the item specified in `material`. `material` can be either the name of a MythicMobs item or a Spigot material.
