# NextPage Docs
![Version](https://img.shields.io/badge/version-0.5.0--beta-yellow)

NextPage allows dense webpages to share important points of information to users through an interface without the users needing to leave the current webpage. 

NextPage helps users avoid `tab hopping`, keeping them focused on understanding information in the desired context.

Webpages can become NextPage-enabled by defining `NextPage nodes` directly in the HTML. This ensures that only publicly available information is accessible and enables querying other NextPage-enabled pages for relevant content.

## Quick Start
This quick start guide will walk you through creating your first NextPage Node and understanding the overview of all the components and how they work together.

### Fallbacks
To make a webpage NextPage-enabled at the minimum requires defining `2 NextPage meta tags` in the head of your html document:

```html
<meta name="np:title" content="...">
<meta name="np:description" content="...">
```
Meta tags defined in the head are called `"fallbacks"` and will be used to `"patch"` any `fields` not defined in a queried `node`.

### Nodes
Nodes represents the object that is returned from a query. To create a node you must define the `np-node attribute` inside an element in the body of the html.

```html
<article np-node="primary">
    <h1>John Mayer: Grammy-Winning Music Icon and Guitar Virtuoso</h1>
    <p>
      John Mayer is a Grammy-winning singer-songwriter and guitarist known for his soulful music and exceptional guitar skills. With 7 Grammy Awards and numerous chart-topping albums, he's captivated audiences worldwide with hits like "Gravity" and "Slow Dancing in a Burning Room."
    </p>
</article>
```
The `"primary"` value defined in `np-node` denotes the `level of granularity` the node represents.

### Defining Field Attributes
Field attributes represents the information the node will contain. These fields will be used in the different sections of the interface shown to the client.

Field attributes can be defined in 2 ways, `explicitly` and `implicitly`. This example shows using `explicitly defined field properties` `np-title` and `np-description` where the value of the attribute will be used.

```html
<article 
    np-node="primary"
    np-title="John Mayer: Grammy-Winning Music Icon"
    np-description="John Mayer, a Grammy-winning guitarist and singer, is known for soulful hits like “Gravity” and “Slow Dancing in a Burning Room.">
        <h1>John Mayer: Grammy-Winning Music Icon and Guitar Virtuoso</h1>
        <p>
          John Mayer is a Grammy-winning singer-songwriter and guitarist known for his soulful music and exceptional guitar skills. With 7 Grammy Awards and numerous chart-topping albums, he's captivated audiences worldwide with hits like "Gravity" and "Slow Dancing in a Burning Room."
        </p>
</article>
```


### Views
Views describe how the node should be shown to the client. Depending on the view, it will also required using `specific Field attributes` and can be defined `implicitly` or `explicitly`.

In this example we will `explicitly define` the most basic view called `"basic"` using the `np-view` attribute, that only requires defining `np-title` and `np-description` field attribute.

```html
<article 
    np-node="primary"
    np-view="basic"
    np-title="John Mayer: Grammy-Winning Music Icon"
    np-description="John Mayer, a Grammy-winning guitarist and singer, is known for soulful hits like “Gravity” and “Slow Dancing in a Burning Room.">
        <h1>John Mayer: Grammy-Winning Music Icon and Guitar Virtuoso</h1>
        <p>
          John Mayer is a Grammy-winning singer-songwriter and guitarist known for his soulful music and exceptional guitar skills. With 7 Grammy Awards and numerous chart-topping albums, he's captivated audiences worldwide with hits like "Gravity" and "Slow Dancing in a Burning Room."
        </p>
</article>
```

### Done
Congratulations, You've created your first NextPage-enabled webpage. Now when you query the webpage using the `NextPage Client` from another page it will display a `basic view` with your set `title` and `description`.

## Fields
Fields represents the different data a node can contain and are used in the different sections of the interface shown to the client.

| Field        | Limit                      | Structure           |
|--------------|----------------------------|---------------------|
| `title`      | 65 characters              | String              |
| `description`| 120 characters             | String              |
| `article`    | 200 characters             | string              |
| `image`      | 1 image                    | url                 |
| `action`     | 30 characters for label    | "{label} > {url}"   |

### Header Fields
When defining fields as fallbacks within the head tag, it should be appended with the `np:` namespace.

```html
<meta name="np:{field}" content="up to 48 characters">
<!-- ie -->
<meta name="np:title" content="up to 48 characters">
```

### Node Fields
When defining fields as part of a node it is declared by appending `"np-"` to the field name as a attribute.

```html
<article 
    np-node="primary"
    np-title="John Mayer: Grammy-Winning Music Icon">  <!-- np-{field} -->
    ...
</article>
```

## Fallbacks
Fallbacks allow you to define `default` values for fields that can be used as `fallbacks` for when nodes don't define specific field. 

These fallbacks are also used to build a `default` node for when a node is queried and not found.

You can use fallbacks to define a "global default node" for the whole page, this will be used as the `last resort node` or when a NextPage-enabled webpage is queried without defining a node.

```html
<meta name="np:title" content="...">
<meta name="np:description" content=" ...">
<meta name="np:action" content=" 'label' > 'url' ">
```

## Nodes
Nodes represents the objects that are returned from a query. To create a node you must define the `np-node attribute` inside an element in the body of the html.

```html
<article np-node="primary">
    ...
</article>
```
### Data Granularity
`np-node` can declare one of 5 `predefined` values that describe the importance of the data the node represents.

* `primary`: The core information about the subject of the page.

* `secondary`: Nuanced or extended information about the subject of the page.

* `tertiary`: Loosely related or adjacent information about the subject.

* `important`: Represents an important note on the data, but not necessarily the data itself. This is usually temporary data and will revert to `"primary"` if queried but not explicitly defined.

* `warning`: Describes cautionary messages, such as warnings and errors related to the subject of the page. This is typically a temporary node and will result in `null` if queried but not explicitly defined.

### Custom Granularity
You can also define your own node values which will act as IDs that then can be queried by clients the same way as the predefined values. 

If a client queries a custom node and it's not found, NextPage will look for the `primary node` and if the `primary node` is not found, the client will use the fallback default node.


### Defining Fields Attribute
#### `Explicitly Defined `
Explicitly defined field attribute use the values within its definition as the values for the field. This allows nodes to contain different or more curated data for the node than what shows up on the webpage, allowing for more control.

```html
<article np-node="primary">
    <h1 np-title="John Mayer: Grammy-Winning Music Icon">John Mayer: Grammy-Winning Music Icon and Guitar Virtuoso</h1>
    ...
</article>

<!-- Both declarations are valid -->
<article 
    np-node="primary"
    np-title="John Mayer: Grammy-Winning Music Icon">
    <h1 >John Mayer: Grammy-Winning Music Icon and Guitar Virtuoso</h1>
    ...
</article>
```

#### `Implicitly Defined `
Implicit definitions will use the values within the `innertext` of the element it's declared in as its value. This can be used for data consistency, but keep in mind the character limits of the `fields` you decide to use.

```html
<article np-node="primary">
    <h1 np-title>John Mayer: Grammy-Winning Music Icon and Guitar Virtuoso</h1>
    ...
</article>
```

Some Implicitly defined field properties only work with specific elements:
| Field         | Tag               | Details                                                        |
|---------------|-------------------|----------------------------------------------------------------|
| `title`, `description`, `article` | Any tag | Can use any HTML tag as its value                    |
| `img`         | `<img>`           | Will use the `src` attribute as its value                      |
| `action`      | `<a>`             | Will use the `href` attribute and the `innertext` as its value |


## View Types
View Types represent the type of view the node appears as to the client and is declared using the `np-view` attribute when defined in a node and `np:view` when defined as a fallback.

| Field     | Contains                                   |
|-----------|-------------------------------------------|
| `basic`   | Contains the `title`, `description` and `optional action button`         |
| `article` | Contains the `title`, `description` , `optional action button`  and `article` |
| `gallery` | Defines the `title`, `description`, `optional action button` and up to `4 images` |


### Implicit View Types
NextPage has the ability to detect the view type by the Field Properties defined in the node.

By defining at least one `np-image` field attribute within the node, NextPage will know to define the node view as `gallery`.

```html
<article 
    np-node="primary"
    np-title="John Mayer: Grammy-Winning Music Icon"
    np-description="John Mayer, a Grammy-winning guitarist and singer, is known for soulful hits like “Gravity” and “Slow Dancing in a Burning Room.">

        <h1>John Mayer: Grammy-Winning Music Icon and Guitar Virtuoso</h1>
        <p>
          John Mayer is a Grammy-winning singer-songwriter and guitarist known for his soulful music and exceptional guitar skills. With 7 Grammy Awards and numerous chart-topping albums, he's captivated audiences worldwide with hits like "Gravity" and "Slow Dancing in a Burning Room."
        </p>
        <img np-image src="john-mayer.jpg" alt="John Mayer performing live" />       <!-- implicitly defining an image -->
        <img np-image src="john-mayer-grammy.jpg" alt="John Mayer holding grammy" /> <!-- implicitly defining an image -->
</article>
```

### Explicit View Types
Explicit view types allow you to better control the type of view the node should display. 

When defining a node explicitly as `basic`, even if a node defined the field property `np-img` it will be ignored.

```html
<article 
    np-node="primary"
    np-view="basic"
    np-title="John Mayer: Grammy-Winning Music Icon"
    np-description="John Mayer, a Grammy-winning guitarist and singer, is known for soulful hits like “Gravity” and “Slow Dancing in a Burning Room.">

        <h1>John Mayer: Grammy-Winning Music Icon and Guitar Virtuoso</h1>
        <p>
          John Mayer is a Grammy-winning singer-songwriter and guitarist known for his soulful music and exceptional guitar skills. With 7 Grammy Awards and numerous chart-topping albums, he's captivated audiences worldwide with hits like "Gravity" and "Slow Dancing in a Burning Room."
        </p>
        <img np-image src="john-mayer.jpg" alt="John Mayer performing live" />       <!-- ignored -->
        <img np-image src="john-mayer-grammy.jpg" alt="John Mayer holding grammy" /> <!-- ignored -->
</article>
```

## Client Implementation
A standardized [NextPage client](https://github.com/theoromeo/NextPage-Client) implementation is available and demonstrates how to query NextPage-enabled webpages from the client side.

