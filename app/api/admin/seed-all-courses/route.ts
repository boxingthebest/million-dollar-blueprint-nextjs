import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    console.log('Running database seed script...');
    
    // Run the seed script
    const { stdout, stderr } = await execAsync('cd /var/task && npx tsx prisma/seed.ts', {
      timeout: 60000, // 60 second timeout
    });
    
    console.log('Seed output:', stdout);
    if (stderr) console.error('Seed errors:', stderr);
    
    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      output: stdout,
    });
  } catch (error: any) {
    console.error('Error running seed:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Failed to seed database',
        details: error.stderr || error.stdout 
      },
      { status: 500 }
    );
  }
}
