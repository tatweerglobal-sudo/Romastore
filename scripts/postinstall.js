const { execSync } = require('child_process');

process.env.DATABASE_URL = process.env.DATABASE_URL || 'file:./dev.db';

try {
  console.log('⚡ [POSTINSTALL] Generating Prisma Client...');
  execSync('npx prisma generate', { stdio: 'inherit', env: process.env });
  console.log('✅ [POSTINSTALL] Prisma Client generated successfully.');
} catch (e) {
  console.error('⚠️ [POSTINSTALL] Warning generating Prisma client:', e.message);
}
