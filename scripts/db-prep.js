const { execSync } = require('child_process');

process.env.DATABASE_URL = process.env.DATABASE_URL || 'file:./dev.db';

console.log('⚡ [DB-PREP] Syncing Prisma schema with database...');
try {
  execSync('npx prisma generate', { stdio: 'inherit', env: process.env });
  execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit', env: process.env });
  console.log('✅ [DB-PREP] Database synced successfully.');
} catch (e) {
  console.error('⚠️ [DB-PREP] Warning during database sync:', e.message);
}
