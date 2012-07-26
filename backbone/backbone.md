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

---
##Model Attributes

- In order to distinguish methods from attributes of the model backbone stores all attributes in the **attributes** property
- The attributes property is what is JSONified and sent to the server when you do `model.save()`

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

When you perform an attribute change on a backbone model it fires change events to notify interested parties of the change

    !javascript

    elliot.on("change:Age",function(model, age){
        print("Happy Birthday!\n You are " + 
               age + " years old\n");
    });

    elliot.set("Age", 2);
    elliot.set("Age", 3);

---
##Persistence

- If you provide a model with a url then you can utilize several helper function to communicate with the backend
- This is usually done in the model constructor

. 

    !javascript
    var Person = Backbone.Model.extend({
        url : "/api/kids"
        defaults: {
            Name: null,
            Age: null
        }
    });

---
##Save

- When using `model.save()` an ajax request is made to the specified url
- If the model is `isNew()`, it was created on the client, then backbone will make a request to the url with a HTTP `POST`. For example `/api/kids`
- If the model is `!isNew()`, it has been saved or was provided by the server, then a HTTP `PUT` will be used and the models `id` will be appended to the url. For example `/api/kids/1`
- If a model does not have a url of its own, but is part of a collection the url of the collection will be used

---
#Destroy

- backbone provides a `destroy()` method that works similiarly to save except that an HTTP `DELETE` is sent to the specified url
- If the model `isNew()` then destroy will not make a request to the server
- When a model is destroyed it fires a destroy event

.

    !javascript
    var workItem = new WorkItem({
        Name: "my work item"
    });

    workItem.on("destroy", function(model){
        print('"' + model.get("Name") + 
              '"\n' + " has been destroyed");
    });

    workItem.destroy();



---
#Persistence Options
Backbones persistence methods `save` and `destroy` accepts `success` and `error` callbacks 
For example:

    !javascript
    var WorkItem = Backbone.Model.extend({
        url: "api/workItems",
        defaults: {
            Name: null
        }
    });

    var workItem = new WorkItem({
        Name: "my work item"
    });

    workItem.save({
        success: function(){
            alert("saved");
        },
        error: function(){
            alert("error");
        }
    });

---
#Collections
- Backbone has a construct called `Collections` that is a group of models
- Collections have methods such as `add`, `remove`, and `get`

.

    !javascript
    var WorkItemCollection = Backbone.Collection.extend({
        model: WorkItem
    });

    var workItems = new WorkItemCollection();
    workItems.add(
        new WorkItem({
            Name: "workitem 1"
        })
    );

    print("");
    print("");
    printJSON(workItems.models);

---
#Collection Add Event
- Backbone collections have several events that are triggered including `add` and `remove`

.

    !javascript
    var workItems = new WorkItemCollection();
    workItems.on("add", function(model){
        printJSON(model);
    });

    var workItem1 = new WorkItem({
        Name: "workitem 1"
    });
    workItems.add(workItem1);

    workItems.add(
        new WorkItem({
            Name: "workitem 2"
        })
    );

    //For next slide
    window.workItem1 = workItem1;
    window.workItems = workItems;

---
#Collection Remove Event

    !javascript
    workItems.on("remove", function(model){
        print("removed:");
        printJSON(model);
    });
    workItems.remove(workItem1);


---
#Backbone Views

From the Backbone docs:


> The general idea is to organize your interface into logical views, backed by models, each of which can be updated independently when the model changes, without having to redraw the page. Instead of digging into a JSON object, looking up an element in the DOM, and updating the HTML by hand, you can bind your view's render function to the model's "change" event — and now everywhere that model data is displayed in the UI, it is always immediately up to date.

---
#A backbone view example

<ul class="work-items">
    <li>work item1</ul>
</ul>

    !javascript
    var WorkItemView = new Backbone.View.extend({
        tagName: "li",
        render: function(){
            this.$el.html(this.model.get("Name"));
        }
    });
    var workItem2 = new WorkItem({Name: "work item2"});

    var workItemView = new WorkItemView({
        model: workItem2
    });
    
    $('.work-items').append(workItemView.render());
