import Informational from "../util/Informational";

const ImageGridView = 
{
    name: "image.grid",    
    default:function(node)
    {
        let result = []
        const elements = node.childNodes

        for (let index = 0; index < elements.length; index++) {
            const element = elements[index];

            if(element.tagName == "img")
            result.push(element)
        
            if(result.length >5)
            break
        }

        if(result.length == 0)
        return false

        return result
    },
    limit: 6,
    
    tagged:function(node)
    {
        const elements = node.querySelectorAll(`[${Informational.img}]`).slice(0,this.limit)

        if(elements.length <1)
        return false

        // elements.forEach(element => 
        // {
        //     let elementValue = element.getAttribute('src')
        //     let attributeValue = element.getAttribute(Informational.img)

        //     if(attributeValue != Informational.img && attributeValue.trim() != "")
        //     result.push(attributeValue)

        //     else if(elementValue)
        //     result.push(elementValue)
        
        // });
        return elements
    },

    filter:function(queryResult)
    {

        let result = []
        if(queryResult instanceof Array){}   
        else 
        queryResult = [queryResult]     

        if(queryResult instanceof Array)
        {
           for (let index = 0; index < queryResult.length; index++) 
           {
                const element = queryResult[index];

                if(element.tagName != "img")
                continue

                if(element.getAttribute(Informational.img))
                {
                    let value = element.getAttribute(Informational.img)

                    if(value.trim() == "" || value == Informational.img)
                    continue

                    result.push(value)
                    continue
                }

                else 
                {
                    let value = element.getAttribute('src')

                    if(value.trim() == "")
                    continue

                    result.push( value)
                    continue   
                }
            
           }
        }

        if(result.length <1)
        return false

        return result.slice(0,this.limit)
    }

}

export default ImageGridView