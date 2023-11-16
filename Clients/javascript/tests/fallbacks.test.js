import NextPage from "../src/index.js"


const NP = new NextPage()
const PAGE = await NP.getWebpage("heads.html")
const DOM = await NP.toDOM(PAGE)

describe("Fallback Limits" , () => 
{
    let node,results
    beforeAll(() => 
    {
        node = DOM.querySelector("#overflow")
        results = NP.getNodeBaseProperties(node)
    })

    it("np-title Limit" , async () => 
    {
        expect(results.title.length).toBeLessThan(81)
    })

    it("np-description Limit" , async () => 
    {
        expect(results.description.length).toBeLessThan(201)

    })
    
})

describe("Fallback Icon & Action" , () => 
{
    let node , results
    beforeAll(() => 
    {
        node = DOM.querySelector('#overflow')
        results = NP.getNodeBaseProperties(node)
    })

    it("np-icon w/ Content Attribute" , () => 
    {
        expect(results.icon).toEqual("./link/to/icon.png")
    })

    it("np-action w/ Content Attribute" , () => 
    {
        
        expect(results.action.label).toEqual("Action Button")
        expect(results.action.url).toContain("./link/to/page.html")
    })
})


describe("Fallback Error Handling", () => 
{
    let node, results 

    beforeAll(() => 
    {
        node = DOM.querySelector('#missing')
        results = NP.getNodeBaseProperties(node)
    })

    it("Undefined np-title" , async () => 
    {
        expect(results.title).toEqual("Document Title")
    })

    it("Undefined np-description" , async () => 
    {
        expect(results.description).toEqual(false)
    })

    it("Undefined np-action" , async () => 
    {
        expect(results.description).toEqual(false)
    })

    it("Undefined np-icon" , async () => 
    {
        expect(results.icon).toEqual(false)
    })


    it("Undefined title tag" , async () => 
    {
        const node = DOM.querySelector('#missing-2')
        const results = NP.getNodeBaseProperties(node)
    
        expect(results.title).toEqual(false)
    
    })
})




