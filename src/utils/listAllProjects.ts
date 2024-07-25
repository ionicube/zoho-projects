import {makeAPICall} from "@/utils/makeAPICall";

export async function listAllProjects(accessToken: string, portalId: string) {
  const url = `/restapi/portal/${portalId}/projects/?`
  const params = new URLSearchParams({
    // status: 'active',
    range: '1000000',
    index: '0'
  })
  return await makeAPICall(url + params, accessToken)

}
