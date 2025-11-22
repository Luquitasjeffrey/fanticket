
export function formatDateHelper(isoString: string) {
    const date = new Date(isoString);
  

    const usDate = date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  
    const time = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  
    const day = date.toLocaleDateString('en-US', { day: 'numeric' });
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const year = date.toLocaleDateString('en-US', { year: 'numeric' });
    const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
  
    return {
      usDate,
      time,
      day,
      month,
      year,
      weekday, 
      raw: date 
    };
  }