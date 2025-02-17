import NextPage from "../src/index.js";
import polyfills from "./polyfills.js";

beforeEach(() => 
{
    polyfills();
});


test("query undefined node returns fallback node" , async () => 
{
    let np = new NextPage();
    let node = await np.queryWithHtml(doc("error"), "primary")
    expect(node.title).toContain("fallback title")
    expect(node.desc).toContain("fallback desc")
    expect(node.action[0]).toContain("fallback label")
    expect(node.action[1]).toContain("fallback url")

})

test("return primary node when secondary not defined" , async () => 
{
    let np = new NextPage();
    let node = await np.queryWithHtml(doc("error-primary"), "secondary")

    expect(node.title).toContain("primary title")
    expect(node.desc).toContain("primary desc")

})

test("return error when html does not contain any node" , async () => 
{
    let np = new NextPage();
    let node = await np.queryWithHtml(doc("error-none"), "primary")

    expect(node).toBeInstanceOf(Error)
})


test("return error when title/desc fallbacks not defined" , async () => 
{ 
    let np = new NextPage();
    let node = await np.queryWithHtml(doc("error-half"), "primary")

    expect(node).toBeInstanceOf(Error)
})



