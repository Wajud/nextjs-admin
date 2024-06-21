export const authConfig = {
  providers: [],
  pages: {
    signIn: "/login", //redirect non signed in users here
  },
  callbacks: {
    //callback where we write our authorization logic
    authorized({ auth, request }) {
      const isLoggedIn = auth?.user;
      const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true; //user can stay on the dashboard
        return false; //redirect unauthenticated users to the login page
      } else if (isLoggedIn) {
        //logged in but not on the dashboard should be sent to the dashboard
        return Response.redirect(new URL("/dashboard", request.nextUrl));
      }

      return true; //not on the dashboard ? Users can stay wherever they are
    },
  },
};
