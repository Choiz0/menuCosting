import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/lib/mongodb";
import User from "@/app/models/User";


const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),

  
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      await dbConnect();

      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        const newUser = await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
      
        });
        user.id = newUser._id.toString();
      } else {
        user.id = existingUser._id.toString();
      }

      return true;
    },
    async session({ session, token }) {
      session.user.id = token.id; // JWT 토큰에서 사용자 ID를 가져와 세션에 포함
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // 사용자 ID를 JWT 토큰에 포함
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };