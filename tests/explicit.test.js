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

test("return primary node" , async () => 
{
    let np = new NextPage();
    let node = await np.queryWithHtml(doc("explicit"), "primary")
    console.log(node)
    expect(node.title).toMatch(`primary title`)
    expect(node.desc).toMatch(`primary desc`)
    expect(node.action[0]).toContain(`fallback label`)
    expect(node.action[1]).toContain(`fallback url`)
})

test("return secondary node" , async () => 
{
    let np = new NextPage();
    let node = await np.queryWithHtml(doc("explicit"), "secondary")
    expect(node.title).toContain(`secondary title`)
    expect(node.desc).toContain(`secondary desc`)
    expect(node.action[0]).toContain(`secondary label`)
    expect(node.action[1]).toContain(`secondary url`)
})

test("return side node" , async () => 
{
    let np = new NextPage();
    let node = await np.queryWithHtml(doc("explicit"), "side")
    expect(node.title).toContain(`side title`)
    expect(node.desc).toContain(`side desc`)
    expect(node.img.length).toEqual(3)
    expect(node.action[0]).toContain(`fallback label`)
    expect(node.action[1]).toContain(`fallback url`)
})