import Informational from "../util/Informational";
import { DOMParser} from 'xmldom-qsa'

const ArticleView = 
{
    name: "article",    
    default: "p",
    limit:300,

    tagged:function(node)
    {
        let result = "";

        const elements = node.querySelectorAll(`[${Informational.p}]`)

        if(elements.length == 0)
        return false

        elements.forEach(element => 
        {
            let elementValue = element.textContent
            let attributeValue = element.getAttribute(Informational.p)

            if(attributeValue != Informational.p)
            result += attributeValue + "<br>"
            
            else if(elementValue)
            result += elementValue + "<br>"
        })

        result = result.slice(0,result.length-4).slice(0,this.limit)
        return {result:result,view:this.name}
    },

    filter:function(data)
    {
        let result = ""
        // Data will always be a node
        if(data instanceof Array)
        {
            data.forEach(element => {

                if(element.textContent.trim())
                result += element.textContent + "<br>" 
            
            });
        }

        else 
        {
            result = element.textContent + "<br>" 
        }

        result = result.slice(0,result.length-4).slice(0,this.limit)

        return result
    }
}

export default ArticleView