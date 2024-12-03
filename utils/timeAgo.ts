export default function timeAgo(date: string | Date): string {
  try {
    // Parse the input date string into a Date object
    const inputDate = new Date(date);
    const currentDate = new Date();

    // Check if the input date is valid
    if (isNaN(inputDate.getTime())) {
      throw new Error("Invalid date string");
    }

    // Calculate the difference in milliseconds
    const diffInMilliseconds = currentDate.getTime() - inputDate.getTime();

    // Convert milliseconds to days, hours, and minutes
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    // Determine the appropriate return message
    if (diffInDays > 0) {
      if (diffInDays === 1) {
        return "1 day ago";
      }
      return `${diffInDays} days ago`;
    } else if (diffInHours > 0) {
      if (diffInHours === 1) {
        return "1 hour ago";
      }
      return `${diffInHours} hours ago`;
    } else if (diffInMinutes > 0) {
      if (diffInMinutes === 1) {
        return "1 minute ago";
      }
      return `${diffInMinutes} minutes ago`;
    } else {
      return "Just now";
    }
  } catch (error) {
    console.error("Error processing date string:", date, error);
    return "";
  }
}
