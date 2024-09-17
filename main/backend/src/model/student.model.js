const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    hPhone: {
      type: String,
    },
    mPhone: {
      type: String,
    },
  },
  { _id: false }
);

// contactSchema.methods = {
//   getContactInfo: function () {
//     return `Email: ${this.email}, Home Phone: ${this.hPhone}, Mobile Phone: ${this.mPhone}`;
//   },
// };

const addressSchema = new mongoose.Schema(
  {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zip: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  { _id: false }
);

// addressSchema.methods = {
//   getFullAddress: function () {
//     return `${this.street}, ${this.city}, ${this.state} ${this.zip}, ${this.country}`;
//   },
// };

const guardianInfoSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  relation: {
    type: String,
  },
  email: {
    type: String,
  },
  mPhone: {
    type: String,
  },
  emergency: {
    type: String,
  },
});

// guardianInfoSchema.methods = {
//   getGuardianDetails: function () {
//     return `Name: ${this.name}, Relation: ${this.relation}, Email: ${this.email}, Mobile Phone: ${this.mPhone}, Emergency Contact: ${this.emergency}`;
//   },
// };

const medicalSchema = new mongoose.Schema(
  {
    blood: {
      type: String,
    },
    medicalCondition: {
      type: String,
    },
    note: {
      type: String,
    },
  },
  { _id: false }
);

// medicalSchema.methods = {
//   getMedicalInfo: function () {
//     return `Blood Group: ${this.blood}, Medical Condition: ${this.medicalCondition}, Note: ${this.note}`;
//   },
// };

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  img: {
    type: String,
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  dob: {
    type: Date,
    required: true,
    trim: true,
  },
  contact: { type: contactSchema },
  address: { type: addressSchema },
  guardian: [guardianInfoSchema],
  medical: { medicalSchema },
});

studentSchema.statics.findByEmail = function (email) {
  return this.findOne({ "contact.email": email });
};

studentSchema.statics.findByPhone = function (phone) {
  return this.findOne({
    $or: [{ "contact.hPhone": phone }, { "contact.mPhone": phone }],
  });
};

studentSchema.statics.findByCity = function (city) {
  return this.find({ "address.city": city });
};

studentSchema.statics.findByCriteria = function (criteria) {
  let query = {};
  if (criteria.email) {
    query["contact.email"] = criteria.email;
  }
  if (criteria.phone) {
    query.$or = [
      { "contact.hPhone": criteria.phone },
      { "contact.mPhone": criteria.phone },
    ];
  }
  if (criteria.city) {
    query["address.city"] = criteria.city;
  }
  return this.find(query);
};

module.exports = mongoose.model("Student", studentSchema);
