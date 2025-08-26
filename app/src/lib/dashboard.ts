import 'server-only'

interface TokenInfoResponse {
  authorization_details: any;
  [key: string]: any;
}

interface OidcTokenResponse {
  access_token: string;
  [key: string]: any;
}

interface ScopedTokenResponse {
  access_token: string;
  [key: string]: any;
}

interface DashboardTokens {
  oidcToken: string;
  tokenInfo: TokenInfoResponse;
  scopedToken: string;
}

const instanceUrl = process.env.DATABRICKS_INSTANCE_URL;
const dashboardId = process.env.DATABRICKS_DASHBOARD_ID;
const servicePrincipalId = process.env.SERVICE_PRINCIPAL_ID;
const servicePrincipalSecret = process.env.SERVICE_PRINCIPAL_SECRET;
const externalViewerId = process.env.EXTERNAL_VIEWER_ID;
const externalValue = process.env.EXTERNAL_VALUE;

const basicAuth = Buffer.from(`${servicePrincipalId}:${servicePrincipalSecret}`).toString('base64');

const formContentType = {
    'Content-Type': 'application/x-www-form-urlencoded',
};

const jsonContentType = {
    'Content-Type': 'application/json',
};

async function validateEnvironmentVariables(): Promise<void> {
    if (!instanceUrl || !dashboardId || !servicePrincipalId || !servicePrincipalSecret || !externalViewerId || !externalValue) {
        console.error(`Error: Missing required environment variables. All of the following are required:
INSTANCE_URL (e.g. https://prefix.cloud.databricks.com)             Received: ${instanceUrl}
DASHBOARD_ID (e.g. 01ef53421545132a8f9054416376e555)                Received: ${dashboardId}
SERVICE_PRINCIPAL_ID (e.g. b3021dcf-dbd0-89fc-9e48-bf588fd86cc9)    Received: ${servicePrincipalId}
SERVICE_PRINCIPAL_SECRET (e.g. doseXXXXXXXXX)                       Received: ${servicePrincipalSecret}
EXTERNAL_VIEWER_ID (e.g. "user-id-1" - no PII)                      Received: ${externalViewerId}
EXTERNAL_VALUE (e.g. "john.doe@example.com" - PII OK)               Received: ${externalValue}
        `);
        process.exit(1);
    }
}

async function fetchOidcToken(): Promise<string> {
    console.log('Fetching OIDC token...');

    const oidcResponse = await fetch(`${instanceUrl}/oidc/v1/token`, {
        method: 'POST',
        headers: { ...formContentType, Authorization: `Basic ${basicAuth}` },
        body: `grant_type=client_credentials&scope=all-apis`,
    });

    if (!oidcResponse.ok) {
        throw new Error(`OIDC token request failed: ${oidcResponse.status} ${oidcResponse.statusText}`);
    }

    const oidcData: OidcTokenResponse = await oidcResponse.json();
    console.log(' OIDC token obtained successfully');
    
    return oidcData.access_token;
}

async function fetchDashboardTokenInfo(oidcToken: string): Promise<TokenInfoResponse> {
    console.log('Fetching dashboard token info...');
    
    const tokenInfoResponse = await fetch(`${instanceUrl}/api/2.0/lakeview/dashboards/${dashboardId}/published/tokeninfo?external_viewer_id=${externalViewerId}&external_value=${externalValue}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${oidcToken}` },
    });

    if (!tokenInfoResponse.ok) {
        throw new Error(`Dashboard token info request failed: ${tokenInfoResponse.status} ${tokenInfoResponse.statusText}`);
    }

    const payload: TokenInfoResponse = await tokenInfoResponse.json();
    console.log(' Dashboard token info obtained successfully');
    
    return payload;
}

async function fetchScopedToken(tokenInfo: TokenInfoResponse): Promise<string> {
    console.log('Requesting scoped token...');
    
    const { authorization_details, ...tokenInfoJson } = tokenInfo;
    
    const formEncodedTokenInfo = Object.entries(tokenInfoJson)
        .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
        .concat(`authorization_details=${JSON.stringify(authorization_details)}`)
        .join('&');

    const scopedTokenResponse = await fetch(`${instanceUrl}/oidc/v1/token`, {
        method: 'POST',
        headers: { ...formContentType, Authorization: `Basic ${basicAuth}` },
        body: `grant_type=client_credentials&${formEncodedTokenInfo}`,
    });

    if (!scopedTokenResponse.ok) {
        throw new Error(`Scoped token request failed: ${scopedTokenResponse.status} ${scopedTokenResponse.statusText}`);
    }

    const scopedTokenData: ScopedTokenResponse = await scopedTokenResponse.json();
    console.log(' Scoped token obtained successfully');
    
    return scopedTokenData.access_token;
}

export async function getDashboardTokens(): Promise<DashboardTokens> {
    await validateEnvironmentVariables();

    try {
        const oidcToken = await fetchOidcToken();
        const tokenInfo = await fetchDashboardTokenInfo(oidcToken);
        const scopedToken = await fetchScopedToken(tokenInfo);

        console.log(`\n=== Results ===\n

OIDC Token: ${oidcToken}

Dashboard Token Info: ${JSON.stringify(tokenInfo, null, 2)}

Scoped Token: ${scopedToken}
`);

        return {
            oidcToken,
            tokenInfo,
            scopedToken,
        };
    } catch (err) {
        console.error('Error:', (err as Error).message);
        throw err;
    }
}

