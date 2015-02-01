LineMap
====

Make conversions between character offsets and line numbers.

Usage
----

```js
var LineMap = require('linemap');
var linemap = new LineMap(somestring);

// find out the character offset for the beginning of line 2
var offset = linemap.getOffsetForLine(2);

// find out what line number the character at offset 44 is on
var line = linemap.getLineForOffset(44);
```

License
----

MIT
