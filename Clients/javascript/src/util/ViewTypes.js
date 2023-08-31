import Informational from "./Informational.js"
import { DOMParser , XMLSerializer } from 'xmldom-qsa'


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
            let result = 
            {
                title:"",
                description:""
            }
            
            const elementTitle = node.querySelector(`[${Informational.title}]`)
            const elementDescription = node.querySelector(`[${Informational.description}]`)

            if(!elementTitle || !elementDescription)
            return false

            const attributeTitle = elementTitle.getAttribute(Informational.title)
            const attributeDescription = elementDescription.getAttribute(Informational.description)

            if(attributeTitle != Informational.title)
            result.title = attributeTitle
            else
            result.title = elementTitle.textContent

            if(attributeDescription != Informational.description)
            result.description = attributeDescription
            else
            result.description = elementDescription.textContent

            return result
        
        }
    },

    "article":
    {
        "default":"p",

        "tagged":
        function(node)
        {
            let result = "";
            const elements = node.querySelectorAll(`[${Informational.p}]`)

            if(elements.length == 0)
            return false

            elements.forEach(element => 
            {
                let attributeValue = element.getAttribute(Informational.p)
                let elementValue = element.textContent

                if(attributeValue != Informational.p)
                result += attributeValue + "<br>"
                
                else if(elementValue)
                result += elementValue + "<br>"

            });

            // Remove trailing "<br>"
            result = result.slice(0,result.length-4)

            return result
        },
    },

    "image":
    {
        "default":"img:first-of-type",

        "tagged":
        function(node)
        {
            const element = node.querySelector(`[${Informational.img}]`)

            if(!element)
            return false

            const attributeValue = element.getAttribute(Informational.img)
            const elementValue = element.getAttribute('src')

            if(attributeValue != Informational.img)
            return attributeValue

            if(elementValue)
            return elementValue

            return false
        },
    },

    "image.grid":
    {
        "default":"img:nth-child(-n+6)",

        "tagged":
        function(node)
        {
            let result = []
            let elements = node.querySelectorAll(`[${Informational.img}]`).slice(0,6)

            if(elements.length <1)
            return false

            elements.forEach(element => 
            {
                let elementValue = element.getAttribute('src')
                let attributeValue = element.getAttribute(Informational.img)

                if(attributeValue != Informational.img)
                result.push(attributeValue)

                else if(elementValue)
                result.push(elementValue)
            
            });

            return result

        }
    },

}

export default ViewTypes;