import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { getClientPlans, logWorkout, getWorkoutHistory } from "@/services/clientService";

export default function ClientWorkouts() {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState("");
  const [selectedWorkoutDayId, setSelectedWorkoutDayId] = useState("");
  const [notes, setNotes] = useState("");
  const [difficultyRating, setDifficultyRating] = useState(3);
  const [isLogging, setIsLogging] = useState(false);

  const fetchData = async () => {
    try {
      const [plansData, historyData] = await Promise.all([
        getClientPlans(),
        getWorkoutHistory(),
      ]);

      setAssignments(plansData);
      setHistory(historyData);
    } catch (error) {
      console.error("Error fetching client workouts:", error);
      toast({
        title: "Failed to load workouts",
        description: "Could not fetch workout data",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const selectedAssignment = assignments.find(
    (assignment) => assignment.id === selectedAssignmentId
  );

  const availableDays = selectedAssignment?.plan?.days || [];

  const handleLogWorkout = async () => {
    if (!selectedAssignmentId || !selectedWorkoutDayId) {
      toast({
        title: "Missing fields",
        description: "Please select a plan and a workout day",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLogging(true);

      await logWorkout({
        assignmentId: selectedAssignmentId,
        workoutDayId: selectedWorkoutDayId,
        notes,
        difficultyRating,
      });

      toast({
        title: "Workout logged",
        description: "Your workout was saved successfully",
      });

      setSelectedAssignmentId("");
      setSelectedWorkoutDayId("");
      setNotes("");
      setDifficultyRating(3);

      await fetchData();
    } catch (error: any) {
      toast({
        title: "Failed to log workout",
        description: error?.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLogging(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Workouts</h1>
        <p className="mt-1 text-muted-foreground">
          View your assigned workout plans and log completed workouts
        </p>
      </div>

      <div className="rounded-lg border bg-card p-4 card-shadow space-y-4">
        <h2 className="text-lg font-semibold">Log Completed Workout</h2>

        <div className="grid gap-3 md:grid-cols-2">
          <select
            value={selectedAssignmentId}
            onChange={(e) => {
              setSelectedAssignmentId(e.target.value);
              setSelectedWorkoutDayId("");
            }}
            className="rounded-lg border bg-background px-3 py-2 text-sm"
          >
            <option value="">Select assigned plan</option>
            {assignments.map((assignment) => (
              <option key={assignment.id} value={assignment.id}>
                {assignment.plan?.name}
              </option>
            ))}
          </select>

          <select
            value={selectedWorkoutDayId}
            onChange={(e) => setSelectedWorkoutDayId(e.target.value)}
            className="rounded-lg border bg-background px-3 py-2 text-sm"
            disabled={!selectedAssignmentId}
          >
            <option value="">Select workout day</option>
            {availableDays.map((day: any) => (
              <option key={day.id} value={day.id}>
                Day {day.dayNumber}: {day.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <textarea
            placeholder="Workout notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[90px] rounded-lg border bg-background px-3 py-2 text-sm"
          />

          <div className="space-y-2">
            <label className="text-sm font-medium">Difficulty Rating</label>
            <select
              value={difficultyRating}
              onChange={(e) => setDifficultyRating(Number(e.target.value))}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
            >
              <option value={1}>1 - Very Easy</option>
              <option value={2}>2 - Easy</option>
              <option value={3}>3 - Moderate</option>
              <option value={4}>4 - Hard</option>
              <option value={5}>5 - Very Hard</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleLogWorkout}
          disabled={isLogging}
          className="gradient-primary rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
        >
          {isLogging ? "Logging..." : "Log Workout"}
        </button>
      </div>

      <div className="grid gap-4">
        {assignments.length === 0 ? (
          <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground card-shadow">
            No assigned workout plans yet.
          </div>
        ) : (
          assignments.map((assignment) => (
            <div key={assignment.id} className="rounded-lg border bg-card p-5 card-shadow">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{assignment.plan?.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {assignment.plan?.description || "No description"}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{assignment.plan?.difficulty}</Badge>
                  <Badge variant="outline">
                    {assignment.plan?.days?.length || 0} days
                  </Badge>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {(assignment.plan?.days || []).map((day: any) => (
                  <div key={day.id} className="rounded-md border p-3">
                    <div className="font-medium">
                      Day {day.dayNumber}: {day.name}
                    </div>

                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      {(day.exercises || []).map((exercise: any) => (
                        <li key={exercise.id}>
                          {exercise.exerciseName} — {exercise.sets || "-"} sets, {exercise.reps || "-"} reps
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="rounded-lg border bg-card p-5 card-shadow">
        <h2 className="text-lg font-semibold">Workout History</h2>

        {history.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">No workout history yet.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {history.map((log: any) => (
              <div key={log.id} className="rounded-md border p-3 text-sm">
                <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                  <span className="font-medium">
                    {new Date(log.completedAt).toLocaleString()}
                  </span>
                  <Badge variant="outline">
                    Difficulty: {log.difficultyRating || "—"}
                  </Badge>
                </div>
                <p className="mt-2 text-muted-foreground">
                  {log.notes || "No notes"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}