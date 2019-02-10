# SoPOC

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## What is the difference between imports, declarations, and providers?

Imports, declaration and provides are important properties of ngModules metaData

#### imports:
    Angular has it own modularity system, root(app) module must be aware of the third party/custom module before compiling its component, Thus imports array is used import and register all third party/custom module with root mdoule, else you will se Template Parsing Error: Unknown element
#### declarations:
    Angular follows component based architecture instead of MVC. Each module must be aware of the third party/custom component before compiling all its component, Thus decalrations array is used import and register all third party/custom components with the module, else you will see Template Parsing Error: Unknown element
#### Providers:
    angular has Dependency Injection Framework built into it. What it does
	i. The injector is the main mechanism. Angular creates an application-wide injector for you during the bootstrap process, and additional injectors as needed. You don't have to create injectors.
	ii. An injector creates dependencies, and maintains a container of dependency instances that it reuses if possible.
	iii. A provider is an object that tell an injector how to obtain or create a dependency.
		
	Step1 : Indicate dependency to angular in constructor of the component  as below
        …
        constructor(private dataService: DataService) { }
        …
    So when angular going to create an instance of its component, it can inject the dependencies.
		
    Step2 : For any dependency that you need in your app, you must register a provider with the app's injector(i.e. Providers array in the corresponding module), so that the injector can use the provider to create new instances

## What is the difference between components, directives, models, modules, and services?

#### modules:
    "Modules are logical boundaries within your angular application"
    Angular apps are modular and Angular has its own modularity system called NgModules.
    NgModules are containers which provides a compilation context for their components dedicated to an application domain.

#### components:
    Component is a directive with a template where you can define application logic—what it does to support the view—inside a class. The class interacts with the view through an API of properties and methods
    Simply said Component is a directive with a template responsible to glue template, services, data within compilation context

#### directives:
    Angular templates are dynamic. 
    When Angular renders them, it transforms the DOM according to the instructions given by directives
    There are three kinds of directives in Angular:
    i. Components—directives with a template.
    ii. Structural directives—change the DOM layout by adding and removing DOM elements.
    iii. Attribute directives—change the appearance or behavior of an element, component, or another directive.
#### services:
    A service is typically a class with a narrow, well-defined purpose. 
    Ideally, a component's job is to enable the user experience and nothing more.
    A component can delegate certain tasks to services, such as fetching data from the server, validating user input, or logging directly to the console. By defining such processing tasks in an injectable service class, you make those tasks available to any component. You can also make your app more adaptable by injecting different providers of the same kind of service, as appropriate in different circumstances
#### models:
    Generally models can be think of representing the data entity like a Promotion
    You can think models as POJO in java and POCO in .net
    Main benefit to use models is intellisense that Typescript provides when data from serivce is mapped to the model

## Marcopolo Game - solution

#### Source Code 

 private _marcoPolo() {
    var cheetSheet = '';
    for (var i = 1; i <= 100; i++) {
      cheetSheet += `${this._testSequence(i)},`;
    }
    this.marcoPoloCheetSheet = cheetSheet.substring(0, cheetSheet.length - 1);
    console.log(cheetSheet); // output cheetSheet on console
  }
  
  private _testSequence(num) {
    if (num % 4==0 && num % 7 ==0) {
      return 'marcopolo';
    }
    if (num % 4 == 0) {
      return 'marco';
    }
    if (num % 7 == 0) {
      return 'polo';
    }
    return String(num);
  }


