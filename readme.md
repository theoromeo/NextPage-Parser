# NXTPG Protocol 
`The Next Page Protocol` (NPP) enables web pages to have a richer and more dynamic navigation experience allowing web pages to communicate relevant information according to a pages context.

Similar to Open Graph that allows a webpage to behave like an object with static information. NPP adds the ability for web pages to share information relative to each other.

## Basic Meta Tags
To make a webpage Next Page compatible at the minimum you will need to add some basic meta tags.

- `np-title` - Title for the view
- `np-description` - Description for the view<br>


By default this will invoke a view to the client, The properties defined in the head of the document including the `"<link rel="icon" ... >"` will act as fall-back values to more specific nodes.

if you want to display a icon other then the default favicon use the optional: `np-icon`.

## Views
NPP uses `views` as the way to display information to a client.

### View Types
Views are elements that display information to a client in a certain layout

- basic - Contains a title, description and icon.
- article - Contains a `basic view` + 1 to 3 paragraphs.
- image - Contains a `basic view` + and 1 image.
- image.grid - Contains a `basic view` + 2 to 6 images.

NP attributes defined in head follow the structure `name="np-{property}" content="{value}"`

NP attributes defined in the body follow the structure `np-{property}={value}`


#### Defining:
Example for defining a global/fallback `title` in head
```html
<meta name="np-title" content="Title of this page">
```

Example for defining a `title` in body
```html
<div np-for="creator"
     np-title="Title of this section">
    ...
</div>
```

An element in the body that declares a NP attribute is called a [node](#nodes) and a np attribute without the `np-for` attribute is an invalid node.

## Nodes
Nodes are elements defined by the `np-for` attribute and acts as a type of `key` or `response` to a client request.

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

Now lets imagine we on the page of  another website that sells fender guitars (lets call it `Page:B`), and it references to the `fender` key on `Page:A`. 

Without the user needing to click on a different website to get information a `grid view` will display on the current page with a image grid of guitars used by john mayer.

Here is the list of tag that will be retrieved client side:
Information from the head
```html
<meta name="np-description" ...>
<link rel="icon" ... >
```

Information from the node

```html
<article np-view="image.grid" .../>
3[img]
```