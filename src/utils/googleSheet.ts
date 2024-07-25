import {google} from "googleapis";

const spreadsheetId = '1qZSnjaLg3vAtDBqfpi1ltM1g-s87AT-P5-l32EDliKY'

async function googleAPIAuth() {
  return await google.auth.getClient({
    projectId: "mediaman-404608",
    credentials: {
      type: "service_account",
      // "private_key_id": "f168c5a5f3b474999d191167a64409bf2058f6c5",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDWMzR4c7ikU+YS\nDnuXn91ZpR+HDngv5pj+W5EI1JWapSzrXqluzIrIUnEg3ZiF66ldCEKURP12bT+R\nJ/esGrlC5jqKSducjDoWwVyuq1F8cLczIAiccWnqlmEWzMsaPHl6Y9DgQRocROgh\nGvvhBp/Yo/hEDUIKI2UkjLcUWNpNYvrQh+f6et72gS6WSh9I/oOWcdfk32kEqo+k\nHR6STeTi9hg2QD440vrqJ3KpAYfOttWkXZ9SDdmVVnj2gfz5jM2VfHCVQbNKLVDZ\n6Hd2/eDZ9eNEDDOEnHGgTq+Qs1WDaRqqehVt1rdKl4QC8MCy+HWEdr97vQJa1grr\nV3RyTFwNAgMBAAECggEAA/3TyDvV0MAcfTEmZfKtcAZ28jAXlsLsDm9b4kd92zIh\nRmiO7TjkDCwXHhbrCPHVh92HyhYICB0sjlKpl5wu4BuEsz+Bl2b4jSSAyuN34wMB\nsvLxniKx59RyDjf2P/CpDdoO0iL8btLs5XMIhw61y1Zw4anClYhH0fjKT5eBR+hb\nxXnShfR4b6k76Q2mLqHqM/VNAZ8wrc/BlGIdAd28HTddyLzGwt5B0ex+Uvut98AJ\nPmrjEwiZ54DQ0+FQCregHKE3mndTgnxcwJfad5PYU2MqtCnM6aPFO+DMULxABey7\nHiGcDPTkAcr64fPzpiqtGMKZmcL/jSQausOHWc/NuQKBgQD9aAVnv9btjBsyZS6I\n9HlqDt+GzLSvmExNyg488naxgvJ9uCUxzEb9EiiMzLTTLBuoGstuO0yRXlOiyOMH\n1OHCtIixVgn4Udfwg0sOw2WYG5ly0OM/NwLPEuSF8//S3Mly9U3ks0nVZCXXWgYP\ncf3DejBNBVT9zNuq5BNPuvIZuQKBgQDYZHR02fQyyjZIA7ZX2zvRtV99tSHOBKvx\n2h9cDCoBVpXQcsX+t0Xi3pXgyDpE6/kJfgO0EQGLRZYGt4W27oz/Zp8dsgAHT8W8\nXxUXEYtpqGeiiFSyY8gXsxZg1x6SmQzBDGE9IojoQVFNtydAZnxX6pTFFRGj/qtS\nlnz6qw6u9QKBgCjL8WrVmM2fq9U+MvK7oTxw7o2uMTy/4TD44bfwNSm48j9JQTu2\nLouZu8uHPWluBXnX7n5tr5MLw51GiD5/iGUnWYZrWqmOy5weFxxmWtnVP6wbcyp/\nOcWKvh3OvZX+E7SdR5AVSULAn9L+3FDqQjeRWWtc+2Ts8USe+XjxmP6JAoGAencP\nuXoITB5I7iS7s6kth5egPWKfiRr3vN53VP7FXxCDpP7vsyJB+Q2DwT1QTOVHgenB\nas0dFJcDOzXuBQOo5HpNnt64SWsKO3uMUgvp3JgkXsXNOVBjU5ZVGeVlNg5MO40o\nExNSbC9bNiJronTd9luaapdr7mYYy5rDjJH2s2kCgYEAwAxTF1VO9sefxBSC/QhU\nA5Eb2gHGHZEL9qVPypqc6QEXgt8aqGn1Gf8qFfDibLuAckEBUZHWIor/HL4C7OeM\nebWB6ZkeA1skdNc0p3ublpZ+GBYJ4+j1e7ZcangtStCGK79DK4eHZkTjhQ+nm+DW\nK1GPwWOIXqJPhIfJsRwpHyw=\n-----END PRIVATE KEY-----\n",
      "client_email": "zohoprojects2googlesheets@mediaman-404608.iam.gserviceaccount.com",
      "client_id": "104729602632278836649",
      // "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      // "token_uri": "https://oauth2.googleapis.com/token",
      // "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      // "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/zohoprojects2googlesheets%40mediaman-404608.iam.gserviceaccount.com",
      "universe_domain": "googleapis.com"
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  })
}
export async function getGoogleSheetsData(range: string) {
  // const auth = await authorize();

  const auth = await googleAPIAuth()

  const sheets = google.sheets({ version: "v4", auth });

  const data = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: range,
  });

  return data.data.values;
}
export async function updateGoogleSheetsData(range: string, values: any) {
  // const auth = await authorize();

  const auth = await googleAPIAuth()

  const sheets = google.sheets({ version: "v4", auth });

  const data = await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: range,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values
    }
  });
  return data.data;
}
export async function appendGoogleSheetsData(range: string, values: any) {
  // const auth = await authorize();

  const auth = await googleAPIAuth()

  const sheets = google.sheets({ version: "v4", auth });

  const data = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: range,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values
    }
  });
  return data.data;
}

