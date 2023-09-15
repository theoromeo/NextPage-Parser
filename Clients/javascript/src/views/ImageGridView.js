import Informational from "../util/Informational";

const ImageGridView = 
{
    name: "image.grid",    
    default: "img:nth-child(-n+6)",
    
    tagged:function(node)
    {
        let result = []
        const elements = node.querySelectorAll(`[${Informational.img}]`).slice(0,6)

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

}

export default ImageGridView