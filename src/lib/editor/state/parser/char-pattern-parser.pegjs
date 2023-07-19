Pattern
  = Items

Items
  = item:Item items:(","? Items)* {
    return [item, ...(items[0]?.[1] ?? [])]
   }

Item
  = range:Range { return range }
  / single:Single { return single }

Single
  = value:Char { return singleItem(value) }

Range "Range"
  = start:Char _ "-" _ end:Char {
      if (start > end) {
        throw new PeggySyntaxError("Start must be less than end", [], null, location())
      }
      return rangeItem(start, end)
    }

Char "char"
  = _ [^-] _ { return text().trim() }


_ "whitespace"
  = [ \t\n\r]*