import NextPage from "../src/index.js";
import polyfills from "./polyfills.js";

beforeEach(() => 
{
    polyfills();
});


test("return basic view" , async () => 
{
    let np = new NextPage();
    let node = await np.queryWithHtml(doc("views"), "primary")
    expect(node.view).toMatch(`basic`)
    expect(node.title).toMatch("primary title")
    expect(node.desc).toMatch("primary desc")
})


test("return article view " , async () => 
{
    let np = new NextPage();
    let node = await np.queryWithHtml(doc("views"), "secondary")
    expect(node.view).toMatch(`article`)
    expect(node.article).toContain(`secondary article`)
})

test("return fallback when article not fully defined" , async () => 
{
    let np = new NextPage();
    let node = await np.queryWithHtml(doc("views"), "secondary-fail")
    expect(node.view).toMatch(`basic`)
})

test("return gallery view and images" , async () => 
{
    let np = new NextPage();
    let node = await np.queryWithHtml(doc("views"), "side")
    expect(node.view).toMatch(`gallery`)
    expect(node.img.length).toEqual(3)
})

test("return fallback basic view when query gallery view not fully defined" , async () => 
{
    let np = new NextPage();
    let node = await np.queryWithHtml(doc("views"), "side-fail")
    expect(node.view).toMatch(`basic`)
    expect(node.img).toBeUndefined()
})


