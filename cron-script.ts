import cron from 'node-cron';
import { deleteExpiredSessions } from './src/Services/userService';

cron.schedule('*/1 * * * *', async () => {
    try {
      console.log('Running the cron job to delete expired sessions...');
  
      // Call a function from your userService to delete expired sessions
      await deleteExpiredSessions();
  
      console.log('Expired sessions deleted successfully.');
    } catch (error) {
    }
  });
  
  // Keep the script running
  process.stdin.resume();