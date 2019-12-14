# Introduction
This is a list of all the available mechanics and conditions that are currently available. More may be gradually added. The following must be taken into consideration for their correct use:
- The character `&` must be replaced by `§` (for example, if the lore you wish to match is `&fExample`).
- It is important to define all the properties of a skill, as that will ensure that no errors occur.
- If specified, the text must be quoted. Not quoting it will likely result in unintended behaviour.

# Conditions
### CheckLoreLine
**Syntax:** `- jscondition{js="CheckLoreLine";lorenum=#;loretext="Content"}`

**Description:** This condition will check the lore line specified in `lorenum` (0 being the first line) and compare it with `loretext`. It will return true if both strings match.

### CompareLoreDate
**Syntax:** `- jscondition{js="CompareLoreDate";threshold=#}`

**Description:** This condition uses the first lore line of an item as a way to check the last time at which the condition was successful. It will then compare the lore time with the current time. If the time elapsed is equal or bigger than the `threshold` (specified in milliseconds), then the skill is successful and the current time is stored. This skill requires the item to already have a valid time in the first lore line. You can employ any time, but `Thu Jan 02 1970 00:00:00 GMT+0100 (CET)` is the best baseline (as it is equal to 0 milliseconds).

# Skills
### ReplaceLoreLine
**Syntax:** `- jsmechanic{js="ReplaceLoreLine";lorenum=#;loretext="Content"}`

**Description:** This skill will replace the lore line specified in `lorenum` (0 being the first line) with the content of `loretext`. For this skill to work, said lore line must exist (for example, you can't replace the fourth line of lore of an item with two lines of lore).
