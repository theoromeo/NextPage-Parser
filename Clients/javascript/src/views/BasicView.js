import Informational from "../util/Informational"


const BasicView = 
{
    name:"basic",
    default:false,
    
    tagged:function (node)
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

        // Title
        if(attributeTitle != Informational.title)
        result.title = attributeTitle

        else
        result.title = elementTitle.textContent

        // Description
        if(attributeDescription != Informational.description)
        result.description = attributeDescription

        else
        result.description = elementDescription.textContent

        return result
    }

    
}

export default BasicView