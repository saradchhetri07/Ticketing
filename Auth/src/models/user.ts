import mongoose from "mongoose";
import { Password } from "../services/password";

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

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (attrs: Userattrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
