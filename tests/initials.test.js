import NextPage from "../src/index.js";
import polyfills from "./polyfills.js";

beforeEach(() => 
{
    polyfills();
});

test("successful initialization",() => 
{    
    let np = new NextPage();
    expect(np).toBeInstanceOf(NextPage);  
});


test("return fallback node when level not specified" , async () => 
{
    let np = new NextPage();
    let node = await np.queryWithHtml(doc("explicit"),"")

    expect(node.title).toContain("fallback title")
    expect(node.desc).toContain("fallback desc")
    expect(node.action[0]).toContain("fallback label")
})

test("return error if url not valid" , async () => 
{
    let np = new NextPage();

    let node1 = await np.queryWithUrl("htt://example.com","")
    expect(node1).toBeInstanceOf(Error)

    let node2 = await np.queryWithUrl("example.c","")
    expect(node2).toBeInstanceOf(Error)

    let node3 = await np.queryWithUrl("http://example","")
    expect(node3).toBeInstanceOf(Error)
})



