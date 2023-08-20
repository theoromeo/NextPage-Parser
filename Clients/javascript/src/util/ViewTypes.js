import Informational from "./Informational.js"

/**
 * Holds the default query strings and function for retrieving 
 * tagged defined values for each view type.
 */
const ViewTypes = 
{
    "basic":
    {
        "default":false,

        "tagged":
        function(node)
        {
            let title = node.querySelectorAll(`[${Informational.title}]`)
            let description = node.querySelectorAll(`[${Informational.description}]`)

            if(title && description)
                return [title,description]

            return false
        }
    },

    "article":
    {
        "default":"p",

        "tagged":
        function(node)
        {
            return node.querySelectorAll(`[${Informational.p}]`)
        },
    },

    "image":
    {
        "default":"img:first-of-type",

        "tagged":
        function(node)
        {
            return node.querySelector(`[${Informational.image}]`)
        },
    },

    "image.grid":
    {
        "default":"img:nth-child(-n+6)",

        "tagged":
        function(node)
        {
            let elements = node.querySelectorAll(`[${Informational.image}]`).slice(0,6)

            if(elements.length <1)
                return false

            return elements

        }
    },

}

export default ViewTypes;