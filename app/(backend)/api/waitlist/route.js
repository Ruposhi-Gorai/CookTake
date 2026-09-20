import { db } from "@/app/lib/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

export async function POST(req) {
  const { email } = await req.json();

  if (!email) {
    return Response.json(
      { message: "Email is required" },
      { status: 400 }
    );
  }

  const q = query(
    collection(db, "waitlist"),
    where("email", "==", email)
  );

  const existing = await getDocs(q);

  if (!existing.empty) {
    return Response.json({
      message: "You're already on the waitlist 💚",
    });
  }

  await addDoc(collection(db, "waitlist"), {
    email,
    createdAt: serverTimestamp(),
    source: "homepage",
  });

  return Response.json({
    message: "Welcome to Cooktake! 🎉",
  });
}
