import Informational from "../util/Informational";

const ImageView = 
{
    name: "image",    
    default: "img:first-of-type",
    
    tagged:function(node)
    {
        const element = node.querySelector(`[${Informational.img}]`)

        if(!element)
        return false

        const attributeValue = element.getAttribute(Informational.img)
        const elementValue = element.getAttribute('src')

        if(attributeValue != Informational.img)
        return {result:attributeValue,view:this.name}

        if(elementValue)
        return {result:elementValue,view:this.name}

        return false
    },

    filter:function(data)
    {
        let src
        let result = []
        if(data instanceof Array)
        {
            data.every(element =>
            {
                if(element.tagName == "img")
                {   
                    src = element.getAttribute('src')
                    return 
                }
                
                return true
                
            });
        }

        else 
        {
            src = element.getAttribute('src')
        }

        if(src)
        result.push(src)

        return result
    }

}

export default ImageView