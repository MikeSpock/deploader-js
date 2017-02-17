describe("Module", function() {
    it("should load a module and get a module", function() {
        var module = dljs.load("testModule",  function () {
            var hasLoaded = true;
            return {
                hasLoaded:hasLoaded
            }
        });
        expect(dljs.get("testModule").hasLoaded).toBeTruthy();

    });
    it("shouldn't load a module twice", function() {
        dljs.load("testModule.overload",  function () {
            return {value: 10}
        });
        dljs.load("testModule.overload",  function () {
            return {value: 5}
        });
        expect(dljs.get("testModule.overload").value).toBe(10);
    });
    it("should handle moduledependency well", function() {
        var loadedOrder = [];
        dljs.load("tree.0.2.1",  function () {loadedOrder.push(2)},["tree.0.2"]);
        dljs.load("tree.0",  function () {loadedOrder.push(0)});
        dljs.load("tree.0.2",  function () {loadedOrder.push(1)},["tree.0"]);
        dljs.load("tree.0.1",  function () {loadedOrder.push(3)},["tree.0"]);
        dljs.load("tree.1.1",  function () {loadedOrder.push(5)},["tree.1"]);
        dljs.load("tree.1",  function () {loadedOrder.push(4)});
        expect(loadedOrder).toEqual([0,1,2,3,4,5]);
    });
    it("should handle 2 level dependencies", function() {
        var loadedOrder = [];
        dljs.load("tree1.1", function () {loadedOrder.push(1)},["tree1.2"]);
        dljs.load("tree1.2", function () {loadedOrder.push(0)},[]);
        expect(loadedOrder).toEqual([0,1]);
    });
    it("should handle 3 level dependencies", function() {
        var loadedOrder = [];
        dljs.load("tree2.1", function () {loadedOrder.push(2)},["tree2.2"]);
        dljs.load("tree2.2", function () {loadedOrder.push(1)},["tree2.3"]);
        dljs.load("tree2.3", function () {loadedOrder.push(0)},[]);
        expect(loadedOrder).toEqual([0,1,2]);
    });
    it("should return a newable class", function() {
        dljs.load("newableTest.isSingleton",  function () {
            var hello = "Anne";
            return {hello: hello}
        });

        var isSingleton = dljs.get("newableTest.isSingleton");
        var isSingleton2 = dljs.get("newableTest.isSingleton");
        expect(isSingleton.hello).toBe("Anne");
        expect(isSingleton2.hello).toBe("Anne");
        isSingleton2.hello = "Jane";
        expect(isSingleton.hello).toBe("Jane");
        expect(isSingleton2.hello).toBe("Jane");

        var isNewed = (new dljs.get("newableTest.isSingleton",true))();
        var isNewed2 = (new dljs.get("newableTest.isSingleton",true))();
        expect(isNewed.hello).toBe("Anne");
        expect(isNewed2.hello).toBe("Anne");
        isNewed2.hello="Jane";
        expect(isNewed.hello).toBe("Anne");
        expect(isNewed2.hello).toBe("Jane");

    });
});