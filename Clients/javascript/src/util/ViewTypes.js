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
            const result = node.querySelectorAll(`[${Informational.p}]`)

            if(result.length == 0)
            return false

            return result
        },
    },

    "image":
    {
        "default":"img:first-of-type",

        "tagged":
        function(node)
        {
            const result = node.querySelector(`[${Informational.image}]`)
            if(!result)
            return false

            return result
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