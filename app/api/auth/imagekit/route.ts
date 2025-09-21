import ImageKit from "imagekit";
import config from "@/lib/config";
import { NextResponse } from "next/server";

const {
  env: {
    imagekit: { publicKey, privateKey, urlEndpoint },
  },
} = config;

console.log(publicKey, privateKey, urlEndpoint)

const imagekit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint,
});

export async function GET() {
  try {
    const authParams = imagekit.getAuthenticationParameters();
    return NextResponse.json(authParams);
  } catch (error) {
    console.error("ImageKit Auth Error:", error);
    return NextResponse.json(
      { error: "Failed to generate auth params" },
      { status: 500 }
    );
  }
}
