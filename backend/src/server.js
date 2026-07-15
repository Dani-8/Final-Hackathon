import app from './app.js';
import { env } from './config/env.js';

import dns from "dns"
dns.setServers(["8.8.8.8", "1.1.1.1"]);


const PORT = env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 MaintainIQ Backend Server running on port ${PORT}`);
});
