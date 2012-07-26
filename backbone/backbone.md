#Backbone Talk
##July 26th 2012
<br>
<br>
<br>
<br>
![Backbone.js](imgs/backbone.png)

---
#What is Backbone
Backbone.js gives structure to web applications by providing **models** with key-value binding and custom events, **collections** with a rich API of enumerable functions, **views** with declarative event handling, and connects it all to your existing API over a RESTful JSON interface.

---
##A Backbone Model

    !javascript
    var Person = Backbone.Model.extend({
        defaults: {
            Name: null,
            Age: null
        }
    });

    var elliot = new Person({
        Name: "Elliot",
        Age: 10/12
    });

    print(elliot.get("Name"));
