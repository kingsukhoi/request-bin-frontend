import ky from "ky";
import {convertBase64toUtf8} from "../helpers/textConversion.ts";

export interface RbRequest {
  id: string
  method: string
  content?: string
  sourceIp: string
  responseCode: number
  timestamp: Date
}


export async function GetRequests(): Promise<RbRequest[]> {
  const rtnMe = await ky.get("http://localhost:8080/v1/requests").json<RbRequest[]>();

  rtnMe.forEach(r => {
    if (!r.content) {
      r.content = "empty"
    }
    r.content = convertBase64toUtf8(r.content)
    r.timestamp = new Date(r.timestamp)
  })

  return rtnMe.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}