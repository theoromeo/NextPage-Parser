import NextPage from "../src/index.js"


const NP = new NextPage()
const PAGE = await NP.getWebpage("www.html")
const DOM = NP.toDOM(PAGE)


describe("Basic View", () => 
{
    it("Inner Content", async ()=>
    {
        const data =await NP.get("www.html","for-basic")

        expect(data.title).toContain("#for-basic");
        expect(data.description).toContain("#for-basic");
        expect(data.icon).toEqual(false)
    })

    it("Attribute Content", async ()=>
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

describe("Article View", () => 
{
    it("Inner Content", async ()=>
    {
        const data =await NP.get("www.html","for-article")

        expect(data.result).toContain("#for-article content ->");
    })

    it("Attribute Content", async ()=>
    {
        const data =await NP.get("www.html","for-article")

        expect(data.title).toContain("#for-article header title");
        expect(data.description).toContain("#for-article header description");
    })

    it("Custom Query", async ()=>
    {
        const data =await NP.get("www.html","for-article")

        expect(data.result).toContain("for-article content -> ipsum ");
    })

    it("Return Limits", async ()=>
    {
        const data =await NP.get("www.html","for-article")

        expect(data.result.length).toBeLessThan(301);
    })
})


describe("Image View" , () => 
{
    it("Default" , async () => 
    {
        const data = await NP.get("www.html","for-image")

        expect(data.result).toEqual("./link/to/image.png");
    })

    it("Tagged Content Value" , async () => 
    {
        const data = await NP.get("www.html","for-image-tagged")

        expect(data.result).toEqual("./link/to/image-tagged.png");
    })

    it("Tagged Attribute Value" , async () => 
    {
        const data = await NP.get("www.html","for-image-attribute")

        expect(data.result).toEqual("./link/to/image-attribute.png");
    })

    it("Tagged Query" , async () => 
    {
        const data = await NP.get("www.html","for-image-query")

        expect(data.result).toEqual("./link/to/image.png");
    })
})



describe("Image.grid View" , () => 
{
    it("Default" , async () => 
    {
        const data = await NP.get("www.html","for-image-grid")

        expect(data.result.length).toBeLessThan(7);
        expect(data.result[0]).toContain("link/to/image1");
        expect(data.result[5]).toContain("link/to/image6");

    })


    it("Attributes" , async () => 
    {
        const data = await NP.get("www.html","for-image-grid-attributes")

        expect(data.result[0]).toEqual("./link/to/image/attribute1.png");
        expect(data.result[4]).toEqual("./link/to/image/attribute5.png");

    })

    it("Limit" , async () => 
    {
        const data = await NP.get("www.html","for-image-grid-attributes")

        expect(data.result.length).toBeLessThan(7);

    })

    it("Query" , async () => 
    {
        const data = await NP.get("www.html","for-image-grid-query")

        expect(data.result.length).toBeLessThan(7)
        expect(data.result[0]).toContain("attribute1.png")

    })
})



describe("Video View" , () => 
{
    it("Content Value" , async () => 
    {
        const data = await NP.get("www.html","for-video")

        expect(data.result).toContain("./link/to/video.mp4")
    })

    it("Attribute Value" , async () => 
    {
        const data = await NP.get("www.html","for-video-attribute")

        expect(data.result).toContain("./link/to/video-attribute.mp4")
    })

    it("Query Value" , async () => 
    {
        const data = await NP.get("www.html","for-video-query")

        expect(data.result).toContain("./link/to/video-attribute.mp4")
    })
})

