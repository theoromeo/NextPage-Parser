import Informational from "../util/Informational";

const ImageGridView = 
{
    name: "image.grid",    
    default: "img:nth-child(-n+6)",
    limit: 6,
    
    tagged:function(node)
    {
        let result = []
        const elements = node.querySelectorAll(`[${Informational.img}]`).slice(0,this.limit)

        if(elements.length <1)
        return false

        elements.forEach(element => 
        {
            let elementValue = element.getAttribute('src')
            let attributeValue = element.getAttribute(Informational.img)

            if(attributeValue != Informational.img && attributeValue.trim() != "")
            result.push(attributeValue)

            else if(elementValue)
            result.push(elementValue)
        
        });

        return {result:result,view:this.name}
    },

    filter:function(data)
    {
        let result = []

        if(data instanceof Array)
        {
            data.forEach(element => {
                const src = element.getAttribute('src')

                if(src)
                result.push(src)
            });
        }

        else
        {
            const src = element.getAttribute('src')

            if(src)
            result.push(src)
        }

        return result.splice(0,6)
    }

}

export default ImageGridView