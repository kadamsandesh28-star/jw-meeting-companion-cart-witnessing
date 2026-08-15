export interface NextMeeting {
  title: string;
  countdown: string;
}

export function getNextMeeting(): NextMeeting {
  const now = new Date();

  const day = now.getDay(); // 0=Sun ... 6=Sat
  const hour = now.getHours();

  // Default assumptions:
  // Midweek = Tuesday
  // Weekend = Sunday

  // Before Tuesday meeting
  if (day < 2 || (day === 2 && hour < 19)) {
    const days =
      day === 0
        ? 2
        : day === 1
        ? 1
        : 0;

    return {
      title: "Midweek Meeting",
      countdown:
        days === 0 ? "Today" : `${days} day${days > 1 ? "s" : ""}`,
    };
  }

  // Before Weekend meeting
  if (day < 7) {
    const days =
      day === 2
        ? 5
        : day === 3
        ? 4
        : day === 4
        ? 3
        : day === 5
        ? 2
        : day === 6
        ? 1
        : 0;

    return {
      title: "Weekend Meeting",
      countdown:
        days === 0 ? "Today" : `${days} day${days > 1 ? "s" : ""}`,
    };
  }

  return {
    title: "Midweek Meeting",
    countdown: "2 days",
  };
}