import Informational from "../util/Informational"


const BasicView = 
{
    name:"basic",
    default:false,
    titleLimit:60,
    descriptionLimit:100,
    
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

        
        result.title = result.title.slice(0,this.titleLimit)
        result.description = result.description.slice(0,this.descriptionLimit)

        result.result = {view:this.name}
        return result
    },

    filter: function(data)
    {
        return false
    }

    
}

export default BasicView