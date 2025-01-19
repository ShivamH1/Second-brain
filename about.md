### Learning from projects:

## Mistake I made - 
- ### I was trying to hit the url of signup with content-type = 'text/plain' that's the reason my data was not stored in db. The content-type should be 'application/json' as the server is expecting a JSON payload and 'text/plain' is for plain text data.

- ### Populate method of mongoose: usage of references (foreign keys)
The populate method of mongoose is used to get the data from another collection.
```
For example, if we have a user collection and a post collection and we want to get all the posts of a user, we can use the populate method to get the posts of the user.

const user = await User.findOne({name: 'John Doe'}).populate('posts');
console.log(user.posts); // [Post, Post, Post]
```
In the above example, the user.posts is an array of Post documents, which are the posts that belong to the user with name 'John Doe'.

## Why circular imports are bad in Node.js:

Circular imports can lead to confusing and fragile code. In the case of my code, I was trying to import the jwt secret from the index.ts file, which is the entry point for my application, into the middleware.ts file. This created a circular import because the index.ts file was importing the middleware.ts file, which was importing the index.ts file.

This can cause a lot of problems, such as:

- Code organization: With circular imports, it can be difficult to understand the structure of your codebase and where each module fits in.
- Debugging: If there is an error in one of the dependent modules, it can be difficult to track down because the error message will be referencing a module that is not directly importing the problematic module.
- Code reuse: Circular imports make it difficult to reuse code in other parts of your application.

Node.js has a feature called "circular dependency detection" that prevents circular imports. When a module tries to import another module that has already been imported, Node.js will throw an error.

To avoid circular imports, you should structure your code so that each module is independent and does not rely on the imports of other modules. Instead, use higher-level modules to manage the imports and exports of different modules.

### What are .d.ts files?

.d.ts files, also known as TypeScript declaration files, are used to provide type information about a JavaScript library or module. These files allow TypeScript to understand the types and structures of the existing JavaScript code without requiring changes to the JavaScript code itself. They serve as a bridge between JavaScript and TypeScript, enabling developers to use type-checking features and IDE auto-completion for JavaScript libraries within TypeScript projects.

Key Points about .d.ts files:
- They contain only type declarations and no executable code.
- They describe the shape of an object, what methods it has, and what types those methods accept and return.
- They are particularly useful for third-party libraries that do not have TypeScript support.
- With .d.ts files, TypeScript can verify whether the code using those libraries is type-safe, helping to catch errors during development.

Example:
```typescript
// Example of a .d.ts file
declare module "my-library" {
  export function doSomething(value: string): void;
  export const version: string;
}
```

#### comment @ts-ignore - will ignore the type checks (but not the correct way)
#### to include types in express install npm i @types/express package.

### What is Elastic Search?

Elastic Search is a powerful search and analytics engine that allows users to easily search, analyze, and visualize large volumes of data in real-time. It is built on top of Apache Lucene, a high-performance search engine library. It stores data in a JSON document format and provides a simple, REST-based API for storing, searching, and retrieving data.

Key Features of Elastic Search:
- Scalability: Elastic Search is designed to scale horizontally, allowing it to handle large amounts of data and scale as needed.
- Full-text search: Elastic Search provides robust full-text search capabilities, allowing users to search for specific words or phrases within their data.
- Real-time analytics: Elastic Search supports real-time data aggregation and analysis, enabling users to gain insights from their data as it's generated.
- Document-oriented: Elastic Search stores data in a JSON document format, making it easy to store and query structured and unstructured data.
- RESTful API: Elastic Search provides a simple, REST-based API for storing, searching, and retrieving data.

Elastic Search is commonly used for search, logging, analytics, and other data-driven applications.

### Note (out of context) - (Embedding of data in ChatGPT, data converted to vector, when a query comes then query is converted to vectors and it checks stored and query vector to find closest one) => GPT is trained on vectors.
### Vector DB:
A vector database is a type of NoSQL database that stores data as vectors instead of tables or documents. It is optimized for similarity searches and is often used for AI and machine learning applications.

### API Skeleton:
- Use Zod to validate the request body for signup. Zod is not required for signin, but it can be useful for input validation.
- Always hash the password before storing in the database.
- Check if the user exists in the database.
- Check if the password is correct using bcrypt.compare() method because we stored the password in the hashed manner.
- If the user exists and the password is correct, generate a JWT token and send it in the response.
- If the user does not exist or the password is incorrect, send a 401 status code with an appropriate error message.

### ReactElement Explanation

A ReactElement is a fundamental building block in React applications. It is an object representation of a UI element that describes what should appear on the screen. ReactElements are immutable and are created using the `React.createElement()` method or JSX syntax. They are used by React to efficiently update and render the UI by comparing the current element tree with the previous one, a process known as reconciliation.

Example:
```jsx
const element = <h1>Hello, world!</h1>;
// Equivalent to:
const element = React.createElement('h1', null, 'Hello, world!');
```
