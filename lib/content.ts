export type Topic = {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  definitions: { term: string; definition: string; example?: string }[];
};

export type Flashcard = {
  id: string;
  topicId: string;
  front: string;
  back: string;
};

export type Question = {
  id: string;
  topicId: string;
  prompt: string;
  code?: string;
  choices: string[];
  answer: number;
  explanation: string;
};

export const topics: Topic[] = [
  {
    id: "primitive-types",
    title: "Primitive Types",
    subtitle: "Variables, data types, and expressions",
    color: "bg-blue-100 text-blue-800",
    definitions: [
      { term: "Variable", definition: "A named storage location whose value can change while a program runs.", example: "int score = 10;" },
      { term: "Primitive type", definition: "A built-in Java type that stores a simple value directly: int, double, boolean, or char." },
      { term: "Integer division", definition: "Division of two integers that discards the fractional part; the result is truncated toward zero.", example: "7 / 2 evaluates to 3." },
      { term: "Type casting", definition: "An explicit conversion from one data type to another.", example: "(double) 7 / 2 evaluates to 3.5." },
      { term: "Remainder operator", definition: "The % operator returns the remainder after division.", example: "17 % 5 evaluates to 2." },
    ],
  },
  {
    id: "using-objects",
    title: "Using Objects",
    subtitle: "Strings, Math, and object behavior",
    color: "bg-violet-100 text-violet-800",
    definitions: [
      { term: "Object", definition: "An instance of a class that combines data (state) with behaviors (methods)." },
      { term: "Method call", definition: "An expression that invokes a method, optionally passing arguments and receiving a return value.", example: "name.length()" },
      { term: "String concatenation", definition: "Joining strings with +. If either operand is a String, Java converts the other operand to a String.", example: "\"Score: \" + 4 + 2 is \"Score: 42\"." },
      { term: "Immutability", definition: "A property of Strings: methods that appear to change a String actually return a new String." },
      { term: "Random range", definition: "Math.random() returns a double greater than or equal to 0.0 and less than 1.0." },
    ],
  },
  {
    id: "boolean-expressions",
    title: "Boolean Expressions",
    subtitle: "Relational operators and logical reasoning",
    color: "bg-amber-100 text-amber-800",
    definitions: [
      { term: "Boolean expression", definition: "An expression that evaluates to either true or false." },
      { term: "Short-circuit evaluation", definition: "With &&, the right side is skipped if the left is false; with ||, it is skipped if the left is true." },
      { term: "De Morgan's laws", definition: "Negating a conjunction or disjunction: !(a && b) is !a || !b, and !(a || b) is !a && !b." },
      { term: "Boundary condition", definition: "A condition at the edge of a range, often where < versus <= changes the result." },
      { term: "Logical equivalence", definition: "Two boolean expressions are equivalent when they produce the same result for every possible input." },
    ],
  },
  {
    id: "conditionals",
    title: "if Statements",
    subtitle: "Selection, branching, and control flow",
    color: "bg-orange-100 text-orange-800",
    definitions: [
      { term: "if statement", definition: "A control structure that executes a block only when its boolean condition is true." },
      { term: "if-else chain", definition: "A sequence of mutually exclusive branches; the first true condition runs and the rest are skipped." },
      { term: "Nested conditional", definition: "An if statement placed inside another conditional's code block." },
      { term: "Equivalent code", definition: "Different code structures that produce the same behavior for all valid inputs." },
      { term: "Code tracing", definition: "Following a program statement by statement while tracking variable values and control flow." },
    ],
  },
  {
    id: "iteration",
    title: "Iteration",
    subtitle: "while loops, for loops, and algorithms",
    color: "bg-green-100 text-green-800",
    definitions: [
      { term: "Iteration", definition: "Repeating a block of code using a loop." },
      { term: "Loop invariant", definition: "A fact that remains true each time a loop condition is checked." },
      { term: "Off-by-one error", definition: "A loop error caused by running one time too many or too few, often from a boundary mistake." },
      { term: "Enhanced for loop", definition: "A loop that visits each element in an array or collection without using an index.", example: "for (int value : values)" },
      { term: "Infinite loop", definition: "A loop whose condition never becomes false, so it does not terminate normally." },
    ],
  },
  {
    id: "writing-classes",
    title: "Writing Classes",
    subtitle: "Classes, constructors, and encapsulation",
    color: "bg-pink-100 text-pink-800",
    definitions: [
      { term: "Class", definition: "A blueprint that defines the fields and methods each object of that type has." },
      { term: "Constructor", definition: "A special member with the class name, no return type, and code that initializes a new object." },
      { term: "Encapsulation", definition: "Keeping fields private and exposing controlled access through a class's public methods." },
      { term: "Instance variable", definition: "A field belonging to an individual object; each instance has its own copy." },
      { term: "this", definition: "A reference to the current object, often used to distinguish a field from a parameter with the same name." },
    ],
  },
  {
    id: "arrays",
    title: "Arrays",
    subtitle: "Collections, traversal, and 2D arrays",
    color: "bg-cyan-100 text-cyan-800",
    definitions: [
      { term: "Array", definition: "A fixed-size, ordered collection of elements of the same type, accessed by zero-based index." },
      { term: "Array traversal", definition: "Visiting each array element, typically with a loop, to inspect or update it." },
      { term: "ArrayIndexOutOfBoundsException", definition: "A runtime error from using an index less than 0 or greater than or equal to the array length." },
      { term: "2D array", definition: "An array whose elements are references to other arrays; rows can have different lengths." },
      { term: "Aliasing", definition: "When two variables refer to the same object, so a change through either reference affects that object." },
    ],
  },
  {
    id: "arraylist",
    title: "ArrayList",
    subtitle: "Resizable lists and collection methods",
    color: "bg-indigo-100 text-indigo-800",
    definitions: [
      { term: "ArrayList", definition: "A resizable ordered collection from java.util that stores objects and supports insertion and removal." },
      { term: "Autoboxing", definition: "Automatic conversion between a primitive and its corresponding wrapper object, such as int and Integer." },
      { term: "get / set", definition: "get(index) returns an element; set(index, value) replaces it and returns the previous element." },
      { term: "add / remove", definition: "add(index, value) inserts and shifts later elements; remove(index) removes and shifts later elements left." },
      { term: "Size versus capacity", definition: "size() is the number of elements currently stored, not the internal storage capacity." },
    ],
  },
  {
    id: "search-sort",
    title: "Searching & Sorting",
    subtitle: "Algorithms and recursive reasoning",
    color: "bg-rose-100 text-rose-800",
    definitions: [
      { term: "Linear search", definition: "Checks elements one by one until a target is found or the collection ends; works on unsorted data." },
      { term: "Binary search", definition: "Repeatedly halves a sorted search range; requires data to be sorted." },
      { term: "Selection sort", definition: "Repeatedly finds the smallest remaining value and swaps it into the next position." },
      { term: "Recursion", definition: "A method solving a problem by calling itself on a smaller input, with a base case that stops calls." },
      { term: "Base case", definition: "A condition in a recursive method that returns an answer without making another recursive call." },
    ],
  },
];

export const flashcards: Flashcard[] = [
  { id: "f1", topicId: "primitive-types", front: "What does integer division do in Java?", back: "It truncates the fractional part toward zero. For example, 7 / 2 evaluates to 3." },
  { id: "f2", topicId: "primitive-types", front: "What is the result of 17 % 5?", back: "2. The remainder operator returns what is left after integer division." },
  { id: "f3", topicId: "using-objects", front: "Are Java Strings mutable?", back: "No. Strings are immutable; methods return a new String rather than changing the original." },
  { id: "f4", topicId: "using-objects", front: "What range of values can Math.random() return?", back: "A double greater than or equal to 0.0 and strictly less than 1.0." },
  { id: "f5", topicId: "boolean-expressions", front: "Rewrite !(a && b) using De Morgan's law.", back: "!a || !b" },
  { id: "f6", topicId: "boolean-expressions", front: "When does && skip evaluating its right operand?", back: "When the left operand is false, because the entire expression must then be false." },
  { id: "f7", topicId: "conditionals", front: "In an if / else-if / else chain, how many branches execute?", back: "At most one: the first branch whose condition is true, or else if none are true." },
  { id: "f8", topicId: "iteration", front: "What are the three parts of a for loop header?", back: "Initialization, condition, and update (executed in that order)." },
  { id: "f9", topicId: "iteration", front: "What causes an off-by-one error?", back: "A loop boundary is incorrect, so the loop runs one more or one fewer time than intended." },
  { id: "f10", topicId: "writing-classes", front: "Name two differences between a constructor and a method.", back: "A constructor has the class name and no return type; it initializes a new object." },
  { id: "f11", topicId: "writing-classes", front: "What is encapsulation?", back: "Hiding internal state (usually with private fields) and providing controlled access through methods." },
  { id: "f12", topicId: "arrays", front: "What is the valid index range for an array of length n?", back: "0 through n - 1. The first index is 0 and the last is length - 1." },
  { id: "f13", topicId: "arrays", front: "Can rows of a Java 2D array have different lengths?", back: "Yes. A 2D array is an array of row arrays, and those row arrays can differ in length." },
  { id: "f14", topicId: "arraylist", front: "What happens to later elements after list.add(index, value)?", back: "They shift one position to the right to make room for the inserted element." },
  { id: "f15", topicId: "search-sort", front: "What must be true before using binary search?", back: "The data must be sorted." },
  { id: "f16", topicId: "search-sort", front: "What are the two essential parts of a recursive solution?", back: "A base case to stop recursion and a recursive case that makes progress toward it." },
];

export const questions: Question[] = [
  { id: "q1", topicId: "primitive-types", prompt: "What is printed by the following code?", code: "int x = 17;\nint y = 5;\nSystem.out.println(x / y + \" \" + x % y);", choices: ["3.4 2", "3 2", "3 0", "4 2"], answer: 1, explanation: "Both operands of / are integers, so 17 / 5 is 3. The remainder 17 % 5 is 2." },
  { id: "q2", topicId: "primitive-types", prompt: "Which expression evaluates to 3.5?", choices: ["7 / 2", "(double) (7 / 2)", "(double) 7 / 2", "7 % 2"], answer: 2, explanation: "Casting 7 to double before division makes the operation floating-point. Casting after integer division would preserve 3.0." },
  { id: "q3", topicId: "using-objects", prompt: "What is printed?", code: "String s = \"AP\";\ns.concat(\" CSA\");\nSystem.out.println(s);", choices: ["AP CSA", "AP", "CSA", "null"], answer: 1, explanation: "String objects are immutable. concat returns a new String, but its result is not assigned, so s remains \"AP\"." },
  { id: "q4", topicId: "boolean-expressions", prompt: "Which expression is equivalent to !(score >= 70 && attempts < 3)?", choices: ["score < 70 && attempts >= 3", "score < 70 || attempts >= 3", "score >= 70 || attempts < 3", "!(score >= 70) && !(attempts < 3)"], answer: 1, explanation: "By De Morgan's law, negate each comparison and change && to ||: score < 70 || attempts >= 3." },
  { id: "q5", topicId: "conditionals", prompt: "What is printed when value is 8?", code: "if (value > 10)\n    System.out.print(\"A\");\nelse if (value > 5)\n    System.out.print(\"B\");\nelse\n    System.out.print(\"C\");", choices: ["A", "B", "C", "AB"], answer: 1, explanation: "value > 10 is false. The next condition, value > 5, is true, so only B is printed." },
  { id: "q6", topicId: "iteration", prompt: "What is printed?", code: "int total = 0;\nfor (int k = 1; k < 5; k++)\n    total += k;\nSystem.out.println(total);", choices: ["9", "10", "15", "4"], answer: 1, explanation: "The loop adds 1 + 2 + 3 + 4. It stops when k becomes 5, for a total of 10." },
  { id: "q7", topicId: "iteration", prompt: "Which loop header visits the indices 0 through nums.length - 1 exactly once?", choices: ["for (int i = 0; i <= nums.length; i++)", "for (int i = 1; i < nums.length; i++)", "for (int i = 0; i < nums.length; i++)", "for (int i = 0; i < nums.length - 1; i++)"], answer: 2, explanation: "Valid indices are 0 through length - 1, so i must start at 0 and remain strictly less than length." },
  { id: "q8", topicId: "writing-classes", prompt: "Which is a valid constructor for a class named Book?", choices: ["public void Book(String title)", "public Book(String title)", "public book(String title)", "public String Book(String title)"], answer: 1, explanation: "A constructor uses the exact class name and has no return type, not even void." },
  { id: "q9", topicId: "arrays", prompt: "What is printed?", code: "int[] a = {2, 4, 6};\nint x = a[1];\na[1] = a[2];\nSystem.out.println(x + a[1]);", choices: ["8", "10", "12", "An exception"], answer: 1, explanation: "x stores the original value 4. a[1] is then changed to 6, so x + a[1] is 4 + 6 = 10." },
  { id: "q10", topicId: "arrays", prompt: "How many elements are visited by this traversal?", code: "for (int i = 0; i < values.length; i++)\n    System.out.println(values[i]);", choices: ["values.length - 1", "values.length", "values.length + 1", "It depends on the values"], answer: 1, explanation: "The loop visits each valid index from 0 up to (but not including) values.length." },
  { id: "q11", topicId: "arraylist", prompt: "What is the list after this code runs?", code: "ArrayList<String> words = new ArrayList<>();\nwords.add(\"A\");\nwords.add(\"C\");\nwords.add(1, \"B\");", choices: ["[B, A, C]", "[A, C, B]", "[A, B, C]", "[A, C]"], answer: 2, explanation: "Adding at index 1 inserts \"B\" before the existing element at index 1; the old \"C\" shifts right." },
  { id: "q12", topicId: "search-sort", prompt: "Which statement about binary search is true?", choices: ["It can search unsorted data by checking both halves.", "It eliminates roughly half of the remaining range each step.", "It always checks every element.", "It only works on ArrayLists, not arrays."], answer: 1, explanation: "Binary search compares with the middle and discards half the remaining range. The data must be sorted." },
];
