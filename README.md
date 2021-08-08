# WikiPlinker

Small JS library to make it easy to link words/phrases in your web pages to wikipedia articles.

This is made very simple through the use of custom "data-" attributes in <a> tags.

## data-title

Specify the exact title of the wikipedia page you wish to be linked to:

```
<a data-wp-title="Paris">Paris</a>
```

Clicking the link will open the wikipedia page for paris in a new window.

Mousing over the link will show a short passage from wikipedia summarising the article/word.

## data-wp-search

If you don't know the exact title of the page you want to link to, use the data-wp-search attribute.

```
<a data-wp-search="Paris">Paris</a>
```

This will return and display the top 5 results in a tool tip for the user when clicked. They can then choose which page they wish to view.

e.g. for the above, "Paris", "Paris Hilton", "Paris Saint-Germain F.C.", "Paris Agreement" and "Paris Commune".


## data-wp-title

Similar to data-wp-search, but acts like Googles "I'm feeling lucky" button - returns the first result from the search.

```
<a data-wp-lucky="Paris">Paris</a>
```

Clicking the link will open the wikipedia page for paris in a new window.

Mousing over the link will show a short passage from wikipedia summarising the article/word.


GNU GPLv3.0