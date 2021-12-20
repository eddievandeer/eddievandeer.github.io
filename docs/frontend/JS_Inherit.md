---
title: 详解JavaScript中的继承
postTime: 2021-08-09
categories: 
- 前端笔记
- JavaScript
tags:
- JavaScript
- 继承
- 笔记
---

::: slot abstract

面向对象的编程中，讨论最多的话题就是继承了。很多面向对象的语言都支持两种继承，即接口继承和实现继承，前者是函数签名的继承，而后者继承的是实际方法。接口继承在 **ECMAScript** 中是不可能的，因为函数没有签名。因此在 **ECMAScript** 中只支持实现继承，这主要是通过原型链来实现的

> 这一段描述引用自《JavaScript高级程序设计（第四版）》中，继承这一章的开头。同时，本文中有很多内容是参照自高程的，也算是个人的阅读笔记和总结吧

在 JavaScript 中继承的方式是多种多样的，包括原型链继承，盗用构造函数继承，原型继承，寄生继承，寄生组合式继承。而在 **ECMAScript 2015** 也就是常说的 **ES6** 出现之后，新增了 `class` 这一定义类的方式，同时也带来了新的继承方式： `extends` 关键字

在本文中将会详细介绍上述提到的这些 JavaScript 中的继承方式

::: 

## 前言

> 面向对象的编程中，讨论最多的话题就是继承了。很多面向对象的语言都支持两种继承，即接口继承和实现继承，前者是函数签名的继承，而后者继承的是实际方法。接口继承在 **ECMAScript** 中是不可能的，因为函数没有签名。因此在 **ECMAScript** 中只支持实现继承，这主要是通过原型链来实现的。

这一段描述引用自《JavaScript高级程序设计（第四版）》中，继承这一章的开头。同时，本文中有很多内容是参照自高程的，也算是个人的阅读笔记和总结吧

在 JavaScript 中继承的方式是多种多样的，包括原型链继承，盗用构造函数继承，原型继承，寄生继承，寄生组合式继承。而在 **ECMAScript 2015** 也就是常说的 **ES6** 出现之后，新增了 `class` 这一定义类的方式，同时也带来了新的继承方式： `extends` 关键字

在本文中将会详细介绍上述提到的这些 JavaScript 中的继承方式



## 原型链继承

### 前置知识点

当在 JavaScript 中谈到继承时，只有一种结构可以实现这个特性：对象（**Object**）。 JavaScript 的每个对象都有一个内部指针 `[[Prototype]]`（或是私有属性 `__proto__` ，现已从Web标准中删除）指向他的原型（**prototype**），而这个原型本质是一个对象，它也有自己的原型对象，这样一层又一层的嵌套便形成了**原型链**，而这个原型链就是 JavaScript 实现继承的关键。根据定义，null是没有原型的，因此将它作为原型链的最后一环

JavaScript的对象在访问其属性时，不仅会在对象自身上找，还会在没找到的情况下顺着原型链一层一层往上搜寻，直到找到或到达原型链的末尾未找到而报错



### 实现

结合上述两种特性，我们可以很容易的想到原型链继承是如何实现的：

**将子类的原型设置为父类的一个实例，这样子类的实例就可以通过构建出来的原型链来对父类原型上的属性进行访问，** 使用代码描述如下：

~~~js
function SuperType() {
    this.property = 5
}

SuperType.prototype.getSuperValue = function () {
    console.log("SuperValue is: " + this.property);
}

function SubType() {
    this.subproperty = 10
}

// 继承SuperType，设置SubType的原型为SuperType的实例
SubType.prototype = new SuperType()
SubType.prototype.constructor = SubType

// 添加原型上的属性或方法需要在设置原型之后，否则会被覆盖
SubType.prototype.getSubValue = function() {
    console.log("SubValue is: " + this.subproperty);
}

const instance = new SubType()

instance.getSuperValue()	// SuperValue is: 5
instance.getSubValue()		// SubValue is: 10
~~~

上述代码中，创建了一个父类 SuperType ，和一个子类 SubType ，并将 SubType 的原型设置为 SuperType 的实例，同时将被覆盖的 SubType 原型上的构造函数重新设置为 SubType 函数。这两个类和最后创建的实例之间的关系图如下：

![image-20210620164940680](https://upyun.cavalheiro.cn/images/image-20210620164940680.png)

从图中可以看出，由于 SubType 的原型被替换成了 SuperType 类的实例，因此可以通过内部指针 `[[Prototype]]` 访问 SuperType 原型上的属性。同时因为是 SuperType 类的实例，所以 SubType 的原型上会包含 SuperType 中的 property属性 ， **若是对这个属性进行赋值操作，会在实例上创建 property 属性并赋值，而不会修改原型上的 property**



### 存在的问题

该方法能够很好的实现父类方法的继承，但在继承父类的**引用属性**时会有些问题。从上面我们可以看出，父类的实例属性在继承时会变成子类的原型属性，而原型中的引用属性是所有实例共享的，大多数情况下我们并不想这样，我们希望每一个实例都能有相应的属于自己的引用实例，例如说：

> 有一个教师类，包含一个属性students表示所教的学生，而此时一个数学老师类继承了这个教师类，由这个数学老师类创建了一班数学老师、二班数学老师两个实例，那他们就要共享这个students属性。但这两个老师不是教同一个班的，这样就导致乱套了

原型链继承还有第二个问题，**子类在实例化的时候不能向父类的构造函数传参**，因为这样做相当于直接修改原型，会影响所有的实例。再加上上面的引用属性的问题，导致原型链继承基本不会被单独使用



## 盗用构造函数

为了解决上述提到的引用属性的继承问题，提出了盗用构造函数的技术（也叫对象伪装或经典继承）。基本思路也很简单，就是在子类的构造函数中调用父类的构造函数。因为构造函数本质上还是一个函数，可以在调用时使用 `call()` 或 `apply()` 给父类构造函数指定执行的上下文为新创建的实例对象，以此来为创建的实例对象添加属性。具体的实现代码如下：

~~~js
function SuperType() {
    this.colors = ['red', 'green', 'blue']
}

function SubType() {
    // 盗用构造函数
    SuperType.call(this)
}

const instance1 = new SubType()
instance1.colors.push('black')

const instance2 = new SubType()
instance2.colors.push('white')

const instance3 = new SubType()

console.log(instance1) // SubType { colors: [ 'red', 'green', 'blue', 'black' ] }
console.log(instance2) // SubType { colors: [ 'red', 'green', 'blue', 'white' ] }
console.log(instance3) // SubType { colors: [ 'red', 'green', 'blue' ] }
~~~

这种方式实际上就是在每一次通过 new 创建实例时调用父类构造函数，以此为实例添加相应的属性，从而使每一个实例都拥有自己的属性，互相不会干扰

不仅如此，盗用构造函数还解决了不能向父类的构造函数传参的问题，来看下面这个例子：

~~~js
function SuperType(name) {
    this.name = name
}

function SubType(name, age) {
    SuperType.call(this, name)
    this.age = age
}

const instance = new SubType('张三', 21)

console.log(instance) // SubType { name: '张三', age: 21 }
~~~



### 存在的问题

**盗用构造函数的主要缺点就是其不涉及原型，因此无法访问父类原型上定义的属性和方法，若是要实现继承父类方法的话，只能是在父类的构造函数上定义方法，因此函数不能重用。**由于以上问题，盗用构造函数这一方法也不会单独被使用



## 组合继承

组合继承又叫伪经典继承，它综合了原型链继承和盗用构造函数，基本思路是：**在构造函数中调用父类构造函数的同时，将原型设置为父类的实例。**这种方式可以让创建出来的子类实例对象既拥有访问父类原型上的属性和方法的能力，又能让每个实例拥有自己的属性

代码实现大致如下：

~~~js
function SuperType(name) {
    this.colors = ['red', 'green', 'blue']
    this.name = name
}

SuperType.prototype.sayName = function() {
    console.log(this.name)
}

function SubType(name, age) {
    // 盗用构造函数，继承属性
    SuperType.call(this, name)
    this.age = age
}

// 设置SubType的原型为SuperType的实例，继承方法
SubType.prototype = new SuperType()
SubType.prototype.constructor = SubType

// 添加原型上的属性或方法需要在设置原型之后，否则会被覆盖
SubType.prototype.sayAge = function() {
    console.log(this.age)
}

const instance1 = new SubType('张三', 21)
const instance2 = new SubType('李四', 23)

instance1.colors.push('black')
console.log(instance1.colors)	// [ 'red', 'green', 'blue', 'black' ]
instance1.sayName()				// 张三
instance1.sayAge()				// 21

console.log(instance2.colors)	// [ 'red', 'green', 'blue' ]
instance2.sayName()				// 李四
instance2.sayAge()				// 23
~~~

组合继承可以说是用原型链继承和盗用构造函数各自的优点，来弥补对方的缺点，同时组合继承也保留了 `instanceof` 操作符和 `isPrototypeOf()` 方法识别是否继承自该类：

~~~js
// 上接组合继承代码
instance1 instanceof SubType 	// true
instance1 instanceof SuperType 	// true
~~~



### 存在的问题

组合继承是 JavaScript 中使用最多的继承模式，但不代表就完美了，它也存在着性能问题，最主要的效率问题就是父类构造函数始终会被调用两次，一次是在创建子类实例的时候在子类的构造函数中调用，一次是在创建子类的原型时调用

这个问题也不是没法解决的，后续将会详细提及该问题的具体成因及其解决方案



## 原型式继承

这里的原型式继承和前面的原型链继承不同，该模式是由 [Douglas Crockford](https://baike.baidu.com/item/Douglas%20Crockford/5960317?fr=aladdin) 于2006年在其写的文章《JavaScript中的原型式继承（Prototypal Inheritance in JavaScript）》中提出的，它是一种不涉及严格意义上构造函数的继承方法，出发点是即使不自定义类型也可以通过原型实现对象之间的信息共享。

> 有兴趣的可以[点此](https://www.crockford.com/javascript/prototypal.html)阅读Douglas Crockford大神的原文

Douglas Crockford 在文章中给出了这样一个函数：

~~~js
function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}
~~~

这个函数会创建一个临时的构造函数 **F()**，并将传入的要被继承的对象作为 **F()** 的原型，然后返回这个临时类型的实例，本质上 object() 是对传入的对象的一次浅复制。这种方法适合以下情况：在已有对象的基础上，再创建一个对象。下面是一个例子：

~~~js
let person = {
    name: '张三',
    colors: ['red', 'green', 'blue']
}

let anotherPerson = object(person)
anotherPerson.name = '李四'
anotherPerson.colors.push('black')

let yetAnotherPerson = object(person)
yetAnotherPerson.name = '王五'
yetAnotherPerson.colors.push('white')

console.log(person.colors) // ["red", "green", "blue", "black", "white"]

person.colors === anotherPerson.colors 				// true
person.colors === yetAnotherPerson.colors 			// true
anotherPerson.colors === yetAnotherPerson.colors 	// true
~~~

在这个例子中，可看出原有对象和以它为基础创建的两个新对象共享同一个引用类型 colors 数组，这里实际上是浅拷贝了两次 person

在 ECMAScript5 中通过新增了 [Object.create()方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create) 将原型式继承的概念规范化了。这个方法接收两个参数，第一个参数 **proto** ，是作为新对象原型的对象，第二个参数 **propertiesObject** 是一个可选的对象，用于给新对象设置额外的属性，可以参考 **Object.defineProperty()** 的第二个参数。以这种方式定义的属性会遮蔽原型上的同名属性

下面是使用的例子：

~~~js
let person = {
    name: '张三',
    colors: ['red', 'green', 'blue']
}

let anotherPerson = Object.create(person)
anotherPerson.name = '李四'
anotherPerson.colors.push('black')

let yetAnotherPerson = Object.create(person, {
    name: {
        value: '王五'
    }
})
yetAnotherPerson.colors.push('white')

console.log(person.colors) // ["red", "green", "blue", "black", "white"]
~~~

原型式继承非常适合不需要单独创建构造函数，却又需要在对象间共享信息的场合



### 存在的问题

前面说过，原有对象和以它为基础创建的两个新对象共享同一个**引用类型**，这和使用原型链继承时类似



## 寄生式继承

寄生式继承是一种和原型式继承比较接近的继承方式，背后的思路类似于寄生构造函数和工厂模式：**创建一个用于实现继承的函数，以某种方式增强对象，然后返回对象**。这也是 Crockford 大神首倡的一种模式，基本的寄生继承模式代码实现如下：

~~~js
function createAnother(original) {
    // 以original为基准创建一个新对象
    let clone = Object.create(original)
    
    // 增强创建的新对象
    clone.sayHi = function() {
        console.log('hi')
    }
    return clone
}

let person = {
    name: '张三',
    sayName() {
        console.log(this.name)
    }
}

let anotherPerson = createAnother(person)
anotherPerson.sayHi() 	// hi
anotherPerson.sayName()	// 张三
~~~

这种继承方法同样不考虑类型或构造函数，只是基于原有的对象进行继承，同时，因为是在对象上添加了新的函数，所以 **会导致新增的函数难以重用** ，这一点类似盗用构造函数模式



## 寄生组合继承

寄生组合继承可以算是引用类型继承的最佳模式了，它解决了[组合继承](/#组合继承)会调用两次父类构造函数的问题，提高了代码执行效率。



### 组合继承效率问题

为了了解寄生组合继承是如何解决组合继承的效率问题，我们先来分析一下组合继承效率问题的成因

回顾一下组合继承的代码实现：

~~~js
function SuperType(name) {
    this.colors = ['red', 'green', 'blue']
    this.name = name
}

SuperType.prototype.sayName = function() {
    console.log(this.name)
}

function SubType(name, age) {
    // 第二次调用SuperType()
    SuperType.call(this, name)
    this.age = age
}

// 第一次调用SuperType()
SubType.prototype = new SuperType()
SubType.prototype.constructor = SubType

SubType.prototype.sayAge = function() {
    console.log(this.age)
}

const instance = new SubType('张三', 21)
~~~

上述代码会在设置 SubType 的原型时，第一次调用父类构造函数 `SuperType()` ，而后在创建 SubType 实例调用构造函数时，第二次调用父类构造函数 `SuperType()` 。现在开始逐步解析在这一过程中，原型链的变化：

- 在一开始的时候， SubType 就和一般的函数一样，有着自己的 prototype ：

![image-20210623113642981](https://upyun.cavalheiro.cn/images/image-20210623113642981.png)

- 设置了 SubType 的原型为 SuperType 的实例，即设置了 `SubType.prototype = new SuperType` 后，又在 SubType 的原型上添加 sayAge 方法：

![image-20210623214140511](https://upyun.cavalheiro.cn/images/image-20210623214140511.png)

- 创建 SubType 的实例时，调用父类的构造函数来为实例添加 **继承自父类，而又属于自己的属性** ：

![image-20210623214025519](https://upyun.cavalheiro.cn/images/image-20210623214025519.png)

从上面的几幅图，可以很直观的看出：

> 在同一个实例上，会有两组 name 和 age 属性，一组在实例自身，另一组在原型上，而在原型上的这一组属性并不必要也不会被用到，这就是调用两次父类构造函数所带来的结果



### 寄生组合继承的实现

寄生组合继承的基本思路是：

- 对于父类属性还是使用父类构造函数继承
- 对于父类原型的继承，采用寄生式继承的方法，即取一份父类原型的副本，使用它来创建一个新的对象，然后将返回的新对象设置为子类的原型，并在之后为其添加方法进行增强

具体的代码实现如下：

~~~js
function SuperType(name) {
    this.colors = ['red', 'green', 'blue']
    this.name = name
}

SuperType.prototype.sayName = function() {
    console.log(this.name)
}

function SubType(name, age) {
    // 只调用一次SuperType()
    SuperType.call(this, name)
    this.age = age
}

// 此处使用了寄生式继承：
// 返回的是一个以SuperType.prototype为原型的新对象，并在之后为其添加方法进行增强
SubType.prototype = Object.create(SuperType.prototype)

// 解决替换原型时，默认constructor丢失的问题
SubType.prototype.constructor = SubType

// 此处是将Object.create返回的对象作为原型使用，因此不存在函数无法重用的问题
SubType.prototype.sayAge = function() {
    console.log(this.age)
}

const instance = new SubType('张三', 21)
~~~

以上代码只执行了一次的父类构造函数，因此避免了 `SubType.prototype` 上不必要的属性，提高了效率，同时原型链不变，可以使用 `instanceof` 操作符或者 `isPrototypeOf()` 测试对象是否继承自该类



## ES6的继承

前面介绍的这些继承方法都只使用 ECMAScript5 的特性，但这些实现继承的代码都很冗长，或存在着各种问题。因此在 ECMAScript6 中，新引入了 `class` 关键字使 JavaScript 具有正式定义类的能力（若对 ES6 的 class 不了解的话可以先去熟悉一下）。使用 class 关键字定义的类可以使用 `extends` 关键字来继承任何拥有构造函数（ `[[ Constructor ]]` ）和原型（ `[[ Prototype ]]` ）的对象

此外，还新增了 `super` 关键字，用于引用父类的原型，在构造函数中使用 `super` 可调用父类构造函数，在静态方法中可以通过 `super` 调用继承的类上定义的静态方法。这个关键字只能在派生类中使用

~~~js
class SuperType {
    constructor(name) {
        this.colors = ['red', 'green', 'blue']
        this.name = name
    }

    sayNamen() {
        console.log(this.name)
    }
    
    // 定义静态方法
    static staticMethod() {
        console.log('This is a staticMethod')
    }
}


class SubType extends SuperType {
    constructor(name, age) {
        // 不要再引用this之前调用super，因为super相当于返回父类的实例并赋值给this
        
        super(name) // 相当于super.constructor()，可传参
        this.age = age
    }

    sayAge() {
        console.log(this.age)
    }
    
    static test() {
        // 调用父类上定义的静态方法
        super.staticMethod()
    }
}

const instance = new SubType('张三', 21)

instance.sayName()  // "张三"
instance.test() 	// "This is a staticMethod"
~~~



### 抽象基类

抽象基类指的是可以被其他类继承，但本身不能实例化的类。

通过 `new.target` 可以获取 new 关键字调用的类或函数，因此可以使用这个特性来在实例化的时候检测 `new.target` 是否为抽象基类，若是则阻止其实例化：

~~~js
class AbstractClass {
    constructor() {
        if(new.target == AbstractClass) {
            throw new Error('抽象基类不可被实例化')
        }
    }
}

class SubClass extends AbstractClass{}

new SubClass()		// SubClass {}
new AbstractClass()	// "抽象基类不可被实例化"
~~~



### 多继承

ES6是没有显式的支持多类继承的，但我们可以通过现有的特性来模拟这种行为

`extends` 关键字后面可以接一个表达式，只要这个表达式的结果是一个可以被继承的类，那这个表达式就是有效的。假设一个 Person 类要继承 A ， B ， C 三个类，则 **需要实现 B 继承自 A ，然后 C 继承自 B ，最后再由 Person 继承 C 的这么一个流程** 。这种方法被称作混入模式

代码实现如下：

~~~js
class A {
    foo() {
        console.log('foo')
    }
}

// 这是一个返回继承了传入的参数 SuperClass 的类的函数
let B = (SuperClass) => class extends SuperClass {
    bar() {
        console.log('bar')
    }
}

let C = (SuperClass) => class extends SuperClass {
    baz() {
        console.log('baz')
    }
}

// 使用数组的归并方法，进行嵌套继承，返回的最终结果是一个继承了所有传入参数的类
function mixin(BaseClass, ...Mixins) {
    return Mixins.reduce((accumulator, current) => current(accumulator), BaseClass)
}

class Person extends mixin(A, B, C) {}
~~~



## 写在最后

由于 JavaScript 的底层使用的是 **基于原型的面向对象系统** ，继承的本质其实就是对象之间通过内部的 `[[Prototype]]`  链关联，然后通过 **“委托”** 进行数据共享，这里的 **“委托”** 我的理解是：在对象上请求不到对应的属性或方法时，将这个请求委托给原型链上的其他对象去处理。而类也只是一个可选的设计模式，甚至可以说 JavaScript 不存在类，只有对象， ES6 新增的 `class` 关键字也不过是语法糖而已，底层的东西是不变的

上上述观点是我在看了其他书籍之后总结的，我认为理清楚这些原理，有助于我们思考为什么要使用继承、何时需要使用继承以及如何使用继承，同时也能通过继承这一块让我们加深对 JavaScript 这门语言的理解
