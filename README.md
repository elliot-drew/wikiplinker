# WikiPlinker

#### [Live examples here](https://elliot-drew.github.io/wikiplinker/)

### About

WikiPlinker uses two custom `data-` attributes to connect any html element you want on your site to
Wikipedia.

### Getting Started

You need to download both wikiplinker.js and wikiplinker.css. . Include wikiplinker.css.  in your `<head>` and
wikiplinker.js at the bottom of your `<body>` tags so it loads after all your other content.

`data-wp-type` defines the method by which WikiPlinker interacts with the Wikipedia API, and `data-wp-term`
can be the title of the Wikipedia page or the search term you want to connect to the element.

Just add the `wp-link` class to the element, and the two data attributes above. I'd recommend a `<span>` element
for best results in text.

If your page is static, thats all you need to do! However, if you are going to dynamically add or remove wp-link elements
to/from the DOM you will need to call the `getLinks()` method of `wikiPlinker` whenever there is a change to ensure the links are created:

```

wikiPlinker.getLinks();

```

***

### Usage

To get information for a specific page, use `data-wp-type="title"`.

```

<span class="wp-link" data-wp-type="title" data-wp-term="Paris">Paris</span>

```



To fetch only the top result for the search term defined in data-wp-term, use `data-wp-type="lucky"`.

```

<span class="wp-link" data-wp-type="lucky" data-wp-term="Paris">Paris</span>

```

To fetch the top 5 results for the search term defined in data-wp-term and display them in
a tabular format, use `data-wp-type="search"`.

```

<span class="wp-link" data-wp-type="search" data-wp-term="Paris">Paris</span>

```

***

### Styling

All CSS styles can be found in wikiplinker.css. Should be fairly self explanatory.



GNU GPLv3.0