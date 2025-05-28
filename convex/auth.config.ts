export default {
  providers: [
    {
      domain: process.env.EXPO_CLERK_JWT_FRONTEND_API_URL,
      applicationID: "convex",
    },
  ],
};
