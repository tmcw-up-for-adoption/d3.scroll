## d3.scroll

A faux-scrollbar in d3.

```js
$('#foo').call(d3.scroll);
```

example style:

```css
#foo {
    overflow:auto;
    position:relative;
}
::-webkit-scrollbar {
    width:0;
    display:none;
}
.d3-scroll-track {
    position:absolute;
    top:0;
    right:0;
    width:10px;
    background:#eee;
}
.d3-scroll-button {
    position:absolute;
    width:10px;
    background:#777;
}
```
