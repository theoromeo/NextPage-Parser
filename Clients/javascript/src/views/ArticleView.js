import Informational from "../util/Informational";

const ArticleView = 
{
    name: "article",    
    default: "p",

    tagged:function(node)
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

        })

        result = result.slice(0,result.length-4)

        return result
    }
}

export default ArticleView