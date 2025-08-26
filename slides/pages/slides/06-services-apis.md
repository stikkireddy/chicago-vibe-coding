---
layout: two-cols
layoutClass: gap-16
---

# Services & APIs

<v-clicks>

- **FastAPI Gateway** → device registration + data ingestion (@gateway)
- **Databricks Lakeflow Ingestion** → real-time device data buffering and flush to disk
- **Unity Catalog** → Governance layer for the Data + Dashboards
- **Databricks Dashboards** → Databricks BI tool for creating and embedding analytic dashboards

</v-clicks>

<div v-click class="mt-4 p-3 bg-gray-800 text-white rounded">
<strong>Why this stack:</strong> FastAPI provides async mobile APIs, Lakeflow handles real-time ingestion at scale, Unity Catalog governs data access, embedded dashboards deliver insights directly in-app
</div>

::right::

<div v-click class="mt-8">

```python
# From @gateway/src/main.py
@app.post("/api/v1/devices/register")
async def register_device() -> DeviceResponse:
    device_id = generate_device_id()
    await db.insert_device(device_id)
    return DeviceResponse(
        device_id=device_id,
        status="registered"
    )

@app.post("/api/v1/ingest")
async def ingest_data(records: List[DeviceDataRecord]):
    # Stream to Databricks using ZerobusSdk
    await stream_to_databricks(records)
```

</div>