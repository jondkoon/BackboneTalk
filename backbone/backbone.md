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
##A Simple Backbone Model

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

    //make global for subsequent slides
    window.Person = Person;
    window.elliot = elliot;

---
##Model Attributes

- In order to distinguish methods from attributes of the model backbone stores all attributes in the **attributes** property
- The attributes property is what is JSONified and sent to the server when you do `model.save`

.

    !javascript
    printJSON(elliot.attributes);


---
##Encapsulation

It is not best practice to access or modify attributes of a model directly

    !javascript
    print(elliot.get("Name"));

    //set can be passed an object
    elliot.set({
        Name: "Elliot Thomas",
        Age: 1
    });
    print(elliot.get("Name"));

    //or a key value pair
    elliot.set("Name","Elliot Thomas Koon");
    print(elliot.get("Name"));

---
##Model Events

hello



    


