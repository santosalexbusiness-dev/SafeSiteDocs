import { redirect } from "next/navigation";

/** People type /signup by hand — send them to the account page's signup tab. */
export default function SignupRedirect() {
  redirect("/login?mode=signup");
}
