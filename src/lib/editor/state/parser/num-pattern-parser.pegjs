Pattern
  = Items

Items
  = item:Item items:("," Items)* {
    return [item, ...(items[0]?.[1] ?? [])]
   }

Item
  = range:Range { return range }
  / single:Single { return single }

Single
  = value:Num { return singleItem(value) }

Range "Range"
  = start:Num _ "-" _ end:Num {
      if (start > end) {
        throw new PeggySyntaxError("Start must be less than end", [], null, location())
      }
      return rangeItem(start, end)
    }

Num "number"
  = _ [0-9]+ _ { return parseInt(text().trim()) }

_ "whitespace"
  = [ \t\n\r]*