## For Removing Id

```js
const contactSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
  },
  { _id: false }
);
```

## For Defining The function

```js
// define a schema
const animalSchema = new Schema(
  { name: String, type: String },
  {
    // Assign a function to the "statics" object of our animalSchema through schema options.
    // By following this approach, there is no need to create a separate TS type to define the type of the statics functions.
    statics: {
      findByName(name) {
        return this.find({ name: new RegExp(name, "i") });
      },
    },
  }
);

// Or, Assign a function to the "statics" object of our animalSchema
animalSchema.statics.findByName = function (name) {
  return this.find({ name: new RegExp(name, "i") });
};
// Or, equivalently, you can call `animalSchema.static()`.
animalSchema.static("findByBreed", function (breed) {
  return this.find({ breed });
});

const Animal = mongoose.model("Animal", animalSchema);
let animals = await Animal.findByName("fido");
animals = animals.concat(await Animal.findByBreed("Poodle"));
```
