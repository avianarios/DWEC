"use sctrict";
/*JavaScript provides a Number primitive type and a Number object
Primitive type is lighter, more efficient in terms of being stored in memory and easier to use. However, sometimes it is recommended to use an object: 
    -Store additional properties
    -Interoperability with APIs expecting objects
    -Using some methods and properties of Number object like Number.MAX_VALUE...
    -Objects can mutate, change their value and they are still the same object, pointing to the same memory location. Primitive types, can't. You can assign a new value to the same variable, but this is a new reference although it keeps the same variable name. Advantage: saves memory and allows to share values


Number object is focused on representation of numbers and individual operations on them like verification, conversion or access

Some properties:
    Number.MAX_VALUE: El valor numérico más grande representable en JavaScript (~1.7976931348623157e+308).
    Number.MIN_VALUE: El valor numérico más pequeño representable (~5e-324).
    Number.NaN: Representa el valor "Not-A-Number" (NaN).
    Number.NEGATIVE_INFINITY: Representa el valor de infinito negativo.
    Number.POSITIVE_INFINITY: Representa el valor de infinito positivo.
    Number.MAX_SAFE_INTEGAER: Máximo número entero positivo que se puede representar de manera segura utilizando el tipo de dato Number.
*/

//////////////////
////properties////
//////////////////
console.log("Number.MAX_VALUE:", Number.MAX_VALUE); // The largest representable number in JavaScript
console.log("Number.MIN_VALUE:", Number.MIN_VALUE); // The smallest representable number in JavaScript
console.log("Number.NaN:", Number.NaN); // Represents the "Not-A-Number" value
console.log("Number.NEGATIVE_INFINITY:", Number.NEGATIVE_INFINITY); // Negative infinity
console.log("Number.POSITIVE_INFINITY:", Number.POSITIVE_INFINITY); // Positive infinity
console.log("Number.MAX_SAFE_INTEGER:", Number.MAX_SAFE_INTEGER); // The largest integer that can be safely represented using the Number type



///////////////////////////////
////JavaScript is imprecise////
///////////////////////////////
//Javascript uses IEEE754 DP to storage real numbers: 1 bit for sign, 52 for mantissa and 11 for exponent
//integer number rank: -2^53+1 to 2^53-1
//Despite being able to work with big numbers, it has problems with small, extra big numbers or certain fractions

//example 1: not enoght room for such a big number
console.log (1e500); //not enough room for storing such a big number. Returns Infinity

//example 2: problems representing some real numbers
//due to the way JS represents real numbers, some of them can't be accurately represented in floating point
//9999999999999999 is just over 2^53-1, so it can't be accurately represented. Number is rounded to the next one that can be represented
console.log(9999999999999999);  //returns 10000000000000000

//example 3: problems representing some real numbers
//for better precision, libraries like Decimal.js, Big.js or bignumber.js should be used
//translation 0.1 and 0.2 into binary gives infinite decimals
let sum = 0.1 + 0.2; 
console.log (sum)   //0.30000000000000004
console.log ( sum == 0.3 ); // false

//example 4: how to fix unaccurately real number representation
//toFixed rounds the result using n digits after the point and returns it as a string
console.log( sum.toFixed(2)==0.3 ); // true 

//example 5: using BigInt
//BigInt doesn't represent numbers by using FP. Therefore, its limit when representing a number is the system memory
//it represents only integer numbers. an "n" has to be appended at the end of the number
const maxSafeNumber = Number.MAX_SAFE_INTEGER; // 9007199254740991

// Trabajando con Number (fuera del rango seguro)
const num1 = maxSafeNumber + 1; // 9007199254740992
const num2 = num1 + 1; // ¿Debería ser 9007199254740993?
const num3 = num2 + 1; // ¿Debería ser 9007199254740994?

// Trabajando con BigInt (precisión absoluta)
const big1 = BigInt(maxSafeNumber) + 1n; // 9007199254740992n
const big2 = big1 + 1n; // 9007199254740993n
const big3 = big2 + 1n; // 9007199254740994n

console.log("Con Number:");
console.log("Primer número (MAX_SAFE_INTEGER + 1):", num1); // 9007199254740992
console.log("Siguiente número:", num2); // 9007199254740992 (incorrecto)
console.log("Otro más:", num3); // 9007199254740992 (incorrecto)

console.log("\nCon BigInt:");
console.log("Primer número (MAX_SAFE_INTEGER + 1n):", big1); // 9007199254740992n
console.log("Siguiente número:", big2); // 9007199254740993n (correcto)
console.log("Otro más:", big3); // 9007199254740994n (correcto)


/////////////////////////
////creating a number////
/////////////////////////
//Number object utilizes DP representation  
//Example 1: primitive types
let numero_primitivo1=5;
let numero_primitivo2=10;

//Example 2: Creating a Number Object
let numero_objeto1=new Number(5);   //object
let numero_objeto2=new Number(10);
let numero_no_valido=new Number("hola");    //NaN

//Example 3: a Number Object allows to define properties. Impossible with primitive types
numero_objeto1.maximo=4;

//Example 4: a Number Object allows to share its value
//valueOf extracts the primitive value of the object
let numObj1 = new Number(42);
let numObj2 = numObj1;

numObj2.valueOf() += 1;  // Cambia el valor de numObj1 y numObj2

console.log(numObj1);
console.log(numObj2);

//Example 5: What would happen if not using valueOf?
let numObj1 = new Number(42);
let numObj2 = numObj1;

numObj2++;  // numObj2 is converted to primitive value
console.log(numObj1, typeof numObj1);
console.log(numObj2, typeof numObj2);

//Example 6: performing operations with objects
let numObj1 = new Number(42);
let numObj2 = numObj1;

console.log(numObj1+numObj2);   //equivalent to numObj1.valueOf()+numObj2.valueOf()
console.log (numObj1+4);    //equivalent to numObj1.valueOf()+4



//////////////////
////comparison////
//////////////////

//primitive values can be directly compared among them. Object Number can't. They are compared as references meaning they are equal only if they point to the same memory location
let a=42;
let b=new Number(42);
let c=new Number(42);

console.log (a === 42);       // true, comparación directa de primitivos
console.log (b === 42);       // false, b es un objeto, no un primitivo
console.log (b == 42);        // true, el valor de `b` se convierte para la comparación
console.log (b==c); //false. They point to different memory locations, although they have the same value
console.log (b.valueOf()==c.valueOf());     //true



////////////////////////////
////checking information////
////////////////////////////
/* There are global functions and Number object methods that perform similar operations:
    - Global functions -> Work on all types of values. They convert the argument to a number before performing the operation. Example: isFinite(), isNaN().
    - Number object static methods -> Work strictly on primitive numbers. They do not convert the argument into a number and are stricter than global functions. Example: Number.isFinite(), Number.isNaN().
*/


//example 1: isFinite returns true if it's a finite number
//Performs automatic type conversions. If the argument is not a number, it attempts to convert it to a number before checking.
//It is more permissive than Number.isFinite() because it accepts other data types (such as strings or booleans) and implicitly converts them to numbers before checking if they are finite.
console.log(isFinite(5),
            isFinite(new Number(5)),
            isFinite(new Number(5).valueOf()),
            isFinite(Infinity), 
            isFinite(NaN), 
            isFinite(null), 
            isFinite("10"),
            isFinite(false),
            isFinite("Pepito piscinas"));

//Does not perform automatic type conversions. Only returns true if the argument is a finite primitive number. 
//It is stricter than the global version, as it only considers a value as finite if it is a number.
console.log(Number.isFinite(5),
            Number.isFinite(new Number(5)),
            Number.isFinite(new Number(5).valueOf()),
            Number.isFinite(Infinity), 
            Number.isFinite(NaN), 
            Number.isFinite(null), 
            Number.isFinite("10"),
            Number.isFinite(false),
            Number.isFinite("Pepito piscinas"));

//Example 2: It checks if the argument is the value "NaN". It doesn't check if it is not a number.
//isNaN tries to convert argument to a number and returns true if the argument is "NaN"
console.log (isNaN(5), 
            isNaN(new Number(5)),
            isNaN(new Number(5).valueOf()),
            isNaN(Infinity), 
            isNaN(NaN), 
            isNaN(null), 
            isNaN("10"), 
            isNaN(false), 
            isNaN("Pepito piscinas"));

//It doesn't try to convert it to number
console.log (Number.isNaN(5),
            Number.isNaN(new Number(5)),
            Number.isNaN(new Number(5).valueOf()),
            Number.isNaN(Infinity),
            Number.isNaN(NaN),
            Number.isNaN(null),
            Number.isNaN("10"),
            Number.isNaN(false),
            Number.isNaN("pepito piscinas"));

//Example 3:method isInteger. There's no global function
//Static Method of Number object. It doesn't convert to number
console.log (Number.isInteger(5),
            Number.isInteger(new Number(5)),
            Number.isInteger(null),
            Number.isInteger("10"),
            Number.isInteger(false)
);


//////////////////
////Conversion////
//////////////////

//Example 1: valueOf converts the object to its primitive value counterpart
let objNum1 = new Number(10);       // Objeto Number con valor 10 (entero)
let objNum2 = new Number(10.5);     // Objeto Number con valor 10.5 (no entero)

console.log(objNum1.valueOf(), typeof(objNum1.valueOf()));
console.log(objNum2.valueOf(),  typeof(objNum2.valueOf()));

//example 2: conversion to string by using toString method and String global function. Numeric system base can be specified
//using toString with a Number object, it first converts to a number and then applies toString.
console.log (new Number(Infinity).toString(),
            new Number(NaN).toString(),
            new Number(null).toString(),
            new Number(false).toString(),
            new Number(5).toString()
);

//toString ca be used this way due to the autoboxing (envoltura). JavaScript temporary creates this primitive value to an equivalent object
console.log(Infinity.toString(),  // "Infinity"
            NaN.toString(),       // "NaN"
            String(null),         // "null"
            false.toString(),     // "false"
            (5).toString()        // "5"
);

//string is a global function that converts correctly undefined and null
console.log (String(Infinity),
            String(NaN),
            String(null),
            String(false),
            String(5)
);


//Example 3: converting strings to numbers
//Global function Number (same name as Number Object)
//Converts any value passed to it (string, boolean, null, etc.) to a number (integer or decimal), regardless of the format of the string.
console.log(Number('100px'), // NaN
            Number('12.5em'), // Nan
            Number('12.5'), // 12.5
            Number('a12'), // NaN
            Number('12'), //12
            Number('0xff'), //255
            Number('0b1110'),  //14
            Number(true),   //1
            Number(null),   //0
            Number(undefined)   //NaN
            );

//parseInt and parseFloat are global functions that get a string and convert to a number
//They only work with text strings and convert it to an integer or real number, ignoring any non-numeric characters from the first invalid character onwards.
console.log(parseInt('100px'), // 100
            parseInt('12.5em'), //12
            parseInt('12.5'), //12
            parseInt('a12'), // NaN
            parseInt('ff',16), //255
            parseInt('1110',2),    //14
            parseInt(true), // NaN
            parseInt(null), // NaN
            parseInt(undefined) // NaN
            );

console.log(parseFloat('100px'), // 100
            parseFloat('12.5em'), //12.5
            parseFloat('12.5'), //12.5
            parseFloat('a12'), // NaN
            parseFloat('ff',16), //NaN
            parseFloat('1110',2),    //1110
            parseFloat(true), // NaN
            parseFloat(null), // NaN
            parseFloat(undefined) // NaN
            );

//Since ES6, Number object includes a reference to parseInt and parseFloat global functions for organization purposes. Therefore, they work the same way as global functions do
console.log(Number.parseInt('100px'), // 100
            Number.parseFloat('12.5em'), // 12.5
            Number.parseInt('a12'), // NaN
            Number.parseInt('12.5'), //12
            Number.parseInt('0xff',16), //base 16
            Number.parseInt(true),  // NaN
            Number.parseInt(null),  // NaN
            Number.parseInt(undefined)  // NaN
            );

//For clarity sake, if some methods or properties of Number object are in use, it's better to use Number static methods instead of global functions



