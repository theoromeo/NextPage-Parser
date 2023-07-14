# NXTPG Protocol 
`The Next Page Protocol` (NPP) enables web pages to have a richer and more dynamic navigation experience allowing web pages to communicate relevant information according to a pages context.

Similar to Open Graph that allows a webpage to behave like an object with static information. NPP adds the ability for web pages to share information relative to each other.

## Basic Meta Tags
To make a webpage Next Page compatible at the minimum you will need to add some basic meta tags.

- `np-title` - Title for the view
- `np-description` - Description for the view<br>


By default this will invoke a view to the client, The properties defined in the head of the document including the `"<link rel="icon" ... >"` will act as fall-back values to more specific nodes.

if you want to display a icon other then the default favicon use the optional: `np-icon`.


