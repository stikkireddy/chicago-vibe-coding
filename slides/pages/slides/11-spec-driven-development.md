---
layout: two-cols
layoutClass: gap-16
---

# Spec-Driven Development
## PRDs & Design Docs

<div>

<div v-click>

### Why specs matter:
- **AI needs intent + constraints**
- **PRDs & design docs give AI context:**
  - Features, user flows, edge cases
  - Data requirements + success metrics

</div>

<div v-click class="mt-6">

### Workflow:
1. **Write spec** (PRD/design doc)
2. **Feed spec sections into AI** → generate code/tests
3. **Iterate with AI in micro-loops**

</div>

</div>

::right::

<div v-click class="mt-8 p-4 bg-gray-800 text-white rounded-lg border border-gray-600">

**Example:**
- **PRD section:** "User logs in with Clerk, gets role-based dashboard"
- **AI generates:** Auth wiring + role checks + dashboard scaffolding
- **Benefit:** Team alignment + predictable AI code + less rework

</div>

<div v-click class="mt-6 p-3 bg-gray-700 text-white rounded text-sm">
<strong>Pro Tips:</strong><br>
• Break specs into digestible sections<br>
• Include edge cases and constraints<br>
• Define success criteria upfront<br>
• Use command examples: <a href="https://gist.github.com/tsriharsha/9ac9ce72ae6abdd833a1fce9032313ae" class="text-blue-300 underline">Spec-driven commands</a>
</div>