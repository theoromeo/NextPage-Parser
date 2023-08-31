# <img src="./icon.png" width="120"> <br>Next Page Protocol

The **Next Page Protocol** (NPP) enables web pages to have a richer and more dynamic navigation experience, allowing them to communicate relevant information based on the page's context.

Similar to Open Graph, which allows a webpage to behave like an object with static information, NPP adds the ability for web pages to share information relative to each other.

Using a client application that implements NPP, such as `mously.js` for the web, enables webpages to use NP Features.

## Basic Meta Tags
To make a webpage Next Page compatible, at a minimum, you will need to add some basic meta tags.

- `np-title` - Title for the view
- `np-description` - Description for the view<br>

By default, this will invoke a [base view](#views) to the client, the simplest [view type](#view-types). The properties defined in the head of the document, including the `"<link rel="icon" ... >"`, will act as fallback values to more specific [nodes](#nodes).

If you want to display an icon other than the default favicon, use the optional: <br>
[np-icon](#informational-nodes) property.

## Views
NPP uses `views` as the way to display information to a client.

> ❕**NOTE:** <br>
How views are implemented depends on the client you use.

### View Types
Views are elements that display information to a client in a certain layout.

- basic - Contains a title, description, and icon.
- article - Contains a `basic view` + 1 to 3 paragraphs.
- image - Contains a `basic view` + 1 image.
- image.grid - Contains a `basic view` + 2 to 6 images.

#### Properties defined in head
NP attributes defined in the head follow the structure `name="np-{property}" content="{value}"`

Example for defining a global/fallback `title` in head
```html
<meta name="np-title" content="Title of this page">
```

#### Properties defined in body
NP attributes defined in the body follow the structure `np-{property}={value}`

Example for defining a `title` in body
```html
<div np-for="creator"
     np-title="Title of this section">
    ...
</div>
```
An element in the body that declares an NP attribute is called a [node](#nodes). An element that declares an np attribute without the `np-for` attribute is an invalid node and will need the `np-for` attribute to make it valid. We'll cover this in the next section.

## Nodes
Nodes are elements defined by the `np-for` attribute and act as a type of `key` or `response` to a client request.

#### About the np-for attribute
>Values for the `np-for` lookup are case-insensitive.

>`np-for` values can only contain `1 key`, and spaces are not allowed.

### Defining a few Nodes
Let's imagine we are on a page of an artist encyclopedia-type website that contains information about John Mayer (let's call it `Page:A`).

On the page, there is a section on the different guitar brands he has used and some information relative to that brand and John Mayer.

We define the nodes using `np-for` and its `view`.

```html
<main>
    <h1>Guitar brands used by John Mayer</h1>

    <article 
    np-for="fender"
    np-view="image.grid">
        <img src="./img/jm_1.jpg" alt="jm_1">
        <img src="./img/jm_2.jpg" alt="jm_2">
        <img src="./img/jm_3.jpg" alt="jm_3">
    </article>

    <article 
    np-for="Gibson"
    np-view="basic">

    ...
    </article>

    <article 
    np-for="PSG"
    np-view="article">

    ...
    </article>
</main>
```
#### Client Requests
Now let's imagine we are on the page of another website that sells Fender guitars (let's call it `Page:B`), and it references the `fender` key on `Page:A`. 

Without the user needing to click on a different website to get information, a `grid view` will display on the current page with an image grid of guitars used by John Mayer.

Here is the list of tags that will be retrieved client-side:
Information from the head.

```html
<meta name="np-description" ...>
<meta name="np-title" ...>
<link rel="icon" ... >
```

Information from the node

```html
<article np-view="image.grid" .../>
3[img]
```

## View Queries
View queries are the way [views](#views) look for their data in a node.

By default, views will look at the children of their element to find their data.

### Default view queries
- article - will query for `"Element > p"` and retrieve the first 300 characters.

- image - will query for `"Element > img"` and retrieve the first instance.

- image.grid - will query for `"Element > img"` and retrieve the first 6 instances. if only one image is found, the `image.grid view` will invoke the `image view`.

- basic - Will look for `Information Properties` to find its data; if no property is defined in the node, the head properties are used.

### Defined view queries
If you define [informational properties](#informational-properties) inside the node but outside its children nodes.

- article - will query for `"Element [np-p]"` and retrieve the first 300 characters.

- image - will query for `"Element [np-img]"` and retrieve the first instance.

- image.grid - will query for `"Element [np-img]"` and retrieve the first 6 instances. if only one image is found, the `image.grid view` will invoke the `image view`.

- basic - Will look for [Information Properties](#informational-properties) to find its data; if no property is defined in the node, the head properties are used.

### Custom view queries
If your data is stored in a different structure, you can define your own queries using the query syntax in the `np-view` attribute.
```html
<article 
    np-for="fender"
    np-view="image.gird > a > img">

    <h1>John Mayer W/ Fender</h1>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem et rem hic.</p>

    <a href="./gallery/johnmayer" class="img">
        <img src="./img/jm_1.jpg" alt="johnmayer_1">
    </a>
     <a href="./gallery/johnmayer" class="img">
        <img src="./img/jm_2.jpg" alt="johnmayer_2">
    </a>
     <a href="./gallery/johnmayer" class="img">
        <img src="./img/jm_3.jpg" alt="johnmayer_3">
    </a>
</article>
```

This will define an `image.grid view` and query against its node with `"> a > img"`

### Query Priority
1. Custom view query
2. Defined view query
3. Default view query

## Informational Nodes
Informational properties allow you to have control over the response data. 

Maybe you want summarized data to display instead of the default paragraph in the node, or you want a specific image to show up in the response; you can do that with informational properties.

### Informational Properties
- `np-p` - define a paragraph for the node <br>
When all declarations for the nodes are added, it may be a maximum length of 300 characters.

- `np-img` - define an image for the node <br>
String URL

- `np-action` - define a link for the node <br>
String URL

- `np-icon` - define an icon for the node <br>
String URL

- `np-description` - define a description for the node<br>
Up to 100 characters.
- `np-title` - define a title for the node <br>
Up to 35 characters

| Properties        |      Format   | 
|-------------------|:--------------|
| `np-p`            | String        | 
| `np-img`          | URL           |
| `np-action`       | Label:URL     |
| `np-icon`         | URL           |
| `np-description`  | String        |
| `np-title`        | String        |

> ❕ **Note:**<br>
Nodes only invoke informational properties where the property's immediate parent node is itself.

Example of defining images with the informational Property `np-img`
```html
<article 
    np-for="fender"
    np-view="image">

    <h1>John Mayer W/ Fender</h1>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem et rem hic.</p>

    <a href="./gallery/johnmayer" class="img">

        <img np-img="./img/jm_1.jpg" 
             src="./img/jm_1.jpg" 
             alt="jm_1">
    </a>
</article>
```

Adding a custom title & description to the node
```html
<article 
    np-for="fender"
    np-view="image"
    np-title="John Mayer with a Stratocaster"
    np-description="John Mayer playing Stratocaster at the Manhattan stadium.">

    <h1>John Mayer W/ Fender</h1>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem et rem hic.</p>

    <a href="./gallery/johnmayer" class="img">

        <img np-img="./img/jm_1.jpg" 
             src="./img/jm_1.jpg" 
             alt="jm_1">
    </a>
</article>
```

### Properties as tags
You can add informational properties to elements without defining their value, and the element's value will be used.

For Example with `np-title`, `np-description`, and `np-img`

```html
<article 
    np-for="fender"
    np-view="image">

    <h1 np-title>John Mayer W/ Fender</h1>
    <p np-description>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem et rem hic.</p>


    <a href="./gallery/johnmayer" class="img">
        <img np-img src="./img/jm_1jpg" alt="jm_1">
    </a>
</article>
```

### Property Priority

1. Properties defined `on` the root node (in the same element where the node is declared) will have the highest priority.

2. Properties defined `in` the root but outside any other node.

## Implementation
We provide parsers in different languages and hope you build cool tools with them! 

- `NPP w/ js|ts` <sub>(NA)</sub>
- `NPP w/ PHP` <sub>(NA)</sub>
- `NPP Java` <sub>(NA)</sub>
- `NPP C++` <sub>(NA)</sub>

### Recommended NPP web Client
- `Mously.js` <sub>(NA)</sub>

Happy navigating! 