import {convertBase64toUtf8} from "../helpers/textConversion.ts";
import {api} from "../helpers/kyConfig.ts";

export interface RbRequest {
  id: string
  method: string
  content?: string
  sourceIp: string
  responseCode: number
  timestamp: Date
}

export interface RbRequestHeader {
  requestId: string
  name: string
  value: string
}


export async function GetRequests(): Promise<RbRequest[]> {
  const rtnMe = await api.get("v1/requests",).json<RbRequest[]>();

  rtnMe.forEach(r => {
    if (!r.content) {
      r.content = "empty"
    }
    r.content = convertBase64toUtf8(r.content)
    r.timestamp = new Date(r.timestamp)
  })

  return rtnMe.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

export async function GetRequestHeadersById(id: string): Promise<RbRequestHeader[]> {
  const rtnMe = await api.get(`v1/requests/headers?request_id=${id}`).json<RbRequestHeader[]>();

  rtnMe.sort((a, b) => a.name.localeCompare(b.name))

  return rtnMe;

}