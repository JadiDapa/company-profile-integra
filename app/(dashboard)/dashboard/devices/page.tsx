import { getAllDevices } from "@/app/actions/device.action";
import CreateDeviceModal from "@/components/dashboard/devices/CreateDeviceModal";
import DeviceTable from "@/components/dashboard/devices/DeviceTable";

export default async function DevicesPage() {
  const devices = await getAllDevices();
  return (
    <section className="flex h-full w-full flex-col gap-4 rounded-md border p-6 lg:gap-6">
      {/* Header Title */}
      <div className="flex w-full flex-col justify-between gap-4 lg:flex-row lg:gap-6">
        <div className="">
          <h1 className="text-4xl font-medium">Device List</h1>
          <p className="hidden lg:inline">
            These are the Items that Consist in the Inventory
          </p>
        </div>
        <div className="flex items-center gap-4 lg:gap-6">
          <CreateDeviceModal />
        </div>
      </div>
      <DeviceTable devices={devices} />
    </section>
  );
}
