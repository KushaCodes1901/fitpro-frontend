import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { getMyProgress, logBodyMeasurement } from "@/services/clientService";

export default function ClientProgress() {
  const [measurements, setMeasurements] = useState<any[]>([]);
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState({
    weight: "",
    bodyFat: "",
    chest: "",
    waist: "",
    hips: "",
    leftArm: "",
    rightArm: "",
    leftThigh: "",
    rightThigh: "",
    notes: "",
  });

  const fetchProgress = async () => {
    try {
      const data = await getMyProgress();
      setMeasurements(data.measurements || []);
      setWorkouts(data.workouts || []);
    } catch (error) {
      console.error("Error fetching progress:", error);
      toast({
        title: "Failed to load progress",
        description: "Could not fetch progress data",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const toNumberOrUndefined = (value: string) => {
    if (value === "") return undefined;
    const parsed = Number(value);
    return Number.isNaN(parsed) ? undefined : parsed;
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      await logBodyMeasurement({
        weight: toNumberOrUndefined(form.weight),
        bodyFat: toNumberOrUndefined(form.bodyFat),
        chest: toNumberOrUndefined(form.chest),
        waist: toNumberOrUndefined(form.waist),
        hips: toNumberOrUndefined(form.hips),
        leftArm: toNumberOrUndefined(form.leftArm),
        rightArm: toNumberOrUndefined(form.rightArm),
        leftThigh: toNumberOrUndefined(form.leftThigh),
        rightThigh: toNumberOrUndefined(form.rightThigh),
        notes: form.notes || undefined,
      });

      toast({
        title: "Progress saved",
        description: "Your body measurements were logged successfully",
      });

      setForm({
        weight: "",
        bodyFat: "",
        chest: "",
        waist: "",
        hips: "",
        leftArm: "",
        rightArm: "",
        leftThigh: "",
        rightThigh: "",
        notes: "",
      });

      await fetchProgress();
    } catch (error: any) {
      toast({
        title: "Failed to save progress",
        description: error?.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const latestMeasurement = measurements[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Progress</h1>
        <p className="mt-1 text-muted-foreground">
          Track body measurements and monitor your training consistency
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-5 card-shadow">
          <div className="text-sm text-muted-foreground">Latest Weight</div>
          <div className="mt-2 text-2xl font-bold">
            {latestMeasurement?.weight ? `${latestMeasurement.weight} kg` : "—"}
          </div>
        </div>

        <div className="rounded-lg border bg-card p-5 card-shadow">
          <div className="text-sm text-muted-foreground">Latest Body Fat</div>
          <div className="mt-2 text-2xl font-bold">
            {latestMeasurement?.bodyFat ? `${latestMeasurement.bodyFat}%` : "—"}
          </div>
        </div>

        <div className="rounded-lg border bg-card p-5 card-shadow">
          <div className="text-sm text-muted-foreground">Workout Logs</div>
          <div className="mt-2 text-2xl font-bold">{workouts.length}</div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-5 card-shadow space-y-4">
        <h2 className="text-lg font-semibold">Log New Measurement</h2>

        <div className="grid gap-3 md:grid-cols-3">
          <input
            name="weight"
            value={form.weight}
            onChange={handleChange}
            placeholder="Weight (kg)"
            className="rounded-lg border bg-background px-3 py-2 text-sm"
          />
          <input
            name="bodyFat"
            value={form.bodyFat}
            onChange={handleChange}
            placeholder="Body Fat (%)"
            className="rounded-lg border bg-background px-3 py-2 text-sm"
          />
          <input
            name="chest"
            value={form.chest}
            onChange={handleChange}
            placeholder="Chest (cm)"
            className="rounded-lg border bg-background px-3 py-2 text-sm"
          />
          <input
            name="waist"
            value={form.waist}
            onChange={handleChange}
            placeholder="Waist (cm)"
            className="rounded-lg border bg-background px-3 py-2 text-sm"
          />
          <input
            name="hips"
            value={form.hips}
            onChange={handleChange}
            placeholder="Hips (cm)"
            className="rounded-lg border bg-background px-3 py-2 text-sm"
          />
          <input
            name="leftArm"
            value={form.leftArm}
            onChange={handleChange}
            placeholder="Left Arm (cm)"
            className="rounded-lg border bg-background px-3 py-2 text-sm"
          />
          <input
            name="rightArm"
            value={form.rightArm}
            onChange={handleChange}
            placeholder="Right Arm (cm)"
            className="rounded-lg border bg-background px-3 py-2 text-sm"
          />
          <input
            name="leftThigh"
            value={form.leftThigh}
            onChange={handleChange}
            placeholder="Left Thigh (cm)"
            className="rounded-lg border bg-background px-3 py-2 text-sm"
          />
          <input
            name="rightThigh"
            value={form.rightThigh}
            onChange={handleChange}
            placeholder="Right Thigh (cm)"
            className="rounded-lg border bg-background px-3 py-2 text-sm"
          />
        </div>

        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Notes"
          className="min-h-[100px] w-full rounded-lg border bg-background px-3 py-2 text-sm"
        />

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="gradient-primary rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save Progress"}
        </button>
      </div>

      <div className="rounded-lg border bg-card p-5 card-shadow">
        <h2 className="text-lg font-semibold">Measurement History</h2>

        {measurements.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">
            No measurements logged yet.
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            {measurements.map((item) => (
              <div key={item.id} className="rounded-md border p-3">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div className="font-medium">
                    {new Date(item.loggedAt).toLocaleString()}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">
                      Weight: {item.weight ?? "—"}
                    </Badge>
                    <Badge variant="outline">
                      Body Fat: {item.bodyFat ?? "—"}
                    </Badge>
                    <Badge variant="outline">
                      Waist: {item.waist ?? "—"}
                    </Badge>
                    <Badge variant="outline">
                      Chest: {item.chest ?? "—"}
                    </Badge>
                  </div>
                </div>

                {item.notes && (
                  <p className="mt-2 text-sm text-muted-foreground">{item.notes}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}