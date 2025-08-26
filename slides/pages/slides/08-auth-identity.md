---
layout: two-cols
layoutClass: gap-16
---


# Auth & Identity

<div>

<v-clicks>

- **Databricks Native Auth + Clerk / Auth0 / Neon** → stateless JWT tokens
- **Databricks OIDC Support** → external user access to analytics
- **JWT-based authentication** → scalable, stateless auth across services
- **Offload login, tokens, sessions** → AI wires up SDKs
- **Keeps focus on app logic, not boilerplate security**

</v-clicks>

</div>

::right::

<div v-click class="mt-8">

<div class="p-4 bg-gray-700 text-white rounded">
<strong>Key Benefits:</strong><br>
• Stateless authentication scales horizontally<br>
• No server-side session storage required<br>
• Direct JWT validation by Databricks<br>
• Cross-service token sharing<br>
• AI easily generates auth middleware
</div>

<div class="mt-4 p-3 bg-gray-600 text-white rounded text-sm">
<strong>Architecture:</strong> Mobile App → JWT → Gateway → Databricks (all validate same token)
</div>

</div>

<div v-click class="mt-4 p-3 bg-gray-800 text-white rounded">
<strong>Why JWT + OIDC:</strong> Stateless tokens scale across microservices, no server-side session storage needed, Databricks validates JWTs directly for analytics access, AI generates auth middleware easily
</div>