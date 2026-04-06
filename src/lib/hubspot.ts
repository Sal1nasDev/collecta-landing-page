const PORTAL_ID = "45575026";

function getHubspotCookie(): string {
  const match = document.cookie.match(/hubspotutk=([^;]+)/);
  return match ? match[1] : "";
}

interface HubSpotField {
  name: string;
  value: string;
}

export async function submitHubSpotForm(
  formGuid: string,
  fields: HubSpotField[]
): Promise<void> {
  const body = {
    submittedAt: Date.now().toString(),
    fields,
    context: {
      hutk: getHubspotCookie(),
      pageUri: window.location.href,
      pageName: document.title,
    },
  };

  const response = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${formGuid}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    throw new Error(`HubSpot submission failed: ${response.status}`);
  }
}
