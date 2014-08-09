/// <reference path="../dev/backpack.js" />
/// <reference path="../tests/qunit.js" />
/// <reference path="../tests/sinon.js" />


module("getViewInfo Unit Tests", {
    setup: function () {



    },
    teardown: function () {

    }
});

var mockViewInfo = {
        pageId: "mockView",
        viewTitle: "mockView",
        tranistion: "slide",
        content: "<p>Howdy!</p>"
    },
    realViewInfo = {
        pageId: "realView",
        viewTitle: "realView",
        tranistion: "slide",
        route: "realroute\:id",
        content: '<section id="realView" class="content-pane" spa-title="realView" spa-transition="slide" spa-route="realroute\:id"></section>'
    },
    REALVIEWID = "realView",
    MOCKVIEWID = "mockView",
    MOCKAPPNAME = "MockApp",
    BADVIEWID = "badView";



test("Verify when viewInfo exists in localStorage it is returned as Object", function () {

    //add mock viewInfo to storage
    localStorage.setItem(MOCKAPPNAME + "-" + MOCKVIEWID, JSON.stringify(mockViewInfo));

    var bp = Backpack({
        appName: MOCKAPPNAME
        }),
        result = bp.getViewInfo(MOCKVIEWID);

    equal(result.pageId, mockViewInfo.pageId, "Should return the mockViewInfo.pageId object from storage")
    equal(result.viewTitle, mockViewInfo.viewTitle, "Should return the mockViewInfo.viewTitle object from storage")
    equal(result.tranistion, mockViewInfo.tranistion, "Should return the mockViewInfo.tranistion object from storage")
    equal(result.content, mockViewInfo.content, "Should return the mockViewInfo.content object from storage")


});

test("Verify when viewInfo does not exist in localStorage but the view exists in the DOM the expected Object is returned", function () {

    var bp = Backpack({
        appName: MOCKAPPNAME
    }),
        result = bp.getViewInfo(REALVIEWID);

    equal(result.pageId, realViewInfo.pageId, "Should return the mockViewInfo.pageId object from storage")
    equal(result.viewTitle, realViewInfo.viewTitle, "Should return the mockViewInfo.viewTitle object from storage")
    equal(result.tranistion, realViewInfo.tranistion, "Should return the mockViewInfo.tranistion object from storage")
    //add route
    //    equal(result.content, mockViewInfo.content, "Should return the mockViewInfo.content object from storage")

});

test("Verify when viewInfo does not exist in localStorage but the view exists in the DOM the expected Object is stored", function () {

    var bp = Backpack({
        appName: MOCKAPPNAME
    }),
        result = null;

    bp.getViewInfo(REALVIEWID);

    result = JSON.parse(localStorage.getItem(MOCKAPPNAME + "-" + REALVIEWID));

    equal(result.pageId, realViewInfo.pageId, "Should return the mockViewInfo.pageId object from storage")
    equal(result.viewTitle, realViewInfo.viewTitle, "Should return the mockViewInfo.viewTitle object from storage")
    equal(result.tranistion, realViewInfo.tranistion, "Should return the mockViewInfo.tranistion object from storage")
    //add route
    //    equal(result.content, mockViewInfo.content, "Should return the mockViewInfo.content object from storage")

});

test("Verify when the view simply does not exist nothing is returned", function () {

    var bp = Backpack({
        appName: MOCKAPPNAME
    }),
        result = bp.getViewInfo(BADVIEWID);

    equal(result, null, "Should return null")

});
