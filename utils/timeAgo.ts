export function getTimeAgo(createdAt: Date): string {
    const now = new Date();
    const elapsedSeconds = Math.floor((now.getTime() - createdAt.getTime()) / 1000);
  
    if (elapsedSeconds < 60) {
      return `${elapsedSeconds} seconds ago`;
    }
  
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    if (elapsedMinutes < 60) {
      return `${elapsedMinutes} minutes ago`;
    }
  
    const elapsedHours = Math.floor(elapsedMinutes / 60);
    if (elapsedHours < 24) {
      return `${elapsedHours} hours ago`;
    }
  
    const elapsedDays = Math.floor(elapsedHours / 24);
    if (elapsedDays < 30) {
      return `${elapsedDays} days ago`;
    }
  
    const elapsedMonths = Math.floor(elapsedDays / 30);
    if (elapsedMonths < 12) {
      return `${elapsedMonths} months ago`;
    }
  
    const elapsedYears = Math.floor(elapsedMonths / 12);
    return `${elapsedYears} years ago`;
  }
  
  
//   Example usage
//   const pastDate = new Date(new Date().getTime() - 4000); // 4 seconds ago
//   console.log(getTimeAgo(pastDate)); // "4 seconds ago"
  