import NextPage from "../src/index.js"


const NP = new NextPage()
const PAGE = await NP.getWebpage("www.html")
const DOM = NP.toDOM(PAGE)


describe("Basic View", () => 
{
    it.skip("Inner Content", async ()=>
    {
        const data =await NP.get("www.html","for-basic")

        expect(data.title).toContain("#for-basic");
        expect(data.description).toContain("#for-basic");
        expect(data.icon).toEqual(false)
    })

    it.skip("Attribute Content", async ()=>
    {
        const data =await NP.get("www.html","for-basic-attribute")

        expect(data.title).toContain("#for-basic-attribute");
        expect(data.description).toContain("#for-basic-attribute");
        expect(data.icon).toContain("#for-basic-attribute")
    })

    it("Fallback Content", async ()=>
    {
        const data =await NP.get("www.html","for-basic-fallback")

        expect(data.title).toContain("#for-basic-fallback");
        expect(data.description).toContain("Header np-");
    })
})



