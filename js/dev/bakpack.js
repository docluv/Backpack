;
//Backpack is a deferred content managment library with single page and mobile applications in mind
(function (window, undefined) {

    "use strict";

    var backpack = function (settings) {

        var that = new backpack.fn.init(customSettings),
            name, copy;

        for (name in that.settings) {

            copy = settings[name];

            // Prevent never-ending loop
            if (that.settings === copy) {
                continue;
            }

            if (copy !== undefined) {
                that.settings[name] = copy;
            }
        }

        return that;
    };

    backpack.fn = backpack.prototype = {

        constructor: backpack,

        init: function () {

            return this;
        },

        version: "0.0.4",

        parseLocalStorage : function (key) {

        var value = localStorage.getItem(key);

        if (!value) {
            return {};
        }

        return JSON.parse(value) || {};

    },

        getTemplates: function (remove) {

            var that = this,
                i, temp,
                t = document.querySelectorAll("script[type='" + this.settings.templateType + "']"),
                templates = that.parseLocalStorage("templates");

            for (i = 0; i < t.length; i++) {

                temp = t[i];

                templates[temp.id] = temp.innerHTML.replace(/(\r\n|\n|\r)/gm, "");

                if (remove) {

                    if (temp.parentNode) {
                        temp.parentNode.removeChild(temp);
                    }
                }

            }

            localStorage.setItem("templates", JSON.stringify(templates));

            return templates;

        },

        //keep
        getTemplate: function (id) {

            return "<script type='" +
                        this.settings.templateType
                        + "'>" + localStorage.getItem(id) + "</script>";

        },

        //keep
        updateViews: function (selector) {

            var i, views = document.querySelectorAll(selector);

            for (i = 0; i < views.length; i++) {
                this.saveViewToStorage(views[i]);
            }

        },


        //keep, but modify the promise stuff, take it out 4 now
        saveViewToStorage: function (e) {

            if (typeof e === "string") { //assume this is the element id
                e = document.getElementById(e);
            }

            if (e) {

                this.storeViewInfo(this.parseViewInfo(e));

                if (e.parentNode && !(e.className.search(this.settings.currentClass) > -1)) {
                    e.parentNode.removeChild(e);
                }

                e = undefined;
            }

        },

        //keep, but update
        parseViewInfo: function (ve) {

            return {
                pageId: ve.id,
                viewTitle: (ve.hasAttribute("data-title") ?
                                ve.getAttribute("data-title") :
                                this.settings.defaultTitle),
                tranistion: (ve.hasAttribute("data-transition") ?
                                ve.getAttribute("data-transition") :
                                ""), //need a nice way to define the default animation
                content: ve.outerHTML
            };

        },

        //keep
        storeViewInfo: function (viewInfo) {

            viewInfo = $.extend({}, this.pageSettings, viewInfo);

            localStorage.setItem(this.settings.appName + "-" + viewInfo.pageId,
                            JSON.stringify(viewInfo));

        },

        //keep
        getViewData: function (viewId) {

            var viewData = localStorage[this.settings.appName + "-" + viewId],
                view;

            if (!viewData) {

                view = document.getElementById(viewId);

                if (view) {

                    this.saveViewToStorage(view);
                    viewData = window.localStorage[this.settings.appName + "-" + viewId];
                }
            }

            if (viewData) {
                return JSON.parse(viewData);
            }

        },

        settings: {
            viewSelector: ".content-pane",
            defaultTitle: "A Really Cool SPA App",
            deferredTimeKey: "lastDeferredTime",
            templateType: "text/x-mustache-template",
            currentClass: "current",
            appName: ""
        },

        pageSettings: {
            pageId: "",
            url: "",
            css: undefined,
            js: undefined,
            templates: "",
            content: "",
            defaultTemplate: "#DefaultViewTemplate"

        }

    };

    // Give the init function the backpack prototype for later instantiation
    backpack.fn.init.prototype = backpack.fn;

    return (window.backpack = backpack);

})(window);


