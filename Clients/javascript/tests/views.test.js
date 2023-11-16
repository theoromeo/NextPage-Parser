import NextPage from "../src/index.js"


const NP = new NextPage()


describe("Basic View", () => 
{
    it("Inner Content", async ()=>
    {
        const data =await NP.get("main.html","for-basic")

        expect(data.title).toContain("#for-basic");
        expect(data.description).toContain("#for-basic");
        expect(data.icon).toEqual(false)
    })

    it("Attribute Content", async ()=>
    {
        const data =await NP.get("main.html","for-basic-attribute")

        expect(data.title).toContain("#for-basic-attribute");
        expect(data.description).toContain("#for-basic-attribute");
        expect(data.icon).toContain("#for-basic-attribute")
    })

    it("Fallback Content", async ()=>
    {
        const data =await NP.get("main.html","for-basic-fallback")

        expect(data.title).toContain("#for-basic-fallback");
        expect(data.description).toContain("Header np-");
    })
})

describe("Article View", () => 
{
    it("Default Query", async ()=>
    {
        const data =await NP.get("main.html","for-article")

        expect(data.result).toContain("#for-article content ->");
    })

    it("Tagged Base Inner Content ", async ()=>
    {
        const data =await NP.get("main.html","for-article")

        expect(data.title).toContain("#for-article header title");
        expect(data.description).toContain("#for-article header description");
    })

    it("Custom Query", async ()=>
    {
        const data =await NP.get("main.html","for-article")

        expect(data.result).toContain("for-article content -> ipsum ");
    })

    it("Limits", async ()=>
    {
        const data =await NP.get("main.html","for-article")

        expect(data.result.length).toBeLessThan(301);
    })
})

describe("Image View" , () => 
{
    it("Default Query" , async () => 
    {
        const data = await NP.get("main.html","for-image")

        expect(data.result).toEqual("./link/to/image.png");
    })

    it("Tagged Query" , async () => 
    {
        const data = await NP.get("main.html","for-image-tagged")

        expect(data.result).toEqual("./link/to/image-tagged.png");
    })

    it("Tagged Query w/ Attributes" , async () => 
    {
        const data = await NP.get("main.html","for-image-attribute")

        expect(data.result).toEqual("./link/to/image-attribute.png");
    })

    it("Custom Query" , async () => 
    {
        const data = await NP.get("main.html","for-image-query")

        expect(data.result).toEqual("./link/to/image.png");
    })
})

describe("Image.grid View" , () => 
{
    it("Default Query" , async () => 
    {
        const data = await NP.get("main.html","for-image-grid")

        expect(data.result.length).toBeLessThan(7);
        expect(data.result[0]).toContain("link/to/image1");
        expect(data.result[5]).toContain("link/to/image6");

    })


    it("Tagged Query w/ Attributes" , async () => 
    {
        const data = await NP.get("main.html","for-image-grid-attributes")

        expect(data.result[0]).toEqual("./link/to/image/attribute1.png");
        expect(data.result[4]).toEqual("./link/to/image/attribute5.png");

    })

    it("Limit" , async () => 
    {
        const data = await NP.get("main.html","for-image-grid-attributes")

        expect(data.result.length).toBeLessThan(7);

    })

    it("Custom Query" , async () => 
    {
        const data = await NP.get("main.html","for-image-grid-query")

        expect(data.result.length).toBeLessThan(7)
        expect(data.result[0]).toContain("attribute1.png")

    })
})

describe("Video View" , () => 
{
    it("Default Query" , async () => 
    {
        const data = await NP.get("main.html","for-video")

        expect(data.result).toContain("./link/to/video.mp4")
    })

    it("Tagged Query w/ Attributes" , async () => 
    {
        const data = await NP.get("main.html","for-video-attribute")

        expect(data.result).toContain("./link/to/video-attribute.mp4")
    })

    it("Custom Query" , async () => 
    {
        const data = await NP.get("main.html","for-video-query")

        expect(data.result).toContain("./link/to/video-attribute.mp4")
    })
})

