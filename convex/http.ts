import { httpRouter } from "convex/server";
import { Webhook } from "svix";
import { api } from "./_generated/api";
import { httpAction } from "./_generated/server";

const http = httpRouter();

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    console.log("I am runnign");
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error("Missing CLERK_WEBHOOK_SECRET env variable");
    }

    //Check headers
    const svix_id = req.headers.get("svix-id");
    const svix_signature = req.headers.get("svix-signature");
    const svix_timestamp = req.headers.get("svix-timestamp");

    if (!svix_id || !svix_signature || !svix_timestamp) {
      return new Response("Error occured - No Svix headers", {
        status: 400,
      });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    const WEB_HOOK = new Webhook(webhookSecret);
    let event: any;

    try {
      event = WEB_HOOK.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as any;
    } catch (err) {
      console.error("Error verifying Webhok : ", err);
      return new Response("Error occures", { status: 400 });
    }

    const eventType = event.type;
    if (eventType === "user.created") {
      const { id, email_addresses, first_name, last_name, image_url } =
        event.data; //coming from clerk

      const email = email_addresses[0].email_address;
      const name = `${first_name || "User"} ${last_name || "XYZ"}`.trim();

      try {
        await ctx.runMutation(api.controllers.userController.createUser, {
          email,
          fullname: name,
          image: image_url,
          clerkId: id,
          username: email.split("@")[0],
        });
      } catch (err) {
        console.log("Error creating user:", err);
        return new Response("Error creating user", { status: 500 });
      }
    }

    return new Response("Webhook processed successfully", { status: 200 });
  }),
});

export default http;
