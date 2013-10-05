
module("backpack Unit Tests", {
    setup: function () {

        

    },
    teardown: function () {

    }
});



test("Verify We Have backpack with expected members", function () {

    //basic sainty assertions to know members are present
    ok(backpack, "backpack object should exist");
    ok(backpack.fn.init, "init function should exist");
    ok(backpack.fn.version, "version should exist");
    ok(backpack.fn.getTemplates, "getTemplates should exist");
    ok(backpack.fn.updateViews, "updateViews function should exist");
    ok(backpack.fn.saveViewToStorage, "saveViewToStorage function should exist");
    ok(backpack.fn.parseViewInfo, "parseViewInfo function should exist");
    ok(backpack.fn.storeViewInfo, "storeViewInfo function should exist");
    ok(backpack.fn.getViewData, "getViewData function should exist");
    ok(backpack.fn.settings, "settings function should exist");
    ok(backpack.fn.pageSettings, "pageSettings function should exist");

});

test("Verify can a new backpack instance and the 1st element is the target element", function () {

});

test("Verify can a backpack.trim can trim leading and trailing spaces", function () {


});

test("Verify can a backpack.trim can trim leading space", function () {


});


test("Verify can a backpack.trim can trim trailing space", function () {


});

test("Verify can a backpack.isArray can identify an array", function () {


});

test("Verify can a backpack.isArray won't identify an object as an array", function () {


});


