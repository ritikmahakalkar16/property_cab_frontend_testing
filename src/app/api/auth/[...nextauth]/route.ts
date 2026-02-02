import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { cookies } from "next/headers";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth",
    error: "/auth",
  },

  callbacks: {
    async signIn({ user }) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/google`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
            }),
          }
        );

        if (!res.ok) {
          console.error("Backend rejected Google login");
          return false;
        }

        // Forward cookies from backend to browser
        const setCookieHeaders = res.headers.getSetCookie();
        if (setCookieHeaders && setCookieHeaders.length > 0) {
          const cookieStore = await cookies();
          
          setCookieHeaders.forEach((cookieStr) => {
            const [cookiePart, ...options] = cookieStr.split(";");
            const [name, value] = cookiePart.split("=");
            
            if (name && value) {
              const formattedOptions: any = {};
              
              options.forEach((opt) => {
                const [key, val] = opt.trim().split("=");
                const lowerKey = key.toLowerCase();
                
                if (lowerKey === "path") formattedOptions.path = val;
                else if (lowerKey === "httponly") formattedOptions.httpOnly = true;
                else if (lowerKey === "secure") formattedOptions.secure = true;
                else if (lowerKey === "samesite") formattedOptions.sameSite = val.toLowerCase();
                else if (lowerKey === "max-age") formattedOptions.maxAge = parseInt(val);
                else if (lowerKey === "expires") formattedOptions.expires = new Date(val);
              });

              // Default standard permissions if not set by backend explicitly (though backend usually sets them)
              if (!formattedOptions.path) formattedOptions.path = "/";
              
              cookieStore.set(name.trim(), value.trim(), formattedOptions);
            }
          });
        }

        return true;
      } catch (err) {
        console.error("Google login sync failed:", err);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
