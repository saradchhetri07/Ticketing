import mongoose from "mongoose";

//interface that describes abotu the properties that new User should have
interface Userattrs {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<any> {
  build(attrs: Userattrs): any;
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

const User = mongoose.model<any, UserModel>("User", userSchema);

export { User };
