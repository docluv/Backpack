# backpack
## A Library to manage persisting a web application's markup in browser localStorage

backpack is a library to manage persistance of single page application views and data
templates in browser localStorage. It is designed to work in concert with [spajs](https://github.com/docluv/spajs)
and implements an interface the spajs library expects.

When used with spajs there is nothing the developer needs to do except create an instance
of backpack and pass it to spajs. backpack will then automatically parse markup, create
JSON objects, store them in localStorage and remove the target markup for views and templates
from the DOM.

Example from the (High Performance Single Page Web Applications reference application)[]:

var bp = backpack(),

_spa = spa({
    "appContext": movie,
    "bp": bp,
    "defaultPage": "homeview",
    "viewWrapper": "#main",
    "viewTransition": "slide",
    "defaultTitle": "Modern Web Movies"
});

The example is lifted from the source code from a (reference application)[https://github.com/docluv/movies],
(live demo)[http://movies.spawebbook.com]. The backpack instance is passed or injected
into the spajs object's instatiation.

Internally spajs calls backapck's updateViews method. This performs the parsing of
'view' elements based on either the default selector (".content-pane") or a custom 
selector passed to the constructor.

if (that.bp && (that.getParameterByName("_escaped_fragment_") === "")) {
    that.bp.updateViews(settings.viewSelector);
}

When a view is needed the getViewData function is called, passing the viewId. Both
backpack and spajs are keyed on an id value being specified for the view. This is how
the libraries synchronize views to controllers.

var view = this.bp.getViewData(newViewId);

backpack has a settings object that can be customized upon initialization:

        settings: {
            viewSelector: ".content-pane",
            defaultTitle: "A Really Cool SPA App",
            deferredTimeKey: "lastDeferredTime",
            templateType: "text/x-mustache-template",
            currentClass: "current",
            appName: ""
        },

When creating a new backapck instance pass in an object containing the properties
you wish to customize.

The getTemplates function can be called to scavenge for JavaScript templates based 
on the templateType settings value. By default backpack is designed to work with 
MUSTACHE using the 'text/x-mustache-template' type value. You can customize this to 
match the script type you are using. Note, backpack looks for script tags because
that is the defacto standard for JavaScript templating engines. In the future backpack
should be updated to be a little more flexible.

An example MUSTACHE template:

<script id="MoviePosterGridTemplate" type="text/x-mustache-template">
    {{#movies}}
    <div class="movie-target">
        <a href="#!movie/{{id}}/{{title}}">
            <img alt="{{title}}" src="{{poster}}" class="movie-grid-poster">
            <figcaption class="demo-photo-caption">{{title}}</figcaption>
        </a>
    </div>
    {{/movies}}
</script>

The getTemplates function accepts and optional parameter, remove, which indicates 
if the template should be removed from the DOM. By default backpack assumes this to 
be true as this is a best practice. Found templates are processed and persisted to 
localStorage. 

The getTemplate function can be used to retrieve a single template from localStorage.
It accepts a single parameter, the templates id.

backpack implements an assumed interface, since there is no such concept in JavaScript
as an interface found in static languages like C# or Java. The functions you must implement
to create a compatible library are:

* updateViews
* getViewData
* getTemplates
* getTamplate
* settings

(Mudbath)(https://github.com/docluv/mudbath) is another library I have under development
that leverage IndexDB to persist views and templates in the browser.

When the updateViews function or getTemplates functions are called backpack will simply
overwrite any updates to existing views and add new views to storage. This means you 
only need to return updated markup since the pravious call, reducing overhead for future
requests.




