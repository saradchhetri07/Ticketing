import mongoose from "mongoose";

//interface that describes abotu the properties that new User should have to make new User
interface Userattrs {
  email: string;
  password: string;
}

//interface that describes what properties user model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: Userattrs): UserDoc;
}

//interface that describe what properties user document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (attrs: Userattrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
