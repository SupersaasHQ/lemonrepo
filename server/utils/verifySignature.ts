async function verifySignature(
  rawBody: string,
  signatureHeader: string,
  secret: string
) {
  try {
    const enc = new TextEncoder();

    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const rawBodyArrayBuffer = enc.encode(rawBody);

    const digestBuffer = await crypto.subtle.sign(
      "HMAC",
      key,
      rawBodyArrayBuffer
    );
    const digest = new Uint8Array(digestBuffer);

    const signatureArrayBuffer = new Uint8Array(
      signatureHeader.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) ?? []
    );

    if (digest.length !== signatureArrayBuffer.length) {
      return false;
    }

    let isValid = true;
    for (let i = 0; i < digest.length; i++) {
      if (digest[i] !== signatureArrayBuffer[i]) {
        isValid = false;
      }
    }

    return isValid;
  } catch (error) {
    console.error("Signature verification error:", error);
    return false;
  }
}

export { verifySignature };
