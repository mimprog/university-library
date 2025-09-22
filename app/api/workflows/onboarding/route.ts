import { serve, duration } from "@upstash/workflow/nextjs";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { sendEmail } from "@/lib/workflow";
type InitialData = {
  email: string;
  fullName: string;
};

const ONE_DAY_IN_MS= 24*60*60*1000;
const THREE_DAYS_IN_MS= 3 * ONE_DAY_IN_MS;
const THIRTY_DAYS_IN_MS= 30 * ONE_DAY_IN_MS;

/*async function sendEmail(message: string, email: string) {
  console.log(`Sending "${message}" email to ${email}`);
}*/

type UserState = "non-active" | "active";

const getUserState = async (email: string): Promise<UserState> => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (user.length === 0) return "non-active";

  const lastActivityDate = new Date(user[0].lastActivityDate!);
  const now = new Date();
  const timeDifference = now.getTime() - lastActivityDate.getTime();

  if (timeDifference > THIRTY_DAYS_IN_MS) {
    return "non-active";
  }

  return "active";
};



export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload;

  // Step 1: Send welcome email
  await context.run("new-signup", async () => {
    await sendEmail({email,subject:'welcome to the platform', message:`welcome ${fullName}`});
  });

  // Step 2: Wait 3 days
  await context.sleep("wait-for-3-days", duration("3d"));

  // Step 3: Periodically check user activity
  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email);
    });

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail({email, subject: 'Are you still there?', message:`Hey ${fullName}, we miss you`});
        
      });
    }else if(state === 'active') {
      await context.run('send-email-active', async () => {
        await sendEmail({email, subject:'Welcome back', message: `welcome back ${fullName}`});
      })
    }

    // Sleep another 30 days before next check
    await context.sleep("wait-for-1-month", duration("30d"));
  }
});

