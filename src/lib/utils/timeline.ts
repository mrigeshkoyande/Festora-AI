/**
 * Festora AI — Production Timeline & Dependency Shifting Utilities
 */

export interface TaskItem {
  id: string;
  title: string;
  priority: "high" | "medium" | "low";
  dueDate: string; // ISO date string
  status: "todo" | "in_progress" | "completed";
  daysBeforeEvent: number;
  dependsOnTaskId?: string;
}

/**
 * Calculates countdown metrics (days, hours, minutes remaining) until the event date.
 */
export function calculateEventCountdown(targetDate: string | Date, now: Date = new Date()): {
  days: number;
  hours: number;
  isPast: boolean;
  formatted: string;
} {
  const target = new Date(targetDate);
  const diffMs = target.getTime() - now.getTime();

  if (isNaN(diffMs)) {
    return { days: 0, hours: 0, isPast: false, formatted: "Date TBD" };
  }

  if (diffMs <= 0) {
    return { days: 0, hours: 0, isPast: true, formatted: "Celebration Today / Past" };
  }

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return {
    days,
    hours,
    isPast: false,
    formatted: `${days} ${days === 1 ? "day" : "days"} to go`,
  };
}

/**
 * Shifts task schedules dynamically when an upstream vendor arrival or delivery shifts.
 * Runs in linear O(N) time with dependency DAG resolution.
 */
export function shiftTaskSchedule(
  tasks: TaskItem[],
  shiftedTaskId: string,
  deltaDays: number
): TaskItem[] {
  if (deltaDays === 0 || !tasks || tasks.length === 0) return tasks;

  // Build dependency map
  const taskMap = new Map<string, TaskItem>();
  tasks.forEach((t) => taskMap.set(t.id, { ...t }));

  const shiftedTask = taskMap.get(shiftedTaskId);
  if (!shiftedTask) return tasks;

  // Update root shifted task
  shiftedTask.daysBeforeEvent = Math.max(0, shiftedTask.daysBeforeEvent + deltaDays);
  const rootDueDate = new Date(shiftedTask.dueDate);
  rootDueDate.setDate(rootDueDate.getDate() + deltaDays);
  shiftedTask.dueDate = rootDueDate.toISOString();

  // Find all downstream tasks that depend directly or indirectly on shiftedTaskId
  const queue = [shiftedTaskId];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const currentId = queue.shift()!;
    visited.add(currentId);

    // Find dependents
    for (const task of taskMap.values()) {
      if (task.dependsOnTaskId === currentId && !visited.has(task.id)) {
        task.daysBeforeEvent = Math.max(0, task.daysBeforeEvent + deltaDays);
        const depDueDate = new Date(task.dueDate);
        depDueDate.setDate(depDueDate.getDate() + deltaDays);
        task.dueDate = depDueDate.toISOString();
        queue.push(task.id);
      }
    }
  }

  return Array.from(taskMap.values());
}
