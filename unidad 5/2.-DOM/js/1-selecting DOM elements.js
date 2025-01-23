/////////////////////
////DOM selectors////
/////////////////////
//Browser API//
/*
window is the global object. It represents the web browser window
document is a property of the window object representing the web page loaded. It is the DOM entry point to access any element.
document has properties as well, representing the elements in the web page:
    -html
    -head
    -body


Los métodos de selección de etiquetas devuelven los siguientes tipos de objetos:
    -HTMLElement
    -HTMLCollection
        -Se actualiza dinámicamente si se hacen cambios en el DOM
        -Se accede por índice numérico, por nombre o por id
        -Se recorre como una lista iterable
        -Se puede recorrer con for o con forEach si se convierte a Array (Array.from())
    -NodeList
        -No se actualiza si se hacen cambios en el DOM (salvo Node.childNodes)
        -Sólo se accede por índice numérico
        -Se pueden recorrer con forEach

Aquellos selectores que pueden devolver varios elementos, SIEMPRE devuelven una lista o colección, aunque haya uno o ningún nodo.       

NodeList or HTMLCollection are not Arrays. Main differences might be:
    -array methods, like push, pop, slice, join, shift... can't be used
    -HTMLCollection are dynamic, while Arrays are always static
*/

///////////////////////////////////////
////Methods that return HTMLElement////
///////////////////////////////////////

//Example 1: getElementById
//returns an element whose id matches a passed string.
let aux=document.getElementById("parrafo1");
console.log (aux);


//////////////////////////////////////////
////Methods that return HTMLCollection////
//////////////////////////////////////////

//Example 1: getElementsByTagName
//returns a collection of all the elements present in the document that have the specified tag name, in the order of their appearance in the document.
let aux2=document.getElementsByTagName("p");
console.log (aux2[0], aux2.length);

//Example 2: getElementsByClassName
//returns an HTMLCollection of elements that match the passed class name
let aux3=document.getElementsByClassName("parrafo_cuerpo");
console.log (aux3[0], aux3.length);



////////////////////////////////////
////Methods that return NodeList////
////////////////////////////////////

//Example 1:getElementsByName
//returns a NodeList of the elements that match the value of the name attribute with the passed string. Useful at forms
let aux4=document.getElementsByName("nombre");
console.log (aux4[0],aux4.length);

//Example 2: querySelector
// returns the first element within the document that matches the given selector
// There are some shortcuts: 
//  -document.querySelector("body") is equivalent to document.body
//  -document.querySelector("head") is equivalent to document.head
//  -document.querySelector("html") is equivalent to document.documentElement
console.log(document.head);
console.log(document.querySelector("section"));


//Example 3: querySelectorAll
//returns a NodeList of elements that matches with one or a group of CSS selectors. 
let nodos=document.querySelectorAll('ul > li:last-child');
console.log (nodo.length, nodo[0]);     //despide having just one node, it is still a NodeList


//Example 4: Iterating through querySelectorAll
nodos=document.querySelectorAll('li');
nodos.forEach(nodo=>{
    console.log (nodo);
})
