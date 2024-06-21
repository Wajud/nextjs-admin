import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "@/auth.config";
import { connectToDB } from "./app/lib/utils";
import User from "./app/lib/models/usersModel";
import bcrypt from "bcrypt";

const login = async (credentials) => {
  try {
    connectToDB();
    const user = await User.findOne({ username: credentials.username });
    console.log(user);

    if (!user) throw new Error("Wrong credentials!: User not found");

    // const isPasswordCorrect = await bcrypt.compare(
    //   credentials.password,
    //   user.password
    // );

    const isPasswordCorrect = credentials.password === user.password;

    if (!isPasswordCorrect)
      throw new Error("Wrong credentials!: Password Not Correct");

    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to login!");
  }
};

export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (credentials === null) return "Error: Null Credentials";
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          return err;
        }
      },
    }),
  ],
});

// const getUsers = async () => {
//   try {
//     connectToDB();
//     const user = await User.find();
//     return user;
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const { signIn, signOut, auth } = NextAuth({
//   ...authConfig,
//   providers: [
//     Credentials({
//       credentials: {
//         username: { label: "Username" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize({ request }) {
//         const response = await fetch(request);
//         if (!response.ok) return null;
//         return (await response.json()) ?? null;
//       },
//     }),
//   ],
// });
