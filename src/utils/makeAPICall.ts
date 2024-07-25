export async function makeAPICall(url: string,
                                  accessToken: string,
                                  method: 'GET' | 'POST' = 'GET',
                                  format: 'json' | 'text' = 'json'
) {
  try {
    const res = await fetch('https://projectsapi.zoho.com' + url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        method
      },
    })
    return format === 'text' ? await res.text() : await res.json()
  } catch (err) {
    // console.log(err)
    // throw new Error('Error making API call')
  }
}
