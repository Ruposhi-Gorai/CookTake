import { db } from "@/app/lib/firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

export async function POST(request) {
  try {
    const { email } = await request.json();
    const normalizedEmail = email?.trim().toLowerCase();

    if (!normalizedEmail) {
      return Response.json({ message: "Email is required" }, { status: 400 });
    }

    const waitlist = collection(db, "waitlist");
    const existing = await getDocs(
      query(waitlist, where("email", "==", normalizedEmail))
    );

    if (!existing.empty) {
      return Response.json({ message: "You are already on the waitlist." });
    }

    await addDoc(waitlist, {
      email: normalizedEmail,
      createdAt: serverTimestamp(),
      source: "homepage",
    });

    return Response.json({ message: "Welcome to Cooktake!" }, { status: 201 });
  } catch (error) {
    console.error("Unable to add waitlist entry:", error);
    return Response.json(
      { message: "We could not join the waitlist. Please try again." },
      { status: 500 }
    );
  }
}
