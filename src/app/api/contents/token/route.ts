import {
  BlobSASPermissions,
  generateBlobSASQueryParameters,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";
import { NextRequest, NextResponse } from "next/server";

const accountName = process.env.AZURE_STORAGE_ACCOUNT as string;
const accountKey = process.env.AZURE_STORAGE_KEY as string;

export async function POST(request: NextRequest) {
  const { blob, permissions } = await request.json();

  const credential = new StorageSharedKeyCredential(accountName, accountKey);
  const sas = generateBlobSASQueryParameters(
    {
      containerName: "cgprintingstore",
      blobName: blob,
      permissions: BlobSASPermissions.parse(permissions),
      startsOn: new Date(),
      expiresOn: new Date(Date.now() + 5 * 60 * 1000), // 5m
    },
    credential,
  );

  return NextResponse.json({
    uri: `https://${accountName}.blob.core.windows.net/cgprintingstore/${blob}?${sas}`,
  });
}
