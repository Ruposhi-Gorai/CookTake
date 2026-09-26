import {
  adminDb,
  FieldValue,
  isFirebaseAdminConfigured,
} from "@/app/lib/firebase-admin";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const { email } = await request.json();
    const normalizedEmail = email?.trim().toLowerCase();

    if (!normalizedEmail || !/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      return Response.json({ message: "Enter a valid email address." }, { status: 400 });
    }

    if (!isFirebaseAdminConfigured) {
      return Response.json(
        { message: "Waitlist is temporarily unavailable. Please try again later." },
        { status: 503 }
      );
    }

    const waitlistEntry = adminDb
      .collection("waitlist")
      .doc(encodeURIComponent(normalizedEmail));

    try {
      await waitlistEntry.create({
        email: normalizedEmail,
        createdAt: FieldValue.serverTimestamp(),
        source: "homepage",
      });
    } catch (error) {
      if (error.code === 6 || error.code === "already-exists") {
        return Response.json({
          message: "You are already on the CookReady waitlist!",
          alreadyJoined: true,
        });
      }

      throw error;
    }

    return Response.json(
      { message: "You are on the CookReady waitlist!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Unable to add waitlist entry:", error);
    return Response.json(
      { message: "We could not join the waitlist. Please try again." },
      { status: 500 }
    );
  }
}
