"use strict";
//Object "object" is the base of any other object in JS. It is where the other objects inherit
/*built-in objects:

    -Object: They contain data collections (pair key-value) and functionality (methods). All every object inherits from object "object"
    -Array: It is an ordered list of values of any type enclosed into brackets. Example: [1, 2, 3, “pepe”, “jose”, true]  
    -String: Represents a chain of text
    -Function: It's an object representing an executable chunk of code that can be called anywhere. function sumar (a,b){ return a+b;}
    -Boolean: Although it exists a boolean object, it is recommended to use primitive type as it is simpler. You can evaluate a boolean object or its content. In the first case, if it exists it returns true, even if it contains false, which is confusing. Thus, using primitive type is preferred
    -Error handling objects, like Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError and URIError
    -Math. Provides mathematical functions
    -Date: An object to work with dates and time. new Date();
    -RegExp: An object to work with regular expressions. /\d+/
    -Data Structure: Map, Set, WeakMap and WeakSet
    -JSON
    -Promise and AsyncFunction
    -Console
*/
//////////////////////////////
//////Creating objects////////
//////////////////////////////
/*
Ways of creating objects:
  -Object literals: definition of an spare object
  -Factory functions: a function with parameters that returns an object with its own methods
  -Constructor functions: a constructor that creates an instace of an object
  -Classes (starting at mES6)
*/
//Example 1: using object literal
//defines a single, specific object at the time it is created.

//"this" is a reserved word that refers to the current execution context. Its value is defined when the method or property is called, not when it's defined. It depends on its execution context and it is different depending on how the function is called, whether as a method on an object, globally, as a callback function, or using call, apply, or bind.

//Using "this" allows you to write methods that work for any object that calls them. Instead of relying on the object name, which may or may not be the same in all cases, this always refers to the actual object, making your code more flexible, reusable and dynamic.

//When defining literal objects, there's no need to use "this" when defining the object's properties, because properties are created directly on the object. However, methods needs to  use "this" to access the object's properties.

const persona={
    id:1,
    nombre:"Procopio",
    edad:30,
    direccion:{
      calle:"pez",
      numero:3
    },
    saluda:function(){
      console.log (`hola soy ${this.nombre}`);  //references the current object
    },
    despidete(como){
      console.log (como);
    },
    pregunta:()=>console.log (`yo, ${this.nombre}, quiero preguntarte algo`);
};

/*create objects this way when...
  -...You need to create a simple object and do not plan to create multiple instances.
  -...The object does not require complex methods or logic.*/
  
/*Options to create a new object...
  -Option 1: duplicate the whole code of the first object and change its property's value inside the object (really inefficient)
  -Option 2: Object.assign
  -Option 3: Object.create
*/

//Example 2: creating several objects by using Object literal
//Option 1: duplicating code (highly inefficient)
const persona = {
  nombre: "Ascensio",
  saludar() {
      console.log(`Hola, soy ${this.nombre}`);
  }
};

const persona2 = {
  nombre: "Conrado",
  saludar() {
      console.log(`Hola, soy ${this.nombre}`);
  }
};

//Option 2 (Object.assign): assigning the object to an empty one and change its properties. There's no inheritance, each object receives a copy of properties and methods so code is duplicated in memory.
const personaProto = { 
  saludar() { console.log(`Hola, amigos, soy ${this.nombre}`); }
};
const persona1=Object.assign({}, personaProto);
const persona2=Object.assign({}, personaProto);
persona1.nombre="Torcuata";
persona1.saludar();
persona2.nombre="Urraca";
persona2.saludar();


//Option 3 (Object.create): creating a new object specifying its prototype (object it inherits from). There's inheritance, so each object has a prototype. Code is not duplicated in memory
const personaProto = {
  saludar() {
    console.log(`Hola, soy ${this.nombre}`);
  }
};

const persona1 = Object.create(personaProto); //doesn't work with nested properties
const persona2 = Object.create(personaProto); //doesn't work with nested properties
persona1.nombre = "Tiburcia";
persona1.saludar();
persona2.nombre = "Socorro";
persona2.saludar();

//Problem: both methods copy references to nested objects. This means that if you change a value in one instance's nested object, it will affect all instances that share that reference.


//Example 3: using a factory function (a function that returns an object)
//Everytime the function is called, a new object is generated with its own methods. There's no inheritance nor prototypes. Therefore, different objects don't share the same method in memory
//code can be reutilized to create new objects
/*use it when...
  -...you don't need prototypical inheritance
  -...If you need individual and complete instances without sharing methods through prototypes.
*/
const crearPersona = (nombre, edad) => {
  return {
      nombre, //as properties have the same name as parameters, parameter's name can be removed
      edad,
      saludar() {
          console.log(`Hola, soy ${this.nombre}`);
      }
  };
};

const persona1 = crearPersona("Eufrasio", 30);
const persona2 = crearPersona("Homobona", 25);


//Example 4: using a constructor function (traditional way of creating objects in JavaScript)
/*use it when...
  -...you need to create complex objects
  -...You need to create multiple instances of an object that share the same structure and methods.
  -...You want to use prototypical inheritance. (only if the methods are defined in the prototype)
*/
function Persona(nombre, edad) {
  this.nombre = nombre;
  this.edad = edad;
  this.saludar = function() {   //By defining inside, each object has its own copy of saludar, it is not shared in memory
      console.log(`Hola, soy ${this.nombre}`);
  };
}

const persona1 = new Persona("Eufrasio", 30);
const persona2 = new Persona("Homobona", 25);


//Alternative: using Persona.prototype which is a special object in JavaScript that acts as a template or ‘prototype’ shared by all instances created from the Persona constructor function. Each instance created by new Persona() inherits the properties and methods defined in Persona.prototype, allowing functionality to be shared without duplicating methods for each instance.
function Persona(nombre, edad) {
  this.nombre = nombre;
  this.edad = edad;
}

Persona.prototype.saludar = function() {    //saludar method defined at prototype
  console.log(`Hola, soy ${this.nombre}`);
};

const persona1 = new Persona("Eufrasio", 30);
const persona2 = new Persona("Homobona", 25);


//Example 5: using classes (ES6)
/*Same functionality that constructor function, but with modern sintax
Advantages:
  -Easier syntax
  -no need to manually create methods in prototype
  -it's easier to inherit. Just use the word "extends". With constructors, you need to use Object.create or Object.setPrototypeOf
  -use of "new" to create new classes is a must. With constructors, it can be bypassed, resulting in this refering to the global object or to undefined in strict mode.
*/

class Persona {
  constructor(nombre, edad) {
      this.nombre = nombre;
      this.edad = edad;
  }

  saludar() {   //shared in memory
      console.log(`Hola, soy ${this.nombre}`);
  }
}

const persona1 = new Persona("Eufrasio", 30);
const persona2 = new Persona("Homobona", 25);


///////////////////////////////////////////////
////accessing object properties and methods////
///////////////////////////////////////////////
//Example 1: by using dot
console.log (persona.nombre);    //returns value
console.log (persona.noExiste);    //returns undefined, but no error
console.log (usuario2.saluda());
console.log (usuario2.despidete("con dios"));
console.log (usuario2.pregunta());
console.log (perro1.saludar());

//Example 2: by using brackets
console.log (persona["cargo"]);     //by using brackets, complex field names can be used

//Example 3: accessing to properties by using dinamic names
let clave1=prompt("¿Qué elemento quieres crear?");
let valor=prompt("Dame la cantidad");
let obj2={
    [clave1]: valor
}
console.log (obj2);
console.log (obj2[clave1]);

//Example 4: brackets notation allows to calculate in real-time the key 
let llave=prompt("¿Qué quieres saber del usuario?");  //needs to be a valid key name
console.log(persona[llave]);    //llave=edad or nombre...


////////////////////////////////////////////////
////removing existing properties and methods////
////////////////////////////////////////////////
//Example 1: Removing properties
delete persona.edad;
console.log(persona.edad);

//Example 2: Removing methods
delete usuario2.saluda;
console.log(usuario2);


///////////////////////////////////////////////////////////////////////
////defining new properties and methods after the object is created////
///////////////////////////////////////////////////////////////////////
//Example 1: defining a property directly
persona.licenciado=false;
persona['lugar de nacimiento']="Roma";  //this name is only possible by using brackets
console.log(persona);

//Example 2: external assignment of an arrow function to a property
persona.saluda=()=>console.log ("hola a todos");
persona.saluda();

//Example 3: external assignment of an expression function to a property
let diHola2=function (saludo){
  console.log(saludo);
}

persona.saluda=diHola2;
persona.saluda("hola, estimado usuario");

//Example 4:  using defineProperty
//in this example, property is added to  define a property in the prototype of a constructor. The three properties can be omitted. Their default value is false
//it allows more control over this property 
let persona={};
Object.defineProperty(persona, 'nombre', { 
  value: 'Ursicino',
  writable: false,  // El valor no se puede cambiar
  enumerable: true,  // Se puede listar en bucles
  configurable: false  // No se puede eliminar ni reconfigurar
});

console.log(persona.nombre);  // "Ursicino"
persona.nombre = 'Venancio';  // No tiene efecto
console.log(persona.nombre);  // Sigue siendo "Ursicino"
delete persona.nombre;    //not allowed due to configurable:false
console.log(persona.nombre);  // Sigue siendo "Ursicino"


//Example 5: using defineProperty to define a new method in the prototype of the object
function Persona(nombre, edad) {
  this.nombre = nombre;
  this.edad = edad
}

Object.defineProperty(Persona.prototype, 'saludar', {
    value: function() {
        console.log(`¡Hola!, soy ${this.nombre}`);
    },
    writable: false,    // No se puede modificar el método
    enumerable: true,   // Se incluye en enumeraciones
    configurable: true  // Se puede eliminar o modificar
});

const persona1=new Persona("Obdulio", 35);
persona1.saludar();  // "¡Hola!, soy Obdulio"

// Intentar cambiar el método
persona1.saludar = function() {
    console.log("¡Adiós!");
};

persona1.saludar();  // "¡Hola!, soy Obdulio". The method is not overriden due to writable: false
delete persona1.prototype.saludar;    // Eliminar el método
persona1.saludar();  // Error: El método ya no existe en el prototipo


/////////////////////////////////////
////checking if a property exists////
/////////////////////////////////////
//Example 1: using  hasOwnProperties (older, not recommended) to check if an object has a non inherited property
//every object inherits hasOwnProperty method from Object.prototype
const objeto = { a: 1 };
console.log(objeto.hasOwnProperty('a')); // true
console.log(objeto.hasOwnProperty('b')); // false

const objetoHeredado = Object.create(objeto);
console.log(objetoHeredado.hasOwnProperty('a')); // false


//Example 2: using hasOwn (ES13 or ECMAScript 2022), to check if an object has a property. Similar to hasOwnProperty
//hasOwn is a static method of the object Object. It is not inherited by any object. It can only be summoned directly over Object
const objeto = { a: 1 };
console.log(Object.hasOwn(objeto, 'a')); // true
console.log(Object.hasOwn(objeto, 'b')); // false

const objetoHeredado = Object.create(objeto);
console.log(Object.hasOwn(objetoHeredado, 'a')); // false


//Example 3: using "in" to check if an object has a property, inherited or own
const objeto = { a: 1 };
console.log('a' in objeto); // true
console.log('b' in objeto); // false

const objetoHeredado = Object.create(objeto);
console.log('a' in objetoHeredado); // true (heredada)


////////////////////////////////////////////
////preventing object from being changed////
////////////////////////////////////////////
//example 1: object.freezes
//adding, removing or modifying properties isn't allowed
const persona = { nombre: 'Juan', edad: 30 };
Object.freeze(persona);

persona.edad = 31;  // No tiene efecto
persona.genero = 'masculino'; // No se puede agregar
delete persona.nombre; // No se puede eliminar

console.log(persona);  // { nombre: 'Juan', edad: 30 }


//example 2: object.seal
//adding or removing properties isn't allowed
const persona = { nombre: 'Juan', edad: 30 };
Object.seal(persona);

// Intentos de modificación
persona.edad = 31;  // Esto funciona, se modifica la propiedad existente
persona.genero = 'masculino'; // No se puede agregar, ya que el objeto está sellado
delete persona.nombre; // No se puede eliminar, ya que el objeto está sellado

console.log(persona);  // { nombre: 'Juan', edad: 31 }


//example 3: Object.preventExtensions
//adding new properties isn't allowed
const persona = { nombre: 'Juan', edad: 30 };
Object.preventExtensions(persona);

// Intentos de modificación
persona.edad = 31;  // Esto funciona, se modifica la propiedad existente
persona.genero = 'masculino'; // No se puede agregar, ya que el objeto no puede extenderse
delete persona.nombre; // Esto funciona, se puede eliminar una propiedad existente

console.log(persona);  // { edad: 31 }


//////////////////////////////////////////
///////iterating through properties///////
//////////////////////////////////////////
const persona = { nombre: "Procopio", cargo: "Prefecto", edad: 29};
/*Three important methods
  Object.keys -> returns an array with the name of the properties
  Object.values -> returns an array with the value of the properties
  Object.entries -> returns an array with a pair key-value
*/

//Example 1: traditional for
let valores=Object.values(persona);        //llaves=['name', 'age']
for (let i=0; i<valores.length; i++){       //traditional for
    console.log (valores[i]);
}

//Example 2: for...in -> non-iterable object
//Objects can be classified as iterable and non-iterable. Both of them have special for structures to iterate over that makes it easier than traditional for
//How do I know if it's an iterable object?
console.log (persona[Symbol.iterator]);  //if returns undefined, it is not iterable
for (let clave in persona) {
  console.log(clave, persona[clave]);
}

//Example 3: for of... (Object.keys returns an iterable array)
const claves=Object.keys(persona);
for (const clave of claves) {
  console.log(`${clave}: ${persona[clave]}`);
}

//Example 4: forEach
Object.values(persona).forEach((valor) => {
  console.log(valor);
});

Object.entries(persona).forEach(([key,value]) => {
  console.log(`${key}: ${value}`);
});

//Example 5: a property defined as enumerable:false is not shown when iterating over object's properties
let persona = {
  nombre: "Juan",
  edad: 30
};

// Definimos una nueva propiedad "salario" con enumerable: false
Object.defineProperty(persona, "salario", {
  value: 50000,
  enumerable: false
});

// Intentamos enumerar las propiedades del objeto "persona"
for (let key in persona) {
  console.log(key); // Solo mostrará "nombre" y "edad"
}

// Probamos con Object.keys
console.log(Object.keys(persona)); // ["nombre", "edad"]

// Sin embargo, podemos acceder a la propiedad "salario" directamente
console.log(persona.salario); // 50000


/////////////////////////
/////Copying objects/////
/////////////////////////
//From a practical point of view, objects with the same properties and values but different order are functionally equivalent, and if you work with them, they will behave in the same way. The order of the properties does not change how you can access them or their meaning within the program. Objects should be considered different when there are differences in the number or name of properties or in their values.

//Example 1: copying and comparing variables by using == or ===
let aux="hola";
let aux2=aux;   //When a variable is assigned to another one a new pointer to a new memory position is created and the same value is stored in that position. Therefore, both of them are different elements at different memory positions
console.log (aux==aux2, aux===aux2);    //true, true. when comparing variables, only their value are compared

aux2="adios";   //Since both of them point to different memory locations, when modifying aux2, aux still holds its value
console.log (aux==aux2, aux===aux2);    //false, false

//Example 2: copying objects with Object.assign method
//copy one ore more objects into another (to create two different objects with the same values)
persona1={
    nombre:"pepe",
    profesion: "fontanero"
};
persona1.edad=33;

persona2={
    nacionalidad:"Española"
}

let persona3=Object.assign({}, persona1, persona2);  //copy persona1 and persona2 into an empty object ({}) and the assigns it to persona3
let persona4={};
Object.assign(persona4, persona3);  //copy persona3 into persona4
console.log(persona3, persona4);

//Example 3: Object.assign doesn't work with nested objects
//Object.assign creates a reference to nested objects, it does not copy them
persona1={
  nombre:"pepe",
  profesion: "fontanero",
  medidas: {
      altura:180,
      pecho: 100,
  }
};

let persona2=Object.assign({}, persona1);   //first level of persona1 is copied by value (they are different copies of the same object in different locations in memory) whereas nested levels are copied by reference (they are pointers pointing to the same object)
persona2.nombre="juan"; //if persona2 is modified so is persona1
persona1.medidas.altura=170;
console.log(persona1, persona2);


//Example 4: deep clone with global function structuredClone
//structuredClone copies by value nested objects (deep clone). They are not references, but copies pointing to different memory locations.
//structuredClone does not use prototypical inheritance
persona2=structuredClone(persona1);   //all levels are copied by value
persona1.medidas.altura=200;  //if persona1 is modified, so is not persona2
console.log(persona1, persona2);


///////////////////////////
/////Comparing objects/////
///////////////////////////
//example 1: comparison with == and ===
//objeto1 and objeto2 point to the same memory location. Second object it's just a reference to the first one
let objeto1=objeto2={
    nombre:"pepe",
    profesion: "fontanero"
};

let objeto3={
    nombre:"pepe",
    profesion: "fontanero"
};
objeto1.nombre="fede";  //if objeto1 is changed, so is objeto2, as they both point to the same memory location
console.log(objeto2.nombre);
objeto3.nombre="fede";

//equal or strictly equal can't be used to compare. They only check if objects points to the same memory location
console.log (objeto1==objeto2); //true. They both point to the same memory location
console.log (objeto1==objeto3); //false. Despite both of them have the same elements (everybody would say they are "they are equals"), they are different objects, meaning each one points to its own memory location, and this is what equal measures
console.log (objeto1===objeto2);    //true
console.log (objeto1===objeto3);    //false. when using === with objects, JS not only verifies their type, but if both objects point to the same memory location


//example 2: (solution) comparing by using a custom function
function areObjectsEqual(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    
    if (keys1.length !== keys2.length) {
      return false;
    }
  
    for (let key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
  
    return true;
}
  
console.log(areObjectsEqual(obj1, obj3)); // true
console.log(areObjectsEqual(obj4, obj5)); // true

//next solution, using an external library like lodash with specific methods for comparing, will be discussed it in a later unit


////////////////////////////////////////
////Common mistakes regarding "this"////
////////////////////////////////////////
/*
Remember: "this" is a reserved word that refers to the current execution context. Its value depends on its execution context and it is different depending on how the function is called: a method on an object, globally, as a callback function, or using call, apply, or bind.

Remember: Using "this" binds properties and methods to the object that calls them (except in an arrow function), allowing to work with them outside the object. If not used, properties and methods would be local variables and getters and setters would be needed to access and modify them (we'll cover later)
*/

//Example 1: Mistake nº1: not using "this" in constructor's properties.
//Not using "this" makes these variables to be local and, therefore, being unaccesible from outside the object (unless using getters and setters)
function Persona(nombre, edad) {
  nombre=nombre;
  edad=edad;
}
Persona.prototype.saludar = function() {
  console.log(`Hola, soy ${this.nombre}`);   //"this" is needed as I'm accessing an object property from outside it. Here, it's not working as nombre and edad are local variables only existint at Persona's constructor function
};

const persona1 = new Persona("Eufrasio", 30);
persona1.saludar();
const persona2 = new Persona("Homobona", 25);
persona2.saludar();


//Example 2. Mistake nº2: using object name instead of "this" in methods
function Producto(nombre, precio) {
  this.nombre = nombre;
  this.precio = precio;
};

Producto.prototype.aplicarDescuento=function(producto, porcentaje) {
  const descuento = producto.precio * (porcentaje / 100);
  console.log(`El precio con descuento es: ${producto.precio - descuento}`);    
};


const producto1 = new Producto("Zapatos", 100);
const producto2 = new Producto("Camisa", 50);

producto1.aplicarDescuento(producto2, 20);
/*problems
  -the object has to be passed as an argument to the method. If the method changes in the future, every single call to the method must be changed. Besides, it's redundant and difficult to maintain
  -Despite not having any sense, you can call producto.aplicarDescuento(producto2,20); What does it mean? it's confusing

if "this" were removed...
  -...only from nombre and precio, they couldn't be used outside the object. Since it's producto1 who is calling aplicarDescuento over producto2 properties, the method would return NaN
  -...only from aplicarDescuento, it couldn't be used outside the object. The call would return an error
  */

//solution 1: using this when declaring properties and at the method
function Producto(nombre, precio) {
  this.nombre = nombre;
  this.precio = precio;
  };
};

Producto.prototype.aplicarDescuento=function(porcentaje){
  const descuento = this.precio * (porcentaje / 100);
  console.log(`El precio con descuento es: ${this.precio - descuento}`);
};

const producto1 = new Producto("Zapatos", 100);
const producto2 = new Producto("Camisa", 50);

producto1.aplicarDescuento(20); // El precio con descuento es: 80
producto2.aplicarDescuento(10); // El precio con descuento es: 45

//solution 2: not using "this" when declaring properties and using getters and setters (we'll cover later)


//Example 3: mistake nº3: working with "this" in arrow functions

/*"this" doesn't work with arrow functions
A traditional function define its context when it is called.
An arrow function has its own context defined since it's created (lexical context). An arrow function is defined in the global scope, so "this" inherits from the global context (could be window in a web browser or global in node.js), not the object that called the method. So when you call usuario.saluda(), this.name does not find the nombre property in the global scope, resulting in undefined.
*/
let usuario={nombre:"Sandalio"}
usuario.saluda=()=>{
  console.log("Hola soy "+this.nombre);
};
usuario.despidete=function(){
  console.log (`Adiós, soy ${this.nombre}`);
};

usuario.saluda();
usuario.despidete();

//solution: define arrow function as a regular function
let usuario = { nombre: "Sandalio" };
usuario.saluda = function() {
  console.log("Hola soy " + this.nombre);
};
usuario.despidete = function() {
  console.log(`Adiós, soy ${this.nombre}`);
};

usuario.saluda();
usuario.despidete();


//Example 3: another example of "this" not working in an arrow function using a constructor function and prototypes
function Usuario(nombre) {
  this.nombre = nombre;
}

Usuario.prototype.saluda= () => {
  console.log("Hola soy " + this.nombre); // 'this' refers to the global context
};
Usuario.prototype.despidete = function() {
  console.log(`Adiós, soy ${this.nombre}`); // 'this' refers to the object that summons the method
};

const usuario = new Usuario("Sandalio");
usuario.saluda();   // Hola soy undefined
usuario.despidete(); // Adiós, soy Sandalio


//solution: convert arrow function into a regular function
function Usuario(nombre) {
  this.nombre = nombre;
  this.saluda = function(){
      console.log("Hola soy " + this.nombre);
  };
  this.despidete = function() {
      console.log(`Adiós, soy ${this.nombre}`);
  };
}

const usuario = new Usuario("Sandalio");
usuario.saluda();
usuario.despidete();
