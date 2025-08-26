from dotenv import load_dotenv
load_dotenv()

import asyncio
import os
import sys
from pathlib import Path

# Add the src directory to the Python path for imports
if __name__ == "__main__":
    # When run directly, add the src directory to path
    src_path = Path(__file__).parent.parent.parent
    sys.path.insert(0, str(src_path))
    from gateway.proto import device_ingest_pb2 as row_pb2
else:
    # When imported as module, use relative import
    from ..proto import device_ingest_pb2 as row_pb2

from zerobus_sdk.aio import ZerobusSdk
from zerobus_sdk import TableProperties


TABLE_NAME = "main.sri.chicago_device_data"

table_properties = TableProperties(TABLE_NAME, row_pb2.DeviceData.DESCRIPTOR)

sdk_handle = ZerobusSdk(
    os.getenv("DATABRICKS_INGEST_URL"),
    os.getenv("DATABRICKS_WORKSPACE_URL"),
    os.getenv("DATABRICKS_TOKEN")
)

async def example():
    # Create stream to table.
    stream = await sdk_handle.create_stream(table_properties)
    
    # non-blocking (streaming) call.
    NUM_RECORDS = 1_000
    for i in range(NUM_RECORDS):
        if ((i + 1) % 1000) == 0:
            print(">> Sent " + str(i + 1) + " records to ingest.")

        # we are awaiting it to be queued
        await stream.ingest_record(row_pb2.DeviceData(
            device_id="device_num_" + str(i),
            x_axis=float(i),
            y_axis=float(i + 1),
            z_axis=float(i + 2),
            movement="movement_" + str(i),
            timestamp=int(i + 3)
        ))

    # Wait until we receive the ack for the latest record
    await stream.flush()

    # Close the stream
    await stream.close()

def main():
    """Main entry point for the ingest example."""
    asyncio.run(example())


if __name__ == "__main__":
    main()


