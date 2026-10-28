import env from './config/env.js';
import app from './app.js';

const port = env.PORT;

app.listen(port, () => {
  console.log(`[VikingsERP Management API] running at http://localhost:${port}`);
  console.log(`[Mode]: ${env.DEMO_MODE ? 'Demonstration (Role Emulation)' : 'Production'}`);
});
