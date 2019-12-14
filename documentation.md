# Introduction
This is a list of all the available mechanics and conditions that are currently available. More may be gradually added. The following must be taken into consideration for their correct use:
- The character `&` must be replaced by `§` (for example, if the lore you wish to match is `&fExample`).
- It is important to define all the properties of a skill, as that will ensure that no errors occur.
- If specified, the text must be quoted. Not quoting it will likely result in unintended behaviour.

# Conditions
### CheckLoreLine
**Syntax:** `- jscondition{js="CheckLoreLine";lorenum=#;loretext="Content"}`

**Description:** This condition will check the lore line specified in `lorenum` (0 being the first line) and compare it with `loretext`. It will return true if both strings match.

# Skills
### ReplaceLoreLine
**Syntax:** `- jsmechanic{js="ReplaceLoreLine";lorenum=#;loretext="Content"}`

**Description:** This skill will replace the lore line specified in `lorenum` (0 being the first line) with the content of `loretext`. For this skill to work, said lore line must exist (for example, you can't replace the fourth line of lore of an item with two lines of lore).